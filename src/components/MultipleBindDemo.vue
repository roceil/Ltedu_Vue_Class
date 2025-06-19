<script lang="ts" setup>
import { ref } from 'vue'

// 多屬性綁定演示狀態
const cardAttrs = ref({
  id: 'demo-card',
  class: 'card-primary',
  'data-type': 'example',
  title: '這是一張示例卡片'
})

const imageAttrs = ref({
  src: 'https://placehold.jp/10B981/ffffff/200x150.png?text=Multi+Bind',
  alt: '示例圖片',
  title: '點擊查看大圖',
  'data-lightbox': 'demo'
})

const formAttrs = ref({
  id: 'demo-form',
  method: 'POST',
  action: '/submit',
  'data-validate': 'true'
})

const inputAttrs = ref({
  type: 'email',
  name: 'user-email',
  placeholder: '請輸入電子郵件',
  required: true,
  'data-rules': 'email|required'
})

function updateCardAttrs() {
  const themes = [
    { class: 'card-primary', 'data-type': 'primary', title: '主要卡片' },
    { class: 'card-success', 'data-type': 'success', title: '成功卡片' },
    { class: 'card-warning', 'data-type': 'warning', title: '警告卡片' },
    { class: 'card-danger', 'data-type': 'danger', title: '危險卡片' }
  ]

  const currentIndex = themes.findIndex(t => t.class === cardAttrs.value.class)
  const nextIndex = (currentIndex + 1) % themes.length
  const next = themes[nextIndex]

  cardAttrs.value = {
    id: cardAttrs.value.id,
    class: next.class,
    'data-type': next['data-type'],
    title: next.title
  }
}

function updateImageAttrs() {
  const sizes = [
    { w: 200, h: 150, desc: '小圖' },
    { w: 300, h: 200, desc: '中圖' },
    { w: 400, h: 250, desc: '大圖' }
  ]

  const currentMatch = imageAttrs.value.src.match(/(\d+)\/(\d+)/)
  if (!currentMatch) return

  const currentW = parseInt(currentMatch[1])
  const currentIndex = sizes.findIndex(s => s.w === currentW)
  const nextIndex = (currentIndex + 1) % sizes.length
  const next = sizes[nextIndex]

  imageAttrs.value = {
    src: `https://placehold.jp/10B981/ffffff/${next.w}x${next.h}.png?text=${next.w}x${next.h}`,
    alt: `${next.desc}示例`,
    title: `查看${next.desc} (${next.w}x${next.h})`,
    'data-lightbox': 'demo'
  }
}

function updateFormAttrs() {
  const methods = ['POST', 'GET', 'PUT']
  const currentIndex = methods.indexOf(formAttrs.value.method)
  const nextIndex = (currentIndex + 1) % methods.length
  const nextMethod = methods[nextIndex]

  formAttrs.value = {
    id: formAttrs.value.id,
    method: nextMethod,
    action: `/api/${nextMethod.toLowerCase()}`,
    'data-validate': nextMethod === 'POST' ? 'true' : 'false'
  }
}

