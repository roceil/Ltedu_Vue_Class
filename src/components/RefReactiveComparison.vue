<script lang="ts" setup>
import { ref, reactive } from 'vue'

// Ref 實現的用戶資料
const refUserData = ref({
  name: '張三',
  age: 28,
  email: 'zhangsan@example.com',
  hobbies: ['閱讀', '游泳', '程式設計'],
  settings: {
    theme: 'dark',
    notifications: true,
    language: 'zh-TW'
  }
})

// Reactive 實現的用戶資料
const reactiveUserData = reactive({
  name: '李四',
  age: 26,
  email: 'lisi@example.com',
  hobbies: ['攝影', '旅遊', '烹飪'],
  settings: {
    theme: 'light',
    notifications: false,
    language: 'en-US'
  }
})

// 操作記錄
const comparisonLog = ref<string[]>([])

const addLog = (message: string) => {
  comparisonLog.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
}

// Ref 操作函數
const updateRefName = () => {
  const names = ['王五', '趙六', '錢七', '孫八']
  const currentName = refUserData.value.name
  const availableNames = names.filter(name => name !== currentName)
  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]

  refUserData.value.name = newName  // ✅ 需要 .value
  addLog(`Ref: 更新姓名為 "${newName}" (使用 refUserData.value.name)`)
}

const updateRefAge = () => {
  refUserData.value.age = Math.floor(Math.random() * 40) + 20  // ✅ 需要 .value
  addLog(`Ref: 更新年齡為 ${refUserData.value.age} (使用 refUserData.value.age)`)
}

const addRefHobby = () => {
  const hobbies = ['繪畫', '音樂', '舞蹈', '運動', '寫作']
  const newHobby = hobbies[Math.floor(Math.random() * hobbies.length)]

  if (refUserData.value.hobbies.includes(newHobby)) return

  refUserData.value.hobbies.push(newHobby)  // ✅ 需要 .value
  addLog(`Ref: 新增興趣 "${newHobby}" (使用 refUserData.value.hobbies.push())`)
}

const toggleRefTheme = () => {
  refUserData.value.settings.theme = refUserData.value.settings.theme === 'dark' ? 'light' : 'dark'  // ✅ 需要 .value
  addLog(`Ref: 切換主題為 "${refUserData.value.settings.theme}" (使用 refUserData.value.settings.theme)`)
}

const replaceRefUser = () => {
  // ✅ Ref 可以直接替換整個物件而不失去響應性
  refUserData.value = {
    name: '新用戶',
    age: 25,
    email: 'newuser@example.com',
    hobbies: ['新興趣'],
    settings: {
      theme: 'dark',
      notifications: true,
      language: 'zh-TW'
    }
  }
  addLog('Ref: 替換整個物件 (使用 refUserData.value = newObj) ✅ 保持響應性')
}

// Reactive 操作函數
const updateReactiveName = () => {
  const names = ['周九', '吳十', '鄭十一', '王十二']
  const currentName = reactiveUserData.name
  const availableNames = names.filter(name => name !== currentName)
  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]

  reactiveUserData.name = newName  // ✅ 不需要 .value
  addLog(`Reactive: 更新姓名為 "${newName}" (使用 reactiveUserData.name)`)
}

const updateReactiveAge = () => {
  reactiveUserData.age = Math.floor(Math.random() * 40) + 20  // ✅ 不需要 .value
  addLog(`Reactive: 更新年齡為 ${reactiveUserData.age} (使用 reactiveUserData.age)`)
}

const addReactiveHobby = () => {
  const hobbies = ['登山', '釣魚', '園藝', '電影', '購物']
  const newHobby = hobbies[Math.floor(Math.random() * hobbies.length)]

  if (reactiveUserData.hobbies.includes(newHobby)) return

  reactiveUserData.hobbies.push(newHobby)  // ✅ 不需要 .value
  addLog(`Reactive: 新增興趣 "${newHobby}" (使用 reactiveUserData.hobbies.push())`)
}

const toggleReactiveTheme = () => {
  reactiveUserData.settings.theme = reactiveUserData.settings.theme === 'dark' ? 'light' : 'dark'  // ✅ 不需要 .value
  addLog(`Reactive: 切換主題為 "${reactiveUserData.settings.theme}" (使用 reactiveUserData.settings.theme)`)
}

