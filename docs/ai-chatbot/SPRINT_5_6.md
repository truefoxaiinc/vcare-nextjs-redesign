# Sprint 5.6 — Read-only VPS staging preflight

Run from `ai-chatbot-backend` on the intended VPS **before** considering deployment:

```bash
python scripts/vps_preflight.py --port 18720 --directory .
```

The script prints JSON booleans and exits nonzero when a check fails. It checks whether the candidate loopback port can be bound, Docker Compose is installed, at least 5 GiB of disk is free, and a `.env` file exists. It does not read or print environment secrets, run containers, change networks, modify firewall rules, or deploy anything.

**Important:** A green result is only a preliminary local prerequisite check, **not** authorization to deploy or proof that the VPS is secure. A port may become occupied after the check. Verify Docker daemon access, credentials and permissions, CPU/RAM headroom, service isolation, backups, nftables forwarding, TLS, DNS, migrations, image pinning, rollback and staging-specific OpenRouter credentials separately. Review all existing workloads before allocating resources. No existing projects should be modified.

After review and explicit approval, use the isolated staging deployment plan in `DEPLOYMENT.md`. Do not enable production chatbot feature flags during this phase.
