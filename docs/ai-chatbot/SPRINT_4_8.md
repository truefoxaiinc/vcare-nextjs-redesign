# Sprint 4.8 — Consent single-flight guard

## Finding

Rapid repeated clicks on the consent button could run the asynchronous `accept()` handler twice before React committed its `connecting` state. Each invocation could create a separate backend session, overwriting the controller ref and leaving an orphaned session until TTL expiry.

## Fix

Reject a second consent invocation while a controller already exists. The controller ref is assigned synchronously before the first network request, so this guard works even before a React render. Existing error recovery clears the ref to allow a deliberate retry.

## Verification

Added source-level regression assertions for the synchronous guard. CI must run typecheck, lint, tests, and build. Staging browser testing must also verify rapid clicks, failed creation retry, close-during-creation, deletion and actual OpenRouter replies. No production rollout flags or deployment settings changed.
