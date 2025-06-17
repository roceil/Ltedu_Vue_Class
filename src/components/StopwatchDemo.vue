<script lang="ts" setup>
import { ref } from 'vue'
import StopwatchChildDemo from './StopwatchChildDemo.vue'

const showStopwatch = ref(true)
const lifecycleLogs = ref<string[]>([])

const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  lifecycleLogs.value.unshift(`[${timestamp}] ${message}`)
  console.log(`碼表生命週期: ${message}`)
}

const toggleStopwatch = () => {
  showStopwatch.value = !showStopwatch.value
}

const clearLogs = () => {
  lifecycleLogs.value.splice(0)
  console.clear()
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">碼表計時器演示</h3>

    <!-- 控制按鈕區域 -->
    <div class="mb-6 p-4 bg-gray-700 rounded-lg">
      <h4 class="text-lg font-semibold text-blue-400 mb-3">🎮 生命週期控制</h4>
      <div class="space-y-3">
        <button
          @click="toggleStopwatch"
          class="w-full px-4 py-2 rounded transition-colors font-medium"
          :class="showStopwatch
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-green-600 text-white hover:bg-green-700'"
        >
          {{ showStopwatch ? '🛑 銷毀計時器 (觸發 onUnmounted)' : '▶️ 創建計時器 (觸發 onMounted)' }}
        </button>
        <button
          @click="clearLogs"
          class="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium"
        >
          🧹 清除日誌
        </button>
      </div>
    </div>

    <!-- 計時器組件區域 -->
    <div
      class="mb-6"
      v-if="showStopwatch"
    >
      <h4 class="text-lg font-semibold text-purple-400 mb-3">⏱️ 計時器組件</h4>
      <StopwatchChildDemo :onLog="addLog" />
    </div>
    <div
      class="mb-6"
      v-else
    >
      <div class="p-4 bg-gray-700 border border-gray-500 rounded-lg text-center">
        <h4 class="text-lg font-semibold text-gray-400 mb-2">🔄 計時器組件已銷毀</h4>
        <p class="text-sm text-gray-500">點擊「創建計時器」按鈕重新創建計時器組件</p>
      </div>
    </div>

    <!-- 生命週期日誌 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-orange-400 mb-3">📝 生命週期與操作日誌</h4>
      <div class="h-48 overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
        <div
          v-if="lifecycleLogs.length === 0"
          class="text-gray-500 text-center"
        >
          暫無操作記錄
        </div>
        <div
          v-for="(log, index) in lifecycleLogs"
          :key="index"
          class="mb-2 p-2 text-sm font-mono rounded border-l-4"
          :class="[
            log.includes('setup') && 'bg-purple-900 text-purple-300 border-purple-500',
            log.includes('onMounted') && 'bg-green-900 text-green-300 border-green-500',
            log.includes('onUnmounted') && 'bg-red-900 text-red-300 border-red-500',
            log.includes('啟動') && 'bg-blue-900 text-blue-300 border-blue-500',
            !log.includes('setup') && !log.includes('onMounted') && !log.includes('onUnmounted') && !log.includes('啟動') && 'bg-gray-800 text-gray-300 border-gray-500'
          ]"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 生命週期說明 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-green-900/30 border border-green-600 rounded-lg">
        <h5 class="font-semibold text-green-300 mb-2">🟢 onMounted 的作用</h5>
        <ul class="text-sm text-green-200 space-y-1">
          <li>• 組件掛載完成後自動啟動計時器</li>
          <li>• 確保 DOM 已準備好進行操作</li>
          <li>• 適合初始化需要 DOM 的功能</li>
          <li>• 設置定時器、事件監聽器等</li>
        </ul>
      </div>

      <div class="p-4 bg-red-900/30 border border-red-600 rounded-lg">
        <h5 class="font-semibold text-red-300 mb-2">🔴 onUnmounted 的重要性</h5>
        <ul class="text-sm text-red-200 space-y-1">
          <li>• 組件卸載時自動清理計時器</li>
          <li>• 防止記憶體洩漏</li>
          <li>• 取消未完成的計時任務</li>
          <li>• 確保資源正確釋放</li>
        </ul>
      </div>
    </div>

    <!-- 重要提示 -->
    <div class="mt-6 p-4 bg-amber-900/30 border border-amber-600 rounded-lg">
      <h5 class="font-semibold text-amber-300 mb-2">⚠️ 重要提示</h5>
      <p class="text-sm text-amber-200 leading-relaxed">
        這個演示展示了正確的生命週期管理：計時器組件在掛載時自動開始計時，在卸載時自動清理計時器。
        通過創建和銷毀組件，你可以觀察到 onMounted 和 onUnmounted 如何自動管理資源。
        這是防止記憶體洩漏的重要模式！
      </p>
    </div>

    <!-- 沒有清理的後果說明 -->
    <div class="mt-6 p-4 bg-red-900/30 border border-red-600 rounded-lg">
      <h5 class="font-semibold text-red-300 mb-3">💥 如果沒有清理會怎樣？</h5>
      <div class="space-y-4">
        <div class="p-3 bg-red-800/20 rounded border border-red-700">
          <h6 class="font-semibold text-red-200 mb-2">🔍 具體場景分析：</h6>
          <p class="text-sm text-red-100 leading-relaxed mb-2">
            假設我們的計時器組件沒有在 <code class="px-1 py-0.5 bg-gray-800 rounded text-red-300">onUnmounted</code> 中清理 <code
              class="px-1 py-0.5 bg-gray-800 rounded text-red-300"
            >setInterval</code>：
          </p>
          <ul class="text-sm text-red-100 space-y-1 ml-4">
            <li>• 當用戶點擊「銷毀計時器」時，組件從 DOM 中移除</li>
            <li>• 但是 <code class="px-1 py-0.5 bg-gray-800 rounded text-red-300">setInterval</code> 仍然在背景中運行</li>
            <li>• 計時器每秒都會嘗試更新已經不存在的 <code class="px-1 py-0.5 bg-gray-800 rounded text-red-300">seconds.value</code></li>
            <li>• 這會導致 JavaScript 引擎無法回收這些記憶體</li>
          </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-red-800/20 rounded border border-red-700">
            <h6 class="font-semibold text-red-200 mb-2">🚨 立即問題：</h6>
            <ul class="text-sm text-red-100 space-y-1">
              <li>• <strong>控制台錯誤：</strong> 嘗試更新已銷毀組件的狀態</li>
              <li>• <strong>CPU 浪費：</strong> 無用的計時器持續消耗資源</li>
              <li>• <strong>記憶體洩漏：</strong> 組件相關的記憶體無法釋放</li>
              <li>• <strong>性能下降：</strong> 積累多個未清理的計時器</li>
            </ul>
          </div>

          <div class="p-3 bg-red-800/20 rounded border border-red-700">
            <h6 class="font-semibold text-red-200 mb-2">⏰ 長期影響：</h6>
            <ul class="text-sm text-red-100 space-y-1">
              <li>• <strong>累積效應：</strong> 每次創建/銷毀都留下「殭屍」計時器</li>
              <li>• <strong>應用變慢：</strong> 背景運行大量無用任務</li>
              <li>• <strong>記憶體耗盡：</strong> 長時間使用後可能導致當機</li>
              <li>• <strong>難以調試：</strong> 問題可能在操作很久後才顯現</li>
            </ul>
          </div>
        </div>

        <div class="p-3 bg-green-800/20 rounded border border-green-700">
          <h6 class="font-semibold text-green-200 mb-2">✅ 正確的清理代碼：</h6>
          <pre class="text-xs text-green-100 bg-gray-900 p-2 rounded font-mono overflow-x-auto"><code>onUnmounted(() => {
  // 🎯 關鍵：清理計時器
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
  // 這樣可以確保：
  // 1. 停止背景任務
  // 2. 釋放記憶體引用
  // 3. 防止錯誤和洩漏
})</code></pre>
        </div>

        <div class="p-3 bg-yellow-800/20 rounded border border-yellow-700">
          <h6 class="font-semibold text-yellow-200 mb-2">🧪 測試方法：</h6>
          <p class="text-sm text-yellow-100">
            你可以打開瀏覽器的開發者工具 → Performance 頁籤，重複創建和銷毀組件多次。
            有正確清理的版本記憶體使用量會保持穩定，沒有清理的版本會看到記憶體持續上升。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>