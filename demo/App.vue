<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">{{ pluginName }} Demo</h1>

    <div class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Actions</h2>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(sample, index) in samplesList"
          :key="index"
          @click="executeSample(sample)"
          class="py-2 px-4 bg-indigo-100 border border-indigo-200 rounded-md cursor-pointer text-sm text-indigo-700 hover:bg-indigo-200"
        >
          {{ sample.name }}
        </button>
      </div>
    </div>

    <div v-if="ViewComponent" class="bg-gray-800 rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-200 text-xl mb-4">View Component</h2>
      <div class="border border-gray-600 rounded h-[500px]">
        <component
          :is="ViewComponent"
          :selectedResult="result"
          :sendTextMessage="handleSendMessage"
        />
      </div>
    </div>

    <div v-if="PreviewComponent" class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Preview Component</h2>
      <div class="max-w-[200px]">
        <component :is="PreviewComponent" :result="result" />
      </div>
    </div>

    <div v-if="lastMessage" class="bg-white rounded-lg p-5 mb-5 shadow-md">
      <h2 class="text-gray-600 text-xl mb-4">Last Message</h2>
      <p class="text-gray-700">{{ lastMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { plugin, executeOthello } from "../src/vue";
import type {
  ToolResult,
  ToolSample,
  ToolPlugin,
  SendTextMessageOptions,
} from "gui-chat-protocol/vue";
import type {
  OthelloArgs,
  OthelloState,
  OthelloClickData,
} from "../src/core/types";
import { playOthello } from "../src/core/logic";

const currentPlugin = plugin as unknown as ToolPlugin;

const pluginName = computed(() => currentPlugin.toolDefinition.name);
const samplesList = computed(() => currentPlugin.samples || []);
const ViewComponent = computed(() => currentPlugin.viewComponent);
const PreviewComponent = computed(() => currentPlugin.previewComponent);

const lastMessage = ref<string>("");

const result = ref<ToolResult<never, OthelloState>>({
  toolName: pluginName.value,
  uuid: "demo-uuid",
  message: "Ready",
  title: "Othello",
});

const executeSample = async (sample: ToolSample) => {
  const args = sample.args as unknown as OthelloArgs;
  const execResult = await executeOthello({} as any, args);
  result.value = {
    ...result.value,
    ...execResult,
    uuid: `demo-${Date.now()}`,
  };
};

const handleSendMessage = (text?: string, options?: SendTextMessageOptions) => {
  lastMessage.value = text || "";
  console.log("Send message:", text, options);

  // If data is provided (from handleCellClick), process the move
  if (options?.data) {
    const clickData = options.data as OthelloClickData;
    processUserMove(clickData);
  }
};

/**
 * Process user's move and then make computer's move
 */
const processUserMove = (clickData: OthelloClickData) => {
  const { row, col, currentState } = clickData;

  // Apply user's move
  let newState = playOthello({
    action: "move",
    row,
    col,
    board: currentState.board,
    currentSide: currentState.currentSide,
    playerNames: currentState.playerNames,
  });

  // Update result with user's move
  result.value = {
    ...result.value,
    jsonData: newState,
    uuid: `demo-${Date.now()}`,
  };

  // If it's now computer's turn and game is not over, make computer move
  if (
    !newState.isTerminal &&
    newState.playerNames[newState.currentSide] === "computer"
  ) {
    // Small delay for visual feedback
    setTimeout(() => {
      makeComputerMove(newState);
    }, 500);
  }
};

/**
 * Make a simple computer move (picks random legal move)
 */
const makeComputerMove = (state: OthelloState) => {
  if (state.legalMoves.length === 0) {
    // Computer must pass
    const newState = playOthello({
      action: "pass",
      board: state.board,
      currentSide: state.currentSide,
      playerNames: state.playerNames,
    });
    result.value = {
      ...result.value,
      jsonData: newState,
      uuid: `demo-${Date.now()}`,
    };
    return;
  }

  // Pick a random legal move
  const randomIndex = Math.floor(Math.random() * state.legalMoves.length);
  const move = state.legalMoves[randomIndex];

  const newState = playOthello({
    action: "move",
    row: move.row,
    col: move.col,
    board: state.board,
    currentSide: state.currentSide,
    playerNames: state.playerNames,
  });

  result.value = {
    ...result.value,
    jsonData: newState,
    uuid: `demo-${Date.now()}`,
  };
};
</script>
