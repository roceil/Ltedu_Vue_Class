<script lang="ts" setup>
import StopwatchDemo from '../components/StopwatchDemo.vue'
import DataLoadingDemo from '../components/DataLoadingDemo.vue'
import LifecycleOrderDemo from '../components/LifecycleOrderDemo.vue'
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
          <h3 class="text-lg font-semibold text-teal-400 mb-2">組合式 API</h3>
          <p class="text-gray-300 text-sm">
            在 Vue3 組合式 API 中，生命週期鉤子以 `on` 開頭的函數形式提供，在 setup() 函數中註冊使用。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded border border-cyan-500">
          <h3 class="text-lg font-semibold text-cyan-400 mb-2">靈活管理</h3>
          <p class="text-gray-300 text-sm">
            組合式 API 的生命週期鉤子提供更靈活的組件邏輯組織方式，便於代碼復用和邏輯封裝。
          </p>
        </div>
      </div>
    </div>

    <!-- 生命週期列表 -->
    <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">⚡ Vue3 組合式 API 生命週期</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">核心生命週期</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>onBeforeMount()：</strong> 掛載前，響應式狀態已設置，DOM 尚未創建</li>
            <li><strong>onMounted()：</strong> 掛載完成，DOM 樹已創建並插入父容器</li>
            <li><strong>onBeforeUpdate()：</strong> 更新前，可訪問更新前的 DOM 狀態</li>
            <li><strong>onUpdated()：</strong> 更新完成，DOM 樹已更新</li>
            <li><strong>onBeforeUnmount()：</strong> 卸載前，組件實例仍保有全部功能</li>
            <li><strong>onUnmounted()：</strong> 卸載完成，所有子組件和響應式作用已停止</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-blue-200">
          <h3 class="font-semibold text-blue-700 mb-3">特殊生命週期</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>onErrorCaptured()：</strong> 捕獲後代組件傳遞的錯誤</li>
            <li><strong>onRenderTracked()：</strong> 追蹤到響應式依賴時調用 (調試用)</li>
            <li><strong>onRenderTriggered()：</strong> 響應式依賴變更觸發渲染時調用 (調試用)</li>
            <li><strong>onActivated()：</strong> KeepAlive 組件被插入 DOM 時調用</li>
            <li><strong>onDeactivated()：</strong> KeepAlive 組件從 DOM 移除時調用</li>
            <li><strong>onServerPrefetch()：</strong> 服務端渲染前異步數據抓取 (SSR 專用)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- setup 函式特別說明 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg">
      <h2 class="text-2xl font-bold text-purple-800 mb-4">🔧 setup() 函式特別說明</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">setup 函式的功用</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>執行時機：</strong> 在組件實例創建時執行，是組合式 API 的入口點</li>
            <li>• <strong>功能整合：</strong> 整合了原本 beforeCreate 和 created 的所有功能</li>
            <li>• <strong>同步調用：</strong> 所有生命週期鉤子都在 setup() 階段同步調用</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">常見用法：&lt;script setup&gt;</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>語法糖：</strong> 使用 &lt;script setup&gt; 簡化語法</li>
            <li>• <strong>自動暴露：</strong> 變數和函數自動暴露給模板，無需 return</li>
            <li>• <strong>同步註冊：</strong> 生命週期鉤子直接在頂層同步調用</li>
            <li>• <strong>更簡潔：</strong> 減少樣板代碼，提升開發體驗</li>
          </ul>
        </div>
      </div>

      <!-- 代碼示例 -->
      <div class="mt-6 p-4 bg-white rounded border border-purple-200">
        <h3 class="font-semibold text-purple-700 mb-3">💡 &lt;script setup&gt; 示例</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">❌ 傳統 setup() 寫法：</p>
            <pre class="bg-gray-800 p-3 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script&gt;
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    onMounted(() =&gt; {
      console.log('組件已掛載')
    })
    
    // 需要 return 暴露給模板
    return {
      count
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-2">✅ 現代 &lt;script setup&gt; 寫法：</p>
            <pre class="bg-gray-800 p-3 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script setup&gt;
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() =&gt; {
  console.log('組件已掛載')
})

