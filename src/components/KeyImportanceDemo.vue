<script lang="ts" setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: '學習 Vue' },
  { id: 2, text: '寫程式' },
  { id: 3, text: '休息' },
])

const addTodo = () => {
  // 處理空數組的情況
  const newId = todos.value.length > 0
    ? Math.max(...todos.value.map(t => t.id)) + 1
    : 1
  todos.value.push({
    id: newId,
    text: `新任務 ${newId}`,
  })
}

const removeTodo = (index: number) => {
  todos.value.splice(index, 1)
}

const shuffleTodos = () => {
  for (let i = todos.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todos.value[i], todos.value[j]] = [todos.value[j], todos.value[i]]
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 控制按鈕 -->
    <div class="flex flex-wrap gap-3">
      <button
        @click="addTodo"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        新增任務
      </button>
      <button
        @click="shuffleTodos"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        隨機排序
      </button>
    </div>

    <!-- 說明 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-2">🔑 Key 屬性的作用</h4>
      <p class="text-sm text-blue-200 mb-2">
        Key 屬性幫助 Vue 識別每個列表項的身份，當數據變化時能夠：
      </p>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• 正確地重用和重新排序現有元素</li>
        <li>• 避免不必要的 DOM 操作</li>
        <li>• 保持組件狀態的正確性</li>
        <li>• 提供更好的動畫效果</li>
      </ul>
    </div>

    <!-- 任務列表-index -->
    <div class="space-y-4">
      <h4 class="text-lg font-semibold text-gray-300">任務列表（使用 index 作為 key）</h4>

      <div class="space-y-2">
        <div
          v-for="(todo, index) in todos"
          :key="index"
          class="p-4 bg-gray-800 border border-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700"
          :class="{ 'opacity-60': todo.completed }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                :checked="todo.completed"
                class="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
              />
              <span
                class="text-white"
                :class="{ 'line-through': todo.completed }"
              >
                {{ todo.text }}
              </span>
              <span class="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                ID: {{ todo.id }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">
                key: {{ index }}
              </span>
              <button
                @click="removeTodo(index)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 任務列表-id -->
    <div class="space-y-4">
      <h4 class="text-lg font-semibold text-gray-300">任務列表（使用 index 作為 key）</h4>

      <div class="space-y-2">
        <div
          v-for="(todo) in todos"
          :key="todo.id"
          class="p-4 bg-gray-800 border border-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700"
          :class="{ 'opacity-60': todo.completed }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                :checked="todo.completed"
                class="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
              />
              <span
                class="text-white"
                :class="{ 'line-through': todo.completed }"
              >
                {{ todo.text }}
              </span>
              <span class="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                ID: {{ todo.id }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">
                key: {{ todo.id }}
              </span>
              <button
                @click="removeTodo(index)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key 追蹤說明 -->
    <div class="p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-3">🎯 Key 追蹤機制</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-3 bg-green-900/30 border border-green-600 rounded">
          <h5 class="text-green-400 font-medium mb-2">✅ 使用唯一 ID 作為 key</h5>
          <ul class="text-sm text-green-200 space-y-1">
            <li>• Vue 能正確識別每個任務</li>
            <li>• 排序時保持狀態正確</li>
            <li>• 刪除時只移除對應元素</li>
            <li>• 動畫效果流暢自然</li>
          </ul>
        </div>

        <div class="p-3 bg-red-900/30 border border-red-600 rounded">
          <h5 class="text-red-400 font-medium mb-2">❌ 使用 index 作為 key</h5>
          <ul class="text-sm text-red-200 space-y-1">
            <li>• 狀態可能錯位</li>
            <li>• 不必要的 DOM 更新</li>
            <li>• 動畫效果異常</li>
            <li>• 性能問題</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>