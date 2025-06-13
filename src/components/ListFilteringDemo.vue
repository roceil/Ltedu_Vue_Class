<script lang="ts" setup>
import { ref, computed } from 'vue'

// 商品數據
const products = ref([
  { id: 1, name: 'iPhone 14', category: '手機', price: 28900, rating: 4.8, inStock: true },
  { id: 2, name: 'MacBook Pro', category: '筆電', price: 59900, rating: 4.9, inStock: true },
  { id: 3, name: 'AirPods Pro', category: '耳機', price: 7490, rating: 4.7, inStock: false },
  { id: 4, name: 'iPad Air', category: '平板', price: 18900, rating: 4.6, inStock: true },
  { id: 5, name: 'Apple Watch', category: '穿戴', price: 12900, rating: 4.5, inStock: true },
  { id: 6, name: 'Samsung Galaxy', category: '手機', price: 25900, rating: 4.4, inStock: true },
  { id: 7, name: 'Dell XPS', category: '筆電', price: 45900, rating: 4.3, inStock: false },
  { id: 8, name: 'Sony WH-1000XM4', category: '耳機', price: 9900, rating: 4.8, inStock: true },
  { id: 9, name: 'Surface Pro', category: '平板', price: 35900, rating: 4.2, inStock: true },
  { id: 10, name: 'Fitbit Versa', category: '穿戴', price: 6900, rating: 4.1, inStock: false }
])

// 篩選條件
const searchQuery = ref('')
const selectedCategory = ref('all')
const minPrice = ref(0)
const maxPrice = ref(100000)
const showInStockOnly = ref(false)
const minRating = ref(0)
const sortBy = ref('name')
const sortOrder = ref('asc')

// 類別選項
const categories = ref(['all', '手機', '筆電', '耳機', '平板', '穿戴'])

// 排序選項
const sortOptions = ref([
  { value: 'name', label: '名稱' },
  { value: 'price', label: '價格' },
  { value: 'rating', label: '評分' },
  { value: 'category', label: '類別' }
])

