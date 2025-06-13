<script lang="ts" setup>
import { ref, computed } from 'vue'

const largeList = ref(
  Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `項目 ${i + 1}`,
    value: Math.random() * 100,
    isActive: Math.random() > 0.5,
    category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    description: `這是第 ${i + 1} 個項目的詳細描述，包含一些複雜的文字內容`,
    priority: Math.floor(Math.random() * 5) + 1,
    lastUpdated: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  })),
)

const activeFilter = ref(false)
const categoryFilter = ref('all')
const useVMemo = ref(true)
const globalCounter = ref(0)
const renderCount = ref(0)
const lastRenderTime = ref(0)

// 添加一個全局計數器來觸發更多重新渲染
setInterval(() => {
  globalCounter.value++
}, 100) // 每100ms增加一次

const filteredList = computed(() => {
  let result = largeList.value

  if (activeFilter.value) {
    result = result.filter(item => item.isActive)
  }

  if (categoryFilter.value !== 'all') {
    result = result.filter(item => item.category === categoryFilter.value)
  }

  return result
})

const toggleFilter = () => {
  activeFilter.value = !activeFilter.value
}

const updateRandomItems = () => {
  const startTime = performance.now()
  // 隨機更新更多項目的值來創造更明顯的性能差異
  for (let i = 0; i < 200; i++) {
    const randomIndex = Math.floor(Math.random() * largeList.value.length)
    largeList.value[randomIndex].value = Math.random() * 100
    largeList.value[randomIndex].lastUpdated = new Date().toISOString()
  }
  const endTime = performance.now()
  lastRenderTime.value = endTime - startTime
  console.log(`更新 200 個項目耗時: ${lastRenderTime.value.toFixed(2)}ms`)
}

const toggleRandomActive = () => {
  // 隨機切換一些項目的活躍狀態
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * largeList.value.length)
    largeList.value[randomIndex].isActive = !largeList.value[randomIndex].isActive
  }
}

// 自動性能測試
const autoTest = ref(false)
const testResults = ref<Array<{
  time: string
  useVMemo: boolean
  itemsUpdated: number
  timestamp: string
}>>([])

const performanceTest = async () => {
  renderCount.value = 0
  const startTime = performance.now()

  // 模擬大量數據變化，增加更新頻率
  for (let i = 0; i < 500; i++) {
    const randomIndex = Math.floor(Math.random() * largeList.value.length)
    largeList.value[randomIndex].value = Math.random() * 100
    largeList.value[randomIndex].priority = Math.floor(Math.random() * 5) + 1
    largeList.value[randomIndex].lastUpdated = new Date().toISOString()
  }

  // 等待下一個 tick 確保 DOM 更新完成
  await new Promise(resolve => setTimeout(resolve, 50))

  const endTime = performance.now()
  const result = {
    time: (endTime - startTime).toFixed(2),
    useVMemo: useVMemo.value,
    itemsUpdated: 500,
    timestamp: new Date().toLocaleTimeString()
  }

  testResults.value.unshift(result)
  if (testResults.value.length > 10) {
    testResults.value = testResults.value.slice(0, 10)
  }

  console.log(`性能測試完成，耗時: ${result.time}ms (${useVMemo.value ? '使用' : '未使用'} v-memo)`)
  alert(`性能測試完成，耗時: ${result.time}ms\n${useVMemo.value ? '使用' : '未使用'} v-memo`)
}

// 自動化測試
const startAutoTest = () => {
  autoTest.value = !autoTest.value
  if (autoTest.value) {
    const interval = setInterval(() => {
      if (!autoTest.value) {
        clearInterval(interval)
        return
      }
      performanceTest()
    }, 2000)
  }
}

// 統計信息
const stats = computed(() => ({
  total: largeList.value.length,
  filtered: filteredList.value.length,
  active: largeList.value.filter(item => item.isActive).length,
  categoryA: largeList.value.filter(item => item.category === 'A').length,
  categoryB: largeList.value.filter(item => item.category === 'B').length,
  categoryC: largeList.value.filter(item => item.category === 'C').length,
}))

