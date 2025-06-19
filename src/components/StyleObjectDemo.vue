<script lang="ts" setup>
import { ref, computed } from 'vue'

// 基本樣式狀態
const fontSize = ref('16px')
const textColor = ref('#3b82f6')
const backgroundColor = ref('#f3f4f6')
const borderRadius = ref('8px')



// 第一個示例的額外變數
const borderColor = ref('#3b82f6')

// 第二個示例：CSS 變數和計算樣式
const primaryColor = ref('#3b82f6')
const secondaryColor = ref('#8b5cf6')
const borderWidth = ref(3)
const scale = ref(1)

// 第三個示例：計算樣式物件
const theme = ref<ThemeColor>('blue')
const size = ref<SizeType>('medium')
const mode = ref('light')

type ThemeColor = 'blue' | 'green' | 'purple' | 'red'
type SizeType = 'small' | 'medium' | 'large'





// 第三個示例的計算樣式
const computedCardStyle = computed(() => {
  const themeMap: Record<string, { bg: string; text: string }> = {
    primary: { bg: '#3b82f6', text: 'white' },
    success: { bg: '#10b981', text: 'white' },
    warning: { bg: '#f59e0b', text: 'white' },
    danger: { bg: '#ef4444', text: 'white' }
  }

  const sizeMap: Record<SizeType, { padding: string; fontSize: string }> = {
    small: { padding: '8px 12px', fontSize: '14px' },
    medium: { padding: '12px 16px', fontSize: '16px' },
    large: { padding: '16px 20px', fontSize: '18px' }
  }

  return {
    backgroundColor: themeMap[theme.value]?.bg || '#3b82f6',
    color: themeMap[theme.value]?.text || 'white',
    ...sizeMap[size.value],
    borderRadius: '8px',
    boxShadow: mode.value === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
  }
})

// 第一個示例的方法
function changeBackgroundColor() {
  const colors = ['#e0f2fe', '#f0fdf4', '#fef3f2', '#fefbf3']
  const currentIndex = colors.indexOf(backgroundColor.value)
  const nextIndex = (currentIndex + 1) % colors.length
  backgroundColor.value = colors[nextIndex]
}

function changeTextColor() {
  const colors = ['#0f172a', '#065f46', '#991b1b', '#92400e']
  const currentIndex = colors.indexOf(textColor.value)
  const nextIndex = (currentIndex + 1) % colors.length
  textColor.value = colors[nextIndex]
}

function changeFontSize() {
  const sizes = ['14', '16', '18', '20', '24']
  const currentIndex = sizes.indexOf(fontSize.value)
  const nextIndex = (currentIndex + 1) % sizes.length
  fontSize.value = sizes[nextIndex]
}

function changeBorderColor() {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
  const currentIndex = colors.indexOf(borderColor.value)
  const nextIndex = (currentIndex + 1) % colors.length
  borderColor.value = colors[nextIndex]
}

// 第二個示例的方法
function resetCSS() {
  primaryColor.value = '#3b82f6'
  secondaryColor.value = '#8b5cf6'
  borderWidth.value = 3
  borderRadius.value = '15px'
  scale.value = 1
}


















