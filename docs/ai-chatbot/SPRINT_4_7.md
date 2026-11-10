# Sprint 4.7 — Recover visitor drafts after send failures

## Finding

The AI chat panel cleared a visitor's message before awaiting the AI response. On a timeout, API error or malformed response, the message remained in the conversation display but was no longer in the input, making retry inconvenient and potentially misleading.

## Implementation

- Track the optimistic visitor message by ID.
- If sending fails while the same controller is active, remove that optimistic bubble and restore the text to the input for a deliberate retry.
- Keep the existing text if the visitor has already typed a replacement.
- Do not restore drafts after chat close or controller replacement.
- Provide explicit retry wording in the error message.

## Validation

Added source-level regression assertions. GitHub Actions must run typecheck, lint, tests and build. Interactive browser tests of timeouts, retries, close-during-send, and accessibility remain required before rollout. No live chatbot activation or deployment changes.
