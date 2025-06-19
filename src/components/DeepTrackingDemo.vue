<script lang="ts" setup>
import { ref, reactive } from 'vue'

// 使用 ref 包裝複雜物件
const refUser = ref({
  name: '小明',
  profile: {
    age: 25,
    contact: {
      email: 'xiaoming@example.com',
      phone: '0912-345-678'
    }
  },
  preferences: {
    theme: 'dark',
    language: 'zh-TW'
  }
})

// 使用 reactive 創建複雜物件
const reactiveUser = reactive({
  name: '小紅',
  profile: {
    age: 23,
    contact: {
      email: 'xiaohong@example.com',
      phone: '0987-654-321'
    }
  },
  preferences: {
    theme: 'light',
    language: 'en-US'
  }
})

// 使用 ref 包裝陣列
const refTasks = ref([
  {
    id: 1,
    title: '學習 Vue.js',
    completed: false,
    priority: 'high',
    details: {
      description: '掌握響應式系統',
      estimatedHours: 10
    }
  },
  {
    id: 2,
    title: '練習 TypeScript',
    completed: true,
    priority: 'medium',
    details: {
      description: '強化型別安全',
      estimatedHours: 8
    }
  }
])

// 使用 reactive 創建陣列
const reactiveTasks = reactive([
  {
    id: 1,
    title: '建立專案',
    completed: false,
    priority: 'high',
    details: {
      description: '初始化 Vue 專案',
      estimatedHours: 2
    }
  },
  {
    id: 2,
    title: '設計 UI',
    completed: false,
    priority: 'medium',
    details: {
      description: '設計用戶界面',
      estimatedHours: 15
    }
  }
])

// 操作日誌
const changeLog = ref<string[]>([])

const addLog = (message: string) => {
  changeLog.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
  console.log(message)
}

// Ref 物件深層修改
const updateRefUserName = () => {
  const names = ['小王', '小李', '小陳', '小張']
  const currentName = refUser.value.name
  const availableNames = names.filter(name => name !== currentName)

  if (availableNames.length === 0) {
    addLog('沒有可用的名字進行更換')
    return
  }

  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]
  refUser.value.name = newName
  addLog(`修改 ref 物件頂層屬性：name = "${newName}"`)
}

const updateRefUserAge = () => {
  refUser.value.profile.age = Math.floor(Math.random() * 50) + 20
  addLog(`修改 ref 物件深層屬性：profile.age = ${refUser.value.profile.age}`)
}

const updateRefUserEmail = () => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  refUser.value.profile.contact.email = `${refUser.value.name.toLowerCase()}@${domain}`
  addLog(`修改 ref 物件更深層屬性：contact.email = "${refUser.value.profile.contact.email}"`)
}

const toggleRefUserTheme = () => {
  if (refUser.value.preferences.theme === 'dark') {
    refUser.value.preferences.theme = 'light'
    addLog('切換 ref 物件深層屬性：theme = "light"')
    return
  }

  refUser.value.preferences.theme = 'dark'
  addLog('切換 ref 物件深層屬性：theme = "dark"')
}

// Reactive 物件深層修改
const updateReactiveUserName = () => {
  const names = ['小美', '小芳', '小華', '小玲']
  const currentName = reactiveUser.name
  const availableNames = names.filter(name => name !== currentName)

  if (availableNames.length === 0) {
    addLog('沒有可用的名字進行更換')
    return
  }

  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]
  reactiveUser.name = newName
  addLog(`修改 reactive 物件頂層屬性：name = "${newName}"`)
}

const updateReactiveUserAge = () => {
  reactiveUser.profile.age = Math.floor(Math.random() * 50) + 20
  addLog(`修改 reactive 物件深層屬性：profile.age = ${reactiveUser.profile.age}`)
}

const updateReactiveUserEmail = () => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  reactiveUser.profile.contact.email = `${reactiveUser.name.toLowerCase()}@${domain}`
  addLog(`修改 reactive 物件更深層屬性：contact.email = "${reactiveUser.profile.contact.email}"`)
}

const toggleReactiveUserTheme = () => {
  if (reactiveUser.preferences.theme === 'dark') {
    reactiveUser.preferences.theme = 'light'
    addLog('切換 reactive 物件深層屬性：theme = "light"')
    return
  }

  reactiveUser.preferences.theme = 'dark'
  addLog('切換 reactive 物件深層屬性：theme = "dark"')
}

// Ref 陣列深層修改
const toggleRefTask = (taskId: number) => {
  const task = refTasks.value.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  task.completed = !task.completed
  addLog(`切換 ref 陣列項目屬性：task[${taskId}].completed = ${task.completed}`)
}

