/**
 * Othello Plugin - Samples
 */

import type { ToolSample } from "gui-chat-protocol";

export const samples: ToolSample[] = [
  {
    name: "New Game (User First)",
    args: {
      action: "new_game",
      firstPlayer: "user",
    },
  },
  {
    name: "New Game (Computer First)",
    args: {
      action: "new_game",
      firstPlayer: "computer",
    },
  },
];
