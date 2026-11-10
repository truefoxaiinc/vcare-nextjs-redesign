# Sprint 5.5 — Canonical recommendation provenance checks

The manual-only staging smoke now verifies that recommendation cards have complete nonempty product fields, a valid product slug, and a canonical HTTPS URL on `vcarehardwoodfloors.ca` or `www.vcarehardwoodfloors.ca` with the exact `/products/{slug}` path. Userinfo, unexpected ports, queries, fragments, other hosts and mismatched slugs fail the check. Price/stock fields are rejected.

A `matched` response must include one to three approved-looking product cards and a 40-character lowercase hexadecimal source commit. A `no_match` response must contain no cards but still have a source commit; `unavailable` must have no cards and no source commit. These checks verify API response consistency, not independent proof of snapshot authorization or conversational accuracy.

The smoke remains explicitly opted-in and limited to a dedicated HTTPS staging origin. No live staging call or production deployment is part of this sprint. Run backend CI before merge, then perform real staging and human-reviewed conversation evaluations.
