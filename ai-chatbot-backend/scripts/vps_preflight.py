"""Read-only VPS preflight for isolated V CARE chatbot staging.

Does not start services, change firewall rules, or read secret values.
"""
import argparse
import json
import os
import shutil
import socket
import subprocess
import sys
from pathlib import Path


def port_is_free(host: str, port: int) -> bool:
    """Conservatively require a successful bind to the proposed loopback port."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
            probe.bind((host, port))
        return True
    except OSError:
        return False


def command_available(name: str) -> bool:
    return shutil.which(name) is not None


def docker_compose_available() -> bool:
    if not command_available("docker"):
        return False
    try:
        result = subprocess.run(
            ["docker", "compose", "version"], capture_output=True, text=True,
            timeout=8, check=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0


def disk_has_space(path: Path, minimum_gib: int = 5) -> bool:
    try:
        return shutil.disk_usage(path).free >= minimum_gib * (1024 ** 3)
    except OSError:
        return False


def run_checks(port: int, disk_path: Path) -> dict[str, bool]:
    return {
        "loopback_port_available": port_is_free("127.0.0.1", port),
        "docker_compose_installed": docker_compose_available(),
        "disk_free_at_least_5_gib": disk_has_space(disk_path),
        "staging_secret_file_present": (disk_path / ".env").is_file(),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=18720)
    parser.add_argument("--directory", type=Path, default=Path.cwd())
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error("--port must be between 1024 and 65535")
    if not args.directory.is_dir():
        parser.error("--directory must exist")
    checks = run_checks(args.port, args.directory)
    print(json.dumps({"checks": checks, "ready": all(checks.values())}, sort_keys=True))
    return 0 if all(checks.values()) else 1


if __name__ == "__main__":
    sys.exit(main())
