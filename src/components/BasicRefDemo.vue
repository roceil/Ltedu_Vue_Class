<script lang="ts" setup>
import { ref } from 'vue'

// 不同型別的 ref 響應式狀態
const stringValue = ref('Hello Vue')
const numberValue = ref(42)
const booleanValue = ref(true)
const arrayValue = ref(['Vue', 'React', 'Angular'])
const objectValue = ref({
  name: '小明',
  age: 25,
  city: '台北'
})

// 操作日誌
const actionLog = ref<string[]>([])

const addLog = (message: string) => {
  actionLog.value.unshift(`${new Date().toLocaleTimeString()}: ${message}`)
  console.log(message)
}

// 字串操作
const updateString = () => {
  const newValue = stringValue.value === 'Hello Vue' ? 'Hello World' : 'Hello Vue'
  stringValue.value = newValue
  addLog(`🔤 字串更新為: ${newValue}`)
}

// 數字操作
const incrementNumber = () => {
  numberValue.value++
  addLog(`🔢 數字增加為: ${numberValue.value}`)
}

const decrementNumber = () => {
  if (numberValue.value <= 0) return
  numberValue.value--
  addLog(`🔢 數字減少為: ${numberValue.value}`)
}

// 布林操作
const toggleBoolean = () => {
  booleanValue.value = !booleanValue.value
  addLog(`✅ 布林值切換為: ${booleanValue.value}`)
}

// 陣列操作
const addToArray = () => {
  const frameworks = ['Svelte', 'Solid', 'Qwik', 'Alpine']
  const randomFramework = frameworks[Math.floor(Math.random() * frameworks.length)]

  if (arrayValue.value.includes(randomFramework)) return

  arrayValue.value.push(randomFramework)
  addLog(`📝 陣列新增: ${randomFramework}`)
}

const removeFromArray = () => {
  if (arrayValue.value.length === 0) return

  const removedItem = arrayValue.value.pop()
  addLog(`🗑️ 陣列移除: ${removedItem}`)
}

// 物件操作
const updateObjectName = () => {
  const names = ['小紅', '小王', '小李', '小陳']
  const currentName = objectValue.value.name
  const availableNames = names.filter(name => name !== currentName)
  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]

  objectValue.value.name = newName
  addLog(`👤 物件姓名更新為: ${newName}`)
}

const updateObjectAge = () => {
  objectValue.value.age = Math.floor(Math.random() * 50) + 18
  addLog(`🎂 物件年齡更新為: ${objectValue.value.age}`)
}

// 清除日誌
const clearLog = () => {
  actionLog.value = []
  console.clear()
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-gray-800">基本 Ref 使用演示</h3>
      <button
        @click="clearLog"
        class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        清除日誌
      </button>
    </div>

    <div class="space-y-8">
      <!-- 1. 字串 Ref -->
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-800 mb-3">🔤 字串 Ref</h4>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="p-3 bg-white border border-blue-300 rounded">
              <div class="text-sm text-gray-600">當前值：</div>
              <div class="text-gray-800 font-mono text-lg">{{ stringValue }}</div>
            </div>
            <button
              @click="updateString"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              更新字串
            </button>
          </div>

          <!-- 程式碼範例 -->
          <div class="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
              <span class="mr-2">📝</span>程式碼範例 - 字串 Ref
            </h5>
            <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-400">// 宣告字串 ref</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">stringValue</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'Hello Vue'</span><span class="text-white">)</span>

