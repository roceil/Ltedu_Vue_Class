<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 時間相關數據
const currentTime = ref(Date.now())
let timer: NodeJS.Timeout | null = null
const timeFormat = ref('long')

// 執行計數器
const computedExecutionCount = ref(0)
const methodExecutionCount = ref(0)

// 用戶數據
const userData = ref({
  firstName: '張',
  lastName: '三',
  birthYear: 1990,
  email: 'zhang@example.com'
})

// 複雜計算數據
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const calculationParams = ref({
  multiplier: 2,
  filter: 5,
  operation: 'sum'
})

// 計算屬性版本 - 時間格式化
const formattedTimeComputed = computed(() => {
  computedExecutionCount.value++
  console.log(`🔥 計算屬性執行次數: ${computedExecutionCount.value}`)

  const date = new Date(currentTime.value)

  return timeFormat.value === 'long'
    ? date.toLocaleString('zh-TW')
    : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
})

// 方法版本 - 時間格式化
const getFormattedTimeMethod = (format = timeFormat.value) => {
  methodExecutionCount.value++
  console.log(`🚀 方法執行次數: ${methodExecutionCount.value}`)

  const date = new Date()

  return format === 'long'
    ? date.toLocaleString('zh-TW')
    : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 計算屬性版本 - 用戶信息
const userInfoComputed = computed(() => {
  console.log('👤 用戶信息計算屬性被執行')
  const currentYear = new Date().getFullYear()
  const age = currentYear - userData.value.birthYear

  return {
    fullName: `${userData.value.firstName}${userData.value.lastName}`,
    age,
    email: userData.value.email,
    ageGroup: age < 30 ? '年輕' : age < 50 ? '中年' : '資深',
    emailDomain: userData.value.email.split('@')[1] || ''
  }
})

// 方法版本 - 用戶信息（需要傳參）
const getUserInfoMethod = (firstName?: string, lastName?: string, birthYear?: number, email?: string) => {
  console.log('👤 用戶信息方法被執行')

  const fName = firstName || userData.value.firstName
  const lName = lastName || userData.value.lastName
  const bYear = birthYear || userData.value.birthYear
  const userEmail = email || userData.value.email

  const currentYear = new Date().getFullYear()
  const age = currentYear - bYear

  return {
    fullName: `${fName}${lName}`,
    age,
    email: userEmail,
    ageGroup: age < 30 ? '年輕' : age < 50 ? '中年' : '資深',
    emailDomain: userEmail.split('@')[1] || ''
  }
}

// 計算屬性版本 - 複雜數學運算
const complexCalculationComputed = computed(() => {
  console.log('🧮 複雜計算屬性被執行')

  const { multiplier, filter, operation } = calculationParams.value
  const filtered = numbers.value.filter(n => n > filter).map(n => n * multiplier)

  switch (operation) {
    case 'sum':
      return filtered.reduce((a, b) => a + b, 0)
    case 'average':
      return filtered.length > 0 ? filtered.reduce((a, b) => a + b, 0) / filtered.length : 0
    case 'max':
      return Math.max(...filtered)
    case 'min':
      return Math.min(...filtered)
    default:
      return 0
  }
})

// 方法版本 - 複雜數學運算（支援動態參數）
const getComplexCalculationMethod = (customNumbers?: number[], customMultiplier?: number, customFilter?: number, customOperation?: string) => {
  console.log('🧮 複雜計算方法被執行')

  const nums = customNumbers || numbers.value
  const multiplier = customMultiplier ?? calculationParams.value.multiplier
  const filter = customFilter ?? calculationParams.value.filter
  const operation = customOperation || calculationParams.value.operation

  const filtered = nums.filter(n => n > filter).map(n => n * multiplier)

  switch (operation) {
    case 'sum':
      return filtered.reduce((a, b) => a + b, 0)
    case 'average':
      return filtered.length > 0 ? filtered.reduce((a, b) => a + b, 0) / filtered.length : 0
    case 'max':
      return Math.max(...filtered)
    case 'min':
      return Math.min(...filtered)
    default:
      return 0
  }
}

// 開始時間更新
const startTimeUpdates = () => {
  if (timer) return

  timer = setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
  console.log('⏰ 開始時間更新')
}

// 停止時間更新
const stopTimeUpdates = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
    console.log('⏹️ 停止時間更新')
  }
}

