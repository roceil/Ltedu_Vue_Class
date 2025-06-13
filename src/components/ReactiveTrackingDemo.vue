<script lang="ts" setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

// 響應式數據
const reactiveMessage = ref('響應式數據')
const reactiveNumber = ref(42)

// 非響應式數據（使用 ref 來顯示，但計算屬性不會追蹤）
const nonReactiveMessage = ref('非響應式數據')
const nonReactiveNumber = ref(100)

// 時間相關
const currentTime = ref(Date.now())
let timer: number | null = null

// 用戶信息（響應式物件）
const user = reactive({
  name: '張三',
  age: 25,
  email: 'zhang@example.com',
  preferences: {
    theme: 'dark',
    language: 'zh-TW'
  }
})

// 計算屬性：依賴響應式數據
const reactiveComputed = computed(() => {
  console.log('🔥 響應式計算被執行')
  return `處理後的內容: ${reactiveMessage.value} (數字: ${reactiveNumber.value})`
})

// 計算屬性：故意不追蹤某些數據（演示用）
const nonReactiveSnapshot = ref('')
const nonReactiveComputed = computed(() => {
  console.log('❄️ 非響應式計算被執行')
  // 故意使用快照而不是直接引用，模擬非響應式行為
  return `處理後的內容: ${nonReactiveSnapshot.value}`
})

// 計算屬性：依賴響應式時間
const formattedTime = computed(() => {
  console.log('🕐 時間格式化計算被執行')
  return new Date(currentTime.value).toLocaleTimeString('zh-TW')
})

// 計算屬性：用戶信息
const userInfo = computed(() => {
  console.log('👤 用戶信息計算被執行')
  return `${user.name} (${user.age}歲) - ${user.email}`
})

// 計算屬性：用戶偏好
const userPreferences = computed(() => {
  console.log('⚙️ 用戶偏好計算被執行')
  return `主題: ${user.preferences.theme} | 語言: ${user.preferences.language}`
})

// 修改非響應式數據（更新顯示但不觸發計算屬性）
const updateNonReactive = () => {
  nonReactiveMessage.value = `更新時間: ${new Date().toLocaleTimeString()}`
  nonReactiveNumber.value = Math.floor(Math.random() * 1000)
  console.log('🔄 非響應式數據已更新，但計算屬性不會重新計算')
  console.log('新的非響應式數據:', {
    message: nonReactiveMessage.value,
    number: nonReactiveNumber.value
  })
}