// 自動暴露給模板，無需 return
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 執行順序說明 -->
    <div class="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">🔄 生命週期執行順序</h2>
      <div class="mb-4 p-3 bg-blue-100 border border-blue-300 rounded">
        <p class="text-sm text-blue-800">
          <strong>注意：</strong> setup() 不是生命週期鉤子，而是組合式 API 的入口點，在組件實例創建時執行。
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-amber-200">
          <h3 class="font-semibold text-amber-700 mb-3">掛載階段</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>1. onBeforeMount()：</strong> 掛載前，響應式狀態已設置</li>
            <li><strong>2. onMounted()：</strong> 掛載完成，DOM 樹已創建</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-amber-200">
          <h3 class="font-semibold text-amber-700 mb-3">更新與卸載階段</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li><strong>3. onBeforeUpdate()：</strong> 數據更新，DOM 更新前</li>
            <li><strong>4. onUpdated()：</strong> DOM 更新完成</li>
            <li><strong>5. onBeforeUnmount()：</strong> 組件卸載前</li>
            <li><strong>6. onUnmounted()：</strong> 組件卸載完成</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 重點生命週期說明 -->
    <div class="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 重點生命週期詳解</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onBeforeMount() - 掛載前</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 組件已完成響應式狀態設置</li>
            <li>• 還沒有創建 DOM 節點</li>
            <li>• 即將首次執行 DOM 渲染過程</li>
            <li>• 服務端渲染期間不會調用</li>
            <li>• 適合進行掛載前的準備工作</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onMounted() - 掛載完成</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 所有同步子組件都已掛載</li>
            <li>• DOM 樹已創建並插入父容器</li>
            <li>• 可以安全訪問組件的 DOM 元素</li>
            <li>• 適合執行需要 DOM 的副作用</li>
            <li>• 服務端渲染期間不會調用</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onBeforeUpdate() - 更新前</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 響應式狀態變更觸發更新</li>
            <li>• DOM 尚未更新</li>
            <li>• 可以訪問更新前的 DOM 狀態</li>
            <li>• 在此鉤子中更改狀態是安全的</li>
            <li>• 服務端渲染期間不會調用</li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onUpdated() - 更新完成</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 組件 DOM 樹已更新</li>
            <li>• 父組件更新鉤子在子組件之後調用</li>
            <li>• 多個狀態變更可能批量執行</li>
            <li>• ⚠️ 不要在此鉤子中更改狀態</li>
            <li>• 服務端渲染期間不會調用</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onBeforeUnmount() - 卸載前</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 組件實例仍保有全部功能</li>
            <li>• 適合進行清理前的準備工作</li>
            <li>• 可以訪問組件的所有屬性和方法</li>
            <li>• 服務端渲染期間不會調用</li>
            <li>• 清理工作的最佳時機</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h3 class="font-semibold text-green-700 mb-2">onUnmounted() - 卸載完成</h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• 所有子組件都已卸載</li>
            <li>• 所有響應式作用都已停止</li>
            <li>• 清理計時器、事件監聽器</li>
            <li>• 取消服務器連接</li>
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

    <!-- 最佳實踐與注意事項 -->
    <div class="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
      <h2 class="text-2xl font-bold text-purple-800 mb-4">💡 最佳實踐與注意事項</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">✅ 推薦做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>同步註冊：</strong> 所有生命週期鉤子都應在 setup() 中同步調用</li>
            <li>• <strong>onMounted()：</strong> 用於需要訪問 DOM 的副作用操作</li>
            <li>• <strong>onUnmounted()：</strong> 手動清理副作用，如計時器、事件監聽器</li>
            <li>• <strong>onBeforeUpdate()：</strong> 需要訪問更新前 DOM 狀態時使用</li>
            <li>• <strong>資源管理：</strong> 每個創建的資源都要有對應的清理</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-purple-200">
          <h3 class="font-semibold text-purple-700 mb-3">❌ 避免的做法</h3>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>異步註冊：</strong> 不要在 async setup() 的 await 之後註冊鉤子</li>
            <li>• <strong>onUpdated 陷阱：</strong> 絕對不要在 onUpdated 中更改組件狀態</li>
            <li>• <strong>記憶體洩漏：</strong> 忘記在 onUnmounted 中清理資源</li>
            <li>• <strong>條件註冊：</strong> 避免在條件語句中註冊生命週期鉤子</li>
            <li>• <strong>服務端渲染：</strong> 注意某些鉤子在 SSR 期間不會調用</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 重要警告 -->
    <div class="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 class="text-2xl font-bold text-red-800 mb-4">⚠️ 重要警告</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-red-200">
          <h3 class="font-semibold text-red-700 mb-3">onUpdated 無限循環</h3>
          <div class="text-sm text-gray-700 space-y-2">
            <p class="font-medium text-red-600">❌ 錯誤示例：</p>
            <pre class="bg-gray-800 p-2 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script setup&gt;
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  // 這會導致無限循環！
  count.value++
})
&lt;/script&gt;</code></pre>
            <p class="font-medium text-green-600">✅ 正確做法：</p>
            <pre class="bg-gray-800 p-2 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script setup&gt;
