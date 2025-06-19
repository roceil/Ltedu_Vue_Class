<script lang="ts" setup>
import { ref } from 'vue'

// 演示用的響應式狀態
const id = ref('dynamic-element')
const className = ref('btn-primary')
const src = ref('https://placehold.jp/3d4070/ffffff/200x120.png?text=Demo')
const alt = ref('示例圖片')
const href = ref('#section1')
const title = ref('這是標題文字')
const placeholder = ref('請輸入內容...')

// 用於展示同名簡寫的狀態
const width = ref('300px')
const height = ref('200px')

function updateId() {
  const ids = ['dynamic-element', 'test-element', 'demo-element', 'sample-element']
  const currentIndex = ids.indexOf(id.value)
  const nextIndex = (currentIndex + 1) % ids.length
  id.value = ids[nextIndex]
}

function updateClass() {
  const classes = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-warning']
  const currentIndex = classes.indexOf(className.value)
  const nextIndex = (currentIndex + 1) % classes.length
  className.value = classes[nextIndex]
}

function updateImage() {
  const sizes = [
    { w: 200, h: 120 },
    { w: 250, h: 150 },
    { w: 300, h: 180 },
    { w: 180, h: 100 }
  ]
  const current = src.value.match(/(\d+)\/(\d+)/)
  if (!current) return

  const currentW = parseInt(current[1])
  const currentIndex = sizes.findIndex(s => s.w === currentW)
  const nextIndex = (currentIndex + 1) % sizes.length
  const next = sizes[nextIndex]

  src.value = `https://placehold.jp/3d4070/ffffff/${next.w}x${next.h}.png?text=Image+${next.w}x${next.h}`
  alt.value = `示例圖片 ${next.w}x${next.h}`
}

function updateLink() {
  const links = [
    { href: '#section1', title: '第一個區塊' },
    { href: '#section2', title: '第二個區塊' },
    { href: '#section3', title: '第三個區塊' },
    { href: '#home', title: '回到首頁' }
  ]
  const currentIndex = links.findIndex(l => l.href === href.value)
  const nextIndex = (currentIndex + 1) % links.length
  const next = links[nextIndex]

  href.value = next.href
  title.value = next.title
}

function updateInput() {
  const placeholders = [
    '請輸入內容...',
    '在這裡輸入文字',
    '來試試看吧',
    '輸入您的想法'
  ]
  const currentIndex = placeholders.indexOf(placeholder.value)
  const nextIndex = (currentIndex + 1) % placeholders.length
  placeholder.value = placeholders[nextIndex]
}

function updateDimensions() {
  const dimensions = [
    { width: '300px', height: '200px' },
    { width: '250px', height: '180px' },
    { width: '350px', height: '220px' },
    { width: '280px', height: '160px' }
  ]
  const currentIndex = dimensions.findIndex(d => d.width === width.value)
  const nextIndex = (currentIndex + 1) % dimensions.length
  const next = dimensions[nextIndex]

  width.value = next.width
  height.value = next.height
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">v-bind 簡寫語法演示</h3>

    <!-- 基本簡寫語法對比 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 完整語法 vs 簡寫語法</h4>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 完整語法 -->
        <div class="space-y-4 ring1">
          <h5 class="font-medium text-blue-700">完整語法 (v-bind:)</h5>
          <div class="space-y-3">
            <div>
              <div
                v-bind:id="id"
                class="p-2 bg-white border-2 border-blue-300 rounded text-sm text-black"
              >
                元素 ID：{{ id }}
              </div>
              <code class="text-xs text-blue-600 block mt-1">v-bind:id="{{ id }}"</code>
            </div>
          </div>
        </div>

        <!-- 簡寫語法 -->
        <div class="space-y-4">
          <h5 class="font-medium text-green-700">簡寫語法 (:)</h5>
          <div class="space-y-3">
            <div>
              <div :class="[
                className,
                'p-2 border-2 rounded text-sm text-white',
                {
                  'bg-blue-500 border-blue-600': className === 'btn-primary',
                  'bg-gray-500 border-gray-600': className === 'btn-secondary',
                  'bg-green-500 border-green-600': className === 'btn-success',
                  'bg-yellow-500 border-yellow-600': className === 'btn-warning'
                }
              ]">
                動態 class
              </div>
              <code class="text-xs text-green-600 block mt-1">:class="{{ className }}"</code>
            </div>

            <a
              :href="href"
              :title="title"
              class="inline-block px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 no-underline"
            >
              動態連結
            </a>
            <code class="text-xs text-green-600 block">:href, :title</code>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <button
          @click="updateId"
          class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          更新 ID
        </button>
        <button
          @click="updateClass"
          class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          更新 Class
        </button>
      </div>

      <!-- 範例程式碼 -->
      <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
        <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
          <span class="mr-2">📝</span>程式碼範例 - 完整語法 vs 簡寫語法
        </h5>
        <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">id</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'dynamic-element'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">className</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'btn-primary'</span><span class="text-white">)</span>
