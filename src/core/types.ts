/**
 * Othello Plugin - Type Definitions
 */

export type Cell = "." | "B" | "W";
export type Side = "B" | "W";
export type OthelloBoard = Cell[][]; // 8x8

export type OthelloCellValue = Cell;
export type OthelloPlayerType = "user" | "computer";

export interface OthelloArgs {
  action: "new_game" | "move" | "pass";
  col?: number;
  row?: number;
  board?: OthelloCellValue[][];
  currentSide?: Side;
  playerNames?: { B: OthelloPlayerType; W: OthelloPlayerType };
  firstPlayer?: OthelloPlayerType;
}

export type NewGameCommand = {
  action: "new_game";
  playerNames: { B: string; W: string };
};

export type MoveCommand =
  | {
      action: "move";
      row: number;
      col: number;
      board: OthelloBoard;
      currentSide: Side;
      playerNames: { B: string; W: string };
    }
  | {
      action: "pass";
      board: OthelloBoard;
      currentSide: Side;
      playerNames: { B: string; W: string };
    };

export type Command = NewGameCommand | MoveCommand;

export interface OthelloState {
  board: OthelloBoard;
  currentSide: Side; // whose turn NEXT
  playerNames: { B: string; W: string };
  legalMoves: { row: number; col: number }[];
  counts: { B: number; W: number; empty: number };
  isTerminal: boolean;
  winner: Side | "draw" | null; // null until terminal
  lastAction:
    | { type: "new_game" }
    | { type: "move"; row: number; col: number; flipped: number }
    | { type: "pass" };
  error?: string;
}

/**
 * Data passed from handleCellClick for testing/debugging
 */
export interface OthelloClickData {
  row: number;
  col: number;
  currentState: OthelloState;
}
