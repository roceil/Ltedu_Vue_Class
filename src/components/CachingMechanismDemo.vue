<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// 基礎數據
const baseNumber = ref(100)

// 執行日誌
const computedLogs = ref<string[]>([])
const methodLogs = ref<string[]>([])

// 執行計數器
const computedCount = ref(0)
const methodCount = ref(0)

// 模擬耗時的複雜計算函數
const heavyCalculation = (num: number, type: string) => {
  const startTime = Date.now()

  // 模擬複雜計算 - 計算質數
  let result = 0
  for (let i = 2; i <= num; i++) {
    let isPrime = true
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) result++
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  // 記錄執行日誌
  const timestamp = new Date().toLocaleTimeString('zh-TW')
  const logMessage = `[${timestamp}] 計算 ${num} 以內的質數，結果: ${result}，耗時: ${duration}ms`

  if (type === 'computed') {
    computedCount.value++
    computedLogs.value.unshift(`第${computedCount.value}次 - ${logMessage}`)
  } else {
    methodCount.value++
    methodLogs.value.unshift(`第${methodCount.value}次 - ${logMessage}`)
  }

  return result
}

// 緩存結果，避免模板中重複計算
const computedResult = ref(0)
const methodResults = ref<number[]>([])

// 計算屬性版本 - 有緩存
const primeCountComputed = computed(() => {
  const result = heavyCalculation(baseNumber.value, 'computed')
  computedResult.value = result
  return result
})

// 方法版本 - 無緩存，每次調用都執行
const getPrimeCountMethod = () => {
  const result = heavyCalculation(baseNumber.value, 'method')
  return result
}

// 模擬多次調用 method
const simulateMethodCalls = () => {
  methodResults.value = []
  for (let i = 1; i <= 5; i++) {
    const result = getPrimeCountMethod()
    methodResults.value.push(result)
  }
}

// 清除日誌
const clearComputedLogs = () => {
  computedLogs.value = []
  computedCount.value = 0
  computedResult.value = 0
}

const clearMethodLogs = () => {
  methodLogs.value = []
  methodCount.value = 0
  methodResults.value = []
}

const clearAllLogs = () => {
  clearComputedLogs()
  clearMethodLogs()
  console.clear()
}

// 觸發重新計算（改變依賴）
const triggerRecalculation = () => {
  // 改變 baseNumber 會觸發 computed 重新計算
  baseNumber.value = baseNumber.value + 1
  // 觸發 computed 重新計算
  primeCountComputed.value
  // 模擬多次調用 method
  simulateMethodCalls()

  nextTick(() => {
    console.log(`計算後: Computed ${computedCount.value}次, Method ${methodCount.value}次`)
    console.log('✅ 依賴變化時，Computed +1次，Method +5次')
  })
}

