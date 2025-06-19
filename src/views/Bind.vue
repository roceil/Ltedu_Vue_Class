<script lang="ts" setup>
import BasicBindDemo from '../components/BasicBindDemo.vue'
import BindShorthandDemo from '../components/BindShorthandDemo.vue'
import ClassObjectDemo from '../components/ClassObjectDemo.vue'
import ClassArrayDemo from '../components/ClassArrayDemo.vue'
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題和介紹 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">動態屬性綁定 v-bind</h1>
      <p class="text-lg text-gray-300 max-w-3xl mx-auto">
        掌握 Vue.js 中最強大的動態綁定指令，讓 HTML 屬性隨著狀態變化而自動更新
      </p>
    </div>

    <!-- 概述說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-600 rounded-lg">
      <h2 class="text-2xl font-bold text-white mb-4">🎯 什麼是動態屬性綁定？</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-gray-800 rounded border border-blue-500">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">響應式綁定</h3>
          <p class="text-gray-300 text-sm">
            使用 v-bind 將 HTML 屬性與響應式狀態連結，當狀態改變時屬性值自動更新。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-indigo-500">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">靈活語法</h3>
          <p class="text-gray-300 text-sm">
            支援完整語法 v-bind:attr 和簡寫語法 :attr，讓程式碼更簡潔易讀。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-purple-500">
          <h3 class="text-lg font-semibold text-purple-400 mb-2">強化功能</h3>
          <p class="text-gray-300 text-sm">
            針對 class 和 style 提供物件/陣列語法，讓樣式綁定更加靈活強大。
          </p>
        </div>
      </div>
    </div>

    <!-- v-bind 核心概念 -->
    <div class="mb-8 p-6 bg-cyan-50 border border-cyan-200 rounded-lg">
      <h2 class="text-2xl font-bold text-cyan-800 mb-4">⚡ v-bind 的核心概念</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-cyan-200">
          <h3 class="font-semibold text-cyan-700 mb-3">基本語法</h3>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-blue-600">v-bind:src="imageUrl"</code>
              <p class="text-gray-600 mt-1">完整語法，綁定 src 屬性</p>
            </div>
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-blue-600">:src="imageUrl"</code>
              <p class="text-gray-600 mt-1">簡寫語法，更常用的寫法</p>
            </div>
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-blue-600">:id</code>
              <p class="text-gray-600 mt-1">當屬性名與變數名相同時可省略</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-white rounded border border-cyan-200">
          <h3 class="font-semibold text-cyan-700 mb-3">特殊功能</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>布林屬性：</strong> 根據 Truthy/Falsy 決定是否渲染</li>
            <li>• <strong>多屬性綁定：</strong> 使用物件一次綁定多個屬性</li>
            <li>• <strong>函式調用：</strong> 可以綁定函式回傳值</li>
            <li>• <strong>表達式：</strong> 支援 JavaScript 表達式運算</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- class 和 style 特殊語法 -->
    <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-green-800 mb-4">🎨 Class 與 Style 的特殊語法</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">:class 語法變化</h3>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-green-600">:class="{ 'active': isActive }"</code>
              <p class="text-gray-600 mt-1">物件語法，根據條件切換 class</p>
            </div>
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-green-600">:class="[baseClass, activeClass]"</code>
              <p class="text-gray-600 mt-1">陣列語法，動態組合多個 class</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">:style 語法變化</h3>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-green-600">:style="{ fontSize: '2rem' }"</code>
              <p class="text-gray-600 mt-1">物件語法，直接設定 CSS 屬性</p>
            </div>
            <div class="p-3 bg-gray-50 rounded border">
              <code class="text-green-600">:style="[baseStyle, themeStyle]"</code>
              <p class="text-gray-600 mt-1">陣列語法，組合多個樣式物件</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Truthy/Falsy 值說明 -->
    <div class="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 class="text-2xl font-bold text-yellow-800 mb-4">⚠️ JavaScript Truthy / Falsy 值</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-red-200">
          <h3 class="font-semibold text-red-700 mb-3">❌ Falsy 值（假值）</h3>
          <div class="space-y-2 text-sm font-mono">
            <div class="p-2 bg-red-50 rounded border text-red-600">false</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">0</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">-0</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">0n</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">""、''、``</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">null</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">undefined</div>
            <div class="p-2 bg-red-50 rounded border text-red-600">NaN</div>
          </div>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-3">✅ Truthy 值（真值）</h3>
          <div class="space-y-2 text-sm">
            <div class="p-2 bg-green-50 rounded border text-green-600">
              除了 Falsy 值以外的所有值都是 Truthy
            </div>
            <div class="p-2 bg-green-50 rounded border text-green-600 font-mono">
              true, 1, "hello", [], {}, function(){}...
            </div>
            <div class="p-2 bg-green-50 rounded border text-green-600 font-mono">
              "false" ← 字串 "false" 也是 Truthy！
            </div>
          </div>
          <p class="text-sm text-green-600 mt-3">
            💡 布林屬性會根據這些值決定是否渲染到 HTML 中
          </p>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div class="space-y-8">
      <!-- 基本 v-bind 演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">1. 基本 v-bind 使用演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          展示 v-bind 的基本用法，包含不同 HTML 屬性的動態綁定
        </p>

        <BasicBindDemo />
      </div>

      <!-- 簡寫語法演示 -->
      <div class="p-4 border-2 border-dashed border-gray-500 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">2. v-bind 簡寫語法演示</h3>
        <p class="text-sm text-gray-400 mb-4">
          掌握 v-bind 的各種簡寫方式，讓程式碼更簡潔
        </p>

        <BindShorthandDemo />
      </div>

      <!-- :class 物件語法演示 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">3. :class 物件語法演示</h3>
        <p class="text-sm text-purple-400 mb-4">
          使用物件語法動態切換 CSS 類別
        </p>

        <ClassObjectDemo />
      </div>

      <!-- :class 陣列語法演示 -->
      <div class="p-4 border-2 border-dashed border-purple-500 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-300 mb-2">4. :class 陣列語法演示</h3>
        <p class="text-sm text-purple-400 mb-4">
          使用陣列語法動態組合多個 CSS 類別
        </p>

        <ClassArrayDemo />
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-blue-800 mb-4">📖 學習指南</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">🎯 學習路徑</h3>
          <ol class="text-sm text-gray-700 space-y-2">
            <li>1. <strong>基本綁定：</strong> 從第1個演示了解 v-bind 基本用法</li>
            <li>2. <strong>布林屬性：</strong> 掌握第2個演示的 Truthy/Falsy 概念</li>
            <li>3. <strong>簡寫語法：</strong> 學習第3個演示的各種簡寫方式</li>
            <li>4. <strong>多屬性：</strong> 理解第4個演示的物件綁定技巧</li>
            <li>5. <strong>class 綁定：</strong> 掌握第5、6個演示的樣式切換</li>
            <li>6. <strong>style 綁定：</strong> 學習第7、8個演示的內聯樣式</li>
          </ol>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">💡 互動建議</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>基本功能：</strong> 嘗試修改不同屬性值觀察變化</li>
            <li>• <strong>布林切換：</strong> 測試各種 Truthy/Falsy 值效果</li>
            <li>• <strong>語法比較：</strong> 對比完整語法和簡寫語法</li>
            <li>• <strong>多屬性：</strong> 嘗試添加或移除物件中的屬性</li>
            <li>• <strong>樣式切換：</strong> 觀察 class 動態添加和移除</li>
            <li>• <strong>內聯樣式：</strong> 修改 style 物件看即時效果</li>
            <li>• <strong>開發者工具：</strong> 檢查 HTML 元素的屬性變化</li>
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
            <li>• <strong>使用簡寫：</strong> 優先使用 :attr 簡寫語法</li>
            <li>• <strong>語意命名：</strong> 使用有意義的變數名綁定屬性</li>
            <li>• <strong>適當抽離：</strong> 複雜邏輯抽離成 computed 或方法</li>
            <li>• <strong>型別標註：</strong> TypeScript 中適當標註型別</li>
            <li>• <strong>條件綁定：</strong> 合理使用 :class 物件語法</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h3 class="font-semibold text-indigo-700 mb-3">❌ 避免的做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>模板複雜化：</strong> 避免在模板中寫複雜的表達式</li>
            <li>• <strong>過度使用 :style：</strong> 內聯樣式權重高，謹慎使用</li>
            <li>• <strong>忽略效能：</strong> 避免在模板中頻繁調用函式</li>
            <li>• <strong>混淆語法：</strong> 不要混用靜態和動態屬性語法</li>
            <li>• <strong>忘記響應性：</strong> 確保綁定的值具有響應性</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          v-bind 是 Vue.js 中最核心的指令之一，掌握它的各種用法能讓你的應用更具互動性：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">核心價值：</h4>
            <ul class="text-sm space-y-1">
              <li>• 讓 HTML 屬性具有響應性</li>
              <li>• 簡潔的語法降低開發複雜度</li>
              <li>• 強大的 class/style 綁定功能</li>
              <li>• 支援複雜的條件和表達式</li>
            </ul>
          </div>
          <div class="p-4 bg-green-50 border border-green-200 rounded">
            <h4 class="font-semibold text-green-800 mb-2">實用場景：</h4>
            <ul class="text-sm space-y-1">
              <li>• 動態切換圖片、連結、標題</li>
              <li>• 根據狀態控制表單元素</li>
              <li>• 響應式的樣式和主題切換</li>
              <li>• 條件性的 CSS 類別應用</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          熟練掌握 v-bind 的各種語法，讓你的 Vue 應用充滿動態魅力 ✨🎨
        </p>
      </div>
    </div>
  </div>
</template>
