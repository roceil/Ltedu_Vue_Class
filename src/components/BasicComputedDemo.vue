<script lang="ts" setup>
import { ref, computed } from 'vue'



// 基本字符串反轉演示
const message = ref('Hello Vue')
const reverseLog = ref<string[]>([])
const reversedMessage = computed(() => {
  const logMessage = `🔄 字符串反轉計算被觸發：${message.value} → ${message.value.split('').reverse().join('')}`
  reverseLog.value.unshift(logMessage)
  console.log(logMessage)
  return message.value.split('').reverse().join('')
})

// 全名拼接演示
const firstName = ref('張')
const lastName = ref('三')
const nameLog = ref<string[]>([])
const fullName = computed(() => {
  const logMessage = `👤 全名拼接計算被觸發：${firstName.value} + ${lastName.value} → ${firstName.value}${lastName.value}`
  nameLog.value.unshift(logMessage)
  console.log(logMessage)
  return `${firstName.value}${lastName.value}`
})

// 數字計算演示
const number1 = ref(10)
const number2 = ref(20)
const mathLog = ref<string[]>([])
const sum = computed(() => {
  const result = number1.value + number2.value
  const logMessage = `➕ 加法計算被觸發：${number1.value} + ${number2.value} = ${result}`
  mathLog.value.unshift(logMessage)
  console.log(logMessage)
  return result
})
const average = computed(() => {
  const result = (number1.value + number2.value) / 2
  const logMessage = `📊 平均值計算被觸發：(${number1.value} + ${number2.value}) / 2 = ${result}`
  mathLog.value.unshift(logMessage)
  console.log(logMessage)
  return result
})

// 格式化演示
const price = ref(1299)
const formatLog = ref<string[]>([])
const formattedPrice = computed(() => {
  const result = `NT$ ${price.value.toLocaleString()}`
  const logMessage = `💰 價格格式化計算被觸發：${price.value} → ${result}`
  formatLog.value.unshift(logMessage)
  console.log(logMessage)
  return result
})

// 清除個別日誌
const clearReverseLog = () => {
  reverseLog.value = []
}

const clearNameLog = () => {
  nameLog.value = []
}

const clearMathLog = () => {
  mathLog.value = []
}

const clearFormatLog = () => {
  formatLog.value = []
}

// 清除所有日誌
const clearAllLogs = () => {
  reverseLog.value = []
  nameLog.value = []
  mathLog.value = []
  formatLog.value = []
  console.clear()
}


</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">基本 Computed 使用演示</h3>



    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 字符串反轉 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-blue-400">
            🔄 字符串反轉
          </h4>
          <button
            @click="clearReverseLog"
            class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            清除日誌
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">
              輸入文字：
            </label>
            <input
              v-model="message"
              type="text"
              class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入要反轉的文字"
            />
          </div>
          <div class="p-3 bg-gray-600 border border-gray-500 rounded">
            <div class="text-sm text-gray-300">原始文字：</div>
            <div class="text-white font-mono">{{ message }}</div>
          </div>
          <div class="p-3 bg-blue-900 border border-blue-500 rounded">
            <div class="text-sm text-blue-300">反轉結果：</div>
            <div class="text-blue-100 font-mono">{{ reversedMessage }}</div>
          </div>

          <!-- 獨立日誌區域 -->
          <div class="text-sm">
            <div class="font-medium text-gray-300 mb-2">計算日誌：</div>
            <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
              <div
                v-if="reverseLog.length === 0"
                class="text-gray-500"
              >暫無計算記錄</div>
              <div
                v-for="(log, index) in reverseLog"
                :key="index"
                class="mb-1 text-blue-300"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 全名拼接 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-green-400">
            👤 全名拼接
          </h4>
          <button
            @click="clearNameLog"
            class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            清除日誌
          </button>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                姓氏：
              </label>
              <input
                v-model="firstName"
                type="text"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="姓"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                名字：
              </label>
              <input
                v-model="lastName"
                type="text"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="名"
              />
            </div>
          </div>
          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300">完整姓名：</div>
            <div class="text-green-100 font-mono text-lg">{{ fullName }}</div>
          </div>

          <!-- 獨立日誌區域 -->
          <div class="text-sm">
            <div class="font-medium text-gray-300 mb-2">計算日誌：</div>
            <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
              <div
                v-if="nameLog.length === 0"
                class="text-gray-500"
              >暫無計算記錄</div>
              <div
                v-for="(log, index) in nameLog"
                :key="index"
                class="mb-1 text-green-300"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 數字計算 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-purple-400">
            🔢 數字計算
          </h4>
          <button
            @click="clearMathLog"
            class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            清除日誌
          </button>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                數字 1：
              </label>
              <input
                v-model.number="number1"
                type="number"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                數字 2：
              </label>
              <input
                v-model.number="number2"
                type="number"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="p-3 bg-purple-900 border border-purple-500 rounded">
              <div class="text-sm text-purple-300">總和：</div>
              <div class="text-purple-100 font-mono text-lg">{{ sum }}</div>
            </div>
            <div class="p-3 bg-pink-900 border border-pink-500 rounded">
              <div class="text-sm text-pink-300">平均值：</div>
              <div class="text-pink-100 font-mono text-lg">{{ average }}</div>
            </div>
          </div>

          <!-- 獨立日誌區域 -->
          <div class="text-sm">
            <div class="font-medium text-gray-300 mb-2">計算日誌：</div>
            <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
              <div
                v-if="mathLog.length === 0"
                class="text-gray-500"
              >暫無計算記錄</div>
              <div
                v-for="(log, index) in mathLog"
                :key="index"
                class="mb-1 text-purple-300"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 格式化演示 -->
      <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-yellow-400">
            💰 價格格式化
          </h4>
          <button
            @click="clearFormatLog"
            class="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            清除日誌
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">
              價格（整數）：
            </label>
            <input
              v-model.number="price"
              type="number"
              min="0"
              class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="輸入價格數字"
            />
          </div>
          <div class="p-3 bg-gray-600 border border-gray-500 rounded">
            <div class="text-sm text-gray-300">原始數值：</div>
            <div class="text-white font-mono">{{ price }}</div>
          </div>
          <div class="p-3 bg-yellow-900 border border-yellow-500 rounded">
            <div class="text-sm text-yellow-300">格式化後：</div>
            <div class="text-yellow-100 font-mono text-lg">{{ formattedPrice }}</div>
          </div>

          <!-- 獨立日誌區域 -->
          <div class="text-sm">
            <div class="font-medium text-gray-300 mb-2">計算日誌：</div>
            <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
              <div
                v-if="formatLog.length === 0"
                class="text-gray-500"
              >暫無計算記錄</div>
              <div
                v-for="(log, index) in formatLog"
                :key="index"
                class="mb-1 text-yellow-300"
              >
                {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <div class="mt-6 flex justify-center">
      <button
        @click="clearAllLogs"
        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        清除所有日誌
      </button>
    </div>

    <!-- 說明文字 -->
    <div class="mt-6 p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-2">💡 學習重點</h4>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>獨立緩存：</strong> 每個計算屬性都有自己的緩存機制和依賴追蹤</li>
        <li>• <strong>自動觸發：</strong> 只有當依賴的響應式數據變化時，計算屬性才會重新計算</li>
        <li>• <strong>即時反饋：</strong> 觀察右側的計算日誌，了解每次計算的詳細過程</li>
        <li>• <strong>性能優化：</strong> 相同的計算邏輯在模板中多次使用時，只會計算一次</li>
      </ul>
    </div>
  </div>
</template>