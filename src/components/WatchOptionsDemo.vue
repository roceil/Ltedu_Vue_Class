<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'

// 數據
const searchQuery = ref('')
const logs = ref<string[]>([])

// 控制選項
const useImmediate = ref(false)
const flushOption = ref<'pre' | 'post' | 'sync'>('pre')

// 停止監聽器的函數
let stopWatcher: (() => void) | null = null

// 創建監聽器
const createWatcher = () => {
  // 停止之前的監聽器
  if (stopWatcher) {
    stopWatcher()
  }

  const options = {
    immediate: useImmediate.value,
    flush: flushOption.value
  }

  stopWatcher = watch(searchQuery, (newValue, oldValue) => {
    const timestamp = new Date().toLocaleTimeString()
    const message = `[${timestamp}] 搜尋從 "${oldValue}" 變為 "${newValue}" (flush: ${flushOption.value}, immediate: ${useImmediate.value})`
    logs.value.unshift(message)
    console.log(message)
  }, options)

  logs.value.unshift(`監聽器已重新建立 (immediate: ${useImmediate.value}, flush: ${flushOption.value})`)
}

// 初始化監聽器
createWatcher()

// 監聽選項變化，重新創建監聽器
watch([useImmediate, flushOption], () => {
  createWatcher()
})

// DOM 更新測試
const domElement = ref<HTMLElement>()
const domContent = ref('初始內容')

// 測試 flush 選項的差異
const testFlushTiming = async () => {
  logs.value.unshift('=== 開始測試 DOM 更新時機 ===')

  // 更新內容
  domContent.value = `更新時間: ${new Date().toLocaleTimeString()}`

  // 檢查 DOM 是否已更新
  const checkDOM = () => {
    if (domElement.value) {
      const actualContent = domElement.value.textContent
      const message = `DOM 內容檢查: "${actualContent}"`
      logs.value.unshift(message)
      console.log(message)
    }
  }

  // 根據 flush 選項說明執行時機
  if (flushOption.value === 'pre') {
    logs.value.unshift('pre: 在 DOM 更新前執行監聽器')
  } else if (flushOption.value === 'post') {
    logs.value.unshift('post: 在 DOM 更新後執行監聽器')
  } else {
    logs.value.unshift('sync: 同步執行監聽器')
  }

  // 等待 DOM 更新
  await nextTick()
  checkDOM()
}