const replaceReactiveUser = () => {
  // ❌ 這會導致失去響應性！
  try {
    // 這種做法是錯誤的，會失去響應性
    // reactiveUserData = { ... }  // 這樣做會出錯

    // 正確的做法是逐個更新屬性
    reactiveUserData.name = '新用戶'
    reactiveUserData.age = 25
    reactiveUserData.email = 'newuser@example.com'
    reactiveUserData.hobbies = ['新興趣']
    reactiveUserData.settings = {
      theme: 'light',
      notifications: false,
      language: 'en-US'
    }
    addLog('Reactive: 更新所有屬性 (不能直接替換物件，需逐個更新) ⚠️ 有限制')
  } catch (error) {
    addLog('Reactive: 替換整個物件失敗 ❌ 不支援直接替換')
  }
}

// 解構測試
const testRefDestructuring = () => {
  // ⚠️ 從 ref 中解構原始值會失去響應性
  let { name, age } = refUserData.value

  // 修改解構出來的變數不會影響原始響應式狀態
  name = '解構測試'
  age = 999

  addLog(`Ref: 解構原始值測試 - 原始姓名: ${refUserData.value.name}, 解構變數: ${name} ⚠️ 失去響應性`)
}

const testReactiveDestructuring = () => {
  // ❌ 從 reactive 中解構原始值會失去響應性
  let { name, age } = reactiveUserData

  // 修改解構出來的變數不會影響原始響應式狀態
  name = '解構測試'
  age = 999

  addLog(`Reactive: 解構原始值測試 - 原始姓名: ${reactiveUserData.name}, 解構變數: ${name} ❌ 失去響應性`)
}

