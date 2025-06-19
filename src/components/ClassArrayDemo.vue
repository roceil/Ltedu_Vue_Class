<script lang="ts" setup>
import { ref } from 'vue'

// 基本 class 陣列
const baseClass = ref('bg-blue-100')
const statusClass = ref('border-blue-400')
const sizeClass = ref('text-base')

// 第二個示例需要的響應式變數
const isActive = ref(true)
const size = ref('medium')
const animation = ref(false)

// 第三個示例需要的響應式變數
const baseCardClass = ref('bg-blue-100')
const hasError = ref(false)
const hasWarning = ref(false)
const hasSuccess = ref(false)
const isElevated = ref(false)
const isDisabled = ref(false)

// 第一個示例的方法
function changeBaseClass() {
  const classes = ['bg-blue-100', 'bg-green-100', 'bg-purple-100']
  const currentIndex = classes.indexOf(baseClass.value)
  const nextIndex = (currentIndex + 1) % classes.length
  baseClass.value = classes[nextIndex]
}

function changeStatusClass() {
  const classes = ['border-blue-400', 'border-green-400', 'border-purple-400', 'border-red-400']
  const currentIndex = classes.indexOf(statusClass.value)
  const nextIndex = (currentIndex + 1) % classes.length
  statusClass.value = classes[nextIndex]
}

function changeSizeClass() {
  const classes = ['text-sm', 'text-base', 'text-lg', 'text-xl']
  const currentIndex = classes.indexOf(sizeClass.value)
  const nextIndex = (currentIndex + 1) % classes.length
  sizeClass.value = classes[nextIndex]
}

// 第二個示例的方法
function toggleSize() {
  const sizes = ['small', 'medium', 'large']
  const currentIndex = sizes.indexOf(size.value)
  const nextIndex = (currentIndex + 1) % sizes.length
  size.value = sizes[nextIndex]
}

// 第三個示例的方法
function changeBaseCardClass() {
  const classes = ['bg-blue-100', 'bg-gray-100', 'bg-indigo-100']
  const currentIndex = classes.indexOf(baseCardClass.value)
  const nextIndex = (currentIndex + 1) % classes.length
  baseCardClass.value = classes[nextIndex]
}

function setStatus(status: string) {
  hasError.value = status === 'error'
  hasWarning.value = status === 'warning'
  hasSuccess.value = status === 'success'
}

