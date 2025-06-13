<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

// 搜尋相關數據
const searchQuery = ref('')
const filterCategory = ref('all')
const sortOrder = ref('asc')

// 模擬數據
const mockData = ref([
  { id: 1, name: 'Apple iPhone', category: 'electronics', price: 999 },
  { id: 2, name: 'Samsung Galaxy', category: 'electronics', price: 899 },
  { id: 3, name: 'Nike Shoes', category: 'fashion', price: 120 },
  { id: 4, name: 'Adidas Shirt', category: 'fashion', price: 45 },
  { id: 5, name: 'Coffee Maker', category: 'home', price: 89 },
  { id: 6, name: 'Desk Lamp', category: 'home', price: 35 }
])

// 執行日誌
const watchLogs = ref<string[]>([])
const watchEffectLogs = ref<string[]>([])

// Watch 實現
const watchResults = ref<typeof mockData.value>([])

// 使用 Watch 實現搜尋邏輯
watch([searchQuery, filterCategory, sortOrder],
  ([query, category, order]) => {
    const timestamp = new Date().toLocaleTimeString()
    watchLogs.value.unshift(`[${timestamp}] Watch 觸發 - 查詢:"${query}", 分類:"${category}", 排序:"${order}"`)

    // 過濾邏輯
    let filtered = mockData.value.slice()

    // 按分類篩選
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category)
    }

    // 按關鍵字搜尋
    if (query) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    }

    // 排序
    filtered.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })

    watchResults.value = filtered

    console.log('Watch 執行結果:', filtered)
  }
)

// WatchEffect 實現
const watchEffectResults = ref<typeof mockData.value>([])

// 使用 WatchEffect 實現相同邏輯
watchEffect(() => {
  const timestamp = new Date().toLocaleTimeString()
  watchEffectLogs.value.unshift(`[${timestamp}] WatchEffect 觸發 - 自動追蹤依賴`)

  // 在函數中訪問響應式數據，自動建立依賴關係
  const query = searchQuery.value
  const category = filterCategory.value
  const order = sortOrder.value

  // 過濾邏輯（與 Watch 相同）
  let filtered = mockData.value.slice()

  if (category !== 'all') {
    filtered = filtered.filter(item => item.category === category)
  }

  if (query) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  filtered.sort((a, b) => {
    if (order === 'asc') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  })

  watchEffectResults.value = filtered

  console.log('WatchEffect 執行結果:', filtered)
})

// 重置搜尋
const resetSearch = () => {
  searchQuery.value = ''
  filterCategory.value = 'all'
  sortOrder.value = 'asc'
}

// 清除日誌
const clearLogs = () => {
  watchLogs.value = []
  watchEffectLogs.value = []
}

