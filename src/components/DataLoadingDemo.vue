<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
}

const users = ref<User[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const loadingSteps = ref<string[]>([])

const addStep = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  loadingSteps.value.unshift(`[${timestamp}] ${message}`) // 改為 unshift 讓新日誌在上面
  console.log(`資料載入生命週期: ${message}`)
}

// 追蹤更新階段，防止重複記錄
const hasLoggedDataUpdate = ref(false)

// 模擬 API 請求
const loadUsers = async () => {
  try {
    addStep('API 請求: 開始載入用戶資料...')

    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模擬 API 回應
    const mockUsers: User[] = [
      {
        id: 1,
        name: '張三',
        email: 'zhang.san@example.com',
        role: '前端工程師',
        avatar: '👨‍💻'
      },
      {
        id: 2,
        name: '李四',
        email: 'li.si@example.com',
        role: '後端工程師',
        avatar: '👩‍💻'
      },
      {
        id: 3,
        name: '王五',
        email: 'wang.wu@example.com',
        role: 'UI/UX 設計師',
        avatar: '🎨'
      },
      {
        id: 4,
        name: '趙六',
        email: 'zhao.liu@example.com',
        role: '產品經理',
        avatar: '📊'
      }
    ]

    // 隨機決定是否成功
    if (Math.random() > 0.8) {
      throw new Error('網路連接失敗，請稍後重試')
    }

    addStep('API 請求: 成功獲取資料，準備更新組件狀態')

    // 標記即將進行資料更新
    hasLoggedDataUpdate.value = true

    // 更新資料（這會觸發 onBeforeUpdate 和 onUpdated）
    users.value = mockUsers
    isLoading.value = false

  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知錯誤'
    addStep(`API 請求: 載入失敗 - ${error.value}`)
    isLoading.value = false
  }
}

// 重新載入資料
const reloadData = () => {
  isLoading.value = true
  error.value = null
  users.value = []
  hasLoggedDataUpdate.value = false
  // 不清空 loadingSteps，讓用戶看到完整的操作歷史
  loadUsers()
}

// 生命週期鉤子
onBeforeMount(() => {
  addStep('onBeforeMount: 組件掛載前 - DOM 尚未創建')
})

onMounted(async () => {
  addStep('onMounted: 組件掛載完成 - DOM 已準備好，開始載入資料')
  await loadUsers()
})

onBeforeUpdate(() => {
  if (hasLoggedDataUpdate.value) {
    addStep('onBeforeUpdate: 資料更新前 - 準備更新 DOM')
  }
})

onUpdated(() => {
  if (hasLoggedDataUpdate.value) {
    addStep('onUpdated: 資料更新完成 - DOM 已反映最新資料')
    hasLoggedDataUpdate.value = false // 重置標記
  }
})

