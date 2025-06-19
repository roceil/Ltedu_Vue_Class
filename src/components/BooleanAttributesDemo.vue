<script lang="ts" setup>
import { ref, computed } from 'vue'

// 布林值狀態
const isDisabled = ref(true)
const isRequired = ref(false)
const isChecked = ref(false)
const isReadonly = ref(false)

// 載入狀態和表單資料
const isLoading = ref(false)
const formData = ref({ name: '' })

// 各種 Truthy/Falsy 值測試
const truthyValue = ref<any>(true)
const falsyValue = ref<any>(false)

// Truthy/Falsy 測試選項
const testValues = [
  { label: 'true (布林)', value: true },
  { label: 'false (布林)', value: false },
  { label: '1 (數字)', value: 1 },
  { label: '0 (數字)', value: 0 },
  { label: '"hello" (字串)', value: 'hello' },
  { label: '"" (空字串)', value: '' },
  { label: '[] (空陣列)', value: [] },
  { label: '{} (空物件)', value: {} },
  { label: 'null', value: null },
  { label: 'undefined', value: undefined }
]

function toggleDisabled() {
  isDisabled.value = !isDisabled.value
}

function toggleRequired() {
  isRequired.value = !isRequired.value
}

function toggleChecked() {
  isChecked.value = !isChecked.value
}

function toggleReadonly() {
  isReadonly.value = !isReadonly.value
}

function setTestValue(value: any) {
  truthyValue.value = value
}

function isTruthy(value: any): boolean {
  return !!value
}

function getValueDisplay(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (value === '') return '""'
  if (Array.isArray(value)) return '[]'
  if (typeof value === 'object') return '{}'
  return String(value)
}

function getButtonText(isDisabled: boolean): string {
  return isDisabled ? '我被禁用了' : '我可以點擊'
}

function getCheckboxText(isChecked: boolean): string {
  return isChecked ? '已選中' : '未選中'
}

function getTruthyDisplayClass(isTruthyValue: boolean): string {
  return isTruthyValue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
}

function getTruthyDisplayText(isTruthyValue: boolean): string {
  return isTruthyValue ? 'Truthy (按鈕被禁用)' : 'Falsy (按鈕可點擊)'
}

// 計算屬性：當載入中或表單無效時禁用按鈕
const shouldDisableSubmit = computed(() => {
  return isLoading.value || !formData.value.name.trim()
})

async function handleSubmit() {
  if (shouldDisableSubmit.value) return

  isLoading.value = true
  // 模擬 API 請求
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">布林屬性綁定演示</h3>

    <!-- 基本布林屬性 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 按鈕 disabled 屬性 -->
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="font-semibold text-blue-800 mb-3">1. disabled 屬性</h4>
        <div class="space-y-3">
          <button
            v-bind:disabled="isDisabled"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {{ getButtonText(isDisabled) }}
          </button>
          <div class="text-sm">
            <span class="font-medium">disabled:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ isDisabled }}</code>
            <span class="ml-2 text-gray-600">({{ isDisabled ? 'Truthy' : 'Falsy' }})</span>
          </div>
          <button
            @click="toggleDisabled"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            切換狀態
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - disabled 屬性
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref, computed }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">isDisabled</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">true</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isLoading</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">formData</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({ </span><span class="text-cyan-300">name</span><span class="text-white">: </span><span class="text-green-300">''</span> <span class="text-white">})</span>