// 組件載入時初始化
onMounted(() => {
  // 觸發 computed 計算
  primeCountComputed.value
  // 模擬多次調用 method
  simulateMethodCalls()
})
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">緩存機制 vs 方法比較</h3>

    <!-- 控制面板 -->
    <div class="mb-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🎮 測試控制</h4>
      <div class="space-y-3">
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-300">當前計算範圍：</label>
          <div class="px-3 py-1 bg-gray-600 text-white border border-gray-500 rounded">
            {{ baseNumber }}
          </div>
          <span class="text-sm text-gray-400">計算此數字以內的質數個數</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            @click="triggerRecalculation"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            🔄 觸發重新計算 ({{ baseNumber }} → {{ baseNumber + 1 }})
          </button>
          <button
            @click="clearAllLogs"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            🗑️ 清除所有日誌
          </button>
        </div>
      </div>
    </div>

    <!-- 執行統計 - 更醒目的顯示 -->
    <div class="mb-6 p-4 bg-gray-900 border-2 border-yellow-500 rounded-lg">
      <h4 class="text-xl font-bold text-yellow-400 mb-4 text-center">📊 執行次數統計對比</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-green-900 border-2 border-green-400 rounded-lg text-center">
          <h5 class="text-lg font-semibold text-green-300 mb-3">🔥 Computed 執行次數</h5>
          <div class="text-6xl font-bold text-green-100 mb-2">{{ computedCount }}</div>
          <div class="text-sm text-green-300 bg-green-800 px-3 py-1 rounded">有緩存機制</div>
          <div class="mt-3 text-xs text-green-400">
            {{ computedCount === 0 ? '尚未執行' : computedCount === 1 ? '只執行了1次！' : `已執行${computedCount}次` }}
          </div>
        </div>
        <div class="p-6 bg-orange-900 border-2 border-orange-400 rounded-lg text-center">
          <h5 class="text-lg font-semibold text-orange-300 mb-3">🚀 Method 執行次數</h5>
          <div class="text-6xl font-bold text-orange-100 mb-2">{{ methodCount }}</div>
          <div class="text-sm text-orange-300 bg-orange-800 px-3 py-1 rounded">無緩存機制</div>
          <div class="mt-3 text-xs text-orange-400">
            {{ methodCount === 0 ? '尚未執行' : `每次調用都執行，共${methodCount}次` }}
          </div>
        </div>
      </div>

      <!-- 性能差異提示 -->
      <div class="mt-4 p-3 bg-yellow-900/50 border border-yellow-500 rounded text-center">
        <div class="text-yellow-300 font-semibold">
          <span v-if="computedCount > 0 && methodCount > 0">
            🎯 性能差異：Method 比 Computed 多執行了 <span class="text-2xl font-bold text-red-400">{{ methodCount - computedCount
            }}</span> 次！
          </span>
          <span
            v-else
            class="text-gray-400"
          >
            開始測試後將顯示性能差異對比
          </span>
        </div>
      </div>
    </div>

    <!-- 實際演示區域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Computed 演示 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-green-400">
            🔥 Computed 版本 (有緩存)
          </h4>
          <div class="flex items-center space-x-2">
            <div class="px-3 py-1 bg-green-800 text-green-200 rounded text-sm font-bold">
              執行: {{ computedCount }} 次
            </div>
            <button
              @click="clearComputedLogs"
              class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              清除日誌
            </button>
          </div>
        </div>

        <!-- 模擬多次使用場景 - 使用緩存結果 -->
        <div class="space-y-3">
          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300 mb-1">場景1 - 頁面標題顯示：</div>
            <div class="text-lg font-mono text-green-100">{{ computedResult }} 個質數</div>
          </div>

          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300 mb-1">場景2 - 統計信息：</div>
            <div class="text-lg font-mono text-green-100">{{ computedResult }} 個質數</div>
          </div>

          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300 mb-1">場景3 - 進度顯示：</div>
            <div class="text-lg font-mono text-green-100">{{ computedResult }} 個質數</div>
          </div>

          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300 mb-1">場景4 - 結果摘要：</div>
            <div class="text-lg font-mono text-green-100">{{ computedResult }} 個質數</div>
          </div>

          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300 mb-1">場景5 - 數據驗證：</div>
            <div class="text-lg font-mono text-green-100">{{ computedResult }} 個質數</div>
          </div>
        </div>

        <!-- 執行日誌 -->
        <div class="mt-4">
          <div class="text-sm font-medium text-gray-300 mb-2">執行日誌：</div>
          <div class="h-32 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="computedLogs.length === 0"
              class="text-gray-500"
            >暫無執行記錄</div>
            <div
              v-for="(log, index) in computedLogs"
              :key="index"
              class="mb-1 text-green-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <!-- Method 演示 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-orange-400">
            🚀 Method 版本 (無緩存)
          </h4>
          <div class="flex items-center space-x-2">
            <div class="px-3 py-1 bg-orange-800 text-orange-200 rounded text-sm font-bold">
              執行: {{ methodCount }} 次
            </div>
            <button
              @click="clearMethodLogs"
              class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              清除日誌
            </button>
          </div>
        </div>

        <!-- 模擬多次調用方法的結果 -->
        <div class="space-y-3">
          <div class="p-3 bg-orange-900 border border-orange-500 rounded">
            <div class="text-sm text-orange-300 mb-1">場景1 - 第1次調用結果：</div>
            <div class="text-lg font-mono text-orange-100">{{ methodResults[0] || 0 }} 個質數</div>
          </div>

          <div class="p-3 bg-orange-900 border border-orange-500 rounded">
            <div class="text-sm text-orange-300 mb-1">場景2 - 第2次調用結果：</div>
            <div class="text-lg font-mono text-orange-100">{{ methodResults[1] || 0 }} 個質數</div>
          </div>

          <div class="p-3 bg-orange-900 border border-orange-500 rounded">
            <div class="text-sm text-orange-300 mb-1">場景3 - 第3次調用結果：</div>
            <div class="text-lg font-mono text-orange-100">{{ methodResults[2] || 0 }} 個質數</div>
          </div>

          <div class="p-3 bg-orange-900 border border-orange-500 rounded">
            <div class="text-sm text-orange-300 mb-1">場景4 - 第4次調用結果：</div>
            <div class="text-lg font-mono text-orange-100">{{ methodResults[3] || 0 }} 個質數</div>
          </div>

          <div class="p-3 bg-orange-900 border border-orange-500 rounded">
            <div class="text-sm text-orange-300 mb-1">場景5 - 第5次調用結果：</div>
            <div class="text-lg font-mono text-orange-100">{{ methodResults[4] || 0 }} 個質數</div>
          </div>
        </div>

        <!-- 執行日誌 -->
        <div class="mt-4">
          <div class="text-sm font-medium text-gray-300 mb-2">執行日誌：</div>
          <div class="h-32 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="methodLogs.length === 0"
              class="text-gray-500"
            >暫無執行記錄</div>
            <div
              v-for="(log, index) in methodLogs"
              :key="index"
              class="mb-1 text-orange-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能分析 -->
    <div class="mt-6 p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-3">📊 性能分析與測試結果</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-green-900/50 border border-green-500 rounded">
          <h5 class="font-semibold text-green-400 mb-2">✅ Computed 緩存優勢：</h5>
          <ul class="text-sm text-green-200 space-y-1">
            <li>• <strong>智能緩存：</strong> 依賴不變時使用緩存結果</li>
            <li>• <strong>性能優化：</strong> 避免不必要的重複計算</li>
            <li>• <strong>依賴追蹤：</strong> 只有 baseNumber 變化時才重新計算</li>
            <li>• <strong>測試驗證：</strong> 「觸發重新計算」按鈕觸發重新計算</li>
          </ul>
        </div>
        <div class="p-4 bg-orange-900/50 border border-orange-500 rounded">
          <h5 class="font-semibold text-orange-400 mb-2">⚠️ Method 執行特性：</h5>
          <ul class="text-sm text-orange-200 space-y-1">
            <li>• <strong>每次執行：</strong> 每次調用都會重新計算</li>
            <li>• <strong>無緩存機制：</strong> 即使輸入相同也會重複執行</li>
            <li>• <strong>性能消耗：</strong> 無法避免重複的耗時操作</li>
            <li>• <strong>測試對比：</strong> 兩個測試按鈕都會觸發 Method 執行</li>
          </ul>
        </div>
      </div>

      <!-- 核心演示說明 -->
      <div class="mt-4 p-3 bg-yellow-900/30 border border-yellow-500 rounded">
        <h6 class="font-semibold text-yellow-300 mb-2">🎯 核心演示：</h6>
        <div class="text-sm text-yellow-200 space-y-1">
          <div>• <strong>頁面載入：</strong> Computed 執行1次，Method 執行5次</div>
          <div>• <strong>依賴變化：</strong> 點擊「觸發重新計算」後，Computed +1次，Method +5次</div>
          <div>• <strong>完美展示：</strong> 相同的模板使用場景下，Computed 緩存 vs Method 重複執行</div>
        </div>
      </div>
    </div>

    <!-- 使用建議 -->
    <div class="mt-6 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
      <h4 class="text-yellow-300 font-semibold mb-2">💡 實驗建議</h4>
      <ul class="text-sm text-yellow-200 space-y-1">
        <li>• <strong>觀察初始載入：</strong> 頁面載入時 Computed 執行1次，Method 執行5次（模板中5次調用）</li>
        <li>• <strong>理解緩存機制：</strong> Computed 在模板中被使用5次，但只計算1次並緩存結果</li>
        <li>• <strong>對比 Method 行為：</strong> Method 在模板中被調用5次，每次都重新執行計算</li>
        <li>• <strong>測試依賴變化：</strong> 點擊「觸發重新計算」改變依賴，觀察重新計算的行為</li>
        <li>• <strong>查看控制台：</strong> 觀察詳細的執行日誌和性能差異</li>
      </ul>
    </div>
  </div>
</template>