import { onUpdated } from 'vue'

onUpdated(() => {
  // 只讀取或執行副作用
  console.log('DOM 已更新')
})
&lt;/script&gt;</code></pre>
          </div>
        </div>
        <div class="p-4 bg-white rounded border border-red-200">
          <h3 class="font-semibold text-red-700 mb-3">生命週期註冊時機</h3>
          <div class="text-sm text-gray-700 space-y-2">
            <p class="font-medium text-red-600">❌ 錯誤示例：</p>
            <pre class="bg-gray-800 p-2 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script setup&gt;
import { onMounted } from 'vue'

setTimeout(() => {
  // 異步註冊會失敗！
  onMounted(() => {
    console.log('這不會執行')
  })
}, 100)
&lt;/script&gt;</code></pre>
            <p class="font-medium text-green-600">✅ 正確做法：</p>
            <pre class="bg-gray-800 p-2 rounded text-xs overflow-x-auto"><code class="text-gray-100">&lt;script setup&gt;
import { onMounted } from 'vue'

// 直接在頂層同步註冊
onMounted(() => {
  console.log('組件已掛載')
})
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 總結 -->
    <div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">📝 總結</h2>
      <div class="prose prose-sm max-w-none text-gray-700">
        <p class="mb-4">
          Vue 3 組合式 API 的生命週期鉤子提供了更靈活和強大的組件邏輯管理方式：
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded">
            <h4 class="font-semibold text-emerald-800 mb-2">核心優勢：</h4>
            <ul class="text-sm space-y-1">
              <li>• 更好的邏輯組合和代碼復用</li>
              <li>• 優秀的 TypeScript 支援</li>
              <li>• 更直觀的依賴關係</li>
              <li>• 靈活的邏輯封裝能力</li>
              <li>• 更好的 Tree-shaking 支援</li>
            </ul>
          </div>
          <div class="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 class="font-semibold text-blue-800 mb-2">實際應用場景：</h4>
            <ul class="text-sm space-y-1">
              <li>• setup：響應式數據初始化、計算屬性設置</li>
              <li>• onMounted：DOM 操作、第三方庫初始化、事件監聽</li>
              <li>• onUnmounted：資源清理、計時器清除、事件移除</li>
              <li>• onErrorCaptured：錯誤統計和上報</li>
              <li>• 調試鉤子：性能分析和依賴追蹤</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-center text-gray-600 font-medium">
          掌握 Vue 3 組合式 API 生命週期，讓你的組件邏輯更清晰、更易維護 🚀
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
