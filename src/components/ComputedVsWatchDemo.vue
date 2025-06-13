<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'

// === Computed 演示：數據計算和派生 ===

// Computed 專用的基礎數據
const computedPrice = ref(100)
const computedQuantity = ref(1)
const computedDiscountRate = ref(0)
const computedTaxRate = ref(0.05)

// Computed 專用的文字輸入
const computedUserText = ref('Hello World')
const computedSearchQuery = ref('')

// 商品列表（只用於 Computed）
const products = ref([
  { id: 1, name: 'iPhone', price: 30000, category: 'electronics', inStock: true },
  { id: 2, name: 'MacBook', price: 50000, category: 'electronics', inStock: false },
  { id: 3, name: 'T-shirt', price: 500, category: 'clothing', inStock: true },
  { id: 4, name: 'Jeans', price: 1200, category: 'clothing', inStock: true },
  { id: 5, name: 'Book', price: 300, category: 'books', inStock: true }
])

// Computed 計算屬性 - 這些都是「派生數據」，基於現有數據計算出新值
const subtotal = computed(() => {
  console.log('💰 Computed: 計算小計')
  return computedPrice.value * computedQuantity.value
})

const discountAmount = computed(() => {
  console.log('🎯 Computed: 計算折扣金額')
  return subtotal.value * (computedDiscountRate.value / 100)
})

const afterDiscount = computed(() => {
  console.log('💸 Computed: 計算折扣後金額')
  return subtotal.value - discountAmount.value
})

const taxAmount = computed(() => {
  console.log('📊 Computed: 計算稅額')
  return afterDiscount.value * computedTaxRate.value
})

const finalTotal = computed(() => {
  console.log('🧮 Computed: 計算最終總額')
  return afterDiscount.value + taxAmount.value
})

// 文字處理的計算屬性
const textStats = computed(() => {
  console.log('📝 Computed: 分析文字統計')
  const text = computedUserText.value
  return {
    length: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    uppercase: text.toUpperCase(),
    lowercase: text.toLowerCase(),
    reversed: text.split('').reverse().join(''),
    vowels: (text.match(/[aeiouAEIOU]/g) || []).length
  }
})

// 商品過濾的計算屬性
const filteredProducts = computed(() => {
  console.log('🔍 Computed: 過濾商品列表')
  if (!computedSearchQuery.value) return products.value

  return products.value.filter(product =>
    product.name.toLowerCase().includes(computedSearchQuery.value.toLowerCase()) ||
    product.category.toLowerCase().includes(computedSearchQuery.value.toLowerCase())
  )
})

const productStats = computed(() => {
  console.log('📈 Computed: 計算商品統計')
  const filtered = filteredProducts.value
  return {
    total: filtered.length,
    inStock: filtered.filter(p => p.inStock).length,
    outOfStock: filtered.filter(p => !p.inStock).length,
    averagePrice: filtered.length > 0
      ? Math.round(filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length)
      : 0,
    totalValue: filtered.reduce((sum, p) => sum + p.price, 0)
  }
})

// === Watch 演示：副作用和響應處理 ===

// Watch 專用的數據
const selectedPostType = ref('')
const isLoading = ref(false)
const apiResponse = ref('')
const postHistory = ref<string[]>([])

// 系統通知
const notifications = ref<string[]>([])

// 貼文類型選項
const postTypes = [
  { id: 'text', name: '文字貼文', icon: '📝', color: 'blue' },
  { id: 'image', name: '圖片貼文', icon: '🖼️', color: 'green' },
  { id: 'video', name: '影片貼文', icon: '🎥', color: 'purple' }
]

// Watch 監聽器 - 監聽貼文類型變化，執行 API 調用副作用
watch(selectedPostType, async (newType, oldType) => {
  if (!newType) return

  console.log(`📝 Watch: 貼文類型從 "${oldType || '無'}" 變更為 "${newType}"`)

  // 記錄變化
  const timestamp = new Date().toLocaleTimeString('zh-TW')
  addNotification(`📝 貼文類型變更：${oldType || '無'} → ${newType}`)

  // 開始 loading 狀態
  isLoading.value = true
  addNotification(`⏳ 開始載入 ${newType} 貼文模板...`)

  try {
    // 模擬 API 調用延遲
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    // 模擬 API 響應
    const responses = {
      text: '✅ 文字貼文模板載入成功！已準備文字編輯器。',
      image: '✅ 圖片貼文模板載入成功！已準備圖片上傳功能。',
      video: '✅ 影片貼文模板載入成功！已準備影片處理工具。'
    }

    apiResponse.value = responses[newType as keyof typeof responses] || '載入完成'
    addNotification(`✅ API 調用成功：${responses[newType as keyof typeof responses]}`)

    // 記錄到歷史
    postHistory.value.unshift(`[${timestamp}] 選擇了 ${newType} 貼文類型`)
    if (postHistory.value.length > 10) {
      postHistory.value = postHistory.value.slice(0, 10)
    }

  } catch (error) {
    apiResponse.value = '❌ API 調用失敗，請稍後重試'
    addNotification(`❌ API 調用失敗`)
  } finally {
    // 結束 loading 狀態
    isLoading.value = false
    addNotification(`🏁 載入完成`)
  }
})