// 記錄組件創建
addStep('setup: 組件創建階段 - 初始化響應式數據和方法')
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">資料載入演示</h3>

    <!-- 載入狀態顯示 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-purple-400">📡 載入狀態</h4>
        <div class="space-x-2">
          <button
            @click="reloadData"
            :disabled="isLoading"
            class="px-4 py-2 rounded transition-colors"
            :class="isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'"
          >
            {{ isLoading ? '載入中...' : '🔄 重新載入' }}
          </button>
          <button
            @click="loadingSteps = []"
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            🧹 清除日誌
          </button>
        </div>
      </div>

      <!-- 載入中狀態 -->
      <div
        v-if="isLoading"
        class="p-4 bg-blue-900 border border-blue-600 rounded-lg"
      >
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mr-3"></div>
          <span class="text-blue-300">正在載入資料...</span>
        </div>
        <div class="mt-2 w-full bg-blue-800 rounded-full h-2">
          <div
            class="bg-blue-400 h-2 rounded-full animate-pulse"
            style="width: 65%"
          ></div>
        </div>
      </div>

      <!-- 錯誤狀態 -->
      <div
        v-else-if="error"
        class="p-4 bg-red-900 border border-red-600 rounded-lg"
      >
        <div class="flex items-center mb-2">
          <span class="text-2xl mr-2">❌</span>
          <span class="text-red-300 font-semibold">載入失敗</span>
        </div>
        <p class="text-red-200 text-sm">{{ error }}</p>
      </div>

      <!-- 成功載入狀態 -->
      <div
        v-else
        class="p-4 bg-green-900 border border-green-600 rounded-lg"
      >
        <div class="flex items-center">
          <span class="text-2xl mr-2">✅</span>
          <span class="text-green-300 font-semibold">資料載入完成</span>
        </div>
        <p class="text-green-200 text-sm">成功載入 {{ users.length }} 筆用戶資料</p>
      </div>
    </div>

    <!-- 用戶列表 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-green-400 mb-4">👥 用戶列表</h4>

      <!-- 載入中的骨架屏 -->
      <div
        v-if="isLoading"
        class="space-y-3"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="p-4 bg-gray-700 rounded-lg border border-gray-600 animate-pulse"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-600 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-600 rounded w-3/4"></div>
              <div class="h-3 bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 錯誤狀態 -->
      <div
        v-else-if="error"
        class="text-center py-8"
      >
        <div class="text-4xl mb-2">😢</div>
        <p class="text-gray-400">資料載入失敗，無法顯示用戶列表</p>
      </div>

      <!-- 用戶卡片 -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div
          v-for="user in users"
          :key="user.id"
          class="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <div class="text-3xl">{{ user.avatar }}</div>
            <div class="flex-1">
              <h5 class="font-semibold text-white">{{ user.name }}</h5>
              <p class="text-sm text-gray-300">{{ user.role }}</p>
              <p class="text-xs text-gray-400">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 載入步驟日誌 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-orange-400 mb-3">📋 載入步驟日誌</h4>
      <div class="h-32 overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
        <div
          v-if="loadingSteps.length === 0"
          class="text-gray-500 text-center"
        >
          暫無載入記錄
        </div>
        <div
          v-for="(step, index) in loadingSteps"
          :key="index"
          class="mb-1 p-2 text-sm font-mono rounded border-l-4"
          :class="[
            step.includes('setup') && 'bg-purple-900 text-purple-300 border-purple-500',
            step.includes('onBeforeMount') && 'bg-blue-900 text-blue-300 border-blue-500',
            step.includes('onMounted') && 'bg-green-900 text-green-300 border-green-500',
            step.includes('onBeforeUpdate') && 'bg-yellow-900 text-yellow-300 border-yellow-500',
            step.includes('onUpdated') && 'bg-orange-900 text-orange-300 border-orange-500',
            step.includes('API 請求') && 'bg-cyan-900 text-cyan-300 border-cyan-500',
            step.includes('失敗') && 'bg-red-900 text-red-300 border-red-500',
            !step.includes('setup') && !step.includes('onBeforeMount') && !step.includes('onMounted') && !step.includes('onBeforeUpdate') && !step.includes('onUpdated') && !step.includes('API 請求') && !step.includes('失敗') && 'bg-gray-800 text-gray-300 border-gray-500'
          ]"
        >
          {{ step }}
        </div>
      </div>
    </div>

    <!-- 最佳實踐說明 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
        <h5 class="font-semibold text-blue-300 mb-2">💡 onMounted 最佳實踐</h5>
        <ul class="text-sm text-blue-200 space-y-1">
          <li>• 在組件掛載完成後執行 API 請求</li>
          <li>• 確保 DOM 已準備好接收資料</li>
          <li>• 處理載入狀態的 UI 更新</li>
          <li>• 適合一次性的初始化操作</li>
        </ul>
      </div>

      <div class="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
        <h5 class="font-semibold text-yellow-300 mb-2">⚠️ 錯誤處理技巧</h5>
        <ul class="text-sm text-yellow-200 space-y-1">
          <li>• 使用 try-catch 捕捉請求錯誤</li>
          <li>• 提供有意義的錯誤訊息</li>
          <li>• 在 finally 中更新載入狀態</li>
          <li>• 提供重試機制給用戶</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>