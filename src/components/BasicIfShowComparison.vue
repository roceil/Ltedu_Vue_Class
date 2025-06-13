<script lang="ts" setup>
import { ref } from 'vue'

const showWithIf = ref(false)
const showWithShow = ref(false)
const message = ref('Hello Vue!')
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">V-if 與 V-show 基本差異</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- V-if 測試 -->
      <div class="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
        <h3 class="text-lg font-semibold mb-4 text-blue-400">V-if 測試</h3>
        <button
          @click="showWithIf = !showWithIf"
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          切換 v-if (當前: {{ showWithIf ? '顯示' : '隱藏' }})
        </button>

        <!-- v-if: 條件為 false 時，DOM 元素完全不存在 -->
        <div
          v-if="showWithIf"
          class="p-4 border border-gray-500 rounded-lg bg-gray-700"
        >
          <p class="mb-2 text-gray-200">{{ message }}</p>
          <input
            v-model="message"
            placeholder="輸入內容"
            class="w-full px-3 py-2 border border-gray-500 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- V-show 測試 -->
      <div class="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
        <h3 class="text-lg font-semibold mb-4 text-green-400">V-show 測試</h3>
        <button
          @click="showWithShow = !showWithShow"
          class="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          切換 v-show (當前: {{ showWithShow ? '顯示' : '隱藏' }})
        </button>

        <!-- v-show: 條件為 false 時，DOM 元素存在但被隱藏 -->
        <div
          v-show="showWithShow"
          class="p-4 border border-gray-500 rounded-lg bg-gray-700"
        >
          <p class="mb-2 text-gray-200">{{ message }}</p>
          <input
            v-model="message"
            placeholder="輸入內容"
            class="w-full px-3 py-2 border border-gray-500 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-yellow-900 border-l-4 border-yellow-500 rounded">
      <h4 class="font-bold text-yellow-300 mb-2">檢查方式：</h4>
      <ol class="text-sm text-yellow-200 space-y-1">
        <li>1. 打開瀏覽器開發者工具</li>
        <li>2. 切換 v-if 和 v-show 的狀態</li>
        <li>3. 觀察 DOM 結構的變化：</li>
        <li class="ml-4">• <strong>v-if="false"</strong>：DOM 中完全沒有該元素</li>
        <li class="ml-4">• <strong>v-show="false"</strong>：DOM 中有該元素，但設置了 style="display: none;"</li>
      </ol>
    </div>
  </div>
</template>