const clearLog = () => {
  comparisonLog.value = []
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-white">Ref vs Reactive 實戰比較</h3>
      <button
        @click="clearLog"
        class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        清除日誌
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- 左側：Ref 演示 -->
      <div class="space-y-4">
        <div class="p-4 bg-blue-900 border border-blue-500 rounded-lg">
          <h4 class="text-lg font-semibold text-blue-300 mb-4">🔷 Ref 實現</h4>

          <!-- 用戶資料顯示 -->
          <div class="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-blue-200 mb-2">用戶資料</h5>
            <div class="text-sm text-white space-y-1 font-mono">
              <div>姓名: {{ refUserData.name }}</div>
              <div>年齡: {{ refUserData.age }}</div>
              <div>信箱: {{ refUserData.email }}</div>
              <div>興趣: {{ refUserData.hobbies.join(', ') }}</div>
              <div>主題: {{ refUserData.settings.theme }}</div>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="space-y-2">
            <button
              @click="updateRefName"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              更新姓名 (refData.value.name)
            </button>

            <button
              @click="updateRefAge"
              class="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors text-sm"
            >
              更新年齡 (refData.value.age)
            </button>

            <button
              @click="addRefHobby"
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
            >
              新增興趣 (refData.value.hobbies.push)
            </button>

            <button
              @click="toggleRefTheme"
              class="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
            >
              切換主題 (refData.value.settings.theme)
            </button>

            <button
              @click="replaceRefUser"
              class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              ✅ 替換整個物件 (refData.value = newObj)
            </button>

            <button
              @click="testRefDestructuring"
              class="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
            >
              ⚠️ 測試解構 (let {name} = refData.value)
            </button>
          </div>
        </div>

        <!-- Ref 特性說明 -->
        <div class="p-3 bg-blue-800 border border-blue-400 rounded">
          <h5 class="font-semibold text-blue-200 mb-2">Ref 特性</h5>
          <ul class="text-xs text-blue-100 space-y-1">
            <li>✅ 支援任何型別的值</li>
            <li>⚠️ 在 script 中需要使用 .value</li>
            <li>✅ 可以直接替換整個物件</li>
            <li>⚠️ 解構原始值會失去響應性</li>
            <li>✅ Template 中自動解包</li>
          </ul>
        </div>
      </div>

      <!-- 右側：Reactive 演示 -->
      <div class="space-y-4">
        <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
          <h4 class="text-lg font-semibold text-green-300 mb-4">🔶 Reactive 實現</h4>

          <!-- 用戶資料顯示 -->
          <div class="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-green-200 mb-2">用戶資料</h5>
            <div class="text-sm text-white space-y-1 font-mono">
              <div>姓名: {{ reactiveUserData.name }}</div>
              <div>年齡: {{ reactiveUserData.age }}</div>
              <div>信箱: {{ reactiveUserData.email }}</div>
              <div>興趣: {{ reactiveUserData.hobbies.join(', ') }}</div>
              <div>主題: {{ reactiveUserData.settings.theme }}</div>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="space-y-2">
            <button
              @click="updateReactiveName"
              class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              更新姓名 (reactiveData.name)
            </button>

            <button
              @click="updateReactiveAge"
              class="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm"
            >
              更新年齡 (reactiveData.age)
            </button>

            <button
              @click="addReactiveHobby"
              class="w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-sm"
            >
              新增興趣 (reactiveData.hobbies.push)
            </button>

            <button
              @click="toggleReactiveTheme"
              class="w-full px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition-colors text-sm"
            >
              切換主題 (reactiveData.settings.theme)
            </button>

            <button
              @click="replaceReactiveUser"
              class="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-sm"
            >
              ❌ 替換整個物件 (不支援)
            </button>

            <button
              @click="testReactiveDestructuring"
              class="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              ❌ 測試解構 (let {name} = reactiveData)
            </button>
          </div>
        </div>

        <!-- Reactive 特性說明 -->
        <div class="p-3 bg-green-800 border border-green-400 rounded">
          <h5 class="font-semibold text-green-200 mb-2">Reactive 特性</h5>
          <ul class="text-xs text-green-100 space-y-1">
            <li>⭕ 僅支援物件和陣列</li>
            <li>✅ 不需要使用 .value</li>
            <li>❌ 不能直接替換整個物件</li>
            <li>❌ 解構原始值會失去響應性</li>
            <li>✅ 直接存取屬性</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 操作日誌 -->
    <div class="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">📋 操作比較日誌</h4>
      <div class="h-32 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700">
        <div
          v-if="comparisonLog.length === 0"
          class="text-gray-500 text-sm"
        >
          暫無操作記錄，試試上面的按鈕看看兩者的差異！
        </div>
        <div
          v-for="(log, index) in comparisonLog"
          :key="index"
          class="text-sm font-mono mb-1"
          :class="{
            'text-blue-300': log.includes('Ref:'),
            'text-green-300': log.includes('Reactive:')
          }"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 總結比較 -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-blue-900 border border-blue-500 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-300 mb-2">🔷 Ref 的優勢</h4>
        <ul class="text-sm text-blue-100 space-y-1">
          <li>✅ <strong>通用性：</strong> 支援任何型別</li>
          <li>✅ <strong>靈活性：</strong> 可以替換整個值</li>
          <li>✅ <strong>一致性：</strong> 使用方式統一</li>
          <li>✅ <strong>明確性：</strong> .value 明確表示響應式狀態</li>
          <li>✅ <strong>官方推薦：</strong> Vue 3 推薦的方式</li>
        </ul>
      </div>

      <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
        <h4 class="text-lg font-semibold text-green-300 mb-2">🔶 Reactive 的特點</h4>
        <ul class="text-sm text-green-100 space-y-1">
          <li>⭕ <strong>限制性：</strong> 僅支援物件/陣列</li>
          <li>✅ <strong>簡潔性：</strong> 不需要 .value</li>
          <li>❌ <strong>替換限制：</strong> 不能直接替換物件</li>
          <li>❌ <strong>解構限制：</strong> 解構會失去響應性</li>
          <li>⚠️ <strong>學習成本：</strong> 需要記住各種限制</li>
        </ul>
      </div>
    </div>

    <!-- 使用建議 -->
    <div class="mt-6 p-4 bg-purple-900 border border-purple-500 rounded-lg">
      <h4 class="text-lg font-semibold text-purple-300 mb-2">💡 使用建議</h4>
      <div class="text-sm text-purple-100">
        <p class="mb-2">
          <strong>推薦一律使用 Ref：</strong> 除非你有特殊理由需要 reactive 的特性，否則建議統一使用 ref。
        </p>
        <p>
          Ref 提供了更一致的 API，避免了 reactive 的各種限制陷阱，並且是 Vue 3 官方推薦的方式。
        </p>
      </div>
    </div>
  </div>
</template>