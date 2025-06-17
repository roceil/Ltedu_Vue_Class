<script lang="ts" setup>
import BasicLifecycleDemo from '../components/BasicLifecycleDemo.vue'
import StopwatchDemo from '../components/StopwatchDemo.vue'
import DataLoadingDemo from '../components/DataLoadingDemo.vue'
import LifecycleOrderDemo from '../components/LifecycleOrderDemo.vue'
import LifecycleCleanupDemo from '../components/LifecycleCleanupDemo.vue'
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Lifecycle 生命週期</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        深入了解 Vue.js 組件從創建到銷毀的完整過程，掌握在特定時機執行代碼的核心技巧
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-emerald-900 to-teal-900 border border-emerald-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是生命週期？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-emerald-500">
          <h3 class="text-lg font-semibold text-emerald-400 mb-2">時機控制</h3>
          <p class="text-gray-300 text-sm">
            生命週期是指 Vue 組件從創建到銷毀的整個過程中，Vue 提供的一系列鉤子函數，讓開發者能在特定時機執行代碼。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-teal-500">
          <h3 class="text-lg font-semibold text-teal-400 mb-2">靈活管理</h3>
          <p class="text-gray-300 text-sm">
            在 Vue3 Composition API 中，生命週期鉤子以 `on` 開頭的函數形式提供，讓我們能更靈活地管理組件的各個階段。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-cyan-500">
          <h3 class="text-lg font-semibold text-cyan-400 mb-2">階段處理</h3>
          <p class="text-gray-300 text-sm">
            從組件創建、掛載、更新到卸載，每個階段都有相應的鉤子函數，讓你精確控制程式執行時機。
          </p>
        </div>
      </div>
    </div>

    <!-- 生命週期順序 -->
    <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ Vue3 生命週期順序</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">創建與掛載階段</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>1. setup()：</strong> 組件創建（等同於 Vue2 的 `created`）</li>
            <li><strong>2. onBeforeMount()：</strong> 掛載前，DOM 尚未創建</li>
            <li><strong>3. onMounted()：</strong> 掛載完成，可以訪問 DOM</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">更新與卸載階段</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>4. onBeforeUpdate()：</strong> 更新前，數據改變</li>
            <li><strong>5. onUpdated()：</strong> 更新完成，DOM 已更新</li>
            <li><strong>6. onBeforeUnmount()：</strong> 卸載前，準備清理</li>
            <li><strong>7. onUnmounted()：</strong> 卸載完成，清理資源</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 重點生命週期說明 -->
    <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 重點生命週期詳解</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">setup() - 組件創建</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 初始化響應式數據</li>
            <li>• 設置計算屬性</li>
            <li>• 調用不依賴 DOM 的 API</li>
            <li>• 等同於 Vue2 的 created</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onMounted() - 掛載完成</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 安全訪問 DOM 元素</li>
            <li>• 開始計時器或訂閱</li>
            <li>• 初始化第三方庫</li>
            <li>• 設置事件監聽器</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onUnmounted() - 卸載完成</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 清除計時器</li>
            <li>• 移除事件監聽器</li>
            <li>• 取消 API 請求</li>
            <li>• 防止記憶體洩漏</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 生命週期執行順序演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 生命週期執行順序演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          觀察組件從創建到銷毀過程中各個生命週期鉤子的執行順序
        </p>
        <LifecycleOrderDemo />
      </div>

      <!-- 碼表應用 -->
      <div class="p-4 border-2 border-dashed border-orange-500 rounded-lg">
        <h3 class="text-lg font-semibold text-orange-300 mb-2">2. 實戰應用：碼表計時器</h3>
        <p class="text-sm text-orange-400 mb-4">
          使用 onMounted 和 onUnmounted 實現自動開始和清理的碼表功能
        </p>
        <StopwatchDemo />
      </div>

      <!-- 資料載入應用 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">4. 實戰應用：資料載入</h3>
        <p class="text-sm text-purple-400 mb-4">
          在 onMounted 階段載入資料，展示實際開發中的資料請求處理
        </p>
        <DataLoadingDemo />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-yellow-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>執行順序：</strong> 從第1個演示了解生命週期執行順序</li>
            <li>2. <strong>基本應用：</strong> 理解第2個演示的實際應用場景</li>
            <li>3. <strong>計時器應用：</strong> 學習第3個演示的資源管理</li>
            <li>4. <strong>資料載入：</strong> 掌握第4個演示的異步處理</li>
            <li>5. <strong>資源清理：</strong> 理解第5個演示的清理重要性</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-yellow-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>執行順序：</strong> 觀察控制台日誌了解執行流程</li>
            <li>• <strong>基本應用：</strong> 體驗不同階段的功能實現</li>
            <li>• <strong>碼表功能：</strong> 測試開始、暫停、重置功能</li>
            <li>• <strong>資料載入：</strong> 觀察載入狀態和錯誤處理</li>
            <li>• <strong>資源清理：</strong> 檢查組件卸載時的清理效果</li>
            <li>• <strong>開發者工具：</strong> 查看 Console 了解生命週期執行</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳實踐 -->
    <div class="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h2 class="text-2xl font-bold text-purple-800 mb-4">💡 最佳實踐</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">✅ 推薦做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>onMounted：</strong> 用於 DOM 操作和第三方庫初始化</li>
            <li>• <strong>onUnmounted：</strong> 必須清理計時器和事件監聽器</li>
            <li>• <strong>setup：</strong> 只放置不依賴 DOM 的初始化邏輯</li>
            <li>• <strong>資源管理：</strong> 每個創建的資源都要有對應的清理</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">❌ 避免的做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>DOM 操作：</strong> 不要在 setup 中操作 DOM</li>
            <li>• <strong>記憶體洩漏：</strong> 忘記在 onUnmounted 中清理資源</li>
            <li>• <strong>過度使用：</strong> 不要濫用生命週期鉤子</li>
            <li>• <strong>異步處理：</strong> 注意組件卸載時取消未完成的請求</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          生命週期是 Vue 中管理組件狀態和資源的重要工具，正確使用能讓你構建更穩定的應用：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-orange-50 border border-orange-200 rounded">
            <h4 class="font-semibold text-orange-800 mb-2">核心優勢：</h4>
            <ul class="text-sm space-y-1">
              <li>• 精確控制代碼執行時機</li>
              <li>• 有效管理組件資源</li>
              <li>• 防止記憶體洩漏</li>
              <li>• 優化應用性能</li>
            </ul>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded">
            <h4 class="font-semibold text-red-800 mb-2">適用場景：</h4>
            <ul class="text-sm space-y-1">
              <li>• DOM 操作和第三方庫初始化</li>
              <li>• 計時器和事件監聽器管理</li>
              <li>• 資料載入和 API 請求</li>
              <li>• 資源清理和狀態重置</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握生命週期的正確使用方式，能讓你在開發複雜組件時更加得心應手 🚀
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