<span class="text-gray-400">// 計算屬性：當載入中或表單無效時禁用按鈕</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">shouldDisableSubmit</span> <span class="text-white">=</span> <span class="text-yellow-300">computed</span><span class="text-white">(() => {</span>
  <span class="text-pink-400">return</span> <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">||</span> <span class="text-white">!</span><span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">name</span><span class="text-white">.</span><span class="text-cyan-300">trim</span><span class="text-white">()</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleDisabled</span><span class="text-white">() {</span>
  <span class="text-blue-300">isDisabled</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isDisabled</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>

<span class="text-pink-400">async function</span> <span class="text-yellow-300">handleSubmit</span><span class="text-white">() {</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">shouldDisableSubmit</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">) </span><span class="text-pink-400">return</span>
  
  <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">true</span>
  <span class="text-gray-400">// 模擬 API 請求</span>
  <span class="text-pink-400">await</span> <span class="text-yellow-300">new Promise</span><span class="text-white">(</span><span class="text-blue-300">resolve</span> <span class="text-white">=></span> <span class="text-yellow-300">setTimeout</span><span class="text-white">(</span><span class="text-blue-300">resolve</span><span class="text-white">, </span><span class="text-orange-300">2000</span><span class="text-white">))</span>
  <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">false</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-400">&lt;!-- 基本禁用範例 --&gt;</span>
  <span class="text-red-400">&lt;button</span>
    <span class="text-cyan-300">:disabled</span><span class="text-white">=</span><span class="text-green-300">"isDisabled"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"btn btn-primary"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ getButtonText(isDisabled) }}</span>
  <span class="text-red-400">&lt;/button&gt;</span>

  <span class="text-gray-400">&lt;!-- 條件式禁用範例 --&gt;</span>
  <span class="text-red-400">&lt;form</span> <span class="text-cyan-300">@submit.prevent</span><span class="text-white">=</span><span class="text-green-300">"handleSubmit"</span><span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;input</span> <span class="text-cyan-300">v-model</span><span class="text-white">=</span><span class="text-green-300">"formData.name"</span> <span class="text-cyan-300">placeholder</span><span class="text-white">=</span><span class="text-green-300">"輸入姓名"</span> <span class="text-red-400">/&gt;</span>
    <span class="text-red-400">&lt;button</span>
      <span class="text-cyan-300">:disabled</span><span class="text-white">=</span><span class="text-green-300">"shouldDisableSubmit"</span>
      <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"submit"</span>
    <span class="text-red-400">&gt;</span>
      <span class="text-purple-300">{{ isLoading ? '提交中...' : '提交' }}</span>
    <span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;/form&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>

      <!-- 輸入欄位 required 屬性 -->
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 class="font-semibold text-green-800 mb-3">2. required 屬性</h4>
        <div class="space-y-3">
          <form
            @submit.prevent="handleSubmit"
            novalidate
          >
            <input
              v-model="formData.name"
              type="text"
              v-bind:required="isRequired"
              placeholder="測試必填欄位（在瀏覽器中驗證）"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              :disabled="shouldDisableSubmit"
              class="mt-2 px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {{ isLoading ? '提交中...' : '測試提交' }}
            </button>
          </form>
          <div class="text-sm">
            <span class="font-medium">required:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ isRequired }}</code>
            <span class="ml-2 text-gray-600">({{ isRequired ? 'Truthy' : 'Falsy' }})</span>
          </div>
          <div class="text-sm">
            <span class="font-medium">提交按鈕disabled:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ shouldDisableSubmit }}</code>
            <span class="ml-2 text-gray-600">(基於載入狀態和表單驗證)</span>
          </div>
          <button
            @click="toggleRequired"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            切換 required 狀態
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - required 屬性與表單驗證
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isRequired</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isLoading</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">formData</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({ </span><span class="text-cyan-300">name</span><span class="text-white">: </span><span class="text-green-300">''</span> <span class="text-white">})</span>

