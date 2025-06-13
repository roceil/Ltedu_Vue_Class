<script lang="ts" setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: '筆記型電腦', price: 30000, category: '電子產品' },
  { id: 2, name: '咖啡杯', price: 200, category: '生活用品' },
  { id: 3, name: '手機', price: 15000, category: '電子產品' },
  { id: 4, name: '書籍', price: 300, category: '書籍' },
])

const selectedCategory = ref('all')
const sortBy = ref('name')

// 過濾和排序的計算屬性
const filteredProducts = computed(() => {
  let result = products.value

  // 過濾
  if (selectedCategory.value !== 'all') {
    result = result.filter(
      product => product.category === selectedCategory.value,
    )
  }

  // 排序
  result = [...result].sort((a, b) => {
    if (sortBy.value === 'price') {
      return a.price - b.price
    }
    return a.name.localeCompare(b.name)
  })

  return result
})

const addProduct = () => {
  // 處理空數組的情況
  const newId = products.value.length > 0
    ? Math.max(...products.value.map(p => p.id)) + 1
    : 1
  products.value.push({
    id: newId,
    name: `新產品 ${newId}`,
    price: Math.floor(Math.random() * 10000) + 100,
    category: '電子產品',
  })
}

const removeProduct = (id: number) => {
  const index = products.value.findIndex(p => p.id === id)
  if (index > -1) {
    products.value.splice(index, 1)
  }
}

// 獲取所有分類
const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return cats
})
</script>

<template>
  <div class="space-y-6">
    <!-- 控制面板 -->
    <div class="p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-4">🎛️ 控制面板</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 分類過濾 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">分類過濾</label>
          <select
            v-model="selectedCategory"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">所有分類</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- 排序方式 -->
        <div>
          <label class="block text-sm text-gray-400 mb-2">排序方式</label>
          <select
            v-model="sortBy"
            class="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">按名稱排序</option>
            <option value="price">按價格排序</option>
          </select>
        </div>

        <!-- 操作按鈕 -->
        <div class="flex items-end">
          <button
            @click="addProduct"
            class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            新增產品
          </button>
        </div>
      </div>
    </div>

    <!-- 響應式說明 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-2">⚡ 響應式更新機制</h4>
      <p class="text-sm text-blue-200 mb-2">
        當你改變過濾條件或排序方式時，V-for 會自動重新渲染列表：
      </p>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>計算屬性：</strong> 自動追蹤依賴的響應式數據</li>
        <li>• <strong>智能更新：</strong> 只更新變化的部分，不重新渲染整個列表</li>
        <li>• <strong>Key 追蹤：</strong> 使用唯一 ID 確保元素正確重用</li>
        <li>• <strong>動畫過渡：</strong> 平滑的進入和離開效果</li>
      </ul>
    </div>

    <!-- 統計信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-blue-400">{{ products.length }}</div>
        <div class="text-xs text-gray-400">總產品數</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-green-400">{{ filteredProducts.length }}</div>
        <div class="text-xs text-gray-400">顯示數量</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-yellow-400">{{ categories.length }}</div>
        <div class="text-xs text-gray-400">分類數量</div>
      </div>
      <div class="p-3 bg-gray-800 border border-gray-600 rounded text-center">
        <div class="text-2xl font-bold text-purple-400">
          ${{filteredProducts.reduce((sum: number, p: any) => sum + p.price, 0).toLocaleString()}}
        </div>
        <div class="text-xs text-gray-400">總價值</div>
      </div>
    </div>

    <!-- 產品列表 -->
    <div class="space-y-4">
      <h4 class="text-lg font-semibold text-gray-300">
        產品列表
        <span class="text-sm text-gray-500">
          ({{ selectedCategory === 'all' ? '所有分類' : selectedCategory }} -
          {{ sortBy === 'name' ? '按名稱' : '按價格' }}排序)
        </span>
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="p-4 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300"
        >
          <div class="flex justify-between items-start mb-3">
            <h5 class="text-white font-medium">{{ product.name }}</h5>
            <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">
              ID: {{ product.id }}
            </span>
          </div>

          <div class="space-y-2">
            <p class="text-green-400 font-bold text-lg">
              ${{ product.price.toLocaleString() }}
            </p>
            <p class="text-gray-400 text-sm">
              分類: {{ product.category }}
            </p>
          </div>

          <button
            @click="removeProduct(product.id)"
            class="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            移除產品
          </button>
        </div>
      </div>

      <!-- 空狀態 -->
      <div
        v-if="filteredProducts.length === 0"
        class="p-8 text-center bg-gray-800 border border-gray-600 rounded-lg"
      >
        <div class="text-4xl mb-4">📦</div>
        <h4 class="text-gray-300 font-medium mb-2">沒有找到產品</h4>
        <p class="text-gray-500 text-sm">
          嘗試更改過濾條件或新增一些產品
        </p>
      </div>
    </div>

    <!-- 技術說明 -->
    <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-3">🔧 技術實現</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="text-yellow-400 font-medium mb-2">計算屬性 (Computed)</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• 自動追蹤 products、selectedCategory、sortBy</li>
            <li>• 只在依賴變化時重新計算</li>
            <li>• 結果會被緩存，提高性能</li>
          </ul>
        </div>
        <div>
          <h5 class="text-green-400 font-medium mb-2">響應式更新</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• V-for 監聽 filteredProducts 變化</li>
            <li>• 使用 product.id 作為 key</li>
            <li>• 智能 diff 算法優化渲染</li>
          </ul>
        </div>
      </div>

      <!-- 新增：Diff 算法詳細說明 -->
      <div class="mt-4 p-4 bg-gray-800 border border-gray-600 rounded-lg">
        <h5 class="text-purple-400 font-medium mb-3">⚡ 智能 Diff 算法說明</h5>
        <p class="text-sm text-gray-300 mb-3">
          當數據改變時，Vue 不會重新渲染整個列表，而是使用智能比較算法：
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h6 class="text-blue-400 font-medium mb-2">🔍 比較過程</h6>
            <ul class="text-sm text-gray-400 space-y-1">
              <li>• 建立新的虛擬 DOM 樹</li>
              <li>• 與舊虛擬 DOM 進行比較</li>
              <li>• 找出真正有變化的節點</li>
              <li>• 只更新變化的 DOM 元素</li>
            </ul>
          </div>

          <div>
            <h6 class="text-green-400 font-medium mb-2">🚀 性能優勢</h6>
            <ul class="text-sm text-gray-400 space-y-1">
              <li>• 最小化 DOM 操作次數</li>
              <li>• 重用未變化的元件實例</li>
              <li>• 保持元件內部狀態</li>
              <li>• 流暢的動畫過渡效果</li>
            </ul>
          </div>
        </div>

        <div class="mt-3 p-3 bg-gray-700 rounded border-l-4 border-purple-500">
          <p class="text-sm text-gray-300">
            <strong class="text-purple-400">實際效果：</strong>
            當你切換過濾條件時，符合條件的產品卡片會保持原狀，
            只有不符合的會淡出，新符合的會淡入，而不是重建整個列表。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>