<script lang="ts" setup>
import BasicVForDemo from '../components/BasicVForDemo.vue'
import KeyImportanceDemo from '../components/KeyImportanceDemo.vue'
import ResponsiveUpdateDemo from '../components/ResponsiveUpdateDemo.vue'
import NestedListExample from '../components/NestedListExample.vue'

</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">V-for 列表渲染</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        深入了解 Vue.js 中最重要的列表渲染指令，掌握 Key 屬性的正確使用和性能優化技巧
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-green-900 to-blue-900 border border-green-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是 V-for？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-green-500">
          <h3 class="text-lg font-semibold text-green-400 mb-2">列表渲染指令</h3>
          <p class="text-gray-300 text-sm">
            V-for 是 Vue 提供的列表渲染指令，用於基於數據源渲染一個列表，支持數組、對象、字符串和數字。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">響應式綁定</h3>
          <p class="text-gray-300 text-sm">
            為每個數據項創建對應的 DOM 元素，並建立響應式的數據綁定，自動響應數據變化。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-purple-500">
          <h3 class="text-lg font-semibold text-purple-400 mb-2">Key 屬性</h3>
          <p class="text-gray-300 text-sm">
            通過 Key 屬性幫助 Vue 識別每個節點的身份，從而高效地更新虛擬 DOM。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心特性 -->
    <div class="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ V-for 的核心特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">多種數據源支持</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>數組：</strong> 最常用的數據源類型</li>
            <li><strong>對象：</strong> 遍歷對象的屬性和值</li>
            <li><strong>字符串：</strong> 遍歷字符串的每個字符</li>
            <li><strong>數字：</strong> 生成指定數量的序列</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-yellow-200">
          <h3 class="font-semibold text-yellow-700 mb-3">Key 屬性的重要性</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>唯一標識：</strong> 幫助 Vue 識別節點身份</li>
            <li><strong>性能優化：</strong> 高效更新虛擬 DOM</li>
            <li><strong>避免錯誤：</strong> 防止狀態錯亂和重用問題</li>
            <li><strong>穩定性：</strong> 使用穩定且唯一的標識符</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Key 使用警告 -->
    <div class="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 class="text-2xl font-bold text-red-800 mb-4">⚠️ 重要警告：不要使用 Index 作為 Key</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-red-200">
          <h3 class="font-semibold text-red-700 mb-2">❌ 使用 Index 的問題</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 數據和 DOM 元素錯位</li>
            <li>• 表單狀態混亂</li>
            <li>• 組件狀態不正確</li>
            <li>• 性能問題</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">✅ 正確的 Key 使用</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 使用唯一且穩定的 ID</li>
            <li>• 避免使用可變的屬性</li>
            <li>• 確保 Key 的唯一性</li>
            <li>• 靜態列表可以使用 Index</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本 V-for 演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本 V-for 演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示不同數據源的 V-for 使用方式：數組、對象、字符串、數字
        </p>
        <BasicVForDemo />
      </div>

      <!-- Key 重要性演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">2. Key 屬性重要性演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          理解 Key 屬性如何幫助 Vue 識別和追蹤列表項的變化
        </p>
        <KeyImportanceDemo />
      </div>

      <!-- 響應式更新演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">3. 響應式更新機制</h3>
        <p class="text-sm text-gray-400 mb-4">
          觀察 V-for 如何自動響應數據變化，包含過濾和排序功能
        </p>
        <ResponsiveUpdateDemo />
      </div>

      <!-- 嵌套列表範例 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">4. 嵌套列表渲染</h3>
        <p class="text-sm text-purple-400 mb-4">
          學習嵌套 V-for 的使用：分類列表中的項目管理
        </p>
        <NestedListExample />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>基本概念：</strong> 從第1個演示開始了解不同數據源</li>
            <li>2. <strong>Key 重要性：</strong> 理解第2個演示中的 Key 作用</li>
            <li>3. <strong>響應式更新：</strong> 體驗第3個演示的自動更新</li>
            <li>4. <strong>問題對比：</strong> 重點學習第4、5個演示的差異</li>
            <li>5. <strong>實際應用：</strong> 參考第6、7個演示的實用場景</li>
            <li>6. <strong>性能優化：</strong> 掌握第8個演示的優化技巧</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>Index Key 問題：</strong> 勾選複選框後排序觀察差異</li>
            <li>• <strong>響應式更新：</strong> 嘗試不同的過濾和排序組合</li>
            <li>• <strong>購物車範例：</strong> 測試數量調整和商品管理</li>
            <li>• <strong>嵌套列表：</strong> 新增分類和項目體驗結構</li>
            <li>• <strong>性能測試：</strong> 開關 V-memo 比較性能差異</li>
            <li>• <strong>開發者工具：</strong> 觀察 DOM 變化和 Console 日誌</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          V-for 是 Vue 中最重要的列表渲染指令，正確使用 Key 屬性是確保應用程式性能和正確性的關鍵：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">核心特性：</h4>
            <ul class="text-sm space-y-1">
              <li>• 支援多種數據源（數組、對象、字符串、數字）</li>
              <li>• Key 屬性至關重要</li>
              <li>• 響應式更新機制</li>
              <li>• 自動重新渲染受影響的部分</li>
            </ul>
          </div>
          <div class="p-4 bg-red-50 border border-red-200 rounded">
            <h4 class="font-semibold text-red-800 mb-2">重要原則：</h4>
            <ul class="text-sm space-y-1">
              <li>• 避免使用 Index 作為 Key</li>
              <li>• 使用唯一且穩定的標識符</li>
              <li>• 防止狀態錯亂和性能問題</li>
              <li>• 配合 V-memo 優化大列表性能</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握 V-for 的正確使用方式，能讓你構建高效且穩定的動態列表應用 🚀
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
