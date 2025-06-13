<script lang="ts" setup>
import BasicWatchDemo from '../components/BasicWatchDemo.vue'
import WatchOptionsDemo from '../components/WatchOptionsDemo.vue'
import FormValidationDemo from '../components/FormValidationDemo.vue'
import WatchVsWatchEffectComparison from '../components/WatchVsWatchEffectComparison.vue'
import WatchDeepShallowDemo from '../components/WatchDeepShallowDemo.vue'
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Watch 監聽器</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        深入了解 Vue.js 中最重要的副作用處理工具，掌握響應式數據監聽和異步操作的核心技巧
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是 Watch 監聽器？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-purple-500">
          <h3 class="text-lg font-semibold text-purple-400 mb-2">精確監聽</h3>
          <p class="text-gray-300 text-sm">
            明確指定要監聽的響應式數據，在數據變化時執行特定的邏輯，提供新值和舊值的對比。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-pink-500">
          <h3 class="text-lg font-semibold text-pink-400 mb-2">副作用處理</h3>
          <p class="text-gray-300 text-sm">
            專門用於處理異步操作和副作用，如 API 調用、數據驗證、狀態同步等複雜邏輯。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">靈活控制</h3>
          <p class="text-gray-300 text-sm">
            提供多種選項如 immediate、deep、flush 等，讓你完全控制監聽行為和執行時機。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心特性 -->
    <div class="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ Watch 的核心特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">監聽能力</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>單一數據源：</strong> 監聽特定的 ref 或 reactive</li>
            <li><strong>多個數據源：</strong> 同時監聽多個響應式數據</li>
            <li><strong>Getter 函數：</strong> 監聽計算屬性或函數回傳值</li>
            <li><strong>深層監聽：</strong> 監聽物件內部的深層變化</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">進階功能</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>新舊值對比：</strong> 訪問變化前後的值</li>
            <li><strong>立即執行：</strong> immediate 選項控制初始執行</li>
            <li><strong>執行時機：</strong> flush 選項控制執行順序</li>
            <li><strong>停止監聽：</strong> 手動控制監聽器生命週期</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Watch vs WatchEffect 對比 -->
    <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-blue-800 mb-4">🤔 Watch vs WatchEffect</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-2">✅ 選擇 Watch 當：</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 需要明確指定監聽的數據源</li>
            <li>• 需要訪問新值和舊值進行比較</li>
            <li>• 監聽特定的響應式數據變化</li>
            <li>• 需要精確控制何時觸發副作用</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">✅ 選擇 WatchEffect 當：</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 需要自動追蹤多個依賴</li>
            <li>• 副作用函數依賴多個響應式數據</li>
            <li>• 不需要訪問舊值</li>
            <li>• 希望簡化依賴管理</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本 Watch 演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本 Watch 使用演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示監聽單一數據源、多個數據源和 Getter 函數的基本使用方式
        </p>
        <BasicWatchDemo />
      </div>

      <!-- 深層與淺層監聽 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">2. 深層與淺層監聽差異</h3>
        <p class="text-sm text-gray-400 mb-4">
          理解深層監聽 (deep) 和淺層監聽的差異，以及監聽物件特定屬性的方法
        </p>
        <WatchDeepShallowDemo />
      </div>

      <!-- Watch 選項演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">3. Watch 選項控制演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          探索 immediate、flush 等選項如何影響 Watch 的執行行為
        </p>
        <WatchOptionsDemo />
      </div>

      <!-- 表單驗證範例 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">4. 實戰應用：表單驗證</h3>
        <p class="text-sm text-purple-400 mb-4">
          使用 Watch 實現即時表單驗證，包含郵件格式、密碼強度檢查
        </p>
        <FormValidationDemo />
      </div>

      <!-- Watch vs WatchEffect 比較 -->
      <div class="p-4 border-2 border-dashed border-blue-500 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-300 mb-2">【額外補充】Watch vs WatchEffect 實際比較</h3>
        <p class="text-sm text-blue-400 mb-4">
          並排比較 Watch 和 WatchEffect 在相同場景下的不同實現方式
        </p>
        <WatchVsWatchEffectComparison />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>基本概念：</strong> 從第1個演示了解 Watch 基本用法</li>
            <li>2. <strong>深淺監聽：</strong> 理解第2個演示中的監聽差異</li>
            <li>3. <strong>選項控制：</strong> 掌握第3個演示的進階選項</li>
            <li>4. <strong>實戰應用：</strong> 學習第4、5個演示的實用場景</li>
            <li>5. <strong>方案對比：</strong> 比較第6個演示的不同實現方式</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>基本使用：</strong> 嘗試不同的輸入觀察監聽效果</li>
            <li>• <strong>深淺監聽：</strong> 修改物件屬性觀察監聽差異</li>
            <li>• <strong>表單驗證：</strong> 輸入不同格式測試驗證邏輯</li>
            <li>• <strong>持久化：</strong> 修改設定後重新整理頁面驗證</li>
            <li>• <strong>性能對比：</strong> 觀察兩種實現方式的差異</li>
            <li>• <strong>開發者工具：</strong> 查看 Console 日誌了解執行流程</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          Watch 監聽器是 Vue 中處理副作用和異步操作的強大工具，正確使用能讓你構建更響應式的應用：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-purple-50 border border-purple-200 rounded">
            <h4 class="font-semibold text-purple-800 mb-2">核心優勢：</h4>
            <ul class="text-sm space-y-1">
              <li>• 精確的依賴監聽和控制</li>
              <li>• 訪問新值和舊值進行比較</li>
              <li>• 靈活的選項配置</li>
              <li>• 專門處理異步操作和副作用</li>
            </ul>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">適用場景：</h4>
            <ul class="text-sm space-y-1">
              <li>• 表單驗證和即時回饋</li>
              <li>• 數據持久化和同步</li>
              <li>• API 調用和異步處理</li>
              <li>• 複雜業務邏輯的響應式處理</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握 Watch 監聽器的正確使用方式，能讓你在處理複雜的響應式邏輯時游刃有餘 🚀
        </p>
      </div>
    </div>

    <!-- 補充說明：為什麼監聽物件的特定值時需要使用函式 -->
    <div class="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
      <h2 class="text-2xl font-bold text-orange-800 mb-4">📌 補充說明：為什麼監聽物件的特定值時需要使用函式？</h2>

      <!-- 核心原理 -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-orange-700 mb-3">核心原理：響應式追蹤機制</h3>
        <p class="text-gray-700 mb-4">
          Vue 的響應式系統需要在運行時收集依賴，才能知道哪些數據變化時需要觸發更新。
        </p>
      </div>

      <!-- 問題分析 -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-orange-700 mb-3">問題分析</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-red-50 border border-red-200 rounded">
            <h4 class="font-semibold text-red-700 mb-2">❌ 錯誤方式：直接傳值</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>watch(info.value.user.name, callback)
