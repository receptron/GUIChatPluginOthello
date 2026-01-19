/**
 * Othello Plugin - Vue Implementation
 */

import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { OthelloArgs, OthelloState } from "../core/types";
import { pluginCore } from "../core/plugin";
import { samples } from "../core/samples";
import View from "./View.vue";
import Preview from "./Preview.vue";

export const plugin: ToolPlugin<never, OthelloState, OthelloArgs> = {
  ...pluginCore,
  viewComponent: View,
  previewComponent: Preview,
  samples,
};

export type {
  Cell,
  Side,
  OthelloBoard,
  OthelloCellValue,
  OthelloPlayerType,
  OthelloArgs,
  OthelloState,
} from "../core/types";

export {
  TOOL_NAME,
  TOOL_DEFINITION,
  SYSTEM_PROMPT,
  executeOthello,
  pluginCore,
  playOthello,
} from "../core/plugin";

export { samples } from "../core/samples";

export { View, Preview };

export default { plugin };
