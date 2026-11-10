"""Offline tests for read-only VPS preflight checks."""
import importlib.util
import socket
from pathlib import Path

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "vps_preflight.py"
spec = importlib.util.spec_from_file_location("vps_preflight", MODULE)
preflight = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preflight)


def test_port_probe_detects_occupied_loopback_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener:
        listener.bind(("127.0.0.1", 0))
        assert not preflight.port_is_free("127.0.0.1", listener.getsockname()[1])


def test_compose_missing_is_not_ready(monkeypatch):
    monkeypatch.setattr(preflight, "command_available", lambda name: False)
    assert not preflight.docker_compose_available()


def test_compose_timeout_is_not_ready(monkeypatch):
    import subprocess

    monkeypatch.setattr(preflight, "command_available", lambda name: True)

    def timeout(*args, **kwargs):
        raise subprocess.TimeoutExpired("docker", 8)

    monkeypatch.setattr(preflight.subprocess, "run", timeout)
    assert not preflight.docker_compose_available()


def test_preflight_checks_are_read_only_and_fail_closed(monkeypatch, tmp_path):
    monkeypatch.setattr(preflight, "port_is_free", lambda host, port: False)
    monkeypatch.setattr(preflight, "docker_compose_available", lambda: True)
    monkeypatch.setattr(preflight, "disk_has_space", lambda path: True)
    checks = preflight.run_checks(18720, tmp_path)
    assert checks == {
        "loopback_port_available": False,
        "docker_compose_installed": True,
        "disk_free_at_least_5_gib": True,
        "staging_secret_file_present": False,
    }


def test_preflight_detects_env_file_without_reading_it(monkeypatch, tmp_path):
    (tmp_path / ".env").write_text("SECRET_DO_NOT_PRINT=secret")
    monkeypatch.setattr(preflight, "port_is_free", lambda host, port: True)
    monkeypatch.setattr(preflight, "docker_compose_available", lambda: True)
    monkeypatch.setattr(preflight, "disk_has_space", lambda path: True)
    assert all(preflight.run_checks(18720, tmp_path).values())
