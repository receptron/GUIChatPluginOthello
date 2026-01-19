/**
 * Othello Plugin - Tool Definition
 */

import type { ToolDefinition } from "gui-chat-protocol";

export const TOOL_NAME = "playOthello";

export const TOOL_DEFINITION: ToolDefinition = {
  type: "function",
  name: TOOL_NAME,
  description:
    "Play Othello/Reversi game with the user. You can start a new game, make moves, or pass turns.",
  parameters: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["new_game", "move", "pass"],
        description:
          "The action to perform: start a new game, make a move, or pass the turn",
      },
      col: {
        type: "number",
        description:
          "Column position for the move (0-7, required for 'move' action). The user will tell you the column by specifying A to H",
        minimum: 0,
        maximum: 7,
      },
      row: {
        type: "number",
        description:
          "Row position for the move (0-7, required for 'move' action). The user will tell you the row by specifying 1 to 8",
        minimum: 0,
        maximum: 7,
      },
      board: {
        type: "array",
        description:
          "Current 8x8 board state BEFORE the move (required for 'move' and 'pass' actions). IMPORTANT: Do NOT modify the board yourself - pass the current board state as-is, and the game logic will handle placing the piece and flipping opponent pieces.",
        items: {
          type: "array",
          items: {
            type: "string",
            enum: [".", "B", "W"],
          },
        },
      },
      currentSide: {
        type: "string",
        enum: ["B", "W"],
        description:
          "Current player's side (required for 'move' and 'pass' actions)",
      },
      playerNames: {
        type: "object",
        description:
          "Player assignments (required for 'move' and 'pass' actions)",
        properties: {
          B: {
            type: "string",
            enum: ["user", "computer"],
          },
          W: {
            type: "string",
            enum: ["user", "computer"],
          },
        },
        required: ["B", "W"],
      },
      firstPlayer: {
        type: "string",
        enum: ["user", "computer"],
        description:
          "Optional: Which player should play as Black (goes first) for 'new_game' action. If not specified, will be chosen randomly.",
      },
    },
    required: ["action"],
    additionalProperties: false,
  },
};

export const SYSTEM_PROMPT = `You can play Othello/Reversi with users. When a user wants to play:
1. Start a new game with the "new_game" action
2. For moves, the user specifies column (A-H) and row (1-8)
3. Use the "move" action with the current board state
4. Pass the current board state as-is - the game logic handles piece placement and flipping`;