function updateInputAttrs() {
  const types = [
    { type: 'email', name: 'user-email', placeholder: '請輸入電子郵件', 'data-rules': 'email|required' },
    { type: 'tel', name: 'user-phone', placeholder: '請輸入電話號碼', 'data-rules': 'phone|required' },
    { type: 'text', name: 'user-name', placeholder: '請輸入姓名', 'data-rules': 'string|required' },
    { type: 'url', name: 'user-website', placeholder: '請輸入網站', 'data-rules': 'url|required' }
  ]

  const currentIndex = types.findIndex(t => t.type === inputAttrs.value.type)
  const nextIndex = (currentIndex + 1) % types.length
  const next = types[nextIndex]

  inputAttrs.value = {
    type: next.type,
    name: next.name,
    placeholder: next.placeholder,
    required: true,
    'data-rules': next['data-rules']
  }
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">多屬性綁定演示</h3>

    <!-- 卡片多屬性綁定 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 卡片元素多屬性綁定</h4>
      <div class="space-y-4">
        <div
          v-bind="cardAttrs"
          class="p-4 rounded-lg border-2"
          :class="{
            'bg-blue-100 border-blue-300': cardAttrs.class === 'card-primary',
            'bg-green-100 border-green-300': cardAttrs.class === 'card-success',
            'bg-yellow-100 border-yellow-300': cardAttrs.class === 'card-warning',
            'bg-red-100 border-red-300': cardAttrs.class === 'card-danger'
          }"
        >
          <h5 class="font-medium mb-2">動態卡片</h5>
          <p class="text-sm text-gray-600">這個卡片的所有屬性都是動態綁定的</p>
        </div>

        <div class="text-sm space-y-1">
          <div><strong>綁定語法：</strong> <code class="bg-blue-100 px-2 py-1 rounded">v-bind="cardAttrs"</code></div>
          <div><strong>當前屬性：</strong></div>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ JSON.stringify(cardAttrs, null, 2) }}</pre>
        </div>

        <button
          @click="updateCardAttrs"
          class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          切換卡片主題
        </button>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 卡片元素多屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">cardAttrs</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">id</span><span class="text-white">: </span><span class="text-green-300">'demo-card'</span><span class="text-white">,</span>
  <span class="text-cyan-300">class</span><span class="text-white">: </span><span class="text-green-300">'card-primary'</span><span class="text-white">,</span>
  <span class="text-cyan-300">'data-type'</span><span class="text-white">: </span><span class="text-green-300">'example'</span><span class="text-white">,</span>
  <span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">'這是一張示例卡片'</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateCardAttrs</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">themes</span> <span class="text-white">= [</span>
    <span class="text-white">{ </span><span class="text-cyan-300">class</span><span class="text-white">: </span><span class="text-green-300">'card-primary'</span><span class="text-white">, </span><span class="text-cyan-300">'data-type'</span><span class="text-white">: </span><span class="text-green-300">'primary'</span><span class="text-white">, </span><span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">'主要卡片'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">class</span><span class="text-white">: </span><span class="text-green-300">'card-success'</span><span class="text-white">, </span><span class="text-cyan-300">'data-type'</span><span class="text-white">: </span><span class="text-green-300">'success'</span><span class="text-white">, </span><span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">'成功卡片'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">class</span><span class="text-white">: </span><span class="text-green-300">'card-warning'</span><span class="text-white">, </span><span class="text-cyan-300">'data-type'</span><span class="text-white">: </span><span class="text-green-300">'warning'</span><span class="text-white">, </span><span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">'警告卡片'</span> <span class="text-white">}</span>
  <span class="text-white">]</span>

  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">themes</span><span class="text-white">.</span><span class="text-yellow-300">findIndex</span><span class="text-white">(</span><span class="text-blue-300">t</span> <span class="text-white">=&gt;</span> <span class="text-blue-300">t</span><span class="text-white">.</span><span class="text-cyan-300">class</span> <span class="text-white">=== </span><span class="text-blue-300">cardAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">class</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">themes</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">next</span> <span class="text-white">=</span> <span class="text-blue-300">themes</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>

  <span class="text-blue-300">cardAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= { ...cardAttrs.value, ...next }</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">v-bind</span><span class="text-white">=</span><span class="text-green-300">"cardAttrs"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-4 rounded-lg border-2"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>動態卡片<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm text-gray-600"</span><span class="text-red-400">&gt;</span>
      這個卡片的所有屬性都是動態綁定的
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateCardAttrs"</span><span class="text-red-400">&gt;</span>
    切換卡片主題
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 圖片多屬性綁定 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 圖片元素多屬性綁定</h4>
      <div class="space-y-4">
        <img
          v-bind="imageAttrs"
          class="rounded border shadow-sm"
        />

        <div class="text-sm space-y-1">
          <div><strong>綁定語法：</strong> <code class="bg-green-100 px-2 py-1 rounded">v-bind="imageAttrs"</code></div>
          <div><strong>當前屬性：</strong></div>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ JSON.stringify(imageAttrs, null, 2) }}</pre>
        </div>

        <button
          @click="updateImageAttrs"
          class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          切換圖片尺寸
        </button>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 圖片元素多屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">imageAttrs</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">src</span><span class="text-white">: </span><span class="text-green-300">'https://placehold.jp/10B981/ffffff/200x150.png?text=Multi+Bind'</span><span class="text-white">,</span>
  <span class="text-cyan-300">alt</span><span class="text-white">: </span><span class="text-green-300">'示例圖片'</span><span class="text-white">,</span>
  <span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">'點擊查看大圖'</span><span class="text-white">,</span>
  <span class="text-cyan-300">'data-lightbox'</span><span class="text-white">: </span><span class="text-green-300">'demo'</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateImageAttrs</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">sizes</span> <span class="text-white">= [</span>
    <span class="text-white">{ </span><span class="text-cyan-300">w</span><span class="text-white">: </span><span class="text-orange-300">200</span><span class="text-white">, </span><span class="text-cyan-300">h</span><span class="text-white">: </span><span class="text-orange-300">150</span><span class="text-white">, </span><span class="text-cyan-300">desc</span><span class="text-white">: </span><span class="text-green-300">'小圖'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">w</span><span class="text-white">: </span><span class="text-orange-300">300</span><span class="text-white">, </span><span class="text-cyan-300">h</span><span class="text-white">: </span><span class="text-orange-300">200</span><span class="text-white">, </span><span class="text-cyan-300">desc</span><span class="text-white">: </span><span class="text-green-300">'中圖'</span> <span class="text-white">},</span>
    <span class="text-white">{ </span><span class="text-cyan-300">w</span><span class="text-white">: </span><span class="text-orange-300">400</span><span class="text-white">, </span><span class="text-cyan-300">h</span><span class="text-white">: </span><span class="text-orange-300">250</span><span class="text-white">, </span><span class="text-cyan-300">desc</span><span class="text-white">: </span><span class="text-green-300">'大圖'</span> <span class="text-white">}</span>
  <span class="text-white">]</span>

  <span class="text-gray-500">// 切換圖片尺寸邏輯...</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">next</span> <span class="text-white">=</span> <span class="text-blue-300">sizes</span><span class="text-white">[</span><span class="text-orange-300">0</span><span class="text-white">]</span> <span class="text-gray-500">// 示例</span>
  
  <span class="text-blue-300">imageAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= {</span>
    <span class="text-cyan-300">src</span><span class="text-white">: </span><span class="text-green-300">`https://placehold.jp/10B981/ffffff/</span><span class="text-cyan-300">${next.w}</span><span class="text-green-300">x</span><span class="text-cyan-300">${next.h}</span><span class="text-green-300">.png?text=</span><span class="text-cyan-300">${next.w}</span><span class="text-green-300">x</span><span class="text-cyan-300">${next.h}</span><span class="text-green-300">`</span><span class="text-white">,</span>
    <span class="text-cyan-300">alt</span><span class="text-white">: </span><span class="text-green-300">`</span><span class="text-cyan-300">${next.desc}</span><span class="text-green-300">示例`</span><span class="text-white">,</span>
    <span class="text-cyan-300">title</span><span class="text-white">: </span><span class="text-green-300">`查看</span><span class="text-cyan-300">${next.desc}</span><span class="text-green-300"> (</span><span class="text-cyan-300">${next.w}</span><span class="text-green-300">x</span><span class="text-cyan-300">${next.h}</span><span class="text-green-300">)`</span><span class="text-white">,</span>
    <span class="text-cyan-300">'data-lightbox'</span><span class="text-white">: </span><span class="text-green-300">'demo'</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;img</span>
    <span class="text-cyan-300">v-bind</span><span class="text-white">=</span><span class="text-green-300">"imageAttrs"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"rounded border shadow-sm"</span>
  <span class="text-red-400">/&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateImageAttrs"</span><span class="text-red-400">&gt;</span>
    切換圖片尺寸
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 表單多屬性綁定 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 表單元素多屬性綁定</h4>
      <div class="space-y-4">
        <form
          v-bind="formAttrs"
          class="space-y-3 p-4 bg-white rounded border"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              表單輸入欄位：
            </label>
            <input
              v-bind="inputAttrs"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="button"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            提交 ({{ formAttrs.method }})
          </button>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div><strong>表單屬性：</strong></div>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ JSON.stringify(formAttrs, null, 2) }}</pre>
          </div>
          <div>
            <div><strong>輸入欄位屬性：</strong></div>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ JSON.stringify(inputAttrs, null, 2) }}</pre>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="updateFormAttrs"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            切換表單方法
          </button>
          <button
            @click="updateInputAttrs"
            class="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
          >
            切換輸入類型
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 表單元素多屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">formAttrs</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">id</span><span class="text-white">: </span><span class="text-green-300">'demo-form'</span><span class="text-white">,</span>
  <span class="text-cyan-300">method</span><span class="text-white">: </span><span class="text-green-300">'POST'</span><span class="text-white">,</span>
  <span class="text-cyan-300">action</span><span class="text-white">: </span><span class="text-green-300">'/submit'</span><span class="text-white">,</span>
  <span class="text-cyan-300">'data-validate'</span><span class="text-white">: </span><span class="text-green-300">'true'</span>