// 工具函數
const addNotification = (message: string) => {
  const timestamp = new Date().toLocaleTimeString('zh-TW')
  notifications.value.unshift(`[${timestamp}] ${message}`)

  // 限制通知數量
  if (notifications.value.length > 15) {
    notifications.value = notifications.value.slice(0, 15)
  }
}

const clearNotifications = () => {
  notifications.value = []
  addNotification('🧹 通知已清除')
}

const resetAll = () => {
  // 重置 Computed 數據
  computedPrice.value = 100
  computedQuantity.value = 1
  computedDiscountRate.value = 0
  computedUserText.value = 'Hello World'
  computedSearchQuery.value = ''

  // 重置 Watch 數據
  selectedPostType.value = ''
  isLoading.value = false
  apiResponse.value = ''
  postHistory.value = []
  clearNotifications()
}

onMounted(() => {
  addNotification('🚀 Computed vs Watch 演示組件已載入')
})
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">Computed vs Watch 核心差異演示</h3>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Computed 演示：數據計算和派生 -->
      <div class="space-y-4">
        <div class="p-4 bg-blue-900 border border-blue-500 rounded-lg">
          <h4 class="text-lg font-semibold text-blue-300 mb-4">
            🧮 Computed：數據計算和派生
          </h4>
          <p class="text-sm text-blue-200 mb-4">
            Computed 用於基於現有數據<strong>計算出新的值</strong>，具有緩存機制，只有依賴變化時才重新計算。
          </p>

          <!-- 價格計算演示 -->
          <div class="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-gray-300 mb-3">💰 價格計算系統</h5>
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label class="block text-xs text-gray-400 mb-1">單價：</label>
                <input
                  v-model.number="computedPrice"
                  type="number"
                  min="1"
                  class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">數量：</label>
                <input
                  v-model.number="computedQuantity"
                  type="number"
                  min="1"
                  class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">折扣率 (%)：</label>
                <input
                  v-model.number="computedDiscountRate"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1">稅率 (%)：</label>
                <input
                  v-model.number="computedTaxRate"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- 計算結果 (Computed) -->
            <div class="space-y-2 text-sm">
              <div class="flex justify-between p-2 bg-gray-800 rounded">
                <span class="text-gray-400">小計：</span>
                <span class="text-white font-mono">NT$ {{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-800 rounded">
                <span class="text-gray-400">折扣：</span>
                <span class="text-red-400 font-mono">-NT$ {{ discountAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-800 rounded">
                <span class="text-gray-400">折扣後：</span>
                <span class="text-white font-mono">NT$ {{ afterDiscount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-800 rounded">
                <span class="text-gray-400">稅額：</span>
                <span class="text-yellow-400 font-mono">+NT$ {{ taxAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between p-2 bg-green-900 border border-green-500 rounded">
                <span class="text-green-300 font-semibold">總計：</span>
                <span class="text-green-300 font-bold font-mono">NT$ {{ Math.round(finalTotal).toLocaleString()
                }}</span>
              </div>
            </div>
          </div>

          <!-- 文字分析演示 -->
          <div class="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-gray-300 mb-3">📝 文字分析系統</h5>
            <div class="mb-3">
              <label class="block text-xs text-gray-400 mb-1">輸入文字：</label>
              <textarea
                v-model="computedUserText"
                rows="2"
                class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="輸入任何文字..."
              ></textarea>
            </div>

            <!-- 分析結果 (Computed) -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-blue-400 font-bold">{{ textStats.length }}</div>
                <div class="text-gray-400">字符數</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-green-400 font-bold">{{ textStats.words }}</div>
                <div class="text-gray-400">單詞數</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-purple-400 font-bold">{{ textStats.vowels }}</div>
                <div class="text-gray-400">母音數</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-yellow-400 font-bold">{{ textStats.reversed.slice(0, 8) }}...</div>
                <div class="text-gray-400">反轉</div>
              </div>
            </div>
          </div>

          <!-- 商品搜索演示 -->
          <div class="p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-gray-300 mb-3">🔍 商品搜索系統</h5>
            <div class="mb-3">
              <input
                v-model="computedSearchQuery"
                type="text"
                placeholder="搜索商品或分類..."
                class="w-full px-2 py-1 bg-gray-600 text-white text-sm border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- 搜索統計 (Computed) -->
            <div class="grid grid-cols-4 gap-2 mb-3 text-xs">
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-blue-400 font-bold">{{ productStats.total }}</div>
                <div class="text-gray-400">總數</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-green-400 font-bold">{{ productStats.inStock }}</div>
                <div class="text-gray-400">有庫存</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-red-400 font-bold">{{ productStats.outOfStock }}</div>
                <div class="text-gray-400">缺貨</div>
              </div>
              <div class="p-2 bg-gray-800 rounded text-center">
                <div class="text-yellow-400 font-bold">{{ productStats.averagePrice.toLocaleString() }}</div>
                <div class="text-gray-400">均價</div>
              </div>
            </div>

            <!-- 商品列表 (Computed) -->
            <div class="max-h-32 overflow-y-auto space-y-1">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="flex justify-between items-center p-2 bg-gray-800 rounded text-sm"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-white">{{ product.name }}</span>
                  <span class="text-gray-400 text-xs">({{ product.category }})</span>
                  <span
                    :class="product.inStock ? 'text-green-400' : 'text-red-400'"
                    class="text-xs"
                  >
                    {{ product.inStock ? '有庫存' : '缺貨' }}
                  </span>
                </div>
                <span class="text-yellow-400">NT$ {{ product.price.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Watch 演示：副作用和響應處理 -->
      <div class="space-y-4">
        <div class="p-4 bg-purple-900 border border-purple-500 rounded-lg">
          <h4 class="text-lg font-semibold text-purple-300 mb-4">
            👁️ Watch：副作用和響應處理
          </h4>
          <p class="text-sm text-purple-200 mb-4">
            Watch 用於在數據變化時<strong>執行副作用操作</strong>。調整下方控件，觀察每個變化如何觸發不同的副作用。
          </p>

          <!-- Watch 觸發控制區域 -->
          <div class="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
            <h5 class="font-semibold text-gray-300 mb-3">📝 選擇貼文類型</h5>
            <div class="space-y-4">
              <!-- 貼文類型按鈕 -->
              <div class="grid grid-cols-1 gap-3">
                <button
                  v-for="postType in postTypes"
                  :key="postType.id"
                  @click="selectedPostType = postType.id"
                  :disabled="isLoading"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200',
                    selectedPostType === postType.id
                      ? 'border-purple-500 bg-purple-900/50'
                      : 'border-gray-600 bg-gray-800 hover:border-purple-400',
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <span class="text-2xl">{{ postType.icon }}</span>
                    <div class="text-left">
                      <div class="text-white font-medium">{{ postType.name }}</div>
                      <div class="text-xs text-gray-400">
                        點擊選擇此類型貼文
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="selectedPostType === postType.id"
                    class="text-purple-400"
                  >
                    ✓ 已選擇
                  </div>
                </button>
              </div>

              <!-- Loading 狀態 -->
              <div
                v-if="isLoading"
                class="p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg"
              >
                <div class="flex items-center space-x-3">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
                  <div>
                    <div class="text-yellow-300 font-medium">載入中...</div>
                    <div class="text-xs text-yellow-400">正在載入貼文模板，請稍候</div>
                  </div>
                </div>
              </div>

              <!-- API 響應結果 -->
              <div
                v-if="apiResponse && !isLoading"
                class="p-3 bg-green-900/30 border border-green-500 rounded-lg"
              >
                <div class="text-green-300 font-medium mb-1">API 響應結果：</div>
                <div class="text-sm text-green-200">{{ apiResponse }}</div>
              </div>

              <!-- 說明文字 -->
              <div class="text-xs text-purple-400 bg-purple-900/20 p-2 rounded">
                💡 選擇任一貼文類型，Watch 會監聽到變化並自動觸發 API 調用
              </div>
            </div>
          </div>

          <!-- Watch 副作用狀態 -->
          <div class="mb-4 p-3 bg-yellow-900 border border-yellow-500 rounded">
            <h5 class="font-semibold text-yellow-300 mb-2">📊 Watch 副作用狀態</h5>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="p-2 bg-gray-800 rounded">
                <div class="text-gray-400 text-xs">當前選擇</div>
                <div class="text-white">
                  {{selectedPostType ? postTypes.find(pt => pt.id === selectedPostType)?.name : '未選擇'}}
                </div>
              </div>
              <div class="p-2 bg-gray-800 rounded">
                <div class="text-gray-400 text-xs">載入狀態</div>
                <div :class="isLoading ? 'text-yellow-400' : 'text-gray-400'">
                  {{ isLoading ? '⏳ 載入中' : '✅ 待機中' }}
                </div>
              </div>
              <div class="p-2 bg-gray-800 rounded">
                <div class="text-gray-400 text-xs">選擇次數</div>
                <div class="text-blue-400">{{ postHistory.length }}</div>
              </div>
              <div class="p-2 bg-gray-800 rounded">
                <div class="text-gray-400 text-xs">最後選擇</div>
                <div class="text-purple-400 text-xs">
                  {{ postHistory.length > 0 ? postHistory[0].split('] ')[1] : '無' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 選擇歷史 -->
          <div class="mb-4 p-3 bg-gray-700 border border-gray-600 rounded">
            <h5 class="font-semibold text-gray-300 mb-2">📋 選擇歷史</h5>
            <div class="max-h-24 overflow-y-auto space-y-1">
              <div
                v-for="(history, index) in postHistory.slice(0, 5)"
                :key="index"
                class="p-1 bg-gray-800 rounded text-xs text-gray-300"
              >
                {{ history }}
              </div>
              <div
                v-if="postHistory.length === 0"
                class="text-center text-gray-400 py-2 text-xs"
              >
                暫無選擇歷史
              </div>
            </div>
          </div>

          <!-- 系統通知 (Watch 產生的副作用) -->
          <div class="p-3 bg-gray-700 border border-gray-600 rounded">
            <div class="flex justify-between items-center mb-2">
              <h5 class="font-semibold text-gray-300">🔔 系統通知 (Watch 副作用)</h5>
              <button
                @click="clearNotifications"
                class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                清除
              </button>
            </div>
            <div class="max-h-40 overflow-y-auto space-y-1">
              <div
                v-for="(notification, index) in notifications"
                :key="index"
                class="p-2 bg-gray-800 rounded text-xs text-gray-300 font-mono"
              >
                {{ notification }}
              </div>
            </div>
            <div
              v-if="notifications.length === 0"
              class="text-center text-gray-400 py-4 text-sm"
            >
              暫無系統通知
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <div class="mt-6 flex flex-wrap gap-3 justify-center">
      <button
        @click="resetAll"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        🔄 重置所有設定
      </button>
      <button
        @click="clearNotifications"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        🧹 清除通知
      </button>
    </div>

    <!-- 核心差異說明 -->
    <div class="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-4">🧠 核心差異總結</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
        <div>
          <h5 class="font-semibold text-blue-400 mb-3">🧮 Computed 的本質：</h5>
          <ul class="space-y-2">
            <li class="flex items-start space-x-2">
              <span class="text-blue-400 mt-1">•</span>
              <div>
                <strong class="text-blue-300">數據派生：</strong>
                <span>基於現有數據計算出新的值</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-400 mt-1">•</span>
              <div>
                <strong class="text-blue-300">純函數：</strong>
                <span>不產生副作用，只返回計算結果</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-400 mt-1">•</span>
              <div>
                <strong class="text-blue-300">智能緩存：</strong>
                <span>依賴不變時使用緩存，避免重複計算</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-400 mt-1">•</span>
              <div>
                <strong class="text-blue-300">同步計算：</strong>
                <span>立即返回計算結果，用於模板渲染</span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="font-semibold text-purple-400 mb-3">👁️ Watch 的本質：</h5>
          <ul class="space-y-2">
            <li class="flex items-start space-x-2">
              <span class="text-purple-400 mt-1">•</span>
              <div>
                <strong class="text-purple-300">副作用執行：</strong>
                <span>在數據變化時執行額外操作</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-400 mt-1">•</span>
              <div>
                <strong class="text-purple-300">異步處理：</strong>
                <span>可以執行 API 調用、定時器等異步操作</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-400 mt-1">•</span>
              <div>
                <strong class="text-purple-300">狀態同步：</strong>
                <span>將變化同步到外部系統或服務</span>
              </div>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-purple-400 mt-1">•</span>
              <div>
                <strong class="text-purple-300">行為觸發：</strong>
                <span>觸發日誌記錄、通知發送等行為</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-3 bg-yellow-900 border border-yellow-500 rounded">
        <h5 class="font-semibold text-yellow-300 mb-2">💡 簡單記憶法</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="text-center">
            <strong class="text-blue-400">Computed：</strong>
            <div class="text-gray-300 mt-1">「我需要一個<span class="text-blue-300">計算出來的值</span>」</div>
            <div class="text-xs text-gray-400 mt-1">→ 用於模板顯示、數據轉換</div>
          </div>
          <div class="text-center">
            <strong class="text-purple-400">Watch：</strong>
            <div class="text-gray-300 mt-1">「數據變化時我要<span class="text-purple-300">做某件事</span>」</div>
            <div class="text-xs text-gray-400 mt-1">→ 用於 API 調用、狀態同步</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>