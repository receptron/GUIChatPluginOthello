/**
 * Othello Plugin - Main Entry Point
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
} from "./core/types";

export {
  TOOL_NAME,
  TOOL_DEFINITION,
  SYSTEM_PROMPT,
  executeOthello,
  pluginCore,
  playOthello,
} from "./core/plugin";

export { samples } from "./core/samples";