<span class="text-white">})</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">inputAttrs</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">type</span><span class="text-white">: </span><span class="text-green-300">'email'</span><span class="text-white">,</span>
  <span class="text-cyan-300">name</span><span class="text-white">: </span><span class="text-green-300">'user-email'</span><span class="text-white">,</span>
  <span class="text-cyan-300">placeholder</span><span class="text-white">: </span><span class="text-green-300">'請輸入電子郵件'</span><span class="text-white">,</span>
  <span class="text-cyan-300">required</span><span class="text-white">: </span><span class="text-orange-300">true</span><span class="text-white">,</span>
  <span class="text-cyan-300">'data-rules'</span><span class="text-white">: </span><span class="text-green-300">'email|required'</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateFormAttrs</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">methods</span> <span class="text-white">= [</span><span class="text-green-300">'POST'</span><span class="text-white">, </span><span class="text-green-300">'GET'</span><span class="text-white">, </span><span class="text-green-300">'PUT'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">methods</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">formAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">method</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">methods</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextMethod</span> <span class="text-white">=</span> <span class="text-blue-300">methods</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>

  <span class="text-blue-300">formAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= {</span>
    <span class="text-white">...</span><span class="text-blue-300">formAttrs</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">,</span>
    <span class="text-cyan-300">method</span><span class="text-white">: </span><span class="text-blue-300">nextMethod</span><span class="text-white">,</span>
    <span class="text-cyan-300">action</span><span class="text-white">: </span><span class="text-green-300">`/api/</span><span class="text-cyan-300">${nextMethod.toLowerCase()}</span><span class="text-green-300">`</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;form</span>
    <span class="text-cyan-300">v-bind</span><span class="text-white">=</span><span class="text-green-300">"formAttrs"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"space-y-3 p-4 bg-white rounded border"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;input</span>
      <span class="text-cyan-300">v-bind</span><span class="text-white">=</span><span class="text-green-300">"inputAttrs"</span>
      <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"w-full px-3 py-2 border rounded"</span>
    <span class="text-red-400">/&gt;</span>
    <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"button"</span><span class="text-red-400">&gt;</span>
      提交 (<span class="text-purple-300">{{ formAttrs.method }}</span>)
    <span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;/form&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateFormAttrs"</span><span class="text-red-400">&gt;</span>切換表單方法<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateInputAttrs"</span><span class="text-red-400">&gt;</span>切換輸入類型<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- HTML 渲染結果 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 HTML 渲染結果</h4>
      <div class="space-y-4 text-sm font-mono">
        <div>
          <div class="text-gray-600 text-xs mb-1">卡片元素：</div>
          <div class="bg-white p-2 rounded border text-xs break-all">
            &lt;div id="{{ cardAttrs.id }}" class="{{ cardAttrs.class }}" data-type="{{ cardAttrs['data-type'] }}"
            title="{{ cardAttrs.title }}"&gt;
          </div>
        </div>

        <div>
          <div class="text-gray-600 text-xs mb-1">圖片元素：</div>
          <div class="bg-white p-2 rounded border text-xs break-all">
            &lt;img src="{{ imageAttrs.src }}" alt="{{ imageAttrs.alt }}" title="{{ imageAttrs.title }}"
            data-lightbox="{{ imageAttrs['data-lightbox'] }}" /&gt;
          </div>
        </div>

        <div>
          <div class="text-gray-600 text-xs mb-1">表單元素：</div>
          <div class="bg-white p-2 rounded border text-xs break-all">
            &lt;form id="{{ formAttrs.id }}" method="{{ formAttrs.method }}" action="{{ formAttrs.action }}"
            data-validate="{{ formAttrs['data-validate'] }}"&gt;
          </div>
        </div>

        <div>
          <div class="text-gray-600 text-xs mb-1">輸入欄位：</div>
          <div class="bg-white p-2 rounded border text-xs break-all">
            &lt;input type="{{ inputAttrs.type }}" name="{{ inputAttrs.name }}" placeholder="{{ inputAttrs.placeholder }}"
            {{ inputAttrs.required ? ' required' : '' }} data-rules="{{ inputAttrs['data-rules'] }}" /&gt;
          </div>
        </div>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-orange-50 border border-orange-200 rounded-lg p-4">
      <h5 class="font-semibold text-orange-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• <code class="bg-orange-100 px-1 rounded">v-bind="object"</code> 可以一次綁定多個屬性到元素上</li>
        <li>• 物件中的 key 會成為屬性名，value 會成為屬性值</li>
        <li>• 這種方式特別適合需要動態設定多個屬性的場景</li>
        <li>• 可以與單獨的屬性綁定並存使用，不會衝突</li>
        <li>• 常用於元件傳遞 props、設定表單屬性、配置第三方外掛等情況</li>
      </ul>
    </div>
  </div>
</template>