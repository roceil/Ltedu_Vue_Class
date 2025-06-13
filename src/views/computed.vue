<script lang="ts" setup>
import BasicComputedDemo from '../components/BasicComputedDemo.vue'
import CachingMechanismDemo from '../components/CachingMechanismDemo.vue'
import ReactiveTrackingDemo from '../components/ReactiveTrackingDemo.vue'
import ComputedVsWatchDemo from '../components/ComputedVsWatchDemo.vue'
import ListFilteringDemo from '../components/ListFilteringDemo.vue'
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Computed 計算屬性</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        掌握 Vue.js 中最強大的響應式計算工具，學會高效處理派生數據與性能優化的核心技巧
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-blue-900 to-cyan-900 border border-blue-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是 Computed 計算屬性？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">智能計算</h3>
          <p class="text-gray-300 text-sm">
            Computed 是基於現有數據創建派生數據的工具，會自動追蹤依賴關係並在依賴變化時重新計算。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-cyan-500">
          <h3 class="text-lg font-semibold text-cyan-400 mb-2">緩存機制</h3>
          <p class="text-gray-300 text-sm">
            Computed 具有智能緩存機制，只有當依賴變化時才重新計算，避免不必要的重複運算。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-green-500">
          <h3 class="text-lg font-semibold text-green-400 mb-2">響應式更新</h3>
          <p class="text-gray-300 text-sm">
            Computed 會自動追蹤響應式依賴，當依賴數據變化時，計算屬性會自動更新相關的視圖。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心特性 -->
    <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ Computed 的核心特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">緩存與性能</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>智能緩存：</strong> 只有依賴變化時才重新計算</li>
            <li><strong>性能優化：</strong> 避免模板中的重複計算</li>
            <li><strong>多次使用：</strong> 同一計算屬性多次引用只計算一次</li>
            <li><strong>依賴追蹤：</strong> 自動追蹤內部使用的響應式數據</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">響應式特性</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>自動更新：</strong> 依賴變化時自動重新計算</li>
            <li><strong>響應式依賴：</strong> 必須依賴響應式數據才能更新</li>
            <li><strong>派生數據：</strong> 基於現有數據創建新的計算結果</li>
            <li><strong>聲明式：</strong> 讓代碼更易於理解和維護</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Computed vs Function 對比 -->
    <div class="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h2 class="text-2xl font-bold text-purple-800 mb-4">🤔 Computed vs Function</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-2">✅ 選擇 Computed 的時機：</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 需要基於響應式數據計算派生值</li>
            <li>• 計算結果可能會在多個地方使用</li>
            <li>• 希望利用緩存機制提升性能</li>
            <li>• 計算邏輯相對穩定且複雜</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-orange-200">
          <h3 class="font-semibold text-orange-700 mb-2">✅ 選擇 Function 的時機：</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 需要接收參數進行動態計算</li>
            <li>• 每次調用都需要執行最新邏輯</li>
            <li>• 處理事件或執行副作用操作</li>
            <li>• 計算不依賴響應式數據</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本 Computed 演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本 Computed 使用演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示計算屬性的基本用法，包含字符串反轉、數據轉換等常見應用
        </p>
        <BasicComputedDemo />
      </div>

      <!-- 響應式依賴追蹤演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">2. 響應式依賴追蹤演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示計算屬性如何自動追蹤響應式依賴，以及非響應式數據的影響
        </p>
        <ReactiveTrackingDemo />
      </div>

      <!-- 緩存機制演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">3. 緩存機制 vs 方法比較</h3>
        <p class="text-sm text-gray-400 mb-4">
          對比計算屬性的緩存機制與方法的執行差異，理解性能優化的核心概念
        </p>
        <CachingMechanismDemo />
      </div>

      <!-- Computed vs Watch 比較 -->
      <div class="p-4 border-2 border-dashed border-orange-500 rounded-lg">
        <h3 class="text-lg font-semibold text-orange-300 mb-2">4. Computed vs Watch 實際應用比較</h3>
        <p class="text-sm text-orange-400 mb-4">
          對比 Computed 和 Watch 在實際開發中的使用情境，理解何時使用計算屬性、何時使用監聽器
        </p>
        <ComputedVsWatchDemo />
      </div>

      <!-- 列表過濾演示 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">5. 實戰應用：列表過濾與搜索</h3>
        <p class="text-sm text-purple-400 mb-4">
          使用計算屬性實現動態列表過濾、搜索和排序功能
        </p>
        <ListFilteringDemo />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>基本概念：</strong> 從第1個演示了解 Computed 基本用法</li>
            <li>2. <strong>依賴追蹤：</strong> 掌握第2個演示的響應式特性</li>
            <li>3. <strong>緩存機制：</strong> 理解第3個演示中的性能優勢</li>
            <li>4. <strong>與 Watch 對比：</strong> 學習第4個演示的使用情境差異</li>
            <li>5. <strong>實戰應用：</strong> 學習第5個演示的實用場景</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>基本用法：</strong> 修改輸入框觀察計算屬性的自動更新</li>
            <li>• <strong>依賴追蹤：</strong> 比較響應式和非響應式數據的差異</li>
            <li>• <strong>緩存測試：</strong> 點擊按鈕觀察控制台的執行日誌</li>
            <li>• <strong>情境對比：</strong> 體驗 Computed 和 Watch 的不同使用場景</li>
            <li>• <strong>列表操作：</strong> 嘗試過濾、搜索和排序功能</li>
            <li>• <strong>開發者工具：</strong> 查看 Console 了解執行流程</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳實踐 -->
    <div class="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-yellow-800 mb-4">💡 最佳實踐</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">✅ 推薦做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>純函數：</strong> 計算屬性應該是純函數，不產生副作用</li>
            <li>• <strong>避免修改：</strong> 在計算屬性中不要修改其他響應式數據</li>
            <li>• <strong>合理命名：</strong> 使用描述性的名稱，清楚表達計算意圖</li>
            <li>• <strong>依賴明確：</strong> 確保所有依賴都是響應式數據</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">❌ 避免的做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>副作用：</strong> 不要在計算屬性中執行 API 調用</li>
            <li>• <strong>修改依賴：</strong> 不要在計算中修改被依賴的數據</li>
            <li>• <strong>過度計算：</strong> 避免在計算中進行過於複雜的運算</li>
            <li>• <strong>異步操作：</strong> 計算屬性不支持異步操作</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          Computed 計算屬性是 Vue 中處理派生數據的最佳工具，正確使用能讓你構建更高效的響應式應用：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">核心優勢：</h4>
            <ul class="text-sm space-y-1">
              <li>• 智能緩存機制提升性能</li>
              <li>• 自動追蹤響應式依賴</li>
              <li>• 聲明式編程更易維護</li>
              <li>• 專門處理派生數據計算</li>
            </ul>
          </div>
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-800 mb-2">適用場景：</h4>
            <ul class="text-sm space-y-1">
              <li>• 數據轉換和格式化</li>
              <li>• 列表過濾和搜索</li>
              <li>• 複雜計算的結果展示</li>
              <li>• 基於多個數據源的派生值</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握 Computed 計算屬性的正確使用方式，能讓你在處理複雜的數據邏輯時事半功倍 🚀
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
