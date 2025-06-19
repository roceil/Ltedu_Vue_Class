<script lang="ts" setup>
import { ref } from 'vue'

// 基本開關狀態
const isActive = ref(false)
const isDisabled = ref(false)
const hasError = ref(false)
const isLoading = ref(false)

// 複雜條件狀態
const userStatus = ref('normal')
const priority = ref('medium')
const theme = ref('light')

function toggleActive() {
  isActive.value = !isActive.value
}

function toggleDisabled() {
  isDisabled.value = !isDisabled.value
}

function toggleError() {
  hasError.value = !hasError.value
}

function toggleLoading() {
  isLoading.value = !isLoading.value
}

function changeUserStatus() {
  const statuses = ['normal', 'premium', 'vip', 'banned']
  const currentIndex = statuses.indexOf(userStatus.value)
  const nextIndex = (currentIndex + 1) % statuses.length
  userStatus.value = statuses[nextIndex]
}

function changePriority() {
  const priorities = ['low', 'medium', 'high', 'urgent']
  const currentIndex = priorities.indexOf(priority.value)
  const nextIndex = (currentIndex + 1) % priorities.length
  priority.value = priorities[nextIndex]
}

function changeTheme() {
  const themes = ['light', 'dark', 'auto']
  const currentIndex = themes.indexOf(theme.value)
  const nextIndex = (currentIndex + 1) % themes.length
  theme.value = themes[nextIndex]
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">:class 物件語法演示</h3>

    <!-- 基本開關式 class -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 基本開關式 class 綁定</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 按鈕狀態演示 -->
          <div>
            <button
              :class="{
                'bg-green-500 text-white': isActive,
                'bg-gray-300 text-gray-700': !isActive,
                'opacity-50 cursor-not-allowed': isDisabled,
                'border-red-500 ring-2 ring-red-300': hasError,
                'animate-pulse': isLoading
              }"
              class="px-4 py-2 rounded border-2 transition-all duration-200"
            >
              {{ isActive ? '已啟用' : '未啟用' }}
              {{ isLoading ? '載入中...' : '' }}
            </button>

            <div class="text-xs mt-2 text-black">
              狀態：{{ isActive ? '啟用' : '停用' }}
              {{ isDisabled ? '+ 禁用' : '' }}
              {{ hasError ? '+ 錯誤' : '' }}
              {{ isLoading ? '+ 載入中' : '' }}
            </div>
          </div>

          <!-- 控制按鈕 -->
          <div class="space-y-2">
            <button
              @click="toggleActive"
              class="block w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              切換啟用狀態
            </button>
            <button
              @click="toggleDisabled"
              class="block w-full px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              切換禁用狀態
            </button>
            <button
              @click="toggleError"
              class="block w-full px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              切換錯誤狀態
            </button>
            <button
              @click="toggleLoading"
              class="block w-full px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
            >
              切換載入狀態
            </button>
          </div>
        </div>

        <!-- 程式碼展示 -->
        <div class="bg-gray-100 p-3 rounded text-sm font-mono">
          <div class="text-blue-600">&lt;button</div>
          <div class="ml-2 text-green-600">:class="{</div>
          <div class="ml-4 text-gray-700">'bg-green-500 text-white': {{ isActive }},</div>
          <div class="ml-4 text-gray-700">'bg-gray-300 text-gray-700': {{ !isActive }},</div>
          <div class="ml-4 text-gray-700">'opacity-50 cursor-not-allowed': {{ isDisabled }},</div>
          <div class="ml-4 text-gray-700">'border-red-500 ring-2 ring-red-300': {{ hasError }},</div>
          <div class="ml-4 text-gray-700">'animate-pulse': {{ isLoading }}</div>
          <div class="ml-2 text-green-600">}"</div>
          <div class="text-blue-600">&gt;</div>
        </div>

        <!-- 完整範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 基本開關式 class 綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-500">// 基本開關狀態</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isActive</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isDisabled</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">hasError</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isLoading</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleActive</span><span class="text-white">() {</span>
  <span class="text-blue-300">isActive</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isActive</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleDisabled</span><span class="text-white">() {</span>
  <span class="text-blue-300">isDisabled</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isDisabled</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleError</span><span class="text-white">() {</span>
  <span class="text-blue-300">hasError</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">hasError</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleLoading</span><span class="text-white">() {</span>
  <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;button</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'bg-green-500 text-white': isActive,</span>
<span class="text-green-300">      'bg-gray-300 text-gray-700': !isActive,</span>
<span class="text-green-300">      'opacity-50 cursor-not-allowed': isDisabled,</span>
<span class="text-green-300">      'border-red-500 ring-2 ring-red-300': hasError,</span>
<span class="text-green-300">      'animate-pulse': isLoading</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"px-4 py-2 rounded border-2 transition-all duration-200"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ isActive ? '已啟用' : '未啟用' }}</span>
    <span class="text-purple-300">{{ isLoading ? '載入中...' : '' }}</span>
  <span class="text-red-400">&lt;/button&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleActive"</span><span class="text-red-400">&gt;</span>切換啟用狀態<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleDisabled"</span><span class="text-red-400">&gt;</span>切換禁用狀態<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleError"</span><span class="text-red-400">&gt;</span>切換錯誤狀態<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleLoading"</span><span class="text-red-400">&gt;</span>切換載入狀態<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 使用者狀態展示 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 使用者狀態卡片</h4>
      <div class="space-y-4">
        <div
          :class="{
            'border-gray-300 bg-gray-50': userStatus === 'normal',
            'border-blue-300 bg-blue-50': userStatus === 'premium',
            'border-yellow-300 bg-yellow-50': userStatus === 'vip',
            'border-red-300 bg-red-50': userStatus === 'banned'
          }"
          class="p-4 rounded-lg border-2 transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-700">使用者卡片</h5>
              <p
                :class="{
                  'text-gray-600': userStatus === 'normal',
                  'text-blue-600': userStatus === 'premium',
                  'text-yellow-600': userStatus === 'vip',
                  'text-red-600': userStatus === 'banned'
                }"
                class="text-sm"
              >
                狀態：{{ userStatus.toUpperCase() }}
              </p>
            </div>
            <span
              :class="{
                'bg-gray-100 text-gray-800': userStatus === 'normal',
                'bg-blue-100 text-blue-800': userStatus === 'premium',
                'bg-yellow-100 text-yellow-800': userStatus === 'vip',
                'bg-red-100 text-red-800': userStatus === 'banned'
              }"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ userStatus }}
            </span>
          </div>
        </div>

        <button
          @click="changeUserStatus"
          class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          切換使用者狀態
        </button>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 使用者狀態卡片
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-500">// 使用者狀態</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">userStatus</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'normal'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeUserStatus</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">statuses</span> <span class="text-white">= [</span><span class="text-green-300">'normal'</span><span class="text-white">, </span><span class="text-green-300">'premium'</span><span class="text-white">, </span><span class="text-green-300">'vip'</span><span class="text-white">, </span><span class="text-green-300">'banned'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">statuses</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">userStatus</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">statuses</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">userStatus</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">statuses</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- 卡片容器的狀態綁定 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'border-gray-300 bg-gray-50': userStatus === 'normal',</span>
<span class="text-green-300">      'border-blue-300 bg-blue-50': userStatus === 'premium',</span>
<span class="text-green-300">      'border-yellow-300 bg-yellow-50': userStatus === 'vip',</span>
<span class="text-green-300">      'border-red-300 bg-red-50': userStatus === 'banned'</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-4 rounded-lg border-2 transition-all duration-300"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;div</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"flex items-center justify-between"</span><span class="text-red-400">&gt;</span>
      <span class="text-red-400">&lt;div&gt;</span>
        <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium text-gray-700"</span><span class="text-red-400">&gt;</span>使用者卡片<span class="text-red-400">&lt;/h5&gt;</span>
        <span class="text-red-400">&lt;p</span>
          <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">            'text-gray-600': userStatus === 'normal',</span>
