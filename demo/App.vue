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
import type { ToolResult, ToolSample, ToolPlugin } from "gui-chat-protocol/vue";
import type { OthelloArgs, OthelloState } from "../src/core/types";

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

const handleSendMessage = (text?: string) => {
  lastMessage.value = text || "";
  console.log("Send message:", text);
};
</script>
