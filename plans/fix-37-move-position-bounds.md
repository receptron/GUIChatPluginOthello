# #37 — reject off-board and fractional move coordinates

`getFlippedPieces` indexed `board[row][col]` before checking the position, so a negative or fractional `row` threw a `TypeError` instead of producing the invalid-move response.

## How
- `src/core/position.ts`: `isOnBoard(row, col, size)` — both are whole numbers inside the board. Pure, so it is tested on its own.
- `isInBounds` delegates to it, and `getFlippedPieces` (which `isLegalMove` and `makeMove` go through) checks it before reading the board.
- `tests/position.test.ts` covers the check in both directions and `playOthello` with off-board and fractional moves. Run with `yarn test`, the same `tsx --test` setup the other plugins use; CI now runs it.

## Left out
- Validating the shape of a caller-supplied `board`.