</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">:style 物件語法演示</h3>

    <!-- 基本內聯樣式 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 基本內聯樣式綁定</h4>
      <div class="space-y-4">
        <div :style="{
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: fontSize + 'px',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid ' + borderColor,
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }">
          <h5 class="font-medium mb-2">動態樣式盒子</h5>
          <p class="text-sm">
            背景：{{ backgroundColor }} | 文字：{{ textColor }} | 字體：{{ fontSize }}px
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            @click="changeBackgroundColor"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            切換背景
          </button>
          <button
            @click="changeTextColor"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            切換文字
          </button>
          <button
            @click="changeFontSize"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            切換字體
          </button>
          <button
            @click="changeBorderColor"
            class="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
          >
            切換邊框
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 基本內聯樣式綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">backgroundColor</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#e0f2fe'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">textColor</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#0f172a'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">fontSize</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">16</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">borderColor</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#0ea5e9'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeBackgroundColor</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">colors</span> <span class="text-white">= [</span><span class="text-green-300">'#e0f2fe'</span><span class="text-white">, </span><span class="text-green-300">'#f0fdf4'</span><span class="text-white">, </span><span class="text-green-300">'#fef3f2'</span><span class="text-white">, </span><span class="text-green-300">'#fefbf3'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">currentIndex</span> <span class="text-white">=</span> <span class="text-blue-300">colors</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">backgroundColor</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">nextIndex</span> <span class="text-white">= (</span><span class="text-blue-300">currentIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">colors</span><span class="text-white">.</span><span class="text-cyan-300">length</span>
  <span class="text-blue-300">backgroundColor</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">colors</span><span class="text-white">[</span><span class="text-blue-300">nextIndex</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:style</span><span class="text-white">=</span><span class="text-green-300">"{</span>
      <span class="text-cyan-300">backgroundColor</span><span class="text-white">: </span><span class="text-blue-300">backgroundColor</span><span class="text-white">,</span>
      <span class="text-cyan-300">color</span><span class="text-white">: </span><span class="text-blue-300">textColor</span><span class="text-white">,</span>
      <span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-blue-300">fontSize</span> <span class="text-white">+ </span><span class="text-green-300">'px'</span><span class="text-white">,</span>
      <span class="text-cyan-300">padding</span><span class="text-white">: </span><span class="text-green-300">'20px'</span><span class="text-white">,</span>
      <span class="text-cyan-300">borderRadius</span><span class="text-white">: </span><span class="text-green-300">'8px'</span><span class="text-white">,</span>
      <span class="text-cyan-300">border</span><span class="text-white">: </span><span class="text-green-300">'2px solid '</span> <span class="text-white">+ </span><span class="text-blue-300">borderColor</span><span class="text-white">,</span>
      <span class="text-cyan-300">textAlign</span><span class="text-white">: </span><span class="text-green-300">'center'</span><span class="text-white">,</span>
      <span class="text-cyan-300">transition</span><span class="text-white">: </span><span class="text-green-300">'all 0.3s ease'</span>
    <span class="text-green-300">}"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>動態樣式盒子<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      背景：<span class="text-purple-300">{{ backgroundColor }}</span>
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeBackgroundColor"</span><span class="text-red-400">&gt;</span>切換背景<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- CSS 變數和計算樣式 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. CSS 變數和計算樣式</h4>
      <div class="space-y-4">
        <div :style="{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
          '--border-width': borderWidth + 'px',
          background: `linear-gradient(45deg, var(--primary-color), var(--secondary-color))`,
          border: `var(--border-width) solid ${primaryColor}`,
          borderRadius: borderRadius + '%',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          transform: `scale(${scale})`,
          transition: 'all 0.3s ease'
        }">
          <h5 class="font-medium mb-2">CSS 變數樣式</h5>
          <p class="text-sm">
            使用 CSS 自訂屬性和計算樣式
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">主要顏色：</label>
            <input
              v-model="primaryColor"
              type="color"
              class="w-full h-8 rounded border border-gray-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">次要顏色：</label>
            <input
              v-model="secondaryColor"
              type="color"
              class="w-full h-8 rounded border border-gray-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邊框寬度：{{ borderWidth }}px</label>
            <input
              v-model.number="borderWidth"
              type="range"
              min="1"
              max="10"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">圓角：{{ borderRadius }}%</label>
            <input
              v-model.number="borderRadius"
              type="range"
              min="0"
              max="50"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="scale = scale === 1 ? 1.1 : 1"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            {{ scale === 1 ? '放大' : '縮小' }}
          </button>
          <button
            @click="resetCSS"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            重設
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - CSS 變數和計算樣式
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">primaryColor</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#3b82f6'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">secondaryColor</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#8b5cf6'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">borderWidth</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">3</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">borderRadius</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">15</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">scale</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">1</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">resetCSS</span><span class="text-white">() {</span>
  <span class="text-blue-300">primaryColor</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'#3b82f6'</span>
  <span class="text-blue-300">secondaryColor</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'#8b5cf6'</span>
  <span class="text-blue-300">borderWidth</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">3</span>
  <span class="text-blue-300">borderRadius</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">15</span>
  <span class="text-blue-300">scale</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">1</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:style</span><span class="text-white">=</span><span class="text-green-300">"{</span>
      <span class="text-green-300">'--primary-color'</span><span class="text-white">: </span><span class="text-blue-300">primaryColor</span><span class="text-white">,</span>
      <span class="text-green-300">'--secondary-color'</span><span class="text-white">: </span><span class="text-blue-300">secondaryColor</span><span class="text-white">,</span>
      <span class="text-green-300">'--border-width'</span><span class="text-white">: </span><span class="text-blue-300">borderWidth</span> <span class="text-white">+ </span><span class="text-green-300">'px'</span><span class="text-white">,</span>
      <span class="text-cyan-300">background</span><span class="text-white">: </span><span class="text-green-300">`linear-gradient(45deg, var(--primary-color), var(--secondary-color))`</span><span class="text-white">,</span>
      <span class="text-cyan-300">border</span><span class="text-white">: </span><span class="text-green-300">`var(--border-width) solid </span><span class="text-cyan-300">${primaryColor}</span><span class="text-green-300">`</span><span class="text-white">,</span>
      <span class="text-cyan-300">borderRadius</span><span class="text-white">: </span><span class="text-blue-300">borderRadius</span> <span class="text-white">+ </span><span class="text-green-300">'%'</span><span class="text-white">,</span>
      <span class="text-cyan-300">transform</span><span class="text-white">: </span><span class="text-green-300">`scale(</span><span class="text-cyan-300">${scale}</span><span class="text-green-300">)`</span><span class="text-white">,</span>
      <span class="text-cyan-300">transition</span><span class="text-white">: </span><span class="text-green-300">'all 0.3s ease'</span>
    <span class="text-green-300">}"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>CSS 變數樣式<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      使用 CSS 自訂屬性和計算樣式
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 計算樣式物件 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 計算樣式物件 (Computed)</h4>
      <div class="space-y-4">
        <div
          :style="computedCardStyle"
          class="p-4 text-center transition-all duration-300"
        >
          <h5 class="font-medium mb-2">智慧樣式卡片</h5>
          <p class="text-sm">
            主題：{{ theme }} | 尺寸：{{ size }} | 模式：{{ mode }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">主題：</label>
            <select
              v-model="theme"
              class="w-full px-3 py-2 border border-gray-300 rounded text-black"
            >
              <option value="primary">主要</option>
              <option value="success">成功</option>
              <option value="warning">警告</option>
              <option value="danger">危險</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">尺寸：</label>
            <select
              v-model="size"
              class="w-full px-3 py-2 border border-gray-300 rounded text-black"
            >
              <option value="small">小</option>
              <option value="medium">中</option>
              <option value="large">大</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">模式：</label>
            <select
              v-model="mode"
              class="w-full px-3 py-2 border border-gray-300 rounded text-black"
            >
              <option value="light">明亮</option>
              <option value="dark">深色</option>
            </select>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 計算樣式物件
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref, computed }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">theme</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'primary'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">size</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'medium'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">mode</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'light'</span><span class="text-white">)</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">computedCardStyle</span> <span class="text-white">=</span> <span class="text-yellow-300">computed</span><span class="text-white">(() =&gt; {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">themeColors</span> <span class="text-white">= {</span>
    <span class="text-cyan-300">primary</span><span class="text-white">: { </span><span class="text-cyan-300">bg</span><span class="text-white">: </span><span class="text-green-300">'#3b82f6'</span><span class="text-white">, </span><span class="text-cyan-300">text</span><span class="text-white">: </span><span class="text-green-300">'white'</span> <span class="text-white">},</span>
    <span class="text-cyan-300">success</span><span class="text-white">: { </span><span class="text-cyan-300">bg</span><span class="text-white">: </span><span class="text-green-300">'#10b981'</span><span class="text-white">, </span><span class="text-cyan-300">text</span><span class="text-white">: </span><span class="text-green-300">'white'</span> <span class="text-white">},</span>
    <span class="text-cyan-300">warning</span><span class="text-white">: { </span><span class="text-cyan-300">bg</span><span class="text-white">: </span><span class="text-green-300">'#f59e0b'</span><span class="text-white">, </span><span class="text-cyan-300">text</span><span class="text-white">: </span><span class="text-green-300">'white'</span> <span class="text-white">},</span>
    <span class="text-cyan-300">danger</span><span class="text-white">: { </span><span class="text-cyan-300">bg</span><span class="text-white">: </span><span class="text-green-300">'#ef4444'</span><span class="text-white">, </span><span class="text-cyan-300">text</span><span class="text-white">: </span><span class="text-green-300">'white'</span> <span class="text-white">}</span>
  <span class="text-white">}</span>

  <span class="text-pink-400">const</span> <span class="text-blue-300">sizeStyles</span> <span class="text-white">= {</span>
    <span class="text-cyan-300">small</span><span class="text-white">: { </span><span class="text-cyan-300">padding</span><span class="text-white">: </span><span class="text-green-300">'8px 12px'</span><span class="text-white">, </span><span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-green-300">'14px'</span> <span class="text-white">},</span>
    <span class="text-cyan-300">medium</span><span class="text-white">: { </span><span class="text-cyan-300">padding</span><span class="text-white">: </span><span class="text-green-300">'12px 16px'</span><span class="text-white">, </span><span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-green-300">'16px'</span> <span class="text-white">},</span>
    <span class="text-cyan-300">large</span><span class="text-white">: { </span><span class="text-cyan-300">padding</span><span class="text-white">: </span><span class="text-green-300">'16px 20px'</span><span class="text-white">, </span><span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-green-300">'18px'</span> <span class="text-white">}</span>
  <span class="text-white">}</span>

  <span class="text-pink-400">return</span> <span class="text-white">{</span>
    <span class="text-cyan-300">backgroundColor</span><span class="text-white">: </span><span class="text-blue-300">themeColors</span><span class="text-white">[</span><span class="text-blue-300">theme</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">].</span><span class="text-cyan-300">bg</span><span class="text-white">,</span>
    <span class="text-cyan-300">color</span><span class="text-white">: </span><span class="text-blue-300">themeColors</span><span class="text-white">[</span><span class="text-blue-300">theme</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">].</span><span class="text-cyan-300">text</span><span class="text-white">,</span>
    <span class="text-white">...</span><span class="text-blue-300">sizeStyles</span><span class="text-white">[</span><span class="text-blue-300">size</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">],</span>
    <span class="text-cyan-300">borderRadius</span><span class="text-white">: </span><span class="text-green-300">'8px'</span><span class="text-white">,</span>
    <span class="text-cyan-300">boxShadow</span><span class="text-white">: </span><span class="text-blue-300">mode</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=== </span><span class="text-green-300">'dark'</span> <span class="text-white">?</span> <span class="text-green-300">'0 4px 12px rgba(0,0,0,0.3)'</span> <span class="text-white">:</span> <span class="text-green-300">'0 2px 8px rgba(0,0,0,0.1)'</span>
  <span class="text-white">}</span>
<span class="text-white">})</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:style</span><span class="text-white">=</span><span class="text-green-300">"computedCardStyle"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"p-4 text-center transition-all duration-300"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;h5</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"font-medium mb-2"</span><span class="text-red-400">&gt;</span>智慧樣式卡片<span class="text-red-400">&lt;/h5&gt;</span>
    <span class="text-red-400">&lt;p</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-sm"</span><span class="text-red-400">&gt;</span>
      主題：<span class="text-purple-300">{{ theme }}</span> | 尺寸：<span class="text-purple-300">{{ size }}</span>
    <span class="text-red-400">&lt;/p&gt;</span>
  <span class="text-red-400">&lt;/div&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 樣式物件對照 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 CSS 屬性命名對照</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">CSS 屬性</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">JavaScript 駝峰式</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">範例值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">background-color</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">backgroundColor</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-gray-800">'#3b82f6'</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">font-size</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">fontSize</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-gray-800">'16px'</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">border-radius</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">borderRadius</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-gray-800">'8px'</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">text-align</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">textAlign</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-gray-800">'center'</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">--custom-var</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-purple-600">'--custom-var'</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-gray-800">'value'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
      <h5 class="font-semibold text-cyan-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• :style 物件語法使用駝峰式命名法 (camelCase) 對應 CSS 屬性</li>
        <li>• 屬性值必須是字串，數值需要加上單位 (如 '16px')</li>
        <li>• CSS 自訂屬性 (CSS Variables) 用字串鍵名：<code class="bg-cyan-100 px-1 rounded">'--var-name'</code></li>
        <li>• 推薦將複雜的樣式邏輯封裝在 computed 屬性中</li>
        <li>• 支援所有有效的 CSS 屬性和值</li>
      </ul>
    </div>
  </div>
</template>