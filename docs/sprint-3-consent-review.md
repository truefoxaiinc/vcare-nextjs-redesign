# Sprint 3 — Consent preferences change

Issue #14. The consent banner previously disappeared after a decision, leaving no visible way to reopen choices.

- A persistent "Cookie preferences" control now reopens the same essential/analytics choice.
- No optional analytics script is rendered until the locally stored value is `all`.
- Withdrawing analytics triggers a page reload because an already executed third-party script cannot reliably be disabled merely by removing a React element.
- The choice persists in localStorage where available and updates across tabs via the storage event.
- This does **not** claim to erase analytics cookies or data already collected by a third party. Cookie deletion and Google Consent Mode / GTM tag-level compliance require browser and provider-specific validation.
- Verify on real deployed browsers: fresh session, essential-only, allow, reopen, revoke, refresh, cross-tab changes, disabled storage, keyboard and mobile. Inspect network requests for Google domains before and after each choice.
- GTM container contents must be reviewed: any configured non-analytics tags require separate consent categories and a legal/business review.

No production deployment or analytics account configuration is included. Do not close #14 until browser checks and privacy-owner review pass.