// 重置計數器
const resetCounters = () => {
  computedExecutionCount.value = 0
  methodExecutionCount.value = 0
  console.clear()
  console.log('🔄 計數器已重置')
}

// 隨機修改數據
const randomizeData = () => {
  userData.value.birthYear = 1980 + Math.floor(Math.random() * 30)
  calculationParams.value.multiplier = Math.floor(Math.random() * 5) + 1
  calculationParams.value.filter = Math.floor(Math.random() * 5) + 1
  console.log('🎲 數據已隨機化')
}

onMounted(() => {
  console.log('🚀 Computed vs Function 比較組件已載入')
})

onUnmounted(() => {
  stopTimeUpdates()
})
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">Computed vs Function 實際比較</h3>

    <!-- 控制面板 -->
    <div class="mb-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🎮 控制面板</h4>
      <div class="flex flex-wrap gap-3">
        <button
          @click="startTimeUpdates"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          ⏰ 開始時間更新
        </button>
        <button
          @click="stopTimeUpdates"
          class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
        >
          ⏹️ 停止時間更新
        </button>
        <button
          @click="randomizeData"
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          🎲 隨機化數據
        </button>
        <button
          @click="resetCounters"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          🔄 重置計數器
        </button>
      </div>
    </div>

    <!-- 執行次數統計 -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
        <h4 class="text-lg font-semibold text-green-400 mb-2">🔥 計算屬性執行次數</h4>
        <div class="text-3xl font-bold text-green-100">{{ computedExecutionCount }}</div>
        <div class="text-sm text-green-300 mt-1">只有依賴變化時才執行</div>
      </div>
      <div class="p-4 bg-orange-900 border border-orange-500 rounded-lg">
        <h4 class="text-lg font-semibold text-orange-400 mb-2">🚀 方法執行次數</h4>
        <div class="text-3xl font-bold text-orange-100">{{ methodExecutionCount }}</div>
        <div class="text-sm text-orange-300 mt-1">每次調用都會執行</div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- 計算屬性版本 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-green-400">✅ 計算屬性版本</h4>

        <!-- 時間顯示 (Computed) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-green-400 mb-3">🕐 時間顯示</h5>
          <div class="space-y-2">
            <div class="p-3 bg-green-900 border border-green-500 rounded">
              <div class="text-sm text-green-300">格式化時間 1:</div>
              <div class="text-green-100 font-mono">{{ formattedTimeComputed }}</div>
            </div>
            <div class="p-3 bg-green-900 border border-green-500 rounded">
              <div class="text-sm text-green-300">格式化時間 2:</div>
              <div class="text-green-100 font-mono">{{ formattedTimeComputed }}</div>
            </div>
            <div class="p-3 bg-green-900 border border-green-500 rounded">
              <div class="text-sm text-green-300">格式化時間 3:</div>
              <div class="text-green-100 font-mono">{{ formattedTimeComputed }}</div>
            </div>
          </div>
        </div>

        <!-- 用戶信息 (Computed) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-green-400 mb-3">👤 用戶信息</h5>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label class="block text-xs text-gray-300 mb-1">姓:</label>
              <input
                v-model="userData.firstName"
                type="text"
                class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-300 mb-1">名:</label>
              <input
                v-model="userData.lastName"
                type="text"
                class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="block text-xs text-gray-300 mb-1">出生年份:</label>
            <input
              v-model.number="userData.birthYear"
              type="number"
              class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm space-y-1">
              <div><span class="text-green-300">姓名:</span> <span class="text-green-100">{{ userInfoComputed.fullName
              }}</span></div>
              <div><span class="text-green-300">年齡:</span> <span class="text-green-100">{{ userInfoComputed.age
              }}</span></div>
              <div><span class="text-green-300">年齡層:</span> <span class="text-green-100">{{ userInfoComputed.ageGroup
              }}</span></div>
            </div>
          </div>
        </div>

        <!-- 複雜計算 (Computed) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-green-400 mb-3">🧮 複雜計算</h5>
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label class="block text-xs text-gray-300 mb-1">倍數:</label>
              <input
                v-model.number="calculationParams.multiplier"
                type="number"
                min="1"
                class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-300 mb-1">過濾:</label>
              <input
                v-model.number="calculationParams.filter"
                type="number"
                min="0"
                class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-300 mb-1">運算:</label>
              <select
                v-model="calculationParams.operation"
                class="w-full px-2 py-1 text-sm bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="sum">總和</option>
                <option value="average">平均</option>
                <option value="max">最大</option>
                <option value="min">最小</option>
              </select>
            </div>
          </div>
          <div class="p-3 bg-green-900 border border-green-500 rounded">
            <div class="text-sm text-green-300">計算結果:</div>
            <div class="text-2xl font-bold text-green-100">{{ complexCalculationComputed }}</div>
          </div>
        </div>
      </div>

      <!-- 方法版本 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-orange-400">🚀 方法版本</h4>

        <!-- 時間顯示 (Method) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-orange-400 mb-3">🕐 時間顯示</h5>
          <div class="space-y-2">
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">格式化時間 1:</div>
              <div class="text-orange-100 font-mono">{{ getFormattedTimeMethod() }}</div>
            </div>
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">格式化時間 2:</div>
              <div class="text-orange-100 font-mono">{{ getFormattedTimeMethod() }}</div>
            </div>
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">格式化時間 3:</div>
              <div class="text-orange-100 font-mono">{{ getFormattedTimeMethod() }}</div>
            </div>
          </div>
        </div>

        <!-- 用戶信息 (Method with parameters) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-orange-400 mb-3">👤 用戶信息 (支援參數)</h5>
          <div class="space-y-2">
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">默認用戶:</div>
              <div class="text-sm space-y-1">
                <div><span class="text-orange-300">姓名:</span> <span class="text-orange-100">{{
                  getUserInfoMethod().fullName }}</span></div>
                <div><span class="text-orange-300">年齡:</span> <span class="text-orange-100">{{ getUserInfoMethod().age
                }}</span></div>
                <div><span class="text-orange-300">年齡層:</span> <span class="text-orange-100">{{
                  getUserInfoMethod().ageGroup }}</span></div>
              </div>
            </div>
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">自定義用戶 (李四, 1985):</div>
              <div class="text-sm space-y-1">
                <div><span class="text-orange-300">姓名:</span> <span class="text-orange-100">{{ getUserInfoMethod('李',
                  '四', 1985, 'li@example.com').fullName }}</span></div>
                <div><span class="text-orange-300">年齡:</span> <span class="text-orange-100">{{ getUserInfoMethod('李',
                  '四', 1985, 'li@example.com').age }}</span></div>
                <div><span class="text-orange-300">年齡層:</span> <span class="text-orange-100">{{ getUserInfoMethod('李',
                  '四', 1985, 'li@example.com').ageGroup }}</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 複雜計算 (Method with parameters) -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-orange-400 mb-3">🧮 複雜計算 (支援參數)</h5>
          <div class="space-y-2">
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">使用當前設定:</div>
              <div class="text-2xl font-bold text-orange-100">{{ getComplexCalculationMethod() }}</div>
            </div>
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">自定義參數 (倍數3, 過濾3, 最大值):</div>
              <div class="text-2xl font-bold text-orange-100">{{ getComplexCalculationMethod(undefined, 3, 3, 'max') }}
              </div>
            </div>
            <div class="p-3 bg-orange-900 border border-orange-500 rounded">
              <div class="text-sm text-orange-300">自定義數組 [5,10,15,20]:</div>
              <div class="text-2xl font-bold text-orange-100">{{ getComplexCalculationMethod([5, 10, 15, 20], 2, 0,
                'sum')
                }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 比較總結 -->
    <div class="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🧠 比較總結</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
        <div>
          <h5 class="font-semibold text-green-400 mb-2">✅ 計算屬性適用於：</h5>
          <ul class="space-y-1">
            <li>• 基於響應式數據的派生值計算</li>
            <li>• 需要緩存的複雜計算</li>
            <li>• 多次使用相同計算結果的場景</li>
            <li>• 不需要傳參數的純計算邏輯</li>
            <li>• 聲明式的數據轉換</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-orange-400 mb-2">🚀 方法適用於：</h5>
          <ul class="space-y-1">
            <li>• 需要接收參數的動態計算</li>
            <li>• 每次都要執行最新邏輯的場景</li>
            <li>• 處理事件和用戶交互</li>
            <li>• 執行副作用操作 (API 調用等)</li>
            <li>• 命令式的操作邏輯</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>