<span class="text-gray-400">// 組合多個條件來決定按鈕是否禁用</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">shouldDisableSubmit</span> <span class="text-white">=</span> <span class="text-yellow-300">computed</span><span class="text-white">(() => {</span>
  <span class="text-pink-400">return</span> <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">||</span> <span class="text-white">!</span><span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">name</span><span class="text-white">.</span><span class="text-cyan-300">trim</span><span class="text-white">()</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleRequired</span><span class="text-white">() {</span>
  <span class="text-blue-300">isRequired</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isRequired</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>

<span class="text-pink-400">async function</span> <span class="text-yellow-300">handleSubmit</span><span class="text-white">() {</span>
  <span class="text-gray-400">// Early return 模式</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">shouldDisableSubmit</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">) </span><span class="text-pink-400">return</span>
  
  <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">true</span>
  <span class="text-pink-400">try</span> <span class="text-white">{</span>
    <span class="text-gray-400">// 模擬 API 請求</span>
    <span class="text-pink-400">await</span> <span class="text-yellow-300">submitForm</span><span class="text-white">(</span><span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">)</span>
  <span class="text-white">} </span><span class="text-pink-400">finally</span> <span class="text-white">{</span>
    <span class="text-blue-300">isLoading</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-orange-300">false</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-400">&lt;!-- 使用 HTML5 原生驗證 --&gt;</span>
  <span class="text-red-400">&lt;form</span> <span class="text-cyan-300">@submit.prevent</span><span class="text-white">=</span><span class="text-green-300">"handleSubmit"</span> <span class="text-cyan-300">novalidate</span><span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;input</span>
      <span class="text-cyan-300">v-model</span><span class="text-white">=</span><span class="text-green-300">"formData.name"</span>
      <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"text"</span>
      <span class="text-cyan-300">:required</span><span class="text-white">=</span><span class="text-green-300">"isRequired"</span>
      <span class="text-cyan-300">placeholder</span><span class="text-white">=</span><span class="text-green-300">"輸入您的姓名"</span>
      <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"form-input"</span>
    <span class="text-red-400">/&gt;</span>
    
    <span class="text-red-400">&lt;button</span>
      <span class="text-cyan-300">:disabled</span><span class="text-white">=</span><span class="text-green-300">"shouldDisableSubmit"</span>
      <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"submit"</span>
    <span class="text-red-400">&gt;</span>
      <span class="text-purple-300">{{ isLoading ? '提交中...' : '提交' }}</span>
    <span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;/form&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 更多布林屬性 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- checkbox checked 屬性 -->
      <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 class="font-semibold text-purple-800 mb-3">3. checked 屬性</h4>
        <div class="space-y-3">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              v-bind:checked="isChecked"
              class="form-checkbox"
            />
            <span class="text-gray-700 font-medium">{{ getCheckboxText(isChecked) }}</span>
          </label>
          <div class="text-sm">
            <span class="font-medium">checked:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ isChecked }}</code>
            <span class="ml-2 text-gray-600">({{ isChecked ? 'Truthy' : 'Falsy' }})</span>
          </div>
          <button
            @click="toggleChecked"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            切換狀態
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - checked 屬性
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isChecked</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleChecked</span><span class="text-white">() {</span>
  <span class="text-blue-300">isChecked</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isChecked</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;label</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"flex items-center space-x-2"</span><span class="text-red-400">&gt;</span>
    <span class="text-red-400">&lt;input</span>
      <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"checkbox"</span>
      <span class="text-cyan-300">v-bind:checked</span><span class="text-white">=</span><span class="text-green-300">"isChecked"</span>
      <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"form-checkbox"</span>
    <span class="text-red-400">/&gt;</span>
    <span class="text-red-400">&lt;span&gt;</span><span class="text-purple-300">{{ isChecked ? '已選中' : '未選中' }}</span><span class="text-red-400">&lt;/span&gt;</span>
  <span class="text-red-400">&lt;/label&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>

      <!-- 輸入欄位 readonly 屬性 -->
      <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h4 class="font-semibold text-orange-800 mb-3">4. readonly 屬性</h4>
        <div class="space-y-3">
          <input
            type="text"
            v-bind:readonly="isReadonly"
            value="這是測試文字"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 read-only:bg-gray-100"
          />
          <div class="text-sm">
            <span class="font-medium">readonly:</span>
            <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ isReadonly }}</code>
            <span class="ml-2 text-gray-600">({{ isReadonly ? 'Truthy' : 'Falsy' }})</span>
          </div>
          <button
            @click="toggleReadonly"
            class="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
          >
            切換狀態
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-orange-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - readonly 屬性
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">isReadonly</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">false</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleReadonly</span><span class="text-white">() {</span>
  <span class="text-blue-300">isReadonly</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= !</span><span class="text-blue-300">isReadonly</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;input</span>
    <span class="text-cyan-300">type</span><span class="text-white">=</span><span class="text-green-300">"text"</span>
    <span class="text-cyan-300">v-bind:readonly</span><span class="text-white">=</span><span class="text-green-300">"isReadonly"</span>
    <span class="text-cyan-300">value</span><span class="text-white">=</span><span class="text-green-300">"這是測試文字"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"w-full px-3 py-2 border rounded read-only:bg-gray-100"</span>
  <span class="text-red-400">/&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- Truthy/Falsy 值測試 -->
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-semibold text-yellow-800 mb-3">5. Truthy / Falsy 值測試</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <template
            v-for="(item, index) in testValues"
            :key="index"
          >
            <button
              @click="setTestValue(item.value)"
              class="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
              :class="{ 'bg-yellow-200 border-yellow-400': truthyValue === item.value }"
            >
              {{ item.label }}
            </button>
          </template>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded">
          <div class="flex items-center gap-4">
            <button
              v-bind:disabled="truthyValue"
              class="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              測試按鈕
            </button>
            <div class="text-sm space-y-1">
              <div>
                <span class="font-medium">當前值:</span>
                <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ getValueDisplay(truthyValue) }}</code>
              </div>
              <div>
                <span class="font-medium">類型:</span>
                <code class="ml-2 px-2 py-1 bg-gray-100 rounded">{{ typeof truthyValue }}</code>
              </div>
              <div>
                <span class="font-medium">結果:</span>
                <span
                  class="ml-2 px-2 py-1 rounded font-medium"
                  :class="getTruthyDisplayClass(isTruthy(truthyValue))"
                >
                  {{ getTruthyDisplayText(isTruthy(truthyValue)) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-yellow-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - Truthy/Falsy 值測試
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
      <span class="text-pink-400">const</span> <span class="text-blue-300">truthyValue</span> <span
        class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span
        class="text-orange-300">true</span><span class="text-white">)</span>

      <span class="text-pink-400">const</span> <span class="text-blue-300">testValues</span> <span class="text-white">=
        [</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'true (布林)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-orange-300">true</span>
      <span class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'false (布林)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-orange-300">false</span>
      <span class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'1 (數字)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-orange-300">1</span> <span
        class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'0 (數字)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-orange-300">0</span> <span
        class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'"hello" (字串)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-green-300">'hello'</span>
      <span class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'"" (空字串)'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-green-300">''</span> <span
        class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'null'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span class="text-orange-300">null</span>
      <span class="text-white">},</span>
      <span class="text-white">{ </span><span class="text-cyan-300">label</span><span class="text-white">: </span><span
        class="text-green-300">'undefined'</span><span class="text-white">, </span><span
        class="text-cyan-300">value</span><span class="text-white">: </span><span
        class="text-orange-300">undefined</span> <span class="text-white">}</span>
      <span class="text-white">]</span>

      <span class="text-pink-400">function</span> <span class="text-yellow-300">setTestValue</span><span
        class="text-white">(</span><span class="text-blue-300">value</span><span class="text-white">) {</span>
      <span class="text-blue-300">truthyValue</span><span class="text-white">.</span><span
        class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">value</span>
      <span class="text-white">}</span>

      <span class="text-pink-400">function</span> <span class="text-yellow-300">isTruthy</span><span
        class="text-white">(</span><span class="text-blue-300">value</span><span class="text-white">) {</span>
      <span class="text-pink-404">return</span> <span class="text-white">!!</span><span
        class="text-blue-300">value</span>
      <span class="text-white">}</span>
      <span class="text-purple-400">&lt;/script&gt;</span>

      <span class="text-purple-400">&lt;template&gt;</span>
      <span class="text-red-400">&lt;button</span>
      <span class="text-cyan-300">v-bind:disabled</span><span class="text-white">=</span><span
        class="text-green-300">"truthyValue"</span>
      <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"px-4 py-2
        bg-red-600 text-white rounded disabled:bg-gray-400"</span>
      <span class="text-red-400">&gt;</span>
      測試按鈕
      <span class="text-red-400">&lt;/button&gt;</span>

      <span class="text-red-400">&lt;button</span>
      <span class="text-cyan-300">@click</span><span class="text-white">=</span><span
        class="text-green-300">"setTestValue(false)"</span>
      <span class="text-red-400">&gt;</span>
      設為 false
      <span class="text-red-400">&lt;/button&gt;</span>
      <span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- HTML 渲染結果展示 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 HTML 渲染結果</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
        <div class="space-y-2">
          <div class="bg-white p-2 rounded border">
            <div class="text-gray-600 text-xs mb-1">disabled 按鈕：</div>
            &lt;button{{ isDisabled ? ' disabled' : '' }}&gt;...&lt;/button&gt;
          </div>
          <div class="bg-white p-2 rounded border">
            <div class="text-gray-600 text-xs mb-1">required 輸入欄位：</div>
            &lt;input{{ isRequired ? ' required' : '' }} /&gt;
          </div>
        </div>
        <div class="space-y-2">
          <div class="bg-white p-2 rounded border">
            <div class="text-gray-600 text-xs mb-1">checked 複選框：</div>
            &lt;input type="checkbox"{{ isChecked ? ' checked' : '' }} /&gt;
          </div>
          <div class="bg-white p-2 rounded border">
            <div class="text-gray-600 text-xs mb-1">readonly 輸入欄位：</div>
            &lt;input{{ isReadonly ? ' readonly' : '' }} /&gt;
          </div>
        </div>
      </div>
    </div>

    <!-- 重點說明 -->
    <div class="text-sm text-gray-800 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h5 class="font-semibold text-blue-800 mb-3">⚠️ 重點說明：</h5>
      <ul class="space-y-2 text-gray-700">
        <li>• 布林屬性會根據綁定值的 <strong class="text-blue-800">Truthy/Falsy</strong> 決定是否渲染到 HTML</li>
        <li>• 當值為 <strong class="text-green-700">Truthy</strong> 時，屬性會出現在 DOM 中（如 disabled）</li>
        <li>• 當值為 <strong class="text-red-700">Falsy</strong> 時，屬性會完全從 DOM 中移除</li>
        <li>• 不同於普通屬性，布林屬性不關心具體的值，只關心 Truthy/Falsy</li>
        <li>• 常見的布林屬性：disabled、required、checked、readonly、hidden、selected 等</li>
      </ul>
    </div>

    <!-- 最佳實務 -->
    <div class="text-sm text-gray-800 bg-green-50 border border-green-200 rounded-lg p-4">
      <h5 class="font-semibold text-green-800 mb-3">✅ 最佳實務建議：</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <h6 class="font-medium text-green-700">推薦寫法：</h6>
          <ul class="space-y-1 text-gray-700">
            <li>• 使用簡化語法：<code class="px-1 bg-gray-200 rounded">:disabled="isDisabled"</code></li>
            <li>• 結合計算屬性進行複雜判斷</li>
            <li>• 使用語意化的變數名稱</li>
            <li>• 配合 CSS 過渡效果提升體驗</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h6 class="font-medium text-red-700">避免的寫法：</h6>
          <ul class="space-y-1 text-gray-700">
            <li>• 避免：<code class="px-1 bg-gray-200 rounded">disabled="true"</code>（字串）</li>
            <li>• 避免：<code class="px-1 bg-gray-200 rounded">:disabled="'false'"</code>（字串 false）</li>
            <li>• 避免在模板中進行複雜運算</li>
            <li>• 避免使用魔術數字或不明確的值</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 效能提示 -->
    <div class="text-sm text-gray-800 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h5 class="font-semibold text-yellow-800 mb-3">⚡ 效能提示：</h5>
      <ul class="space-y-1 text-gray-700">
        <li>• 使用 <code class="px-1 bg-gray-200 rounded">computed</code> 來組合多個條件，避免在模板中重複計算</li>
        <li>• 對於頻繁變動的布林值，考慮使用 <code class="px-1 bg-gray-200 rounded">shallowRef</code></li>
        <li>• 善用 Early Return 模式減少不必要的邏輯執行</li>
        <li>• 結合 CSS 類別切換可以達到更好的視覺效果</li>
      </ul>
    </div>
  </div>
</template>