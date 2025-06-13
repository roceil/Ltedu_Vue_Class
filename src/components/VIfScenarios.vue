<script lang="ts" setup>
import { ref, computed } from 'vue'

const userRole = ref('guest') // guest, user, admin
const isLoggedIn = ref(false)
const hasPermission = ref(false)
const isLoading = ref(false)

// 1. 權限控制 - 條件很少改變
const canAccessAdminPanel = computed(() => {
  return isLoggedIn.value && userRole.value === 'admin'
})

// 2. 昂貴的組件 - 避免不必要的渲染
const shouldLoadExpensiveComponent = computed(() => {
  return isLoggedIn.value && hasPermission.value
})

const login = (role: string) => {
  isLoggedIn.value = true
  userRole.value = role
  hasPermission.value = role !== 'guest'
}

const logout = () => {
  isLoggedIn.value = false
  userRole.value = 'guest'
  hasPermission.value = false
}

const simulateExpensiveLoad = () => {
  if (isLoading.value) return

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">V-if 適用場景</h2>

    <div class="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          @click="login('user')"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          登入為用戶
        </button>
        <button
          @click="login('admin')"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          登入為管理員
        </button>
        <button
          @click="logout"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          登出
        </button>
      </div>

      <div class="text-sm text-gray-300">
        <p>登入狀態: {{ isLoggedIn ? '已登入' : '未登入' }}</p>
        <p>用戶角色: {{ userRole }}</p>
      </div>
    </div>

    <!-- 場景 1: 權限控制 - 條件很少改變 -->
    <div
      v-if="canAccessAdminPanel"
      class="mb-6 p-6 bg-yellow-900 border border-yellow-600 rounded-lg"
    >
      <h4 class="text-lg font-semibold text-yellow-300 mb-4">🔒 管理員面板</h4>
      <p class="text-yellow-200 mb-4">只有管理員才能看到這個面板</p>
      <button
        @click="simulateExpensiveLoad"
        class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        載入複雜數據
      </button>
    </div>

    <!-- 場景 2: 昂貴的組件 - 避免不必要的渲染 -->
    <div
      v-if="shouldLoadExpensiveComponent && !isLoading"
      class="mb-6 p-6 bg-red-900 border border-red-600 rounded-lg max-h-64 overflow-y-auto"
    >
      <h4 class="text-lg font-semibold text-red-300 mb-4">💰 昂貴組件</h4>
      <p class="text-red-200 mb-4">這個組件包含複雜的計算和大量 DOM 元素</p>
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="i in 1000"
          :key="i"
          class="p-1 bg-red-800 text-red-200 rounded text-xs text-center"
        >
          {{ i }}
        </div>
      </div>
    </div>

    <!-- 場景 3: 條件性載入 - 完全不同的內容 -->
    <div
      v-if="isLoading"
      class="mb-6 p-6 bg-blue-900 border border-blue-600 rounded-lg text-center"
    >
      <h4 class="text-lg font-semibold text-blue-300 mb-4">⏳ 載入中...</h4>
      <div class="inline-block w-8 h-8 border-4 border-blue-500 border-t-blue-300 rounded-full animate-spin"></div>
    </div>

    <!-- 場景 4: 錯誤狀態 -->
    <div
      v-if="!isLoggedIn"
      class="mb-6 p-6 bg-cyan-900 border border-cyan-600 rounded-lg"
    >
      <h4 class="text-lg font-semibold text-cyan-300 mb-2">⚠️ 需要登入</h4>
      <p class="text-cyan-200">請先登入才能使用此功能</p>
    </div>

    <div class="mt-6 p-4 bg-green-900 border-l-4 border-green-500 rounded">
      <h4 class="font-bold text-green-300 mb-2">V-if 適用場景總結：</h4>
      <ul class="text-sm text-green-200 space-y-1">
        <li>• 權限控制：條件很少改變，避免不必要的 DOM 創建</li>
        <li>• 昂貴組件：包含複雜計算或大量 DOM 元素的組件</li>
        <li>• 條件性載入：根據不同條件顯示完全不同的內容</li>
        <li>• 錯誤狀態：只在特定錯誤情況下才顯示的內容</li>
      </ul>
    </div>
  </div>
</template>