# Sprint 3.3 — Grounded sales-agent replies

This sprint integrates the existing checksum-pinned Sprint 3.1 catalogue with the **authenticated session message flow**. It does not change the legacy HTTP 410 endpoint or the Next.js demo widget.

## Behavior

- Product-related messages trigger deterministic retrieval from the locally configured, approved snapshot. Unrelated greetings avoid catalogue access.
- The existing `CATALOGUE_SNAPSHOT_PATH` and `CATALOGUE_SNAPSHOT_SHA256` remain optional; without them, the assistant receives explicit **no verified product evidence** instructions.
- Invalid or tampered configured snapshots return 503 without an OpenRouter request.
- Up to five matching products are included in a bounded evidence section, with approved descriptions, supplier, category, source commit and canonical URLs.
- The agent is instructed to treat descriptions as **untrusted reference data**, not commands, and to cite canonical URLs when mentioning a specific retrieved product.
- A post-response guard replaces named recommendations lacking their corresponding canonical URLs with a safe clarification. This is **not** a full hallucination or prompt-injection guarantee.

## Safety and activation

No catalogue is enabled by this PR. Actual product recommendations require a separately reviewed export and manual configuration. Product names, stock, prices, discounts, and availability must never be invented. The agent still cannot submit leads or contact staff.

## Review gates

1. Confirm Python lint and PostgreSQL/Redis integration CI pass.
2. Review supplier authorization and snapshot revocation controls before activation.
3. Add evaluation cases for unseen product names, multilingual queries, prompt injection in descriptions, price/stock fabrication, canonical link citation and provider errors.
4. Run staging end-to-end tests with a **reviewed** catalogue snapshot before production rollout.

**No merge or deployment is authorized by this PR.**