<span class="text-gray-400">// 更新字串的函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">updateString</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">newValue</span> <span class="text-white">=</span> <span class="text-blue-300">stringValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=== </span><span class="text-green-300">'Hello Vue'</span> 
    <span class="text-white">?</span> <span class="text-green-300">'Hello World'</span> 
    <span class="text-white">:</span> <span class="text-green-300">'Hello Vue'</span>
  <span class="text-blue-300">stringValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">newValue</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-400">&lt;!-- 在 template 中自動解包，不需要 .value --&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span><span class="text-purple-300">{{ stringValue }}</span><span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateString"</span><span class="text-red-400">&gt;</span>更新字串<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
      </div>

      <!-- 2. 數字 Ref -->
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 class="text-lg font-semibold text-green-800 mb-3">🔢 數字 Ref</h4>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="p-3 bg-white border border-green-300 rounded">
              <div class="text-sm text-gray-600">當前值：</div>
              <div class="text-gray-800 font-mono text-2xl">{{ numberValue }}</div>
            </div>
            <div class="flex gap-2">
              <button
                @click="incrementNumber"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                +1
              </button>
              <button
                @click="decrementNumber"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                -1
              </button>
            </div>
          </div>

          <!-- 程式碼範例 -->
          <div class="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
              <span class="mr-2">📝</span>程式碼範例 - 數字 Ref
            </h5>
            <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-400">// 宣告數字 ref</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">numberValue</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">42</span><span class="text-white">)</span>

<span class="text-gray-400">// 數字增加函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">incrementNumber</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-blue-300">numberValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">++</span>
<span class="text-white">}</span>

<span class="text-gray-400">// 數字減少函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">decrementNumber</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">numberValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">&gt; </span><span class="text-orange-300">0</span><span class="text-white">) {</span>
    <span class="text-blue-300">numberValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">--</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span><span class="text-purple-300">{{ numberValue }}</span><span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"incrementNumber"</span><span class="text-red-400">&gt;</span>+1<span class="text-red-400">&lt;/button&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"decrementNumber"</span><span class="text-red-400">&gt;</span>-1<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
      </div>

      <!-- 3. 布林 Ref -->
      <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 class="text-lg font-semibold text-purple-800 mb-3">✅ 布林 Ref</h4>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="p-3 bg-white border border-purple-300 rounded flex items-center justify-between">
              <div class="text-sm text-gray-600">當前值：</div>
              <div class="flex items-center gap-2">
                <div
                  :class="booleanValue ? 'text-green-600' : 'text-red-600'"
                  class="font-mono text-lg"
                >
                  {{ booleanValue }}
                </div>
                <div class="text-2xl">{{ booleanValue ? '✅' : '❌' }}</div>
              </div>
            </div>
            <button
              @click="toggleBoolean"
              class="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              切換布林值
            </button>
          </div>

          <!-- 程式碼範例 -->
          <div class="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
              <span class="mr-2">📝</span>程式碼範例 - 布林 Ref
            </h5>
            <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-400">// 宣告布林 ref</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">booleanValue</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">true</span><span class="text-white">)</span>

<span class="text-gray-400">// 切換布林值函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">toggleBoolean</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-blue-300">booleanValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-white">!</span><span class="text-blue-300">booleanValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"booleanValue ? 'text-green-600' : 'text-red-600'"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ booleanValue }}</span>
  <span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;div</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-2xl"</span><span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ booleanValue ? '✅' : '❌' }}</span>
  <span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleBoolean"</span><span class="text-red-400">&gt;</span>切換布林值<span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
      </div>

      <!-- 4. 陣列 Ref -->
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 class="text-lg font-semibold text-yellow-800 mb-3">📝 陣列 Ref</h4>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="p-3 bg-white border border-yellow-300 rounded">
              <div class="text-sm text-gray-600 mb-2">當前陣列 ({{ arrayValue.length }} 項)：</div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in arrayValue"
                  :key="item"
                  class="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-sm"
                >
                  {{ item }}
                </span>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="addToArray"
                class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                新增項目
              </button>
              <button
                @click="removeFromArray"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                :disabled="arrayValue.length === 0"
                :class="{ 'opacity-50 cursor-not-allowed': arrayValue.length === 0 }"
              >
                移除項目
              </button>
            </div>
          </div>

          <!-- 程式碼範例 -->
          <div class="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h5 class="text-sm font-semibold text-yellow-300 mb-3 flex items-center">
              <span class="mr-2">📝</span>程式碼範例 - 陣列 Ref
            </h5>
            <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-400">// 宣告陣列 ref</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">arrayValue</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">([</span><span class="text-green-300">'Vue'</span><span class="text-white">, </span><span class="text-green-300">'React'</span><span class="text-white">, </span><span class="text-green-300">'Angular'</span><span class="text-white">])</span>

