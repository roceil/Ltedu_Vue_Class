<script lang="ts" setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  { id: 1, name: '筆記型電腦', price: 30000, quantity: 1 },
  { id: 2, name: '滑鼠', price: 500, quantity: 2 },
  { id: 3, name: '鍵盤', price: 1200, quantity: 1 },
])

const updateQuantity = (item: any, newQuantity: number) => {
  if (newQuantity <= 0) {
    removeFromCart(item.id)
    return
  }
  item.quantity = newQuantity
}

const removeFromCart = (itemId: number) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const addToCart = () => {
  // 處理空數組的情況
  const newId = cartItems.value.length > 0
    ? Math.max(...cartItems.value.map(item => item.id)) + 1
    : 1
  const products = ['耳機', '充電器', '手機殼', '平板', '智慧手錶', '藍牙喇叭']
  const randomProduct = products[Math.floor(Math.random() * products.length)]

  cartItems.value.push({
    id: newId,
    name: randomProduct,
    price: Math.floor(Math.random() * 5000) + 100,
    quantity: 1,
  })
}

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const clearCart = () => {
  cartItems.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- 購物車標題和統計 -->
    <div class="flex justify-between items-center p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <div>
        <h4 class="text-xl font-bold text-white">🛒 購物車</h4>
        <p class="text-gray-400 text-sm">
          {{ cartItems.length }} 種商品，共 {{ totalItems }} 件
        </p>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold text-green-400">
          ${{ totalPrice.toLocaleString() }}
        </div>
        <div class="text-sm text-gray-400">總計</div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div class="flex gap-3">
      <button
        @click="addToCart"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      >
        隨機添加商品
      </button>
      <button
        @click="clearCart"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
        :disabled="cartItems.length === 0"
        :class="{ 'opacity-50 cursor-not-allowed': cartItems.length === 0 }"
      >
        清空購物車
      </button>
    </div>

    <!-- 購物車商品列表 -->
    <div class="space-y-3">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="p-4 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        <div class="flex items-center justify-between">
          <!-- 商品信息 -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h5 class="text-white font-medium">{{ item.name }}</h5>
              <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">
                ID: {{ item.id }}
              </span>
            </div>
            <p class="text-gray-400 text-sm">
              單價: ${{ item.price.toLocaleString() }}
            </p>
          </div>

          <!-- 數量控制 -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
              <button
                @click="updateQuantity(item, item.quantity - 1)"
                class="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span class="w-12 text-center text-white font-mono">
                {{ item.quantity }}
              </span>
              <button
                @click="updateQuantity(item, item.quantity + 1)"
                class="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            <!-- 小計 -->
            <div class="text-right min-w-[100px]">
              <div class="text-lg font-bold text-green-400">
                ${{ (item.price * item.quantity).toLocaleString() }}
              </div>
              <div class="text-xs text-gray-500">小計</div>
            </div>

            <!-- 移除按鈕 -->
            <button
              @click="removeFromCart(item.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              移除
            </button>
          </div>
        </div>
      </div>

      <!-- 空購物車狀態 -->
      <div
        v-if="cartItems.length === 0"
        class="p-12 text-center bg-gray-800 border border-gray-600 rounded-lg"
      >
        <div class="text-6xl mb-4">🛒</div>
        <h4 class="text-gray-300 font-medium mb-2">購物車是空的</h4>
        <p class="text-gray-500 text-sm mb-4">
          點擊「隨機添加商品」來添加一些商品
        </p>
        <button
          @click="addToCart"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
        >
          開始購物
        </button>
      </div>
    </div>

    <!-- 結帳區域 -->
    <div
      v-if="cartItems.length > 0"
      class="p-4 bg-gradient-to-r from-green-900 to-blue-900 border border-green-600 rounded-lg"
    >
      <div class="flex justify-between items-center mb-4">
        <div>
          <h4 class="text-white font-semibold">訂單摘要</h4>
          <p class="text-gray-300 text-sm">{{ totalItems }} 件商品</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-white">
            ${{ totalPrice.toLocaleString() }}
          </div>
          <div class="text-sm text-gray-300">總金額</div>
        </div>
      </div>

      <button class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
        前往結帳
      </button>
    </div>

    <!-- 技術說明 -->
    <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-3">🔧 V-for 在購物車中的應用</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="text-yellow-400 font-medium mb-2">Key 的重要性</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• 使用 item.id 作為唯一 key</li>
            <li>• 確保商品狀態正確保持</li>
            <li>• 優化添加/移除操作性能</li>
            <li>• 支持平滑的動畫效果</li>
          </ul>
        </div>
        <div>
          <h5 class="text-green-400 font-medium mb-2">響應式計算</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• totalPrice 自動計算總價</li>
            <li>• totalItems 自動統計數量</li>
            <li>• 數量變化時即時更新</li>
            <li>• 計算屬性緩存優化性能</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>