// 測試不同場景
const testScenarios = {
  scenario1: () => {
    searchQuery.value = 'iPhone'
    filterCategory.value = 'electronics'
    sortOrder.value = 'desc'
  },
  scenario2: () => {
    searchQuery.value = ''
    filterCategory.value = 'fashion'
    sortOrder.value = 'asc'
  },
  scenario3: () => {
    searchQuery.value = 'e'
    filterCategory.value = 'all'
    sortOrder.value = 'desc'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 控制面板 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-4">搜尋控制面板</h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">搜尋關鍵字</label>
          <input
            v-model="searchQuery"
            class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入商品名稱..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">商品分類</label>
          <select
            v-model="filterCategory"
            class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全部分類</option>
            <option value="electronics">電子產品</option>
            <option value="fashion">時尚服飾</option>
            <option value="home">家居用品</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">價格排序</label>
          <select
            v-model="sortOrder"
            class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">價格低到高</option>
            <option value="desc">價格高到低</option>
          </select>
        </div>
      </div>

      <!-- 快速測試按鈕 -->
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          @click="testScenarios.scenario1"
          class="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
        >
          測試場景 1
        </button>
        <button
          @click="testScenarios.scenario2"
          class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
        >
          測試場景 2
        </button>
        <button
          @click="testScenarios.scenario3"
          class="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
        >
          測試場景 3
        </button>
        <button
          @click="resetSearch"
          class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
        >
          重置搜尋
        </button>
        <button
          @click="clearLogs"
          class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
        >
          清除日誌
        </button>
      </div>
    </div>

    <!-- 結果對比 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Watch 實現 -->
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h4 class="text-lg font-semibold text-blue-400 mb-3">Watch 實現</h4>

          <!-- 搜尋結果 -->
          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-300">搜尋結果 ({{ watchResults.length }} 項)</div>
            <div class="h-40 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700">
              <div
                v-if="watchResults.length === 0"
                class="text-gray-500 text-sm"
              >沒有符合條件的商品</div>
              <div
                v-for="item in watchResults"
                :key="item.id"
                class="flex justify-between items-center p-2 mb-1 bg-gray-800 rounded text-sm"
              >
                <div>
                  <div class="font-medium text-gray-200">{{ item.name }}</div>
                  <div class="text-xs text-gray-400">{{ item.category }}</div>
                </div>
                <div class="text-blue-400 font-bold">${{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Watch 執行日誌 -->
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h5 class="text-md font-semibold text-blue-400 mb-2">執行日誌</h5>
          <div class="h-32 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="watchLogs.length === 0"
              class="text-gray-500"
            >暫無執行記錄</div>
            <div
              v-for="(log, index) in watchLogs"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <!-- WatchEffect 實現 -->
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h4 class="text-lg font-semibold text-green-400 mb-3">WatchEffect 實現</h4>

          <!-- 搜尋結果 -->
          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-300">搜尋結果 ({{ watchEffectResults.length }} 項)</div>
            <div class="h-40 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700">
              <div
                v-if="watchEffectResults.length === 0"
                class="text-gray-500 text-sm"
              >沒有符合條件的商品</div>
              <div
                v-for="item in watchEffectResults"
                :key="item.id"
                class="flex justify-between items-center p-2 mb-1 bg-gray-800 rounded text-sm"
              >
                <div>
                  <div class="font-medium text-gray-200">{{ item.name }}</div>
                  <div class="text-xs text-gray-400">{{ item.category }}</div>
                </div>
                <div class="text-green-400 font-bold">${{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- WatchEffect 執行日誌 -->
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h5 class="text-md font-semibold text-green-400 mb-2">執行日誌</h5>
          <div class="h-32 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="watchEffectLogs.length === 0"
              class="text-gray-500"
            >暫無執行記錄</div>
            <div
              v-for="(log, index) in watchEffectLogs"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 程式碼對比 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
        <h5 class="text-blue-300 font-semibold mb-2">Watch 程式碼特點</h5>
        <div class="text-xs text-blue-200 space-y-2 font-mono bg-blue-900/20 p-3 rounded border border-blue-700">
          <div>watch([searchQuery, filterCategory, sortOrder],</div>
          <div>&nbsp;&nbsp;([query, category, order]) => {</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;// 明確指定監聽的數據源</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;// 可以訪問新值和舊值</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;// 執行搜尋邏輯...</div>
          <div>&nbsp;&nbsp;})</div>
        </div>
        <ul class="text-sm text-blue-200 space-y-1 mt-3">
          <li>• 明確指定要監聽的響應式數據</li>
          <li>• 可以訪問變化前後的值</li>
          <li>• 精確控制何時觸發</li>
        </ul>
      </div>

      <div class="p-4 bg-green-900/30 border border-green-600 rounded-lg">
        <h5 class="text-green-300 font-semibold mb-2">WatchEffect 程式碼特點</h5>
        <div class="text-xs text-green-200 space-y-2 font-mono bg-green-900/20 p-3 rounded border border-green-700">
          <div>watchEffect(() => {</div>
          <div>&nbsp;&nbsp;// 自動追蹤函數內的響應式數據</div>
          <div>&nbsp;&nbsp;const query = searchQuery.value</div>
          <div>&nbsp;&nbsp;const category = filterCategory.value</div>
          <div>&nbsp;&nbsp;const order = sortOrder.value</div>
          <div>&nbsp;&nbsp;// 執行搜尋邏輯...</div>
          <div>})</div>
        </div>
        <ul class="text-sm text-green-200 space-y-1 mt-3">
          <li>• 自動追蹤函數內的響應式依賴</li>
          <li>• 無需手動指定監聽目標</li>
          <li>• 立即執行且自動重執行</li>
        </ul>
      </div>
    </div>

    <!-- 總結對比 -->
    <div class="p-4 bg-purple-900/30 border border-purple-600 rounded-lg">
      <h5 class="text-purple-300 font-semibold mb-3">📊 實際使用對比</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h6 class="text-purple-200 font-medium mb-2">適合使用 Watch：</h6>
          <ul class="text-sm text-purple-200 space-y-1">
            <li>• 需要精確控制監聽的數據源</li>
            <li>• 需要比較新舊值</li>
            <li>• 需要複雜的觸發條件</li>
            <li>• 需要避免不必要的重複執行</li>
          </ul>
        </div>
        <div>
          <h6 class="text-purple-200 font-medium mb-2">適合使用 WatchEffect：</h6>
          <ul class="text-sm text-purple-200 space-y-1">
            <li>• 依賴多個響應式數據</li>
            <li>• 不需要訪問舊值</li>
            <li>• 希望簡化依賴管理</li>
            <li>• 需要立即執行初始化</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>