// 這裡傳入的是字串 '張三'
// Vue 無法建立依賴追蹤</code></pre>
          </div>
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-700 mb-2">✅ 正確方式：使用 getter 函式</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>watch(() => info.value.user.name, callback)
// 函式會重新訪問屬性
// Vue 能夠收集依賴關係</code></pre>
          </div>
        </div>
      </div>

      <!-- Vue 響應式系統的工作流程 -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-orange-700 mb-3">Vue 響應式系統的工作流程</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-3 bg-blue-50 border border-blue-200 rounded text-center">
            <div class="text-2xl mb-2">1️⃣</div>
            <h4 class="font-semibold text-blue-700 mb-1">依賴收集階段</h4>
            <p class="text-sm text-gray-700">執行 getter 函式，記錄被訪問的響應式屬性</p>
          </div>
          <div class="p-3 bg-green-50 border border-green-200 rounded text-center">
            <div class="text-2xl mb-2">2️⃣</div>
            <h4 class="font-semibold text-green-700 mb-1">變化檢測階段</h4>
            <p class="text-sm text-gray-700">屬性變化時觸發相關的 watcher</p>
          </div>
          <div class="p-3 bg-purple-50 border border-purple-200 rounded text-center">
            <div class="text-2xl mb-2">3️⃣</div>
            <h4 class="font-semibold text-purple-700 mb-1">回調執行階段</h4>
            <p class="text-sm text-gray-700">執行 watch 的回調函式</p>
          </div>
        </div>
      </div>

      <!-- 為什麼物件的淺層屬性可以直接監聽？ -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-orange-700 mb-3">為什麼物件的淺層屬性可以直接監聽？</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-700 mb-2">✅ 可以直接監聽</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>const user = ref({ name: '張三' })