<span class="text-green-300">            'text-blue-600': userStatus === 'premium',</span>
<span class="text-green-300">            'text-yellow-600': userStatus === 'vip',</span>
<span class="text-green-300">            'text-red-600': userStatus === 'banned'</span>
<span class="text-green-300">          }"</span>
          <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span>
        <span class="text-red-400">&gt;</span>
          狀態：<span class="text-purple-300">{{ userStatus.toUpperCase() }}</span>
        <span class="text-red-400">&lt;/p&gt;</span>
      <span class="text-red-400">&lt;/div&gt;</span>
      <span class="text-red-400">&lt;span</span>
        <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">          'bg-gray-100 text-gray-800': userStatus === 'normal',</span>
<span class="text-green-300">          'bg-blue-100 text-blue-800': userStatus === 'premium',</span>
<span class="text-green-300">          'bg-yellow-100 text-yellow-800': userStatus === 'vip',</span>
<span class="text-green-300">          'bg-red-100 text-red-800': userStatus === 'banned'</span>
<span class="text-green-300">        }"</span>
        <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"px-2 py-1 rounded-full text-xs font-medium"</span>
      <span class="text-red-400">&gt;</span>
        <span class="text-purple-300">{{ userStatus }}</span>
      <span class="text-red-400">&lt;/span&gt;</span>
    <span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeUserStatus"</span><span class="text-red-400">&gt;</span>
    切換使用者狀態
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 優先級指示器 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 優先級指示器</h4>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <div
            :class="{
              'bg-green-500': priority === 'low',
              'bg-yellow-500': priority === 'medium',
              'bg-orange-500': priority === 'high',
              'bg-red-500': priority === 'urgent',
              'animate-bounce': priority === 'urgent'
            }"
            class="w-4 h-4 rounded-full transition-all duration-300"
          ></div>

          <span
            :class="{
              'text-green-700': priority === 'low',
              'text-yellow-700': priority === 'medium',
              'text-orange-700': priority === 'high',
              'text-red-700 font-bold': priority === 'urgent'
            }"
            class="text-lg"
          >
            優先級：{{ priority.toUpperCase() }}
          </span>

          <span
            :class="{
              'hidden': priority !== 'urgent',
              'inline-block animate-pulse text-red-600': priority === 'urgent'
            }"
            class="text-sm font-bold"
          >
            🚨 緊急！
          </span>
        </div>

        <div class="bg-gray-100 p-3 rounded text-sm text-black">
          <strong>當前綁定的 class：</strong>
          <span class="font-mono text-purple-600">
            {{ priority === 'low' ? 'bg-green-500' : '' }}
            {{ priority === 'medium' ? 'bg-yellow-500' : '' }}
            {{ priority === 'high' ? 'bg-orange-500' : '' }}
            {{ priority === 'urgent' ? 'bg-red-500 animate-bounce' : '' }}
          </span>
        </div>

        <button
          @click="changePriority"
          class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
        >
          切換優先級
        </button>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 優先級指示器
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-500">// 優先級狀態</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">priority</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'medium'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changePriority</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">priorities</span> <span class="text-white">= [</span><span class="text-green-300">'low'</span><span class="text-white">, </span><span class="text-green-300">'medium'</span><span class="text-white">, </span><span class="text-green-300">'high'</span><span class="text-white">, </span><span class="text-green-300">'urgent'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">priorities</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">priority</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">priorities</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">priority</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">priorities</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- 優先級指示圓點 --&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'bg-green-500': priority === 'low',</span>
<span class="text-green-300">      'bg-yellow-500': priority === 'medium',</span>
<span class="text-green-300">      'bg-orange-500': priority === 'high',</span>
<span class="text-green-300">      'bg-red-500': priority === 'urgent',</span>
<span class="text-green-300">      'animate-bounce': priority === 'urgent'</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"w-4 h-4 rounded-full transition-all duration-300"</span>
  <span class="text-red-400">&gt;&lt;/div&gt;</span>

  <span class="text-gray-500">&lt;!-- 優先級文字 --&gt;</span>
  <span class="text-red-400">&lt;span</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'text-green-700': priority === 'low',</span>
