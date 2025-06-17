<script lang="ts" setup>
import { ref } from 'vue'

// 場景 1: 簡單的 v-else
const showContent = ref(false)

// 場景 2: v-else-if 多條件判斷
const userRole = ref('guest') // guest, user, admin, vip
const score = ref(85)

// 場景 3: 表單驗證狀態
const email = ref('')
const isValidating = ref(false)

// 場景 4: 資料載入狀態
const dataStatus = ref('idle') // idle, loading, success, error
const userData = ref<any>(null)

const checkEmailValidation = () => {
  if (!email.value) return

  isValidating.value = true

  setTimeout(() => {
    isValidating.value = false
  }, 1500)
}

const loadData = () => {
  dataStatus.value = 'loading'

  setTimeout(() => {
    const random = Math.random()
    if (random > 0.7) {
      dataStatus.value = 'error'
    } else {
      dataStatus.value = 'success'
      userData.value = {
        name: 'Vue 開發者',
        email: 'developer@vue.js',
        joinDate: '2024-01-01'
      }
    }
  }, 2000)
}

const resetData = () => {
  dataStatus.value = 'idle'
  userData.value = null
}

const getGradeText = (score: number) => {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-400'
  if (score >= 80) return 'text-blue-400'
  if (score >= 70) return 'text-yellow-400'
  if (score >= 60) return 'text-orange-400'
  return 'text-red-400'
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">V-else 與 V-else-if 條件分支</h2>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-600 rounded-lg">
      <h3 class="text-xl font-bold text-white mb-4">📝 什麼是 V-else 和 V-else-if？</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-indigo-500">
          <h4 class="text-lg font-semibold text-indigo-400 mb-2">V-else</h4>
          <p class="text-gray-300 text-sm">
            與 v-if 配對使用，當 v-if 條件為 false 時，v-else 的內容會被渲染。必須緊跟在 v-if 元素後面。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-purple-500">
          <h4 class="text-lg font-semibold text-purple-400 mb-2">V-else-if</h4>
          <p class="text-gray-300 text-sm">
            提供額外的條件分支，可以鏈式使用多個 v-else-if，最後可以配合 v-else 處理所有其他情況。
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 場景 1: 簡單的 v-if / v-else -->
      <div class="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4 text-blue-400">1. 基本 v-if / v-else</h3>

        <button
          @click="showContent = !showContent"
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          切換內容顯示
        </button>

        <div
          v-if="showContent"
          class="p-4 bg-green-900 border border-green-600 rounded"
        >
          <h4 class="text-green-300 font-semibold mb-2">✅ 主要內容</h4>
          <p class="text-green-200">這是當條件為 true 時顯示的內容</p>
        </div>
        <div
          v-else
          class="p-4 bg-gray-700 border border-gray-500 rounded"
        >
          <h4 class="text-gray-300 font-semibold mb-2">🔄 替代內容</h4>
          <p class="text-gray-400">這是當條件為 false 時顯示的內容</p>
        </div>
      </div>

      <!-- 場景 2: 用戶角色權限控制 -->
      <div class="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4 text-purple-400">2. 多重條件 v-else-if</h3>

        <div class="mb-4">
          <label class="block text-gray-300 mb-2">選擇用戶角色：</label>
          <select
            v-model="userRole"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="guest">訪客</option>
            <option value="user">普通用戶</option>
            <option value="admin">管理員</option>
            <option value="vip">VIP 用戶</option>
          </select>
        </div>

        <div
          v-if="userRole === 'admin'"
          class="p-4 bg-red-900 border border-red-600 rounded"
        >
          <h4 class="text-red-300 font-semibold mb-2">🔧 管理員控制台</h4>
          <p class="text-red-200">完整的系統管理權限</p>
          <div class="mt-2 flex gap-2">
            <span class="px-2 py-1 bg-red-600 text-red-100 rounded text-xs">系統設置</span>
            <span class="px-2 py-1 bg-red-600 text-red-100 rounded text-xs">用戶管理</span>
            <span class="px-2 py-1 bg-red-600 text-red-100 rounded text-xs">數據分析</span>
          </div>
        </div>
        <div
          v-else-if="userRole === 'vip'"
          class="p-4 bg-yellow-900 border border-yellow-600 rounded"
        >
          <h4 class="text-yellow-300 font-semibold mb-2">⭐ VIP 專區</h4>
          <p class="text-yellow-200">專屬功能和優惠</p>
          <div class="mt-2 flex gap-2">
            <span class="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">專屬客服</span>
            <span class="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">優先權限</span>
          </div>
        </div>
        <div
          v-else-if="userRole === 'user'"
          class="p-4 bg-blue-900 border border-blue-600 rounded"
        >
          <h4 class="text-blue-300 font-semibold mb-2">👤 用戶面板</h4>
          <p class="text-blue-200">基本功能使用權限</p>
          <div class="mt-2 flex gap-2">
            <span class="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">個人設置</span>
            <span class="px-2 py-1 bg-blue-600 text-blue-100 rounded text-xs">基礎功能</span>
          </div>
        </div>
        <div
          v-else
          class="p-4 bg-gray-700 border border-gray-500 rounded"
        >
          <h4 class="text-gray-300 font-semibold mb-2">🚪 訪客模式</h4>
          <p class="text-gray-400">請先註冊或登入</p>
          <button class="mt-2 px-3 py-1 bg-gray-600 text-gray-200 rounded text-sm hover:bg-gray-500 transition-colors">
            立即註冊
          </button>
        </div>
      </div>
    </div>

    <!-- 成績等級範例 -->
    <div class="mt-6 bg-gray-800 border border-gray-600 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4 text-orange-400">3. 成績等級判斷</h3>

      <div class="mb-4">
        <label class="block text-gray-300 mb-2">輸入分數 (0-100)：</label>
        <input
          v-model.number="score"
          type="number"
          min="0"
          max="100"
          class="px-3 py-2 bg-gray-700 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <span class="ml-3 text-gray-400">當前分數: {{ score }}</span>
      </div>

      <div class="p-4 rounded border-2 border-dashed border-gray-500">
        <div
          v-if="score >= 90"
          class="text-center"
        >
          <div class="text-6xl mb-2">🏆</div>
          <h4 class="text-2xl font-bold text-green-400 mb-2">等級 A - 優秀</h4>
          <p class="text-green-300">恭喜！您的表現非常出色！</p>
        </div>
        <div
          v-else-if="score >= 80"
          class="text-center"
        >
          <div class="text-6xl mb-2">⭐</div>
          <h4 class="text-2xl font-bold text-blue-400 mb-2">等級 B - 良好</h4>
          <p class="text-blue-300">表現很好，繼續保持！</p>
        </div>
        <div
          v-else-if="score >= 70"
          class="text-center"
        >
          <div class="text-6xl mb-2">👍</div>
          <h4 class="text-2xl font-bold text-yellow-400 mb-2">等級 C - 普通</h4>
          <p class="text-yellow-300">還不錯，還有進步空間。</p>
        </div>
        <div
          v-else-if="score >= 60"
          class="text-center"
        >
          <div class="text-6xl mb-2">⚠️</div>
          <h4 class="text-2xl font-bold text-orange-400 mb-2">等級 D - 及格</h4>
          <p class="text-orange-300">剛好及格，需要多加努力。</p>
        </div>
        <div
          v-else
          class="text-center"
        >
          <div class="text-6xl mb-2">😰</div>
          <h4 class="text-2xl font-bold text-red-400 mb-2">等級 F - 不及格</h4>
          <p class="text-red-300">需要更多的學習和練習。</p>
        </div>
      </div>
    </div>

    <!-- 使用技巧 -->
    <div class="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h3 class="text-xl font-bold text-gray-800 mb-4">💡 V-else 使用技巧</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="text-lg font-semibold text-indigo-700 mb-3">✅ 正確用法</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <code>v-else</code> 必須緊跟在 <code>v-if</code> 或 <code>v-else-if</code> 元素後面</li>
            <li>• <code>v-else-if</code> 可以鏈式使用，處理多種條件</li>
            <li>• 最後可以用 <code>v-else</code> 處理所有其他情況</li>
            <li>• 優先使用 <code>v-else-if</code> 而不是嵌套的 <code>v-if</code></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-red-700 mb-3">❌ 常見錯誤</h4>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <code>v-else</code> 和 <code>v-if</code> 之間不能有其他元素</li>
            <li>• <code>v-else</code> 不能單獨使用，必須配合 <code>v-if</code></li>
            <li>• 避免過度嵌套，影響程式碼可讀性</li>
            <li>• 不要在 <code>v-else</code> 上設置條件表達式</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 程式碼範例 -->
    <div class="mt-6 p-6 bg-gray-900 border border-gray-600 rounded-lg">
      <h3 class="text-xl font-bold text-white mb-4">📋 程式碼範例</h3>
      <div class="bg-gray-800 p-4 rounded border overflow-x-auto">
        <pre class="text-green-400 text-sm"><code>&lt;!-- 基本 v-if / v-else --&gt;
&lt;div v-if="condition"&gt;條件為真時顯示&lt;/div&gt;
&lt;div v-else&gt;條件為假時顯示&lt;/div&gt;

&lt;!-- 多重條件 v-else-if --&gt;
&lt;div v-if="score &gt;= 90"&gt;優秀&lt;/div&gt;
&lt;div v-else-if="score &gt;= 80"&gt;良好&lt;/div&gt;
&lt;div v-else-if="score &gt;= 60"&gt;及格&lt;/div&gt;
&lt;div v-else&gt;不及格&lt;/div&gt;</code></pre>
      </div>
    </div>
  </div>
</template>