const clearLogs = () => {
  logs.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- 選項控制 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-3">Watch 選項控制</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              v-model="useImmediate"
              class="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-sm font-medium text-gray-300">immediate (立即執行)</span>
          </label>
          <p class="text-xs text-gray-500 mt-1">勾選後監聽器會在創建時立即執行一次</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">flush (執行時機)</label>
          <select
            v-model="flushOption"
            class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pre">pre - DOM 更新前</option>
            <option value="post">post - DOM 更新後</option>
            <option value="sync">sync - 同步執行</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 測試區域 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">測試區域</h4>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">搜尋查詢</label>
          <input
            v-model="searchQuery"
            class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="輸入任何內容來觸發監聽器..."
          />
        </div>

        <div class="flex space-x-2">
          <button
            @click="testFlushTiming"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            測試 DOM 更新時機
          </button>
          <button
            @click="clearLogs"
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            清除日誌
          </button>
        </div>

        <!-- DOM 測試元素 -->
        <div class="p-2 bg-gray-900 rounded border border-gray-700">
          <span class="text-sm text-gray-400">DOM 測試元素：</span>
          <span
            ref="domElement"
            class="font-mono text-gray-300"
          >{{ domContent }}</span>
        </div>
      </div>
    </div>

    <!-- 監聽日誌 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-purple-400 mb-3">監聽器日誌</h4>
      <div class="h-48 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700 text-sm font-mono">
        <div
          v-if="logs.length === 0"
          class="text-gray-500"
        >暫無日誌，請修改搜尋查詢或調整選項</div>
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="mb-1 text-gray-300"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 選項說明 -->
    <div class="space-y-4">
      <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
        <h5 class="text-blue-300 font-semibold mb-2">💡 immediate 選項</h5>
        <ul class="text-sm text-blue-200 space-y-1">
          <li>• <strong>true:</strong> 監聽器創建時立即執行一次</li>
          <li>• <strong>false:</strong> 只在數據變化時才執行</li>
          <li>• 適用於需要初始化邏輯的場景</li>
        </ul>
      </div>

      <div class="p-4 bg-green-900/30 border border-green-600 rounded-lg">
        <h5 class="text-green-300 font-semibold mb-3">⚡ Flush 選項：控制 Watch 執行時機</h5>

        <div class="mb-4">
          <h6 class="text-green-200 font-medium mb-2">什麼是 Flush？</h6>
          <p class="text-sm text-green-100 mb-3">
            Flush 控制 watch 回調函數與 Vue 的 DOM 更新週期的執行順序。Vue 採用異步更新策略，當數據變化時，不會立即更新 DOM，而是等待當前事件循環結束後批量更新。
          </p>

          <div class="p-3 bg-gray-800/50 border border-gray-500 rounded mb-3">
            <h6 class="text-gray-200 font-medium mb-3">📋 三種 flush 模式詳細說明</h6>

            <div class="space-y-4">

              <!-- pre 模式 -->
              <div class="p-3 bg-purple-900/20 border border-purple-500 rounded">
                <h6 class="text-purple-300 font-medium mb-2">🔄 pre 模式：DOM 更新前執行（預設）</h6>
                <div class="font-mono text-xs bg-gray-900 p-3 rounded mb-2">
                  <div class="text-green-300">// pre 模式執行流程</div>
                  <div class="text-white">count.value = 1 // 數據變化</div>
                  <div class="text-gray-400">// Watcher 檢測到數據變化，但還沒執行 watch 回調</div>
                  <div class="text-blue-300">console.log('其他代碼') // 同步代碼先執行</div>
                  <div class="text-gray-400">// 進入微任務隊列</div>
                  <div class="text-purple-300">→ 執行 watch 回調 // DOM 還是 0</div>
                  <div class="text-green-300">→ Vue 更新 DOM // 現在變成 1</div>
                </div>
                <p class="text-xs text-purple-200">特點：微任務隊列中執行，訪問到舊的 DOM 狀態，性能最佳</p>
              </div>

              <!-- post 模式 -->
              <div class="p-3 bg-blue-900/20 border border-blue-500 rounded">
                <h6 class="text-blue-300 font-medium mb-2">✅ post 模式：DOM 更新後執行</h6>
                <div class="font-mono text-xs bg-gray-900 p-3 rounded mb-2">
                  <div class="text-green-300">// post 模式執行流程</div>
                  <div class="text-white">count.value = 1 // 數據變化</div>
                  <div class="text-gray-400">// Watcher 檢測到數據變化，加入微任務隊列</div>
                  <div class="text-blue-300">console.log('其他代碼') // 同步代碼先執行</div>
                  <div class="text-gray-400">// 進入微任務隊列</div>
                  <div class="text-green-300">→ Vue 更新 DOM // 現在變成 1</div>
                  <div class="text-blue-300">→ 執行 watch 回調 // DOM 已經是 1</div>
                </div>
                <p class="text-xs text-blue-200">特點：微任務隊列中 DOM 更新後執行，適合需要操作 DOM 的場景</p>
              </div>

              <!-- sync 模式 -->
              <div class="p-3 bg-red-900/20 border border-red-500 rounded">
                <h6 class="text-red-300 font-medium mb-2">🔄 sync 模式：同步執行</h6>
                <div class="font-mono text-xs bg-gray-900 p-3 rounded mb-2">
                  <div class="text-green-300">// sync 模式執行流程</div>
                  <div class="text-white">count.value = 1 // 數據變化</div>
                  <div class="text-gray-400">// Watcher 立即檢測到變化</div>
                  <div class="text-red-300">→ 立即執行 watch 回調 // DOM 還是 0</div>
                  <div class="text-blue-300">console.log('其他代碼') // 被阻塞延遲執行</div>
                  <div class="text-gray-400">// DOM 更新也被延遲到最後</div>
                </div>
                <p class="text-xs text-red-200">特點：數據變化瞬間執行，會阻塞後續代碼和 DOM 更新</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div class="p-3 bg-purple-800/50 border border-purple-400 rounded">
            <h6 class="text-purple-200 font-medium mb-1">🔄 pre（預設）</h6>
            <p class="text-xs text-purple-100 mb-2">DOM 更新前執行</p>
            <ul class="text-xs text-purple-100 space-y-1">
              <li>• 性能最佳</li>
              <li>• 訪問到舊的 DOM 狀態</li>
              <li>• 適合大多數場景</li>
            </ul>
          </div>
          <div class="p-3 bg-blue-800/50 border border-blue-400 rounded">
            <h6 class="text-blue-200 font-medium mb-1">✅ post</h6>
            <p class="text-xs text-blue-100 mb-2">DOM 更新後執行</p>
            <ul class="text-xs text-blue-100 space-y-1">
              <li>• 訪問到新的 DOM 狀態</li>
              <li>• 適合需要操作 DOM</li>
              <li>• 如測量元素尺寸</li>
            </ul>
          </div>
          <div class="p-3 bg-red-800/50 border border-red-400 rounded">
            <h6 class="text-red-200 font-medium mb-1">⚠️ sync</h6>
            <p class="text-xs text-red-100 mb-2">同步執行</p>
            <ul class="text-xs text-red-100 space-y-1">
              <li>• 立即執行</li>
              <li>• 會阻塞 DOM 更新</li>
              <li>• 可能影響性能</li>
            </ul>
          </div>
        </div>

        <div class="p-3 bg-gray-800/50 border border-gray-500 rounded">
          <h6 class="text-gray-200 font-medium mb-2">📖 與 DOM 更新的關聯</h6>
          <div class="text-sm text-gray-100 space-y-1">
            <div><strong class="text-purple-300">pre：</strong> 在 Vue 更新 DOM 前執行，此時 DOM 還是舊狀態</div>
            <div><strong class="text-blue-300">post：</strong> 在 Vue 更新 DOM 後執行，此時 DOM 已是新狀態</div>
            <div><strong class="text-red-300">sync：</strong> 數據變化時立即同步執行，會延遲 DOM 更新</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用建議 -->
    <div class="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
      <h5 class="text-yellow-300 font-semibold mb-2">🎯 使用建議</h5>
      <ul class="text-sm text-yellow-200 space-y-1">
        <li>• 需要訪問 DOM 元素時使用 <code class="bg-yellow-100/20 px-1 rounded">flush: 'post'</code></li>
        <li>• 初始化數據時使用 <code class="bg-yellow-100/20 px-1 rounded">immediate: true</code></li>
        <li>• 一般情況下使用默認選項即可</li>
        <li>• 避免使用 <code class="bg-yellow-100/20 px-1 rounded">flush: 'sync'</code> 除非必要</li>
      </ul>
    </div>
  </div>
</template>