<span class="text-green-300">      'text-yellow-700': priority === 'medium',</span>
<span class="text-green-300">      'text-orange-700': priority === 'high',</span>
<span class="text-green-300">      'text-red-700 font-bold': priority === 'urgent'</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-lg"</span>
  <span class="text-red-400">&gt;</span>
    優先級：<span class="text-purple-300">{{ priority.toUpperCase() }}</span>
  <span class="text-red-400">&lt;/span&gt;</span>

  <span class="text-gray-500">&lt;!-- 緊急警告 --&gt;</span>
  <span class="text-red-400">&lt;span</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'hidden': priority !== 'urgent',</span>
<span class="text-green-300">      'inline-block animate-pulse text-red-600': priority === 'urgent'</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm font-bold"</span>
  <span class="text-red-400">&gt;</span>
    🚨 緊急！
  <span class="text-red-400">&lt;/span&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changePriority"</span><span class="text-red-400">&gt;</span>
    切換優先級
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h5 class="font-semibold text-yellow-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• 物件語法格式：<code class="bg-yellow-100 px-1 rounded">:class="{ 'class-name': condition }"</code></li>
        <li>• 當條件為 <strong>Truthy</strong> 時，class 會被應用；為 <strong>Falsy</strong> 時會被移除</li>
        <li>• 可以同時綁定多個條件式 class</li>
        <li>• 適合用於簡單的「開/關」邏輯，如狀態切換、主題變化等</li>
        <li>• 可以與靜態 class 並存使用</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translateY(0);
  }

  40%,
  43% {
    transform: translateY(-8px);
  }

  70% {
    transform: translateY(-4px);
  }

  90% {
    transform: translateY(-2px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>