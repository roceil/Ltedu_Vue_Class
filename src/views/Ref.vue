<script lang="ts" setup>
import { ref } from 'vue'
import BasicRefDemo from '../components/BasicRefDemo.vue'
import DeepTrackingDemo from '../components/DeepTrackingDemo.vue'

// 示例響應式狀態
const isHappy = ref(false)

function changeMood() {
  if (isHappy.value) {
    isHappy.value = false
    return
  }
  isHappy.value = true
}
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">響應式狀態 Ref & Reactive</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        深入了解 Vue.js 中響應式系統的核心工具，掌握狀態驅動畫面的魔法原理與最佳實踐
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-green-900 to-emerald-900 border border-green-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">📚 什麼是響應式狀態？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-green-500">
          <h3 class="text-lg font-semibold text-green-400 mb-2">狀態驅動畫面</h3>
          <p class="text-gray-300 text-sm">
            響應式系統的核心概念，當狀態改變時，畫面會自動更新，無需手動操作 DOM。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-emerald-500">
          <h3 class="text-lg font-semibold text-emerald-400 mb-2">自動追蹤</h3>
          <p class="text-gray-300 text-sm">
            Vue 的魔法咒語會自動追蹤依賴關係，當數據變化時觸發 Virtual DOM diff 和 UI 更新。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">多種工具</h3>
          <p class="text-gray-300 text-sm">
            提供 ref、reactive 等工具，讓任何類型的數據都能擁有響應式能力。
          </p>
        </div>
      </div>
    </div>

    <!-- 快速體驗 -->
    <div class="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h2 class="text-2xl font-bold text-purple-800 mb-4">🎉 快速體驗響應式魔法</h2>
      <div class="flex items-center justify-center gap-6 p-6 bg-white rounded-lg border border-purple-200">
        <div class="text-6xl">{{ isHappy ? '😄' : '😢' }}</div>
        <div class="text-center">
          <p class="text-gray-600 mb-3">當前心情：{{ isHappy ? '開心' : '難過' }}</p>
          <button
            @click="changeMood"
            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            切換心情
          </button>
        </div>
      </div>
      <p class="text-sm text-purple-600 text-center mt-4">
        點擊按鈕體驗狀態驅動畫面的即時更新！這就是 ref 響應式狀態的魔法 ✨
      </p>
    </div>

    <!-- 核心特性 -->
    <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-blue-800 mb-4">⚡ Ref 與 Reactive 的核心特性</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">Ref 的特性</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>萬能工具：</strong> 支援任何型別的值（字串、數字、布林、物件、陣列）</li>
            <li><strong>.value 存取：</strong> 在 script 中需要使用 .value，模板中自動解包</li>
            <li><strong>深層追蹤：</strong> 自動追蹤物件和陣列的深層變化</li>
            <li><strong>可替換：</strong> 可以直接替換整個值而不失去響應性</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">Reactive 的特性</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>物件專用：</strong> 僅支援物件和陣列型別</li>
            <li><strong>直接存取：</strong> 不需要 .value，直接存取屬性</li>
            <li><strong>深層追蹤：</strong> 預設追蹤物件的所有嵌套屬性</li>
            <li><strong>引用限制：</strong> 替換物件會失去響應性，解構也會失去響應性</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Ref vs Reactive 比較表 -->
    <div class="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-yellow-800 mb-4">📊 Ref vs Reactive 完整比較</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-yellow-200">
            <tr>
              <th class="p-3 text-left text-yellow-800 font-semibold border border-yellow-300">比較點</th>
              <th class="p-3 text-center text-yellow-800 font-semibold border border-yellow-300">Ref</th>
              <th class="p-3 text-center text-yellow-800 font-semibold border border-yellow-300">Reactive</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr>
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">資料型別</td>
              <td class="p-3 text-center text-green-600 border border-yellow-300">支援任何型別</td>
              <td class="p-3 text-center text-orange-600 border border-yellow-300">僅支援物件和陣列</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">存取方式</td>
              <td class="p-3 text-center text-gray-700 border border-yellow-300">script: .value<br />template: 自動解包</td>
              <td class="p-3 text-center text-gray-700 border border-yellow-300">直接存取屬性</td>
            </tr>
            <tr>
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">深層響應</td>
              <td class="p-3 text-center text-green-600 border border-yellow-300">✅</td>
              <td class="p-3 text-center text-green-600 border border-yellow-300">✅</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">替換整個值</td>
              <td class="p-3 text-center text-green-600 border border-yellow-300">✅ 保留響應性</td>
              <td class="p-3 text-center text-red-600 border border-yellow-300">❌ 失去響應性</td>
            </tr>
            <tr>
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">解構</td>
              <td class="p-3 text-center text-yellow-600 border border-yellow-300">⚠️ 原始值失去響應性</td>
              <td class="p-3 text-center text-red-600 border border-yellow-300">❌ 原始值失去響應性</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="p-3 font-medium text-gray-800 border border-yellow-300">使用場景</td>
              <td class="p-3 text-sm text-gray-700 border border-yellow-300">單一值、需替換整個物件</td>
              <td class="p-3 text-sm text-gray-700 border border-yellow-300">複雜物件、僅修改屬性</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 官方建議 -->
    <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-green-800 mb-4">🎯 官方建議：一律使用 Ref</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">為什麼推薦 Ref？</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>通用性：</strong> 可以應用在所有情境，不用記憶限制</li>
            <li>• <strong>一致性：</strong> 統一的使用方式，降低認知負擔</li>
            <li>• <strong>可讀性：</strong> .value 明確表示這是響應式狀態</li>
            <li>• <strong>安全性：</strong> 避免 reactive 的各種限制陷阱</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">Ref 的優勢</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• 靈活的資料型別支援</li>
            <li>• 不會因為重新賦值失去響應性</li>
            <li>• TypeScript 支援更完善</li>
            <li>• 在複雜專案中更易維護</li>
          </ul>
        </div>
      </div>
      <div class="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
        <p class="text-green-800 font-medium">
          💡 Vue 官方文件建議：在大多數情況下使用 ref，除非你有特別的理由需要 reactive 的特性
        </p>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本 Ref 演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本 Ref 使用演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示 ref 的基本用法，包含不同資料型別和 .value 的使用方式
        </p>
        <BasicRefDemo />
      </div>

      <!-- .value 存取演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">2. .value 存取方式演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          理解在 script 和 template 中不同的 ref 存取方式
        </p>
        <RefValueDemo />
      </div>

      <!-- 深層追蹤演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">3. 深層響應追蹤演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示 ref 和 reactive 如何自動追蹤物件和陣列的深層變化
        </p>
        <DeepTrackingDemo />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-blue-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>基本概念：</strong> 從第1個演示了解 ref 基本用法</li>
            <li>2. <strong>存取方式：</strong> 掌握第2個演示的 .value 使用技巧</li>
            <li>3. <strong>深層追蹤：</strong> 理解第3個演示的響應式特性</li>
            <li>4. <strong>工具比較：</strong> 學習第4個演示的差異和選擇</li>
            <li>5. <strong>避免陷阱：</strong> 了解第5個演示的常見問題</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>基本使用：</strong> 嘗試修改不同型別的響應式狀態</li>
            <li>• <strong>存取方式：</strong> 觀察 script 和 template 的差異</li>
            <li>• <strong>深層物件：</strong> 修改嵌套屬性觀察響應式更新</li>
            <li>• <strong>效果比較：</strong> 並排操作感受兩種工具的差異</li>
            <li>• <strong>限制測試：</strong> 嘗試觸發 reactive 的限制情況</li>
            <li>• <strong>開發者工具：</strong> 查看 Console 了解執行過程</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳實踐 -->
    <div class="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h2 class="text-2xl font-bold text-indigo-800 mb-4">💡 最佳實踐</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h3 class="font-semibold text-indigo-700 mb-3">✅ 推薦做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>優先選擇 ref：</strong> 除非有特殊需求，否則使用 ref</li>
            <li>• <strong>命名規範：</strong> 響應式狀態使用有意義的變數名</li>
            <li>• <strong>避免副作用：</strong> 在組件 setup 中聲明響應式狀態</li>
            <li>• <strong>TypeScript：</strong> 使用型別標註增強程式碼品質</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h3 class="font-semibold text-indigo-700 mb-3">❌ 避免的做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>忘記 .value：</strong> 在 script 中存取 ref 時忘記加 .value</li>
            <li>• <strong>解構原始值：</strong> 解構 reactive 物件的原始型別屬性</li>
            <li>• <strong>重新賦值 reactive：</strong> 直接替換 reactive 物件</li>
            <li>• <strong>混用工具：</strong> 在同一專案中不一致的使用方式</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          響應式狀態是 Vue.js 的核心特性，正確理解和使用能讓你構建更高效的應用：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-800 mb-2">Ref 的核心價值：</h4>
            <ul class="text-sm space-y-1">
              <li>• 通用性強，支援所有資料型別</li>
              <li>• 使用一致，降低學習成本</li>
              <li>• 安全性高，避免常見陷阱</li>
              <li>• 官方推薦的最佳選擇</li>
            </ul>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">響應式系統的魔法：</h4>
            <ul class="text-sm space-y-1">
              <li>• 狀態驅動畫面的自動更新</li>
              <li>• 深層追蹤物件和陣列變化</li>
              <li>• Virtual DOM 智能比較和更新</li>
              <li>• 強大的開發者體驗</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握響應式狀態的正確使用方式，就像學會了 Vue.js 最強大的魔法咒語 ✨🚀
        </p>
      </div>
    </div>
  </div>
</template>
