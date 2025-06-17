<script lang="ts" setup>
import { ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const message = ref('Hello Vue3!')
const count = ref(0)
const users = ref<{ id: number; name: string }[]>([])
const statusLogs = ref<string[]>([])

// 適合在 setup 階段做的事情
const doubleCount = computed(() => count.value * 2)

const addStatusLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  statusLogs.value.unshift(`[${timestamp}] ${message}`)
  console.log(`生命週期: ${message}`)
}

// 模擬載入數據的函數
const loadData = async () => {
  addStatusLog('開始載入用戶數據...')

  // 模擬 API 呼叫延遲
  await new Promise(resolve => setTimeout(resolve, 1000))

  users.value = [
    { id: 1, name: '張三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ]

  addStatusLog('用戶數據載入完成')
}

// setup 階段（組件創建）
addStatusLog('組件已創建 - 初始化響應式數據和計算屬性')

onBeforeMount(() => {
  addStatusLog('準備掛載 - DOM 尚未創建，進行最後的準備工作')
})

onMounted(() => {
  addStatusLog('組件已掛載 - DOM 可用，開始載入數據')
  loadData()
})

onBeforeUpdate(() => {
  addStatusLog('準備更新 - 響應式數據變化，DOM 即將更新')
})

onUpdated(() => {
  addStatusLog('更新完成 - DOM 已反映最新的數據變化')
})

onBeforeUnmount(() => {
  addStatusLog('準備卸載 - 即將清理組件資源')
})

onUnmounted(() => {
  addStatusLog('組件已卸載 - 清理工作完成')
})

const incrementCount = () => {
  count.value++
}

const updateMessage = () => {
  message.value = `更新於 ${new Date().toLocaleTimeString()}`
}

const clearLogs = () => {
  statusLogs.value = []
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">基本生命週期應用演示</h3>

    <!-- 數據展示區域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- setup 階段的數據 -->
      <div class="p-4 bg-purple-900 border border-purple-600 rounded-lg">
        <h4 class="text-lg font-semibold text-purple-300 mb-3">
          🎯 setup 階段數據
        </h4>
        <div class="space-y-2 text-sm">
          <div class="p-2 bg-purple-800 rounded">
            <span class="text-purple-200">訊息：</span>
            <span class="text-white">{{ message }}</span>
          </div>
          <div class="p-2 bg-purple-800 rounded">
            <span class="text-purple-200">計數：</span>
            <span class="text-white">{{ count }}</span>
          </div>
          <div class="p-2 bg-purple-800 rounded">
            <span class="text-purple-200">雙倍計數：</span>
            <span class="text-white">{{ doubleCount }}</span>
          </div>
        </div>
      </div>

      <!-- onMounted 階段載入的數據 -->
      <div class="p-4 bg-green-900 border border-green-600 rounded-lg">
        <h4 class="text-lg font-semibold text-green-300 mb-3">
          🚀 onMounted 載入的數據
        </h4>
        <div class="text-sm">
          <div class="text-green-200 mb-2">用戶列表：</div>
          <div
            v-if="users.length === 0"
            class="text-green-400 italic"
          >
            載入中...
          </div>
          <div
            v-else
            class="space-y-1"
          >
            <div
              v-for="user in users"
              :key="user.id"
              class="p-2 bg-green-800 rounded"
            >
              {{ user.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="p-4 bg-blue-900 border border-blue-600 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-300 mb-3">
          ⚡ 觸發更新操作
        </h4>
        <div class="space-y-2">
          <button
            @click="incrementCount"
            class="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            增加計數
          </button>
          <button
            @click="updateMessage"
            class="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
          >
            更新訊息
          </button>
          <button
            @click="clearLogs"
            class="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            清除日誌
          </button>
        </div>
      </div>
    </div>

    <!-- 狀態日誌 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-orange-400 mb-3">生命週期狀態日誌</h4>
      <div class="h-48 overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
        <div
          v-if="statusLogs.length === 0"
          class="text-gray-500 text-center"
        >
          暫無狀態記錄
        </div>
        <div
          v-for="(log, index) in statusLogs"
          :key="index"
          class="mb-1 p-2 text-sm font-mono text-gray-300 border-l-2 border-orange-500 bg-orange-900/20"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 生命週期說明 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-gray-700 rounded-lg">
        <h5 class="font-semibold text-gray-300 mb-2">🔧 各階段適合的操作</h5>
        <ul class="text-xs text-gray-400 space-y-1">
          <li><strong>setup：</strong> 初始化數據、設置計算屬性</li>
          <li><strong>onBeforeMount：</strong> 最後的準備工作</li>
          <li><strong>onMounted：</strong> DOM 操作、載入數據</li>
          <li><strong>onBeforeUpdate：</strong> 更新前的處理</li>
          <li><strong>onUpdated：</strong> 更新後的處理</li>
        </ul>
      </div>

      <div class="p-4 bg-gray-700 rounded-lg">
        <h5 class="font-semibold text-gray-300 mb-2">💡 實際應用場景</h5>
        <ul class="text-xs text-gray-400 space-y-1">
          <li><strong>數據初始化：</strong> 在 setup 中準備基本數據</li>
          <li><strong>API 請求：</strong> 在 onMounted 中載入遠端數據</li>
          <li><strong>DOM 操作：</strong> 在 onMounted 中操作真實 DOM</li>
          <li><strong>狀態追蹤：</strong> 在更新鉤子中記錄變化</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>