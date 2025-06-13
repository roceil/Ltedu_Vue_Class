<script lang="ts" setup>
import { ref } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

// 兩個獨立的 todos 數組
const todosWithIndexKey = ref<Todo[]>([
  { id: 1, text: '學習 Vue', completed: false },
  { id: 2, text: '寫程式', completed: false },
  { id: 3, text: '休息', completed: false },
])

const todosWithIdKey = ref<Todo[]>([
  { id: 1, text: '學習 Vue', completed: false },
  { id: 2, text: '寫程式', completed: false },
  { id: 3, text: '休息', completed: false },
])

const addTodo = () => {
  // 為兩個列表分別添加新任務
  const newIdForIndex = todosWithIndexKey.value.length > 0
    ? Math.max(...todosWithIndexKey.value.map(t => t.id)) + 1
    : 1
  const newIdForId = todosWithIdKey.value.length > 0
    ? Math.max(...todosWithIdKey.value.map(t => t.id)) + 1
    : 1

  todosWithIndexKey.value.push({
    id: newIdForIndex,
    text: `新任務 ${newIdForIndex}`,
    completed: false
  })

  todosWithIdKey.value.push({
    id: newIdForId,
    text: `新任務 ${newIdForId}`,
    completed: false
  })
}

// index key 版本的方法
const removeTodoIndex = (index: number) => {
  todosWithIndexKey.value.splice(index, 1)
}

// id key 版本的方法
const removeTodoById = (id: number) => {
  const index = todosWithIdKey.value.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todosWithIdKey.value.splice(index, 1)
  }
}

const toggleTodoById = (id: number) => {
  const todo = todosWithIdKey.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const shuffleTodos = () => {
  // 分別打亂兩個數組
  for (let i = todosWithIndexKey.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todosWithIndexKey.value[i], todosWithIndexKey.value[j]] = [todosWithIndexKey.value[j], todosWithIndexKey.value[i]]
  }

  for (let i = todosWithIdKey.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [todosWithIdKey.value[i], todosWithIdKey.value[j]] = [todosWithIdKey.value[j], todosWithIdKey.value[i]]
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
      <div class="mt-3 p-3 bg-yellow-900/30 border border-yellow-600 rounded">
        <p class="text-yellow-200 text-sm">
          <strong>💡 測試方法：</strong>先勾選第一個任務的 checkbox，然後點擊「隨機排序」按鈕，觀察兩個列表的差異！
        </p>
      </div>
    </div>

    <!-- 任務列表-index -->
    <div class="space-y-4">
      <h4 class="text-lg font-semibold text-gray-300">❌ 任務列表（使用 index 作為 key）</h4>

      <div class="space-y-2">
        <div
          v-for="(todo, index) in todosWithIndexKey"
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
              <span class="text-xs text-red-400 bg-red-900/50 px-2 py-1 rounded">
                key: {{ index }}
              </span>
              <button
                @click="removeTodoIndex(index)"
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
      <h4 class="text-lg font-semibold text-gray-300">✅ 任務列表（使用 ID 作為 key）</h4>

      <div class="space-y-2">
        <div
          v-for="(todo) in todosWithIdKey"
          :key="todo.id"
          class="p-4 bg-gray-800 border border-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-700"
          :class="{ 'opacity-60': todo.completed }"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                :checked="todo.completed"
                @change="toggleTodoById(todo.id)"
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
              <span class="text-xs text-green-400 bg-green-900/50 px-2 py-1 rounded">
                key: {{ todo.id }}
              </span>
              <button
                @click="removeTodoById(todo.id)"
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
            <li>• 狀態可能錯位（checkbox 狀態）</li>
            <li>• 不必要的 DOM 更新</li>
            <li>• 動畫效果異常</li>
            <li>• 性能問題</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>