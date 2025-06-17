<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cleanupLogs = ref<string[]>([])
const timers = ref<{ id: number; timer: NodeJS.Timeout; name: string }[]>([])
const eventListeners = ref<{ element: string; event: string; handler: () => void }[]>([])
const activeConnections = ref<{ id: number; name: string; status: string }[]>([])

const addLog = (message: string, type: 'info' | 'warning' | 'success' | 'error' = 'info') => {
  const timestamp = new Date().toLocaleTimeString()
  cleanupLogs.value.unshift(`[${timestamp}] [${type.toUpperCase()}] ${message}`)
  console.log(`資源清理: ${message}`)
}

// 創建計時器
const createTimer = (name: string, interval: number) => {
  const id = Date.now() + Math.random()
  const timer = setInterval(() => {
    addLog(`${name} 計時器執行中...`, 'info')
  }, interval)

  timers.value.push({ id, timer, name })
  addLog(`創建 ${name} 計時器 (ID: ${id})`, 'success')
}

// 創建事件監聽器
const createEventListener = (elementId: string, eventType: string) => {
  const handler = () => {
    addLog(`${elementId} 的 ${eventType} 事件被觸發`, 'info')
  }

  const element = document.getElementById(elementId)
  if (element) {
    element.addEventListener(eventType, handler)
    eventListeners.value.push({ element: elementId, event: eventType, handler })
    addLog(`為 ${elementId} 添加 ${eventType} 事件監聽器`, 'success')
  }
}

// 模擬 WebSocket 連接
const createConnection = (name: string) => {
  const id = Date.now() + Math.random()
  activeConnections.value.push({ id, name, status: '已連接' })
  addLog(`建立 ${name} 連接 (ID: ${id})`, 'success')
}

// 清理單個計時器
const clearSingleTimer = (timerId: number) => {
  const index = timers.value.findIndex(t => t.id === timerId)

  if (index === -1) return

  const timer = timers.value[index]
  clearInterval(timer.timer)
  timers.value.splice(index, 1)
  addLog(`手動清理 ${timer.name} 計時器`, 'warning')
}

// 清理單個事件監聽器
const clearSingleListener = (elementId: string, eventType: string) => {
  const index = eventListeners.value.findIndex(
    listener => listener.element === elementId && listener.event === eventType
  )

  if (index === -1) return

  const listener = eventListeners.value[index]
  const element = document.getElementById(elementId)
  if (element) {
    element.removeEventListener(eventType, listener.handler)
  }
  eventListeners.value.splice(index, 1)
  addLog(`手動清理 ${elementId} 的 ${eventType} 事件監聽器`, 'warning')
}

// 清理單個連接
const clearSingleConnection = (connectionId: number) => {
  const index = activeConnections.value.findIndex(conn => conn.id === connectionId)

  if (index === -1) return

  const connection = activeConnections.value[index]
  activeConnections.value.splice(index, 1)
  addLog(`手動關閉 ${connection.name} 連接`, 'warning')
}

onMounted(() => {
  addLog('組件已掛載 - 開始創建各種資源', 'success')

  // 創建多個計時器
  setTimeout(() => createTimer('數據同步', 3000), 500)
  setTimeout(() => createTimer('心跳檢測', 5000), 1000)
  setTimeout(() => createTimer('狀態更新', 2000), 1500)

  // 創建事件監聽器
  setTimeout(() => {
    createEventListener('demo-button', 'click')
    createEventListener('demo-input', 'input')
  }, 2000)

  // 創建模擬連接
  setTimeout(() => {
    createConnection('WebSocket 聊天室')
    createConnection('即時通知服務')
    createConnection('數據推送服務')
  }, 2500)
})

onUnmounted(() => {
  addLog('組件即將卸載 - 開始清理所有資源', 'error')

  // 清理所有計時器
  timers.value.forEach(timer => {
    clearInterval(timer.timer)
    addLog(`清理 ${timer.name} 計時器`, 'error')
  })

  // 清理所有事件監聽器
  eventListeners.value.forEach(listener => {
    const element = document.getElementById(listener.element)
    if (element) {
      element.removeEventListener(listener.event, listener.handler)
      addLog(`清理 ${listener.element} 的 ${listener.event} 事件監聽器`, 'error')
    }
  })

  // 清理所有連接
  activeConnections.value.forEach(connection => {
    addLog(`關閉 ${connection.name} 連接`, 'error')
  })

  addLog('所有資源清理完成', 'error')
})

