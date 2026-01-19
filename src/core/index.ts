/**
 * Othello Plugin - Core Entry Point
 */

export type {
  Cell,
  Side,
  OthelloBoard,
  OthelloCellValue,
  OthelloPlayerType,
  OthelloArgs,
  OthelloState,
  Command,
  NewGameCommand,
  MoveCommand,
} from "./types";

export {
  TOOL_NAME,
  TOOL_DEFINITION,
  SYSTEM_PROMPT,
  executeOthello,
  pluginCore,
  playOthello,
} from "./plugin";

export { samples } from "./samples";