function getStatus() {
  if (hasError.value) return '錯誤'
  if (hasWarning.value) return '警告'
  if (hasSuccess.value) return '成功'
  return '正常'
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">:class 陣列語法演示</h3>

    <!-- 基本陣列語法 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 基本陣列 class 綁定</h4>
      <div class="space-y-4">
        <div
          :class="[baseClass, statusClass, sizeClass]"
          class="p-4 rounded-lg border-2 text-center text-gray-800"
        >
          <h5 class="font-medium mb-2">基本陣列綁定</h5>
          <p class="text-sm">應用了：{{ [baseClass, statusClass, sizeClass].join(' + ') }}</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="changeBaseClass"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            更新基礎樣式
          </button>
          <button
            @click="changeStatusClass"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            更新狀態樣式
          </button>
          <button
            @click="changeSizeClass"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            更新尺寸樣式
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 基本陣列語法
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">baseClass</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'bg-blue-100'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">statusClass</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'border-blue-400'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">sizeClass</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'text-base'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeBaseClass</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">classes</span> <span class="text-white">= [</span><span class="text-green-300">'bg-blue-100'</span><span class="text-white">, </span><span class="text-green-300">'bg-green-100'</span><span class="text-white">, </span><span class="text-green-300">'bg-purple-100'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">classes</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">baseClass</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">classes</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">baseClass</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">classes</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"[baseClass, statusClass, sizeClass]"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-4 rounded-lg border-2 text-center"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>基本陣列綁定<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      應用了：<span class="text-purple-300">{{ [baseClass, statusClass, sizeClass].join(' + ') }}</span>
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeBaseClass"</span><span class="text-red-400">&gt;</span>更新基礎樣式<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeStatusClass"</span><span class="text-red-400">&gt;</span>更新狀態樣式<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeSizeClass"</span><span class="text-red-400">&gt;</span>更新尺寸樣式<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 陣列配合條件 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 陣列配合條件表達式</h4>
      <div class="space-y-4">
        <div :class="[
          'p-4 rounded-lg border-2 text-center transition-all duration-300',
          isActive ? 'bg-green-200 border-green-400 text-green-800' : 'bg-gray-200 border-gray-400 text-gray-800',
          size === 'large' ? 'text-lg' : size === 'small' ? 'text-sm' : 'text-base',
          animation ? 'animate-pulse' : ''
        ]">
          <h5 class="font-medium mb-2">條件式陣列綁定</h5>
          <p class="text-sm">
            狀態：{{ isActive ? '啟用' : '停用' }} |
            尺寸：{{ size }} |
            動畫：{{ animation ? '開啟' : '關閉' }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="isActive = !isActive"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            {{ isActive ? '停用' : '啟用' }}
          </button>
          <button
            @click="toggleSize"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            切換尺寸
          </button>
          <button
            @click="animation = !animation"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            {{ animation ? '關閉動畫' : '開啟動畫' }}
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 陣列配合條件表達式
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isActive</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">true</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">size</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'medium'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">animation</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleSize</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">sizes</span> <span class="text-white">= [</span><span class="text-green-300">'small'</span><span class="text-white">, </span><span class="text-green-300">'medium'</span><span class="text-white">, </span><span class="text-green-300">'large'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">sizes</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">size</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">sizes</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">size</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">sizes</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"[</span>
      <span class="text-green-300">'p-4 rounded-lg border-2 text-center transition-all',</span>
      <span class="text-blue-300">isActive</span> <span class="text-white">?</span> <span class="text-green-300">'bg-green-200 border-green-400'</span> <span class="text-white">:</span> <span class="text-green-300">'bg-gray-200 border-gray-400'</span><span class="text-white">,</span>
      <span class="text-blue-300">size</span> <span class="text-white">=== </span><span class="text-green-300">'large'</span> <span class="text-white">?</span> <span class="text-green-300">'text-lg'</span> <span class="text-white">:</span> <span class="text-blue-300">size</span> <span class="text-white">=== </span><span class="text-green-300">'small'</span> <span class="text-white">?</span> <span class="text-green-300">'text-sm'</span> <span class="text-white">:</span> <span class="text-green-300">'text-base'</span><span class="text-white">,</span>
      <span class="text-blue-300">animation</span> <span class="text-white">?</span> <span class="text-green-300">'animate-pulse'</span> <span class="text-white">:</span> <span class="text-green-300">''</span>
    <span class="text-green-300">]"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>條件式陣列綁定<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      狀態：<span class="text-purple-300">{{ isActive ? '啟用' : '停用' }}</span>
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"isActive = !isActive"</span><span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ isActive ? '停用' : '啟用' }}</span>
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 陣列配合物件 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 陣列配合物件語法</h4>
      <div class="space-y-4">
        <div
          :class="[
            baseCardClass,
            {
              'bg-red-100 border-red-400 text-red-800': hasError,
              'bg-yellow-100 border-yellow-400 text-yellow-800': hasWarning,
              'bg-green-100 border-green-400 text-green-800': hasSuccess,
              'shadow-lg': isElevated,
              'opacity-50': isDisabled
            }
          ]"
          class="p-4 rounded-lg border-2 text-center transition-all duration-300 text-gray-800"
        >
          <h5 class="font-medium mb-2">混合語法綁定</h5>
          <p class="text-sm">
            基礎：{{ baseCardClass }} |
            狀態：{{ getStatus() }} |
            {{ isElevated ? '有陰影' : '無陰影' }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            @click="changeBaseCardClass"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            更新基礎
          </button>
          <button
            @click="setStatus('error')"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            錯誤狀態
          </button>
          <button
            @click="setStatus('warning')"
            class="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
          >
            警告狀態
          </button>
          <button
            @click="setStatus('success')"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            成功狀態
          </button>
          <button
            @click="isElevated = !isElevated"
            class="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
          >
            切換陰影
          </button>
          <button
            @click="isDisabled = !isDisabled"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            切換禁用
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 陣列配合物件語法
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">baseCardClass</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'bg-blue-100'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">hasError</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">hasWarning</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">hasSuccess</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isElevated</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isDisabled</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">setStatus</span><span class="text-white">(</span><span class="text-blue-300">status</span><span class="text-white">) {</span>
  <span class="text-blue-300">hasError</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">status</span> <span class="text-white">=== </span><span class="text-green-300">'error'</span>
  <span class="text-blue-300">hasWarning</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">status</span> <span class="text-white">=== </span><span class="text-green-300">'warning'</span>
  <span class="text-blue-300">hasSuccess</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">status</span> <span class="text-white">=== </span><span class="text-green-300">'success'</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"[</span>
      <span class="text-blue-300">baseCardClass</span><span class="text-white">,</span>
      <span class="text-white">{</span>
        <span class="text-green-300">'bg-red-100 border-red-400 text-red-800'</span><span class="text-white">: </span><span class="text-blue-300">hasError</span><span class="text-white">,</span>
        <span class="text-green-300">'bg-yellow-100 border-yellow-400'</span><span class="text-white">: </span><span class="text-blue-300">hasWarning</span><span class="text-white">,</span>
        <span class="text-green-300">'bg-green-100 border-green-400'</span><span class="text-white">: </span><span class="text-blue-300">hasSuccess</span><span class="text-white">,</span>
        <span class="text-green-300">'shadow-lg'</span><span class="text-white">: </span><span class="text-blue-300">isElevated</span><span class="text-white">,</span>
        <span class="text-green-300">'opacity-50'</span><span class="text-white">: </span><span class="text-blue-300">isDisabled</span>
      <span class="text-white">}</span>
    <span class="text-green-300">]"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-4 rounded-lg border-2 text-center"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>混合語法綁定<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      基礎：<span class="text-purple-300">{{ baseCardClass }}</span>
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"setStatus('error')"</span><span class="text-red-400">&gt;</span>錯誤狀態<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"isElevated = !isElevated"</span><span class="text-red-400">&gt;</span>切換陰影<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 語法對照 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 :class 陣列語法對照</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">語法類型</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">寫法範例</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">適用場景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">基本陣列</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600 text-xs">:class="[class1, class2,
                class3]"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">組合多個響應式 class</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">陣列+條件</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600 text-xs">:class="[base, isActive ?
                'active' : '']"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">基於條件動態添加 class</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">陣列+物件</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-purple-600 text-xs">:class="[base, { active:
                isActive }]"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">混合固定和條件式 class</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <h5 class="font-semibold text-indigo-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• 陣列語法適合需要組合多個響應式 class 的場景</li>
        <li>• 可以在陣列中使用三元運算子進行條件判斷</li>
        <li>• 陣列和物件語法可以混合使用，提供最大彈性</li>
        <li>• 空字串 <code class="bg-indigo-100 px-1 rounded">''</code> 在陣列中會被忽略，不會添加到元素上</li>
        <li>• 推薦將複雜的條件邏輯抽離成 computed 屬性或方法</li>
      </ul>
    </div>
  </div>
</template>