// 強制重新渲染
const forceUpdate = ref(0)
const triggerForceUpdate = () => {
  forceUpdate.value++
  console.log('🔄 強制重新渲染觸發')
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

// 手動更新快照（模擬非響應式行為）
const updateSnapshot = () => {
  nonReactiveSnapshot.value = `${nonReactiveMessage.value} (數字: ${nonReactiveNumber.value})`
  console.log('📸 手動更新快照，計算屬性會重新計算')
}

// 重置所有數據
const resetAllData = () => {
  reactiveMessage.value = '響應式數據'
  reactiveNumber.value = 42
  nonReactiveMessage.value = '非響應式數據'
  nonReactiveNumber.value = 100
  nonReactiveSnapshot.value = '非響應式數據 (數字: 100)'
  user.name = '張三'
  user.age = 25
  user.email = 'zhang@example.com'
  user.preferences.theme = 'dark'
  user.preferences.language = 'zh-TW'
  console.log('🔄 所有數據已重置')
}

onMounted(() => {
  // 初始化快照
  nonReactiveSnapshot.value = `${nonReactiveMessage.value} (數字: ${nonReactiveNumber.value})`
  console.log('🚀 響應式依賴追蹤演示組件已載入')
})

onUnmounted(() => {
  stopTimeUpdates()
})
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">響應式依賴追蹤演示</h3>

    <!-- 控制面板 -->
    <div class="mb-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🎮 控制面板</h4>
      <div class="flex flex-wrap gap-3">
        <button
          @click="updateNonReactive"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          🔄 更新非響應式數據
        </button>
        <button
          @click="updateSnapshot"
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          📸 手動更新快照
        </button>
        <button
          @click="triggerForceUpdate"
          class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
        >
          🔄 強制重新渲染
        </button>
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
          @click="resetAllData"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          🔄 重置所有數據
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 響應式數據區域 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-green-400">✅ 響應式數據測試</h4>

        <!-- 響應式輸入 -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-green-400 mb-3">響應式輸入</h5>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                響應式文字：
              </label>
              <input
                v-model="reactiveMessage"
                type="text"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                響應式數字：
              </label>
              <input
                v-model.number="reactiveNumber"
                type="number"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <!-- 響應式物件 -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-green-400 mb-3">響應式物件</h5>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">姓名：</label>
                <input
                  v-model="user.name"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">年齡：</label>
                <input
                  v-model.number="user.age"
                  type="number"
                  class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Email：</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">主題：</label>
                <select
                  v-model="user.preferences.theme"
                  class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="dark">深色</option>
                  <option value="light">淺色</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">語言：</label>
                <select
                  v-model="user.preferences.language"
                  class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="zh-TW">繁體中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 非響應式數據區域 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-red-400">❌ 非響應式數據測試</h4>

        <!-- 非響應式輸入 -->
        <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h5 class="font-semibold text-red-400 mb-3">非響應式輸入</h5>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                非響應式文字：
              </label>
              <input
                v-model="nonReactiveMessage"
                type="text"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div class="text-xs text-red-400 mt-1">
                ⚠️ 修改這個值不會觸發計算屬性更新
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                非響應式數字：
              </label>
              <input
                v-model.number="nonReactiveNumber"
                type="number"
                class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div class="text-xs text-red-400 mt-1">
                ⚠️ 修改這個值不會觸發計算屬性更新
              </div>
            </div>
            <button
              @click="updateSnapshot"
              class="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              📸 手動更新快照到計算屬性
            </button>
          </div>
        </div>
      </div>

      <!-- 計算屬性結果區域 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-blue-400">📊 計算屬性結果</h4>

        <!-- 響應式計算結果 -->
        <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-2">✅ 響應式計算屬性</h5>
          <div class="text-green-100 font-mono text-sm">{{ reactiveComputed }}</div>
        </div>

        <!-- 非響應式計算結果 -->
        <div class="p-4 bg-red-900 border border-red-500 rounded-lg">
          <h5 class="text-sm font-semibold text-red-300 mb-2">❌ 非響應式計算屬性</h5>
          <div class="text-red-100 font-mono text-sm">{{ nonReactiveComputed }}</div>
          <div class="text-xs text-red-400 mt-1">
            ⚠️ 這個值不會自動更新，因為不依賴響應式數據
          </div>
        </div>

        <!-- 時間計算結果 -->
        <div class="p-4 bg-purple-900 border border-purple-500 rounded-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-2">🕐 時間計算屬性</h5>
          <div class="text-purple-100 font-mono text-sm">{{ formattedTime }}</div>
          <div class="text-xs text-purple-400 mt-1">
            依賴響應式時間，會自動更新
          </div>
        </div>

        <!-- 用戶信息計算結果 -->
        <div class="p-4 bg-blue-900 border border-blue-500 rounded-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-2">👤 用戶信息計算屬性</h5>
          <div class="text-blue-100 font-mono text-sm">{{ userInfo }}</div>
        </div>

        <!-- 用戶偏好計算結果 -->
        <div class="p-4 bg-cyan-900 border border-cyan-500 rounded-lg">
          <h5 class="text-sm font-semibold text-cyan-300 mb-2">⚙️ 用戶偏好計算屬性</h5>
          <div class="text-cyan-100 font-mono text-sm">{{ userPreferences }}</div>
        </div>
      </div>
    </div>



    <!-- 說明文字 -->
    <div class="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-4">🧠 響應式依賴追蹤解析</h4>

      <!-- 演示說明 -->
      <div class="mb-6 p-4 bg-blue-900 border border-blue-500 rounded-lg">
        <h5 class="font-semibold text-blue-300 mb-3">🎯 演示重點</h5>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-100">
          <div>
            <h6 class="font-semibold text-green-400 mb-2">✅ 響應式區域：</h6>
            <p>修改輸入框會立即觸發相關計算屬性重新計算，觀察控制台日誌。</p>
          </div>
          <div>
            <h6 class="font-semibold text-red-400 mb-2">❌ 非響應式區域：</h6>
            <p>修改輸入框不會觸發計算屬性，需要點擊「手動更新快照」按鈕。</p>
          </div>
          <div>
            <h6 class="font-semibold text-purple-400 mb-2">📊 計算屬性區域：</h6>
            <p>觀察哪些計算屬性會自動更新，哪些需要手動觸發。</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
        <div>
          <h5 class="font-semibold text-green-400 mb-2">✅ 響應式依賴：</h5>
          <ul class="space-y-1">
            <li>• ref() 創建的響應式引用</li>
            <li>• reactive() 創建的響應式物件</li>
            <li>• 物件的深層嵌套屬性也會被追蹤</li>
            <li>• 變化時會自動觸發計算屬性更新</li>
            <li>• 在控制台可以看到「計算被執行」的日誌</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-red-400 mb-2">❌ 模擬非響應式行為：</h5>
          <ul class="space-y-1">
            <li>• 計算屬性使用「快照」而不是直接引用</li>
            <li>• 修改數據不會自動觸發計算屬性更新</li>
            <li>• 需要手動更新快照才能看到變化</li>
            <li>• 這模擬了普通 JavaScript 變數的行為</li>
            <li>• 實際開發中應避免這種模式</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 隱藏的強制更新觸發器 -->
    <div style="display: none;">{{ forceUpdate }}</div>
  </div>
</template>