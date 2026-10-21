# ChangeLog

## @gui-chat-plugin/othello@2.1.1 (2026-10-22)

- **Reject off-board and fractional move coordinates** (#38, fixes #37): `playOthello` threw a `TypeError` on a negative or fractional `row`/`col`; such moves now get the invalid-move response. Adds `yarn test` and runs it in CI.

