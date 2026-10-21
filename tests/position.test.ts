import { test, describe } from "node:test";
import assert from "node:assert";
import { isOnBoard } from "../src/core/position.js";
import { playOthello } from "../src/core/logic.js";

const SIZE = 8;
const playerNames = { B: "user", W: "computer" };
const opening = () => playOthello({ action: "new_game", playerNames });
const moveTo = (row: number, col: number) => playOthello({ action: "move", row, col, board: opening().board, currentSide: "B", playerNames });

describe("isOnBoard", () => {
  test("accepts every corner and an inner square", () => {
    [0, SIZE - 1].forEach((row) => [0, SIZE - 1].forEach((col) => assert.equal(isOnBoard(row, col, SIZE), true)));
    assert.equal(isOnBoard(3, 4, SIZE), true);
  });

  test("rejects positions just outside each edge", () => {
    [
      [-1, 0],
      [0, -1],
      [SIZE, 0],
      [0, SIZE],
    ].forEach(([row, col]) => assert.equal(isOnBoard(row, col, SIZE), false));
  });

  test("rejects values that are not whole numbers", () => {
    [0.5, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, -0.5].forEach((value) => {
      assert.equal(isOnBoard(value, 0, SIZE), false);
      assert.equal(isOnBoard(0, value, SIZE), false);
    });
  });

  test("rejects a non-number from an untyped caller", () => {
    const fromJson: { row: number } = JSON.parse('{"row":"__proto__"}');
    assert.equal(isOnBoard(fromJson.row, 0, SIZE), false);
  });
});

describe("playOthello move coordinates", () => {
  test("a legal opening move is played", () => {
    const [first] = opening().legalMoves;
    const state = moveTo(first.row, first.col);
    assert.equal(state.error, undefined);
    assert.equal(state.board[first.row][first.col], "B");
  });

  test("a square off the board or between squares is an invalid move, not a throw", () => {
    [
      [-1, 0],
      [0, -1],
      [SIZE, 0],
      [0, SIZE],
      [1.5, 0],
      [0, 0.5],
      [Number.NaN, 0],
    ].forEach(([row, col]) => {
      const state = moveTo(row, col);
      assert.match(state.error ?? "", /Invalid move/);
      assert.deepEqual(state.board, opening().board);
    });
  });
});