<span class="text-gray-400">// 新增項目函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">addToArray</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">frameworks</span> <span class="text-white">= [</span><span class="text-green-300">'Svelte'</span><span class="text-white">, </span><span class="text-green-300">'Solid'</span><span class="text-white">, </span><span class="text-green-300">'Qwik'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">randomFramework</span> <span class="text-white">=</span> <span class="text-blue-300">frameworks</span><span class="text-white">[</span><span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">floor</span><span class="text-white">(</span><span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">random</span><span class="text-white">() * </span><span class="text-blue-300">frameworks</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">)]</span>
  
  <span class="text-pink-400">if</span> <span class="text-white">(!</span><span class="text-blue-300">arrayValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-yellow-300">includes</span><span class="text-white">(</span><span class="text-blue-300">randomFramework</span><span class="text-white">)) {</span>
    <span class="text-blue-300">arrayValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-yellow-300">push</span><span class="text-white">(</span><span class="text-blue-300">randomFramework</span><span class="text-white">)</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>

<span class="text-gray-400">// 移除項目函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">removeFromArray</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">arrayValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">length</span> <span class="text-white">&gt; </span><span class="text-orange-300">0</span><span class="text-white">) {</span>
    <span class="text-blue-300">arrayValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-yellow-300">pop</span><span class="text-white">()</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span>陣列長度：<span class="text-purple-300">{{ arrayValue.length }}</span><span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;span</span>
    <span class="text-cyan-300">v-for</span><span class="text-white">=</span><span class="text-green-300">"item in arrayValue"</span>
    <span class="text-cyan-300">:key</span><span class="text-white">=</span><span class="text-green-300">"item"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-purple-300">&lbrace;&lbrace; item &rbrace;&rbrace;</span>
  <span class="text-red-400">&lt;/span&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
      </div>

      <!-- 5. 物件 Ref -->
      <div class="p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
        <h4 class="text-lg font-semibold text-cyan-800 mb-3">🏠 物件 Ref</h4>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div class="p-3 bg-white border border-cyan-300 rounded">
              <div class="text-sm text-gray-600 mb-2">當前物件：</div>
              <div class="space-y-1 font-mono">
                <div class="text-gray-800">姓名: {{ objectValue.name }}</div>
                <div class="text-gray-800">年齡: {{ objectValue.age }}</div>
                <div class="text-gray-800">城市: {{ objectValue.city }}</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="updateObjectName"
                class="flex-1 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
              >
                更新姓名
              </button>
              <button
                @click="updateObjectAge"
                class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                更新年齡
              </button>
            </div>
          </div>

          <!-- 程式碼範例 -->
          <div class="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
            <h5 class="text-sm font-semibold text-cyan-300 mb-3 flex items-center">
              <span class="mr-2">📝</span>程式碼範例 - 物件 Ref
            </h5>
            <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-gray-400">// 宣告物件 ref</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">objectValue</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">name</span><span class="text-white">: </span><span class="text-green-300">'小明'</span><span class="text-white">,</span>
  <span class="text-cyan-300">age</span><span class="text-white">: </span><span class="text-orange-300">25</span><span class="text-white">,</span>
  <span class="text-cyan-300">city</span><span class="text-white">: </span><span class="text-green-300">'台北'</span>
<span class="text-white">})</span>

<span class="text-gray-400">// 更新物件屬性函式</span>
<span class="text-pink-400">const</span> <span class="text-yellow-300">updateObjectName</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">names</span> <span class="text-white">= [</span><span class="text-green-300">'小紅'</span><span class="text-white">, </span><span class="text-green-300">'小王'</span><span class="text-white">, </span><span class="text-green-300">'小李'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">randomName</span> <span class="text-white">=</span> <span class="text-blue-300">names</span><span class="text-white">[</span><span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">floor</span><span class="text-white">(</span><span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">random</span><span class="text-white">() * </span><span class="text-blue-300">names</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">)]</span>
  
  <span class="text-gray-400">// 修改物件屬性</span>
  <span class="text-blue-300">objectValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">name</span> <span class="text-white">=</span> <span class="text-blue-300">randomName</span>
<span class="text-white">}</span>