const updateRefTaskPriority = (taskId: number) => {
  const task = refTasks.value.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  const priorities = ['low', 'medium', 'high']
  const currentIndex = priorities.indexOf(task.priority)
  const nextIndex = (currentIndex + 1) % priorities.length
  task.priority = priorities[nextIndex]
  addLog(`修改 ref 陣列項目屬性：task[${taskId}].priority = "${task.priority}"`)
}

const updateRefTaskHours = (taskId: number) => {
  const task = refTasks.value.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  task.details.estimatedHours = Math.floor(Math.random() * 20) + 1
  addLog(`修改 ref 陣列項目深層屬性：task[${taskId}].details.estimatedHours = ${task.details.estimatedHours}`)
}

// Reactive 陣列深層修改
const toggleReactiveTask = (taskId: number) => {
  const task = reactiveTasks.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  task.completed = !task.completed
  addLog(`切換 reactive 陣列項目屬性：task[${taskId}].completed = ${task.completed}`)
}

const updateReactiveTaskPriority = (taskId: number) => {
  const task = reactiveTasks.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  const priorities = ['low', 'medium', 'high']
  const currentIndex = priorities.indexOf(task.priority)
  const nextIndex = (currentIndex + 1) % priorities.length
  task.priority = priorities[nextIndex]
  addLog(`修改 reactive 陣列項目屬性：task[${taskId}].priority = "${task.priority}"`)
}

const updateReactiveTaskHours = (taskId: number) => {
  const task = reactiveTasks.find(t => t.id === taskId)
  if (!task) {
    addLog(`找不到 ID 為 ${taskId} 的任務`)
    return
  }

  task.details.estimatedHours = Math.floor(Math.random() * 20) + 1
  addLog(`修改 reactive 陣列項目深層屬性：task[${taskId}].details.estimatedHours = ${task.details.estimatedHours}`)
}

const clearLog = () => {
  changeLog.value = []
  console.clear()
}
</script>