watch(user, callback)
// user 本身是響應式引用</code></pre>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded">
            <h4 class="font-semibold text-red-700 mb-2">❌ 無法直接監聽</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>watch(user.value.name, callback)
// user.value.name 只是普通字串值</code></pre>
          </div>
        </div>
      </div>

      <!-- 其他解決方案比較 -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-orange-700 mb-3">其他解決方案比較</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-white border border-orange-200 rounded">
            <h4 class="font-semibold text-orange-700 mb-2">方案一：getter 函式（推薦）</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>watch(() => info.value.user.name, 
  (newVal, oldVal) => {
    console.log(`${oldVal} → ${newVal}`)
  }
)</code></pre>
          </div>
          <div class="p-4 bg-white border border-orange-200 rounded">
            <h4 class="font-semibold text-orange-700 mb-2">方案二：deep 選項</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>watch(info, (newVal, oldVal) => {
  // 需要手動比較哪個屬性變了
}, { deep: true })</code></pre>
          </div>
          <div class="p-4 bg-white border border-orange-200 rounded">
            <h4 class="font-semibold text-orange-700 mb-2">方案三：computed + watch</h4>
            <pre class="text-xs bg-gray-800 text-gray-300 p-3 rounded overflow-x-auto"><code>const userName = computed(
  () => info.value.user.name
)
watch(userName, callback)</code></pre>
          </div>
        </div>
      </div>

      <!-- 記憶要點 -->
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 class="text-lg font-semibold text-yellow-700 mb-3">💡 記憶要點</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="text-center p-2 bg-white rounded border border-yellow-200">
            <div class="text-lg mb-1">🚫</div>
            <div class="text-xs font-medium text-gray-700">直接值</div>
            <div class="text-xs text-gray-600">無法建立響應式依賴</div>
          </div>
          <div class="text-center p-2 bg-white rounded border border-yellow-200">
            <div class="text-lg mb-1">✨</div>
            <div class="text-xs font-medium text-gray-700">getter 函式</div>
            <div class="text-xs text-gray-600">讓 Vue 追蹤深層屬性</div>
          </div>
          <div class="text-center p-2 bg-white rounded border border-yellow-200">
            <div class="text-lg mb-1">🎯</div>
            <div class="text-xs font-medium text-gray-700">響應式引用</div>
            <div class="text-xs text-gray-600">Vue 能夠直接監聽</div>
          </div>
          <div class="text-center p-2 bg-white rounded border border-yellow-200">
            <div class="text-lg mb-1">🔍</div>
            <div class="text-xs font-medium text-gray-700">深層監聽</div>
            <div class="text-xs text-gray-600">需要函式或 deep 選項</div>
          </div>
        </div>
        <p class="mt-4 text-center text-orange-700 font-medium">
          這就是為什麼在監聽物件的特定值時，我們必須使用函式的形式！ 🎯
        </p>
      </div>
    </div>
  </div>
</template>