<span class="text-pink-400">const</span> <span class="text-yellow-300">updateObjectAge</span> <span class="text-white">= () =&gt; {</span>
  <span class="text-blue-300">objectValue</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">age</span> <span class="text-white">=</span> <span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">floor</span><span class="text-white">(</span><span class="text-cyan-300">Math</span><span class="text-white">.</span><span class="text-yellow-300">random</span><span class="text-white">() * </span><span class="text-orange-300">50</span><span class="text-white">) + </span><span class="text-orange-300">18</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span>姓名: <span class="text-purple-300">{{ objectValue.name }}</span><span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span>年齡: <span class="text-purple-300">{{ objectValue.age }}</span><span class="text-red-400">&lt;/div&gt;</span>
  <span class="text-red-400">&lt;div&gt;</span>城市: <span class="text-purple-300">{{ objectValue.city }}</span><span class="text-red-400">&lt;/div&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作日誌 -->
    <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="text-lg font-semibold text-gray-800 mb-3">📋 操作日誌</h4>
      <div class="h-32 overflow-y-auto bg-white border border-gray-300 p-3 rounded">
        <div
          v-if="actionLog.length === 0"
          class="text-gray-500 text-sm"
        >
          暫無操作記錄，試試點擊上面的按鈕！
        </div>
        <div
          v-for="(log, index) in actionLog"
          :key="index"
          class="text-sm font-mono text-gray-700 mb-1"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- Ref 語法說明 -->
    <div class="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
      <h4 class="text-lg font-semibold text-indigo-800 mb-3">📚 Ref 語法重點</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h5 class="font-semibold text-indigo-700 mb-3">✅ 正確用法</h5>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-indigo-50 rounded border">
              <code class="text-indigo-600">const count = ref(0)</code>
              <p class="text-gray-600 mt-1">宣告 ref 響應式變數</p>
            </div>
            <div class="p-3 bg-indigo-50 rounded border">
              <code class="text-indigo-600">count.value++</code>
              <p class="text-gray-600 mt-1">script 中使用 .value 修改</p>
            </div>
            <div class="p-3 bg-indigo-50 rounded border">
              <code class="text-indigo-600">&lbrace;&lbrace; count &rbrace;&rbrace;</code>
              <p class="text-gray-600 mt-1">template 中自動解包</p>
            </div>
          </div>
        </div>
        <div class="p-4 bg-white rounded border border-indigo-200">
          <h5 class="font-semibold text-indigo-700 mb-3">💡 核心特性</h5>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>響應式：</strong> 值變化時自動更新 UI</li>
            <li>• <strong>型別支援：</strong> 支援所有 JavaScript 型別</li>
            <li>• <strong>自動解包：</strong> template 中不需要 .value</li>
            <li>• <strong>深度響應：</strong> 物件和陣列的內部變化也會追蹤</li>
            <li>• <strong>效能優化：</strong> 只在需要時更新相關組件</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 最佳實踐 -->
    <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="text-lg font-semibold text-green-800 mb-3">🌟 最佳實踐</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-white rounded border border-green-200">
          <h5 class="font-semibold text-green-700 mb-3">推薦做法</h5>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>語意命名：</strong> 使用有意義的變數名</li>
            <li>• <strong>型別標註：</strong> TypeScript 中適當標註型別</li>
            <li>• <strong>初始值：</strong> 提供合適的初始值</li>
            <li>• <strong>生命週期：</strong> 適當清理資源和事件監聽器</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h5 class="font-semibold text-green-700 mb-3">常見陷阱</h5>
          <ul class="text-sm text-gray-700 space-y-2">
            <li>• <strong>忘記 .value：</strong> script 中必須使用 .value</li>
            <li>• <strong>重新賦值：</strong> 直接賦值會失去響應性</li>
            <li>• <strong>解構賦值：</strong> 解構會失去響應性連結</li>
            <li>• <strong>效能考量：</strong> 避免過度細分 ref</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>