// 過濾後的商品列表
const filteredProducts = computed(() => {
  console.log('🔍 商品過濾計算被執行')

  let result = products.value.filter(product => {
    // 搜索過濾
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 類別過濾
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value

    // 價格過濾
    const matchesPrice = product.price >= minPrice.value && product.price <= maxPrice.value

    // 庫存過濾
    const matchesStock = !showInStockOnly.value || product.inStock

    // 評分過濾
    const matchesRating = product.rating >= minRating.value

    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesRating
  })

  // 排序處理
  result.sort((a, b) => {
    let aValue = a[sortBy.value as keyof typeof a]
    let bValue = b[sortBy.value as keyof typeof b]

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  console.log(`✅ 過濾結果: ${result.length} 件商品`)
  return result
})

// 統計信息
const statistics = computed(() => {
  console.log('📊 商品統計計算被執行')

  const filtered = filteredProducts.value
  const total = products.value.length

  return {
    total,
    filtered: filtered.length,
    totalValue: filtered.reduce((sum, product) => sum + product.price, 0),
    averagePrice: filtered.length > 0 ? Math.round(filtered.reduce((sum, product) => sum + product.price, 0) / filtered.length) : 0,
    averageRating: filtered.length > 0 ? +(filtered.reduce((sum, product) => sum + product.rating, 0) / filtered.length).toFixed(1) : 0,
    inStock: filtered.filter(p => p.inStock).length,
    outOfStock: filtered.filter(p => !p.inStock).length
  }
})

// 類別統計
const categoryStats = computed(() => {
  console.log('🏷️ 類別統計計算被執行')

  const stats: Record<string, number> = {}
  filteredProducts.value.forEach(product => {
    stats[product.category] = (stats[product.category] || 0) + 1
  })

  return Object.entries(stats).map(([category, count]) => ({
    category,
    count
  }))
})

// 重置所有篩選條件
const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  minPrice.value = 0
  maxPrice.value = 100000
  showInStockOnly.value = false
  minRating.value = 0
  sortBy.value = 'name'
  sortOrder.value = 'asc'
  console.log('🔄 所有篩選條件已重置')
}

// 添加隨機商品
const addRandomProduct = () => {
  const names = ['新商品A', '新商品B', '新商品C', '新商品D']
  const categories = ['手機', '筆電', '耳機', '平板', '穿戴']

  const newProduct = {
    id: Math.max(...products.value.map(p => p.id)) + 1,
    name: names[Math.floor(Math.random() * names.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 50000) + 5000,
    rating: +(Math.random() * 2 + 3).toFixed(1),
    inStock: Math.random() > 0.3
  }

  products.value.push(newProduct)
  console.log('➕ 新增商品:', newProduct)
}

// 移除最後一個商品
const removeLastProduct = () => {
  if (products.value.length > 0) {
    const removed = products.value.pop()
    console.log('➖ 移除商品:', removed)
  }
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">列表過濾與搜索演示</h3>

    <!-- 控制面板 -->
    <div class="mb-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🎮 商品管理</h4>
      <div class="flex flex-wrap gap-3">
        <button
          @click="addRandomProduct"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          ➕ 新增商品
        </button>
        <button
          @click="removeLastProduct"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          ➖ 移除商品
        </button>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          🔄 重置篩選
        </button>
      </div>
    </div>

    <!-- 篩選條件 -->
    <div class="mb-6 p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🔍 篩選條件</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- 搜索 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">商品搜索</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索商品名稱..."
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- 類別篩選 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">商品類別</label>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category === 'all' ? '全部類別' : category }}
            </option>
          </select>
        </div>

        <!-- 評分篩選 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">最低評分: {{ minRating }}</label>
          <input
            v-model.number="minRating"
            type="range"
            min="0"
            max="5"
            step="0.1"
            class="w-full"
          />
        </div>

        <!-- 價格範圍 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">最低價格</label>
          <input
            v-model.number="minPrice"
            type="number"
            min="0"
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">最高價格</label>
          <input
            v-model.number="maxPrice"
            type="number"
            min="0"
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- 庫存篩選 -->
        <div class="flex items-center">
          <input
            id="inStock"
            v-model="showInStockOnly"
            type="checkbox"
            class="mr-2"
          />
          <label
            for="inStock"
            class="text-sm text-gray-300"
          >僅顯示有庫存商品</label>
        </div>
      </div>

      <!-- 排序選項 -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">排序方式</label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">排序順序</label>
          <select
            v-model="sortOrder"
            class="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 統計信息 -->
    <div class="mb-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div class="p-3 bg-blue-900 border border-blue-500 rounded text-center">
        <div class="text-2xl font-bold text-blue-100">{{ statistics.filtered }}</div>
        <div class="text-xs text-blue-300">顯示商品</div>
      </div>
      <div class="p-3 bg-gray-900 border border-gray-500 rounded text-center">
        <div class="text-2xl font-bold text-gray-100">{{ statistics.total }}</div>
        <div class="text-xs text-gray-300">總計商品</div>
      </div>
      <div class="p-3 bg-green-900 border border-green-500 rounded text-center">
        <div class="text-2xl font-bold text-green-100">{{ statistics.inStock }}</div>
        <div class="text-xs text-green-300">有庫存</div>
      </div>
      <div class="p-3 bg-red-900 border border-red-500 rounded text-center">
        <div class="text-2xl font-bold text-red-100">{{ statistics.outOfStock }}</div>
        <div class="text-xs text-red-300">無庫存</div>
      </div>
      <div class="p-3 bg-purple-900 border border-purple-500 rounded text-center">
        <div class="text-lg font-bold text-purple-100">{{ statistics.averagePrice.toLocaleString() }}</div>
        <div class="text-xs text-purple-300">平均價格</div>
      </div>
      <div class="p-3 bg-yellow-900 border border-yellow-500 rounded text-center">
        <div class="text-2xl font-bold text-yellow-100">{{ statistics.averageRating }}</div>
        <div class="text-xs text-yellow-300">平均評分</div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">📦 商品列表</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="p-4 bg-gray-700 border border-gray-600 rounded-lg"
        >
          <div class="flex justify-between items-start mb-2">
            <h5 class="font-semibold text-white">{{ product.name }}</h5>
            <span
              class="px-2 py-1 text-xs rounded"
              :class="product.inStock ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'"
            >
              {{ product.inStock ? '有庫存' : '缺貨' }}
            </span>
          </div>
          <div class="text-sm text-gray-400 mb-1">類別: {{ product.category }}</div>
          <div class="text-lg font-bold text-blue-400 mb-1">NT$ {{ product.price.toLocaleString() }}</div>
          <div class="flex items-center text-sm text-yellow-400">
            ⭐ {{ product.rating }}
          </div>
        </div>
      </div>

      <div
        v-if="filteredProducts.length === 0"
        class="text-center py-8 text-gray-400"
      >
        😔 沒有符合條件的商品
      </div>
    </div>

    <!-- 類別統計 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">🏷️ 類別統計</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div
          v-for="stat in categoryStats"
          :key="stat.category"
          class="p-3 bg-indigo-900 border border-indigo-500 rounded text-center"
        >
          <div class="text-2xl font-bold text-indigo-100">{{ stat.count }}</div>
          <div class="text-xs text-indigo-300">{{ stat.category }}</div>
        </div>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="p-4 bg-gray-700 border border-gray-600 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-300 mb-2">💡 計算屬性的強大之處</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
        <div>
          <h5 class="font-semibold text-blue-400 mb-2">🔍 智能過濾：</h5>
          <ul class="space-y-1">
            <li>• 多條件組合過濾，自動計算結果</li>
            <li>• 只有篩選條件變化時才重新計算</li>
            <li>• 支援複雜的搜索和排序邏輯</li>
            <li>• 即時反應用戶操作</li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold text-green-400 mb-2">📊 動態統計：</h5>
          <ul class="space-y-1">
            <li>• 自動計算過濾後的統計信息</li>
            <li>• 類別分布即時更新</li>
            <li>• 價格和評分的平均值計算</li>
            <li>• 庫存狀態統計</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>