<template>
  <div class="space-y-8">
    <!-- 介紹說明 -->
    <div class="p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 class="text-2xl font-bold text-purple-800 mb-4">🔍 深層響應追蹤演示</h3>
      <p class="text-purple-700 mb-4">
        Vue 的響應式系統能夠深層追蹤物件和陣列的變化，無論嵌套多少層，都能自動偵測並更新 UI。這裡展示 <code class="bg-purple-200 px-2 py-1 rounded">ref</code> 和
        <code class="bg-purple-200 px-2 py-1 rounded">reactive</code> 如何處理複雜的深層資料結構。
      </p>
      <div class="flex justify-end">
        <button
          @click="clearLog"
          class="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          清除日誌
        </button>
      </div>
    </div>

    <!-- Ref 深層追蹤演示 -->
    <div class="space-y-6">
      <h4 class="text-xl font-bold text-gray-300">🔷 Ref 深層追蹤</h4>

      <!-- Ref 物件深層修改演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Ref 物件深層修改</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">用戶資料：</div>
            <div class="mb-4 p-3 bg-blue-50 rounded border font-mono text-sm">
              <div class="text-blue-700"><strong>姓名:</strong> {{ refUser.name }} <span class="text-gray-500">({{
                refUser.profile.age }}歲)</span></div>
              <div class="text-blue-700"><strong>信箱:</strong> {{ refUser.profile.contact.email }}</div>
              <div class="text-blue-700"><strong>電話:</strong> {{ refUser.profile.contact.phone }}</div>
              <div class="text-blue-700"><strong>設定:</strong> {{ refUser.preferences.theme }} 主題, {{
                refUser.preferences.language }}</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="updateRefUserName"
                class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                更新姓名
              </button>
              <button
                @click="updateRefUserAge"
                class="px-3 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors text-sm"
              >
                更新年齡
              </button>
              <button
                @click="updateRefUserEmail"
                class="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
              >
                更新信箱
              </button>
              <button
                @click="toggleRefUserTheme"
                class="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
              >
                切換主題
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 創建深層響應式物件</div>
            <div class="text-yellow-400">const</div> <span class="text-white">refUser</span> = <span
              class="text-cyan-400"
            >ref</span>({<br />
            &nbsp;&nbsp;<span class="text-cyan-400">name</span>: <span class="text-green-300">'小明'</span>,<br />
            &nbsp;&nbsp;<span class="text-cyan-400">profile</span>: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">age</span>: <span
              class="text-yellow-300">25</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">contact</span>: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">email</span>: <span
              class="text-green-300">'xiaoming@example.com'</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
            &nbsp;&nbsp;}<br />
            })<br />
            <br />
            <div class="text-blue-400">// 深層修改（使用 early return）</div>
            <div class="text-yellow-400">const</div> <span class="text-white">updateRefUserEmail</span> = () => {<br />
            &nbsp;&nbsp;<div class="text-purple-400">if</div> (!<span class="text-white">refUser</span>.<span
              class="text-red-400"
            >value</span>.<span class="text-cyan-400">name</span>) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div><br />
            &nbsp;&nbsp;}<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// 修改深層屬性</div>
            &nbsp;&nbsp;<span class="text-white">refUser</span>.<span class="text-red-400">value</span>.<span
              class="text-cyan-400"
            >profile</span>.<span class="text-cyan-400">contact</span>.<span class="text-cyan-400">email</span> = <span
              class="text-white"
            >newEmail</span><br />
            }
          </div>
          <div class="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded">
            <strong>重點：</strong> ref 需要 <code class="bg-blue-200 px-1 rounded">.value</code>，但深層屬性會自動追蹤
          </div>
        </div>
      </div>

      <!-- Ref 陣列深層修改演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Ref 陣列深層修改</h5>

          <div class="space-y-3">
            <div
              v-for="task in refTasks"
              :key="task.id"
              class="p-3 bg-gray-50 rounded border border-gray-200"
            >
              <div class="flex items-center justify-between mb-2">
                <span
                  :class="task.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'"
                  class="text-sm"
                >
                  {{ task.title }}
                </span>
                <span
                  :class="{
                    'text-red-600 bg-red-100': task.priority === 'high',
                    'text-yellow-600 bg-yellow-100': task.priority === 'medium',
                    'text-green-600 bg-green-100': task.priority === 'low'
                  }"
                  class="text-xs px-2 py-1 rounded"
                >
                  {{ task.priority }}
                </span>
              </div>
              <div class="text-xs text-gray-600 mb-3">
                {{ task.details.description }} ({{ task.details.estimatedHours }}小時)
              </div>
              <div class="flex gap-1">
                <button
                  @click="toggleRefTask(task.id)"
                  class="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs"
                >
                  {{ task.completed ? '未完成' : '完成' }}
                </button>
                <button
                  @click="updateRefTaskPriority(task.id)"
                  class="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-xs"
                >
                  改優先級
                </button>
                <button
                  @click="updateRefTaskHours(task.id)"
                  class="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                >
                  改時數
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 修改陣列項目深層屬性</div>
            <div class="text-yellow-400">const</div> <span class="text-white">updateRefTaskHours</span> = (<span
              class="text-white"
            >taskId</span>) => {<br />
            &nbsp;&nbsp;<div class="text-yellow-400">const</div> <span class="text-white">task</span> = <span
              class="text-white"
            >refTasks</span>.<span class="text-red-400">value</span>.<span class="text-cyan-400">find</span>(<span
              class="text-white"
            >t</span> => <span class="text-white">t</span>.<span class="text-cyan-400">id</span> === <span
              class="text-white"
            >taskId</span>)<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// early return 檢查</div>
            &nbsp;&nbsp;<div class="text-purple-400">if</div> (!<span class="text-white">task</span>) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-white">addLog</span>(<span
              class="text-green-300">'找不到任務'</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div><br />
            &nbsp;&nbsp;}<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// 修改深層屬性</div>
            &nbsp;&nbsp;<span class="text-white">task</span>.<span class="text-cyan-400">details</span>.<span
              class="text-cyan-400"
            >estimatedHours</span> = <span class="text-white">newHours</span><br />
            }
          </div>
          <div class="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded">
            <strong>重點：</strong> 陣列項目的深層屬性修改也會被自動追蹤
          </div>
        </div>
      </div>
    </div>

    <!-- Reactive 深層追蹤演示 -->
    <div class="space-y-6">
      <h4 class="text-xl font-bold text-gray-300">🔶 Reactive 深層追蹤</h4>

      <!-- Reactive 物件深層修改演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Reactive 物件深層修改</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">用戶資料：</div>
            <div class="mb-4 p-3 bg-green-50 rounded border font-mono text-sm">
              <div class="text-green-700"><strong>姓名:</strong> {{ reactiveUser.name }} <span class="text-gray-500">({{
                reactiveUser.profile.age }}歲)</span></div>
              <div class="text-green-700"><strong>信箱:</strong> {{ reactiveUser.profile.contact.email }}</div>
              <div class="text-green-700"><strong>電話:</strong> {{ reactiveUser.profile.contact.phone }}</div>
              <div class="text-green-700"><strong>設定:</strong> {{ reactiveUser.preferences.theme }} 主題, {{
                reactiveUser.preferences.language }}</div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="updateReactiveUserName"
                class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                更新姓名
              </button>
              <button
                @click="updateReactiveUserAge"
                class="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm"
              >
                更新年齡
              </button>
              <button
                @click="updateReactiveUserEmail"
                class="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-sm"
              >
                更新信箱
              </button>
              <button
                @click="toggleReactiveUserTheme"
                class="px-3 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition-colors text-sm"
              >
                切換主題
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 創建 reactive 深層物件</div>
            <div class="text-yellow-400">const</div> <span class="text-white">reactiveUser</span> = <span
              class="text-cyan-400"
            >reactive</span>({<br />
            &nbsp;&nbsp;<span class="text-cyan-400">name</span>: <span class="text-green-300">'小紅'</span>,<br />
            &nbsp;&nbsp;<span class="text-cyan-400">profile</span>: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">age</span>: <span
              class="text-yellow-300">23</span>,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">contact</span>: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-cyan-400">email</span>: <span
              class="text-green-300">'xiaohong@example.com'</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
            &nbsp;&nbsp;}<br />
            })<br />
            <br />
            <div class="text-blue-400">// 直接修改深層屬性</div>
            <div class="text-yellow-400">const</div> <span class="text-white">updateReactiveUserEmail</span> = () =>
            {<br />
            &nbsp;&nbsp;<div class="text-blue-400">// 不需要 .value</div>
            &nbsp;&nbsp;<span class="text-white">reactiveUser</span>.<span class="text-cyan-400">profile</span>.<span
              class="text-cyan-400"
            >contact</span>.<span class="text-cyan-400">email</span> = <span class="text-white">newEmail</span><br />
            }
          </div>
          <div class="mt-3 text-sm text-green-600 bg-green-50 p-3 rounded">
            <strong>重點：</strong> reactive 不需要 <code class="bg-green-200 px-1 rounded">.value</code>，直接修改屬性即可
          </div>
        </div>
      </div>

      <!-- Reactive 陣列深層修改演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Reactive 陣列深層修改</h5>

          <div class="space-y-3">
            <div
              v-for="task in reactiveTasks"
              :key="task.id"
              class="p-3 bg-gray-50 rounded border border-gray-200"
            >
              <div class="flex items-center justify-between mb-2">
                <span
                  :class="task.completed ? 'line-through text-gray-500' : 'text-gray-800 font-medium'"
                  class="text-sm"
                >
                  {{ task.title }}
                </span>
                <span
                  :class="{
                    'text-red-600 bg-red-100': task.priority === 'high',
                    'text-yellow-600 bg-yellow-100': task.priority === 'medium',
                    'text-green-600 bg-green-100': task.priority === 'low'
                  }"
                  class="text-xs px-2 py-1 rounded"
                >
                  {{ task.priority }}
                </span>
              </div>
              <div class="text-xs text-gray-600 mb-3">
                {{ task.details.description }} ({{ task.details.estimatedHours }}小時)
              </div>
              <div class="flex gap-1">
                <button
                  @click="toggleReactiveTask(task.id)"
                  class="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs"
                >
                  {{ task.completed ? '未完成' : '完成' }}
                </button>
                <button
                  @click="updateReactiveTaskPriority(task.id)"
                  class="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-xs"
                >
                  改優先級
                </button>
                <button
                  @click="updateReactiveTaskHours(task.id)"
                  class="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                >
                  改時數
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 修改 reactive 陣列深層屬性</div>
            <div class="text-yellow-400">const</div> <span class="text-white">toggleReactiveTask</span> = (<span
              class="text-white"
            >taskId</span>) => {<br />
            &nbsp;&nbsp;<div class="text-yellow-400">const</div> <span class="text-white">task</span> = <span
              class="text-white"
            >reactiveTasks</span>.<span class="text-cyan-400">find</span>(<span class="text-white">t</span> => <span
              class="text-white"
            >t</span>.<span class="text-cyan-400">id</span> === <span class="text-white">taskId</span>)<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// early return 檢查</div>
            &nbsp;&nbsp;<div class="text-purple-400">if</div> (!<span class="text-white">task</span>) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-white">addLog</span>(<span
              class="text-green-300">'找不到任務'</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div><br />
            &nbsp;&nbsp;}<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// 直接修改屬性</div>
            &nbsp;&nbsp;<span class="text-white">task</span>.<span class="text-cyan-400">completed</span> = !<span
              class="text-white"
            >task</span>.<span class="text-cyan-400">completed</span><br />
            }
          </div>
          <div class="mt-3 text-sm text-green-600 bg-green-50 p-3 rounded">
            <strong>重點：</strong> reactive 陣列修改更直觀，無需額外的 <code class="bg-green-200 px-1 rounded">.value</code>
          </div>
        </div>
      </div>
    </div>

    <!-- 變更日誌 -->
    <div class="p-6 bg-white border border-gray-200 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">📋 變更追蹤日誌</h4>
      <div class="h-32 overflow-y-auto bg-gray-50 p-4 rounded border border-gray-200">
        <div
          v-if="changeLog.length === 0"
          class="text-gray-500 text-sm text-center"
        >
          暫無變更記錄，嘗試修改上面的數據！
        </div>
        <div
          v-for="(log, index) in changeLog"
          :key="index"
          class="text-sm font-mono text-gray-700 mb-1 p-2 bg-white rounded border border-gray-100"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- Ref vs Reactive 對比 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-800 mb-4">🔷 Ref 深層追蹤特點</h4>
        <ul class="text-sm text-blue-700 space-y-2">
          <li>• <strong>需要 .value：</strong> 在 script 中存取頂層物件需要 <code class="bg-blue-200 px-2 py-1 rounded">.value</code>
          </li>
          <li>• <strong>深層自動：</strong> 深層屬性會自動成為響應式，無需額外操作</li>
          <li>• <strong>包裝物件：</strong> 適合包裝單一值或完整的資料結構</li>
          <li>• <strong>型別安全：</strong> TypeScript 中有更好的型別推斷</li>
          <li>• <strong>解包機制：</strong> Template 中自動解包，使用更簡潔</li>
        </ul>
        <div class="mt-4 p-3 bg-blue-100 rounded">
          <code class="text-sm text-blue-800">refUser.value.profile.age = 30</code>
        </div>
      </div>

      <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
        <h4 class="text-lg font-semibold text-green-800 mb-4">🔶 Reactive 深層追蹤特點</h4>
        <ul class="text-sm text-green-700 space-y-2">
          <li>• <strong>直接存取：</strong> 不需要 <code class="bg-green-200 px-2 py-1 rounded">.value</code>，直接操作物件</li>
          <li>• <strong>自然語法：</strong> 更接近原生 JavaScript 物件操作</li>
          <li>• <strong>深層響應：</strong> 所有嵌套屬性都自動成為響應式</li>
          <li>• <strong>物件專用：</strong> 只能用於物件和陣列，不能包裝基本型別</li>
          <li>• <strong>解構限制：</strong> 解構賦值會失去響應性，需要使用 <code class="bg-green-200 px-1 rounded">toRefs</code></li>
        </ul>
        <div class="mt-4 p-3 bg-green-100 rounded">
          <code class="text-sm text-green-800">reactiveUser.profile.age = 30</code>
        </div>
      </div>
    </div>

    <!-- 學習重點和最佳實踐 -->
    <div class="p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h4 class="text-lg font-semibold text-indigo-800 mb-4">💡 深層追蹤學習重點</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h5 class="font-semibold text-indigo-700 mb-2">✨ 自動深層追蹤</h5>
          <ul class="text-sm text-indigo-600 space-y-1">
            <li>• 無論嵌套多少層都會追蹤</li>
            <li>• 陣列項目的屬性變化也會偵測</li>
            <li>• 不需要手動通知，UI 自動更新</li>
            <li>• 新增或刪除屬性也會被追蹤</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h5 class="font-semibold text-indigo-700 mb-2">⚠️ 性能考量</h5>
          <ul class="text-sm text-indigo-600 space-y-1">
            <li>• 深層追蹤對大型物件有開銷</li>
            <li>• 可使用 <code class="bg-indigo-200 px-1 rounded">shallowRef</code> 限制深度</li>
            <li>• 可使用 <code class="bg-indigo-200 px-1 rounded">shallowReactive</code> 只追蹤頂層</li>
            <li>• 根據實際需求選擇追蹤策略</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h5 class="font-semibold text-indigo-700 mb-2">🎯 選擇建議</h5>
          <ul class="text-sm text-indigo-600 space-y-1">
            <li>• <strong>ref：</strong> 包裝基本型別或完整物件</li>
            <li>• <strong>reactive：</strong> 直接操作物件結構</li>
            <li>• 保持一致的選擇在同一組件中</li>
            <li>• 複雜狀態可考慮狀態管理工具</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>