// 性能測試統計
const performanceStats = computed(() => {
  const vMemoResults = testResults.value.filter(result => result.useVMemo)
  const noVMemoResults = testResults.value.filter(result => !result.useVMemo)

  return {
    vMemoAvg: vMemoResults.length > 0
      ? (vMemoResults.reduce((sum, result) => sum + parseFloat(result.time), 0) / vMemoResults.length).toFixed(2)
      : 'N/A',
    noVMemoAvg: noVMemoResults.length > 0
      ? (noVMemoResults.reduce((sum, result) => sum + parseFloat(result.time), 0) / noVMemoResults.length).toFixed(2)
      : 'N/A'
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- 性能優化說明 -->
    <div class="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
      <h4 class="text-yellow-300 font-semibold mb-2">⚡ 大列表性能優化</h4>
      <p class="text-sm text-yellow-200 mb-2">
        當處理大量數據時，正確的優化策略可以顯著提升性能：
      </p>
      <ul class="text-sm text-yellow-200 space-y-1">
        <li>• <strong>V-memo：</strong> 緩存子樹，避免不必要的重新渲染</li>
        <li>• <strong>計算屬性：</strong> 緩存過濾和排序結果</li>
        <li>• <strong>正確的 Key：</strong> 幫助 Vue 識別和重用元素</li>
        <li>• <strong>虛擬滾動：</strong> 只渲染可見區域的項目</li>
      </ul>
    </div>

    <!-- 控制面板 -->
    <div class="p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-4">🎛️ 性能測試控制台</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <!-- 過濾控制 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">活躍狀態過濾</label>
          <button
            @click="toggleFilter"
            class="w-full px-3 py-2 rounded transition-colors"
            :class="activeFilter
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-600 hover:bg-gray-500 text-white'"
          >
            {{ activeFilter ? '只顯示活躍' : '顯示全部' }}
          </button>
        </div>

        <!-- 分類過濾 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">分類過濾</label>
          <select
            v-model="categoryFilter"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
          >
            <option value="all">所有分類</option>
            <option value="A">分類 A</option>
            <option value="B">分類 B</option>
            <option value="C">分類 C</option>
          </select>
        </div>

        <!-- V-memo 開關 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">V-memo 優化</label>
          <button
            @click="useVMemo = !useVMemo"
            class="w-full px-3 py-2 rounded transition-colors"
            :class="useVMemo
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-600 hover:bg-gray-500 text-white'"
          >
            {{ useVMemo ? '已啟用' : '已停用' }}
          </button>
        </div>

        <!-- 性能測試 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">性能測試</label>
          <div class="space-y-2">
            <button
              @click="performanceTest"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded transition-colors"
            >
              執行測試
            </button>
            <button
              @click="startAutoTest"
              class="w-full px-3 py-2 rounded transition-colors text-sm"
              :class="autoTest
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'"
            >
              {{ autoTest ? '停止自動測試' : '開始自動測試' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex gap-3">
        <button
          @click="updateRandomItems"
          class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors"
        >
          更新隨機數值
        </button>
        <button
          @click="toggleRandomActive"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
        >
          切換隨機狀態
        </button>
      </div>
    </div>

    <!-- 統計信息 -->
    <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-blue-400">{{ stats.total }}</div>
        <div class="text-xs text-gray-400">總項目</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-green-400">{{ stats.filtered }}</div>
        <div class="text-xs text-gray-400">顯示中</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-yellow-400">{{ stats.active }}</div>
        <div class="text-xs text-gray-400">活躍項目</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-red-400">{{ stats.categoryA }}</div>
        <div class="text-xs text-gray-400">分類 A</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-purple-400">{{ stats.categoryB }}</div>
        <div class="text-xs text-gray-400">分類 B</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-pink-400">{{ stats.categoryC }}</div>
        <div class="text-xs text-gray-400">分類 C</div>
      </div>
    </div>

    <!-- 性能測試結果 -->
    <div
      v-if="testResults.length > 0"
      class="p-4 bg-gray-900 border border-gray-700 rounded-lg"
    >
      <h4 class="text-gray-300 font-semibold mb-3">📊 性能測試結果</h4>
      <div class="space-y-2">
        <div
          v-for="(result, index) in testResults"
          :key="index"
          class="flex justify-between items-center p-2 rounded"
          :class="result.useVMemo ? 'bg-green-900/30' : 'bg-red-900/30'"
        >
          <div class="text-sm">
            <span class="text-gray-300">{{ result.timestamp }}</span>
            <span
              class="ml-2"
              :class="result.useVMemo ? 'text-green-400' : 'text-red-400'"
            >
              {{ result.useVMemo ? '✓ v-memo' : '✗ 無v-memo' }}
            </span>
          </div>
          <div
            class="text-lg font-bold"
            :class="result.useVMemo ? 'text-green-400' : 'text-red-400'"
          >
            {{ result.time }}ms
          </div>
        </div>
      </div>

      <!-- 性能統計 -->
      <div class="mt-3 pt-3 border-t border-gray-600">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="text-gray-400">使用 v-memo 平均時間:</div>
            <div class="text-green-400 font-bold">
              {{ performanceStats.vMemoAvg === 'N/A' ? 'N/A' : performanceStats.vMemoAvg + 'ms' }}
            </div>
          </div>
          <div>
            <div class="text-gray-400">未使用 v-memo 平均時間:</div>
            <div class="text-red-400 font-bold">
              {{ performanceStats.noVMemoAvg === 'N/A' ? 'N/A' : performanceStats.noVMemoAvg + 'ms' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能提示 -->
    <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-2">💡 性能提示</h4>
      <p class="text-sm text-gray-400">
        觀察切換 V-memo 開關時的性能差異。在大列表中，V-memo 可以顯著減少重新渲染的次數。
        可以打開瀏覽器的開發者工具來監控性能表現。
      </p>
    </div>

    <!-- 項目列表 -->
    <div class="space-y-4">
      <h4 class="text-lg font-semibold text-gray-300">
        項目列表
        <span class="text-sm text-gray-500">
          ({{ useVMemo ? '使用 V-memo' : '未使用 V-memo' }} - 顯示 {{ filteredList.length }} 項)
        </span>
      </h4>

      <!-- 使用 v-memo 的版本 -->
      <div
        v-if="useVMemo"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto"
      >
        <div
          v-for="item in filteredList"
          :key="item.id"
          v-memo="[item.name, item.value, item.isActive, item.category]"
          class="p-3 bg-gray-800 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          :class="{ 'border-green-500': item.isActive }"
        >
          <div class="flex justify-between items-start mb-2">
            <h5 class="text-white text-sm font-medium">{{ item.name }}</h5>
            <span
              class="text-xs px-2 py-1 rounded"
              :class="{
                'bg-red-900/50 text-red-300': item.category === 'A',
                'bg-blue-900/50 text-blue-300': item.category === 'B',
                'bg-green-900/50 text-green-300': item.category === 'C'
              }"
            >
              {{ item.category }}
            </span>
          </div>

          <div class="space-y-1">
            <div class="text-yellow-400 font-mono text-sm">
              值: {{ item.value.toFixed(2) }}
            </div>
            <div
              class="text-xs"
              :class="item.isActive ? 'text-green-400' : 'text-gray-500'"
            >
              {{ item.isActive ? '● 活躍' : '○ 非活躍' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 不使用 v-memo 的版本 -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto"
      >
        <div
          v-for="item in filteredList"
          :key="item.id"
          class="p-3 bg-gray-800 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          :class="{ 'border-green-500': item.isActive }"
        >
          <div class="flex justify-between items-start mb-2">
            <h5 class="text-white text-sm font-medium">{{ item.name }}</h5>
            <span
              class="text-xs px-2 py-1 rounded"
              :class="{
                'bg-red-900/50 text-red-300': item.category === 'A',
                'bg-blue-900/50 text-blue-300': item.category === 'B',
                'bg-green-900/50 text-green-300': item.category === 'C'
              }"
            >
              {{ item.category }}
            </span>
          </div>

          <div class="space-y-1">
            <div class="text-yellow-400 font-mono text-sm">
              值: {{ item.value.toFixed(2) }}
            </div>
            <div
              class="text-xs"
              :class="item.isActive ? 'text-green-400' : 'text-gray-500'"
            >
              {{ item.isActive ? '● 活躍' : '○ 非活躍' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技術說明 -->
    <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-3">🔧 性能優化技術</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="text-yellow-400 font-medium mb-2">V-memo 指令</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• 緩存子樹的渲染結果</li>
            <li>• 只在依賴項變化時重新渲染</li>
            <li>• 適用於大列表和複雜組件</li>
            <li>• 需要謹慎使用，避免過度優化</li>
          </ul>
        </div>
        <div>
          <h5 class="text-green-400 font-medium mb-2">其他優化策略</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• 使用計算屬性緩存結果</li>
            <li>• 避免在模板中進行複雜計算</li>
            <li>• 合理使用 v-show vs v-if</li>
            <li>• 考慮虛擬滾動解決方案</li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
        <h5 class="text-purple-400 font-medium mb-2">V-memo 語法</h5>
        <pre class="text-xs text-gray-300 font-mono">
&lt;div v-for="item in list" :key="item.id" 
     v-memo="[item.name, item.value, item.isActive]"&gt;
  &lt;!-- 只有當 name、value 或 isActive 變化時才重新渲染 --&gt;
&lt;/div&gt;</pre>
      </div>
    </div>
  </div>
</template>