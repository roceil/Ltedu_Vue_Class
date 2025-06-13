<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref('profile')
const showModal = ref(false)
const isMenuOpen = ref(false)
const showAdvancedOptions = ref(false)

const tabs = [
  { id: 'profile', name: '個人資料' },
  { id: 'settings', name: '設定' },
  { id: 'notifications', name: '通知' },
  { id: 'security', name: '安全性' },
]

const switchTab = (tabId: string) => {
  activeTab.value = tabId
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">V-show 適用場景</h2>

    <!-- 場景 1: 頻繁切換的選項卡 -->
    <div class="mb-8 p-6 border border-gray-600 rounded-lg bg-gray-800">
      <h4 class="text-lg font-semibold mb-4 text-blue-400">📑 選項卡系統（頻繁切換）</h4>

      <div class="flex border-b border-gray-600 mb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            'px-4 py-2 border-b-2 font-medium text-sm transition-colors',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 所有選項卡內容都會渲染，只是隱藏不需要的 -->
      <div
        v-show="activeTab === 'profile'"
        class="p-4 bg-gray-700 border border-gray-600 rounded"
      >
        <h5 class="font-semibold mb-3 text-white">個人資料</h5>
        <div class="space-y-3">
          <input
            type="text"
            placeholder="姓名"
            class="w-full px-3 py-2 border border-gray-500 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="電子郵件"
            class="w-full px-3 py-2 border border-gray-500 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div
        v-show="activeTab === 'settings'"
        class="p-4 bg-gray-700 border border-gray-600 rounded"
      >
        <h5 class="font-semibold mb-3 text-white">設定</h5>
        <div class="space-y-3">
          <label class="flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              class="text-blue-500"
            />
            <span>啟用通知</span>
          </label>
          <label class="flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              class="text-blue-500"
            />
            <span>自動儲存</span>
          </label>
        </div>
      </div>

      <div
        v-show="activeTab === 'notifications'"
        class="p-4 bg-gray-700 border border-gray-600 rounded"
      >
        <h5 class="font-semibold mb-3 text-white">通知</h5>
        <p class="text-gray-300">您有 3 個未讀通知</p>
      </div>

      <div
        v-show="activeTab === 'security'"
        class="p-4 bg-gray-700 border border-gray-600 rounded"
      >
        <h5 class="font-semibold mb-3 text-white">安全性</h5>
        <div class="space-x-2">
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            變更密碼
          </button>
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            兩步驗證
          </button>
        </div>
      </div>
    </div>

    <!-- 場景 2: 模態對話框 -->
    <div class="mb-8 p-6 border border-gray-600 rounded-lg bg-gray-800">
      <h4 class="text-lg font-semibold mb-4 text-green-400">🪟 模態對話框（保持 DOM 結構）</h4>
      <button
        @click="toggleModal"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {{ showModal ? '關閉' : '開啟' }}模態對話框
      </button>

      <!-- 模態對話框保持在 DOM 中，方便 CSS 動畫 -->
      <div
        v-show="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="toggleModal"
      >
        <div
          class="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-xl border border-gray-600"
          @click.stop
        >
          <h5 class="text-lg font-semibold mb-4 text-white">模態對話框</h5>
          <p class="text-gray-300 mb-4">這是一個模態對話框的內容</p>
          <button
            @click="toggleModal"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>

    <!-- 場景 3: 下拉選單 -->
    <div class="mb-8 p-6 border border-gray-600 rounded-lg bg-gray-800">
      <h4 class="text-lg font-semibold mb-4 text-purple-400">📋 下拉選單（快速顯示/隱藏）</h4>
      <div class="relative inline-block">
        <button
          @click="toggleMenu"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          選單
          <span
            :class="isMenuOpen ? 'rotate-180' : ''"
            class="transition-transform"
          >▼</span>
        </button>
        <ul
          v-show="isMenuOpen"
          class="absolute top-full left-0 mt-2 bg-gray-700 border border-gray-600 rounded shadow-lg min-w-40 z-10"
        >
          <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-600 text-gray-200">選項 1</li>
          <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-600 text-gray-200">選項 2</li>
          <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-600 text-gray-200">選項 3</li>
          <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer text-gray-200">選項 4</li>
        </ul>
      </div>
    </div>

    <!-- 場景 4: 條件性顯示表單選項 -->
    <div class="mb-8 p-6 border border-gray-600 rounded-lg bg-gray-800">
      <h4 class="text-lg font-semibold mb-4 text-orange-400">📝 條件性表單選項</h4>
      <label class="flex items-center gap-2 mb-4 text-gray-200">
        <input
          type="checkbox"
          v-model="showAdvancedOptions"
          class="text-orange-500"
        />
        <span>顯示進階選項</span>
      </label>

      <!-- 進階選項會頻繁切換，使用 v-show -->
      <div
        v-show="showAdvancedOptions"
        class="p-4 bg-orange-900 border border-orange-600 rounded"
      >
        <h5 class="font-semibold mb-3 text-orange-300">進階選項</h5>
        <div class="space-y-3">
          <label class="block">
            <span class="text-sm font-medium mb-1 block text-orange-200">超時時間:</span>
            <div class="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="60"
                class="flex-1"
              />
              <span class="text-sm text-orange-200">30秒</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="p-4 bg-purple-900 border-l-4 border-purple-500 rounded">
      <h4 class="font-bold text-purple-300 mb-2">V-show 適用場景總結：</h4>
      <ul class="text-sm text-purple-200 space-y-1">
        <li>• 選項卡系統：用戶會頻繁切換不同的選項卡</li>
        <li>• 模態對話框：需要保持 DOM 結構以支援 CSS 動畫</li>
        <li>• 下拉選單：需要快速顯示和隱藏</li>
        <li>• 條件性表單：根據用戶選擇顯示額外的表單欄位</li>
        <li>• 任何需要頻繁切換顯示狀態的元素</li>
      </ul>
    </div>
  </div>
</template>