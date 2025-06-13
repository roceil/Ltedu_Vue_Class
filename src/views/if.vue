<script lang="ts" setup>
import BasicIfShowComparison from '../components/BasicIfShowComparison.vue'
import PerformanceComparison from '../components/PerformanceComparison.vue'
import LifecycleDemo from '../components/LifecycleDemo.vue'
import VIfScenarios from '../components/VIfScenarios.vue'
import VShowScenarios from '../components/VShowScenarios.vue'
import VForVIfIssues from '../components/VForVIfIssues.vue'
import PerformanceSummary from '../components/PerformanceSummary.vue'
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">V-if ＆ V-show 條件渲染</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        深入了解 Vue.js 中兩種條件渲染指令的差異、性能表現和最佳使用場景
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-blue-900 to-purple-900 border border-blue-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是 V-if 和 V-show？</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">V-if</h3>
          <p class="text-gray-300 text-sm">
            真正的條件渲染，根據條件決定 DOM 元素是否存在。條件為 false 時，元素完全不會被渲染到 DOM 中。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-green-500">
          <h3 class="text-lg font-semibold text-green-400 mb-2">V-show</h3>
          <p class="text-gray-300 text-sm">
            基於 CSS 的條件顯示，元素始終被渲染到 DOM 中，只是通過 CSS display 屬性控制顯示與隱藏。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心差異 -->
    <div class="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ 核心差異</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-2">DOM 處理</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>V-if:</strong> 動態創建/銷毀 DOM</li>
            <li><strong>V-show:</strong> DOM 始終存在</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-2">性能表現</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>V-if:</strong> 初始快，切換慢</li>
            <li><strong>V-show:</strong> 初始慢，切換快</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-2">使用場景</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>V-if:</strong> 條件少變、權限控制</li>
            <li><strong>V-show:</strong> 頻繁切換、選項卡</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本比較演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本差異演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          這個組件並排展示 V-if 和 V-show 的 DOM 處理差異
        </p>
        <BasicIfShowComparison />
      </div>

      <!-- 性能比較演示 -->
      <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-600 mb-2">2. 性能比較測試</h3>
        <PerformanceComparison />
      </div>

      <!-- 生命週期演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">3. 生命週期差異</h3>
        <p class="text-sm text-gray-400 mb-4">
          觀察 V-if 和 V-show 的組件創建/銷毀行為差異，打開 Console 查看日誌
        </p>
        <LifecycleDemo />
      </div>

      <!-- V-if 適用場景 -->
      <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-600 mb-2">4. V-if 適用場景</h3>
        <VIfScenarios />
      </div>

      <!-- V-show 適用場景 -->
      <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-600 mb-2">5. V-show 適用場景</h3>
        <VShowScenarios />
      </div>

      <!-- V-for 與 V-if 問題 -->
      <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-600 mb-2">6. V-for 與 V-if 使用問題</h3>
        <VForVIfIssues />
      </div>

      <!-- 性能總結 -->
      <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-600 mb-2">7. 性能比較總結</h3>
        <PerformanceSummary />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📖 使用指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">🔧 如何使用這些演示</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. 在 `src/views/if.vue` 中找到對應的組件 import</li>
            <li>2. 取消註解想要查看的組件</li>
            <li>3. 儲存文件後查看演示效果</li>
            <li>4. 可以同時啟用多個組件進行比較</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">🎯 學習建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• 建議按順序逐個啟用組件學習</li>
            <li>• 打開開發者工具觀察 DOM 變化</li>
            <li>• 嘗試不同的互動來理解差異</li>
            <li>• 注意 Console 中的日誌輸出</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          V-if 和 V-show 都是條件渲染指令，但在 DOM 處理、性能表現和使用場景上有根本性差異：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">選擇 V-if 當：</h4>
            <ul class="text-sm space-y-1">
              <li>• 條件很少改變</li>
              <li>• 需要權限控制</li>
              <li>• 組件初始化成本高</li>
              <li>• 希望節省記憶體</li>
            </ul>
          </div>
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-800 mb-2">選擇 V-show 當：</h4>
            <ul class="text-sm space-y-1">
              <li>• 需要頻繁切換</li>
              <li>• 需要保持組件狀態</li>
              <li>• 需要 CSS 動畫</li>
              <li>• 切換速度要求高</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握兩者的差異和正確使用方式，能讓你在不同場景下做出最佳的性能選擇 🚀
        </p>
      </div>
    </div>
  </div>
</template>
