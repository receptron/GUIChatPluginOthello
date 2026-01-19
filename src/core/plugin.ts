/**
 * Othello Plugin Core
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { OthelloArgs, OthelloState, Side, Command } from "./types";
import { TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";
import { playOthello } from "./logic";

export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";
export { playOthello } from "./logic";

export const executeOthello = async (
  _context: ToolContext,
  args: OthelloArgs,
): Promise<ToolResult<never, OthelloState>> => {
  try {
    let command: Command;

    if (args.action === "new_game") {
      let blackPlayer: string;
      if (args.firstPlayer) {
        blackPlayer = args.firstPlayer;
      } else {
        blackPlayer = Math.random() < 0.5 ? "computer" : "user";
      }
      const whitePlayer = blackPlayer === "user" ? "computer" : "user";

      command = {
        action: "new_game",
        playerNames: { B: blackPlayer, W: whitePlayer },
      };
    } else if (args.action === "move") {
      if (
        typeof args.row !== "number" ||
        typeof args.col !== "number" ||
        !args.board ||
        !args.currentSide ||
        !args.playerNames
      ) {
        throw new Error(
          "Move action requires row, col, board, currentSide, and playerNames parameters",
        );
      }
      command = {
        action: "move",
        row: args.row,
        col: args.col,
        board: args.board,
        currentSide: args.currentSide as Side,
        playerNames: args.playerNames,
      };
    } else if (args.action === "pass") {
      if (!args.board || !args.currentSide || !args.playerNames) {
        throw new Error(
          "Pass action requires board, currentSide, and playerNames parameters",
        );
      }
      command = {
        action: "pass",
        board: args.board,
        currentSide: args.currentSide as Side,
        playerNames: args.playerNames,
      };
    } else {
      throw new Error(`Unknown action: ${args.action}`);
    }

    const state = playOthello(command);

    // Handle invalid move
    if (state.error) {
      const isComputerTurn =
        state.playerNames[state.currentSide] === "computer";
      const legalMovesStr = state.legalMoves
        .map((m) => `(${m.row}, ${m.col})`)
        .join(", ");

      const instructions = isComputerTurn
        ? `Invalid move attempted. You must make a valid move. Legal moves are: ${legalMovesStr}. Choose one of these moves.`
        : `Invalid move attempted. Tell the user they must make a valid move. Legal moves are: ${legalMovesStr}. The user will tell you the move by specifying column (A to H) and row (1 to 8).`;

      return {
        message: state.error,
        jsonData: state,
        instructions,
        updating: true,
      };
    }

    let message = "";
    if (state.lastAction.type === "new_game") {
      message = "Started a new Othello game! Black (●) goes first.";
    } else if (state.lastAction.type === "move") {
      message = `Played at (${state.lastAction.row}, ${state.lastAction.col}) and flipped ${state.lastAction.flipped} pieces.`;
    } else if (state.lastAction.type === "pass") {
      message = "Passed the turn.";
    }

    if (state.isTerminal) {
      if (state.winner === "draw") {
        message += " Game over - it's a draw!";
      } else if (state.winner) {
        message += ` Game over - ${state.winner === "B" ? "Black" : "White"} wins!`;
      }
    }

    const isComputerTurn = state.playerNames[state.currentSide] === "computer";
    const instructions = state.isTerminal
      ? "The game is over. Announce the game result."
      : isComputerTurn
        ? "The game state has been updated. Do not describe the state of the game. It is assistant's turn. You MUSK choose your next move."
        : "The game state has been updated. Tell the user to make a move. Do not describe the state of the game. The user is able to see it. The user will tell you the move by specifying colum (A to H) and row (1 to 8)";

    return {
      message,
      jsonData: state,
      instructions,
      instructionsRequired: state.isTerminal || isComputerTurn,
      updating: args.action !== "new_game",
    };
  } catch (error) {
    console.error("ERR: exception\n Othello game error", error);
    return {
      message: `Othello game error: ${error instanceof Error ? error.message : "Unknown error"}`,
      instructions:
        "Acknowledge that there was an error with the Othello game and suggest trying again.",
    };
  }
};

export const pluginCore: ToolPluginCore<never, OthelloState, OthelloArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeOthello,
  generatingMessage: "Processing Othello move...",
  isEnabled: () => true,
  systemPrompt: SYSTEM_PROMPT,
};