<span class="text-pink-404">const</span> <span class="text-blue-300">href</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#section1'</span><span class="text-white">)</span>
<span class="text-pink-404">const</span> <span class="text-blue-300">title</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'這是標題文字'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateId</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">ids</span> <span class="text-white">= [</span><span class="text-green-300">'dynamic-element'</span><span class="text-white">, </span><span class="text-green-300">'test-element'</span><span class="text-white">, </span><span class="text-green-300">'demo-element'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">ids</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">id</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">ids</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">id</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">ids</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- 完整語法 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">v-bind:id</span><span class="text-white">=</span><span class="text-green-300">"id"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-2 bg-white border-2 border-blue-300 rounded"</span>
  <span class="text-red-400">&gt;</span>
    元素 ID：<span class="text-purple-300">{{ id }}</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-gray-500">&lt;!-- 簡寫語法 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"className"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-2 border-2 rounded"</span>
  <span class="text-red-400">&gt;</span>
    動態 class
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;a</span>
    <span class="text-cyan-300">:href</span><span class="text-white">=</span><span class="text-green-300">"href"</span>
    <span class="text-cyan-300">:title</span><span class="text-white">=</span><span class="text-green-300">"title"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"inline-block px-3 py-1 bg-green-600 text-white rounded"</span>
  <span class="text-red-400">&gt;</span>
    動態連結
  <span class="text-red-400">&lt;/a&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateId"</span><span class="text-red-400">&gt;</span>更新 ID<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateClass"</span><span class="text-red-400">&gt;</span>更新 Class<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
      </div>
    </div>

    <!-- 同名屬性簡寫 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 同名屬性的極簡寫法</h4>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">當屬性名稱與變數名稱相同時，可以省略綁定的變數名</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 一般簡寫 -->
          <div>
            <h5 class="font-medium text-green-700 mb-2">一般簡寫</h5>
            <div
              :style="{ width: width, height: height }"
              class="bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center text-white font-bold"
            >
              動態尺寸
            </div>
            <div class="text-xs text-green-600 mt-2 space-y-1">
              <div>:style="{ width: width, height: height }"</div>
              <div>width: {{ width }}, height: {{ height }}</div>
            </div>
          </div>

          <!-- 極簡寫法 -->
          <div>
            <h5 class="font-medium text-blue-700 mb-2">極簡寫法</h5>
            <div
              :style="{ width, height }"
              class="bg-gradient-to-br from-purple-400 to-pink-500 rounded flex items-center justify-center text-white font-bold"
            >
              同名簡寫
            </div>
            <div class="text-xs text-blue-600 mt-2 space-y-1">
              <div>:style="{ width, height }"</div>
              <div>等同於上面的寫法</div>
            </div>
          </div>
        </div>

        <button
          @click="updateDimensions"
          class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          更新尺寸
        </button>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 同名屬性簡寫
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">width</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'300px'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">height</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'200px'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateDimensions</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">dimensions</span> <span class="text-white">= [</span>
    <span class="text-white">{ </span><span class="text-cyan-300">width</span><span class="text-white">: </span><span class="text-green-300">'300px'</span><span class="text-white">, </span><span class="text-cyan-300">height</span><span class="text-white">: </span><span class="text-green-300">'200px'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">width</span><span class="text-white">: </span><span class="text-green-300">'250px'</span><span class="text-white">, </span><span class="text-cyan-300">height</span><span class="text-white">: </span><span class="text-green-300">'180px'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">width</span><span class="text-white">: </span><span class="text-green-300">'350px'</span><span class="text-white">, </span><span class="text-cyan-300">height</span><span class="text-white">: </span><span class="text-green-300">'220px'</span> <span class="text-white">}</span>
  <span class="text-white">]</span>
  <span class="text-gray-500">// 更新邏輯...</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- 一般簡寫語法 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:style</span><span class="text-white">=</span><span class="text-green-300">"{ width: width, height: height }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"bg-gradient-to-br from-green-400 to-blue-500"</span>
  <span class="text-red-400">&gt;</span>
    動態尺寸
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-gray-500">&lt;!-- 同名屬性極簡寫法 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:style</span><span class="text-white">=</span><span class="text-green-300">"{ width, height }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"bg-gradient-to-br from-purple-400 to-pink-500"</span>
  <span class="text-red-400">&gt;</span>
    同名簡寫
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateDimensions"</span><span class="text-red-400">&gt;</span>更新尺寸<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 語法對照表 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 語法對照表</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">語法類型</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">寫法</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">說明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">完整語法</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">v-bind:src="imageUrl"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">最完整的寫法，清楚明確</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">常用簡寫</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">:src="imageUrl"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">省略 v-bind，最常用的寫法</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">同名簡寫</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-purple-600">:src (當變數名為 src)</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">屬性名與變數名相同時的極簡寫法</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h5 class="font-semibold text-yellow-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• <code class="bg-yellow-100 px-1 rounded">:attr</code> 是 <code
            class="bg-yellow-100 px-1 rounded">v-bind:attr</code> 的簡寫，功能完全相同</li>
        <li>• 簡寫語法更常用，程式碼更簡潔易讀</li>
        <li>• 同名簡寫適用於物件語法中，屬性名與變數名相同的情況</li>
        <li>• 所有 HTML 屬性都可以使用簡寫語法進行動態綁定</li>
        <li>• 推薦在專案中統一使用簡寫語法，提高程式碼一致性</li>
      </ul>
    </div>
  </div>
</template>