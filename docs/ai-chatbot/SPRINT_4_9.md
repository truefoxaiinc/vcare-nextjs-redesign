# Sprint 4.9 — Message submission single-flight

## Finding

The chat panel relied on React's asynchronous `sending` state to block repeated submissions. Two rapid form submissions could both append an optimistic visitor bubble before the state committed. The controller already rejects overlapping network sends, but the second UI submission could show an unnecessary error and interfere with draft recovery.

## Change

Introduce a synchronous `sending` ref and set it before updating React state or the conversation. Subsequent submissions return without changing messages, drafts, or network activity. Release the ref after the active controller's send completes; clear it on explicit close.

## Validation

Add source-level regression assertions. Run typecheck, lint, unit tests and build in CI. Staging browser tests must still cover double-click/Enter submissions, failed send retry, close-during-send and backend timeouts. No rollout flags, deployments, or existing demo chat behavior changed.