const clearLogs = () => {
  cleanupLogs.value = []
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">資源清理演示</h3>

    <!-- 當前資源狀態 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- 計時器 -->
      <div class="p-4 bg-blue-900 border border-blue-600 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-300 mb-3">
          ⏰ 活動計時器 ({{ timers.length }})
        </h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div
            v-if="timers.length === 0"
            class="text-blue-400 text-sm italic"
          >
            無活動計時器
          </div>
          <div
            v-for="timer in timers"
            :key="timer.id"
            class="flex items-center justify-between p-2 bg-blue-800 rounded text-sm"
          >
            <span class="text-blue-200">{{ timer.name }}</span>
            <button
              @click="clearSingleTimer(timer.id)"
              class="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              清理
            </button>
          </div>
        </div>
      </div>

      <!-- 事件監聽器 -->
      <div class="p-4 bg-green-900 border border-green-600 rounded-lg">
        <h4 class="text-lg font-semibold text-green-300 mb-3">
          👂 事件監聽器 ({{ eventListeners.length }})
        </h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div
            v-if="eventListeners.length === 0"
            class="text-green-400 text-sm italic"
          >
            無事件監聽器
          </div>
          <div
            v-for="(listener, index) in eventListeners"
            :key="index"
            class="flex items-center justify-between p-2 bg-green-800 rounded text-sm"
          >
            <span class="text-green-200">{{ listener.element }}.{{ listener.event }}</span>
            <button
              @click="clearSingleListener(listener.element, listener.event)"
              class="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              清理
            </button>
          </div>
        </div>
      </div>

      <!-- 網路連接 -->
      <div class="p-4 bg-purple-900 border border-purple-600 rounded-lg">
        <h4 class="text-lg font-semibold text-purple-300 mb-3">
          🌐 網路連接 ({{ activeConnections.length }})
        </h4>
        <div class="space-y-2 max-h-32 overflow-y-auto">
          <div
            v-if="activeConnections.length === 0"
            class="text-purple-400 text-sm italic"
          >
            無活動連接
          </div>
          <div
            v-for="connection in activeConnections"
            :key="connection.id"
            class="flex items-center justify-between p-2 bg-purple-800 rounded text-sm"
          >
            <span class="text-purple-200">{{ connection.name }}</span>
            <button
              @click="clearSingleConnection(connection.id)"
              class="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 測試元素 -->
    <div class="mb-6 p-4 bg-gray-700 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🧪 測試元素</h4>
      <div class="flex gap-4">
        <button
          id="demo-button"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          測試按鈕 (點擊事件)
        </button>
        <input
          id="demo-input"
          type="text"
          placeholder="測試輸入框 (input 事件)"
          class="px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- 清理日誌 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-lg font-semibold text-orange-400">📋 資源管理日誌</h4>
        <button
          @click="clearLogs"
          class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          清除日誌
        </button>
      </div>
      <div class="h-48 overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
        <div
          v-if="cleanupLogs.length === 0"
          class="text-gray-500 text-center"
        >
          暫無資源管理記錄
        </div>
        <div
          v-for="(log, index) in cleanupLogs"
          :key="index"
          class="mb-1 p-2 text-sm font-mono rounded border-l-4"
          :class="[
            log.includes('[INFO]') && 'bg-blue-900 text-blue-300 border-blue-500',
            log.includes('[SUCCESS]') && 'bg-green-900 text-green-300 border-green-500',
            log.includes('[WARNING]') && 'bg-yellow-900 text-yellow-300 border-yellow-500',
            log.includes('[ERROR]') && 'bg-red-900 text-red-300 border-red-500'
          ]"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 最佳實踐說明 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-red-900/30 border border-red-600 rounded-lg">
        <h5 class="font-semibold text-red-300 mb-2">🔴 必須清理的資源</h5>
        <ul class="text-sm text-red-200 space-y-1">
          <li>• <strong>計時器：</strong> setInterval, setTimeout</li>
          <li>• <strong>事件監聽器：</strong> addEventListener</li>
          <li>• <strong>WebSocket：</strong> 網路連接</li>
          <li>• <strong>API 請求：</strong> 未完成的 fetch</li>
          <li>• <strong>訂閱：</strong> 第三方庫的訂閱</li>
        </ul>
      </div>

      <div class="p-4 bg-amber-900/30 border border-amber-600 rounded-lg">
        <h5 class="font-semibold text-amber-300 mb-2">⚠️ 記憶體洩漏的後果</h5>
        <ul class="text-sm text-amber-200 space-y-1">
          <li>• <strong>計時器持續運行：</strong> 消耗 CPU 資源</li>
          <li>• <strong>事件處理器累積：</strong> 影響性能</li>
          <li>• <strong>記憶體占用增加：</strong> 應用變慢</li>
          <li>• <strong>意外的行為：</strong> 組件間干擾</li>
          <li>• <strong>應用崩潰：</strong> 嚴重情況下</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>