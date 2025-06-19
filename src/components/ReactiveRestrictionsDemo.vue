<script lang="ts" setup>
import { ref, reactive } from 'vue'

// 測試 1: 替換整個物件的問題
let reactiveUser = reactive({
  name: '小明',
  age: 25,
  email: 'xiaoming@example.com'
})

// 測試 2: 解構失去響應性的問題
const reactiveData = reactive({
  count: 0,
  text: 'Hello',
  user: {
    name: '小紅',
    age: 23
  }
})

// 測試 3: 對比 ref 的行為
const refUser = ref({
  name: '小王',
  age: 27,
  email: 'xiaowang@example.com'
})

// 日誌記錄
const restrictionLog = ref<string[]>([])

const addLog = (message: string, type: 'error' | 'warning' | 'success' | 'info' = 'info') => {
  restrictionLog.value.unshift(`${new Date().toLocaleTimeString()}: [${type.toUpperCase()}] ${message}`)
}

// 測試 1: 替換整個物件
const testReplaceReactiveObject = () => {
  addLog('嘗試替換 reactive 物件...', 'warning')

  try {
    // ❌ 這樣做會失去響應性，但語法上不會報錯
    // 問題是：reactiveUser 變數指向了新的物件，但這個新物件不是響應式的
    // 而且原來綁定在模板中的還是舊的 reactive 物件

    const oldName = reactiveUser.name

    // 錯誤做法：直接重新賦值
    reactiveUser = {
      name: '新用戶',
      age: 30,
      email: 'newuser@example.com'
    }

    addLog(`替換後在 script 中讀取：${reactiveUser.name}`, 'info')
    addLog(`但模板中顯示的仍是：${oldName} (失去響應性)`, 'error')
    addLog('原因：新物件不是響應式的，模板仍綁定舊物件', 'error')

  } catch (error) {
    addLog(`替換失敗：${error}`, 'error')
  }
}

const testCorrectReplaceReactiveObject = () => {
  addLog('正確方式：逐個更新 reactive 物件屬性', 'success')

  // ✅ 正確做法：更新物件的屬性，而不是替換整個物件
  reactiveUser.name = '正確更新'
  reactiveUser.age = 28
  reactiveUser.email = 'correct@example.com'

  addLog('逐個更新屬性成功，保持響應性', 'success')
}

// 測試 2: 解構失去響應性
const testReactiveDestructuring = () => {
  addLog('測試 reactive 解構問題...', 'warning')

  // ❌ 解構原始型別會失去響應性
  let { count, text } = reactiveData

  addLog(`解構前：count = ${reactiveData.count}, text = "${reactiveData.text}"`, 'info')

  // 修改解構出來的變數
  count = 999
  text = 'Changed'

  addLog(`修改解構變數後：count = ${count}, text = "${text}"`, 'info')
  addLog(`原始 reactive 資料：count = ${reactiveData.count}, text = "${reactiveData.text}"`, 'error')
  addLog('解構的原始型別失去響應性，無法影響原始資料', 'error')
}

const testReactiveObjectDestructuring = () => {
  addLog('測試 reactive 物件解構...', 'info')

  // ✅ 解構物件型別仍保持響應性
  const { user } = reactiveData

  addLog(`解構物件前：user.name = "${reactiveData.user.name}"`, 'info')

  // 修改解構出來的物件
  user.name = '解構修改'
  user.age = 99

  addLog(`修改解構物件後：user.name = "${user.name}"`, 'success')
  addLog(`原始 reactive 資料：user.name = "${reactiveData.user.name}"`, 'success')
  addLog('解構的物件型別保持響應性 ✅', 'success')
}

// 測試 3: ref 的正確行為對比
const testRefReplacement = () => {
  addLog('對比：ref 替換整個物件', 'info')

  const oldName = refUser.value.name

  // ✅ ref 可以直接替換整個物件而保持響應性
  refUser.value = {
    name: 'Ref 新用戶',
    age: 35,
    email: 'refnewuser@example.com'
  }

  addLog(`ref 替換前：${oldName}`, 'info')
  addLog(`ref 替換後：${refUser.value.name}`, 'success')
  addLog('ref 替換整個物件保持響應性 ✅', 'success')
}

const testRefDestructuring = () => {
  addLog('對比：ref 解構行為', 'info')

  // ⚠️ ref 解構原始型別也會失去響應性（與 reactive 相同）
  let { name } = refUser.value

  addLog(`ref 解構前：name = "${refUser.value.name}"`, 'info')

  name = 'Ref 解構測試'

  addLog(`修改解構變數：name = "${name}"`, 'info')
  addLog(`原始 ref 資料：name = "${refUser.value.name}"`, 'warning')
  addLog('ref 解構原始型別也會失去響應性 ⚠️', 'warning')
}

// 修復方法演示
const updateReactiveDataCorrectly = () => {
  addLog('演示正確更新 reactive 資料的方法', 'success')

  // ✅ 直接修改屬性
  reactiveData.count++
  reactiveData.text = `更新 ${Math.random().toFixed(2)}`

  addLog(`正確更新：count = ${reactiveData.count}, text = "${reactiveData.text}"`, 'success')
}

const resetReactiveData = () => {
  // 重置測試資料
  reactiveData.count = 0
  reactiveData.text = 'Hello'
  reactiveData.user.name = '小紅'
  reactiveData.user.age = 23

  refUser.value = {
    name: '小王',
    age: 27,
    email: 'xiaowang@example.com'
  }

  addLog('重置測試資料', 'info')
}

const clearLog = () => {
  restrictionLog.value = []
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-white">Reactive 限制與陷阱演示</h3>
      <div class="flex gap-2">
        <button
          @click="resetReactiveData"
          class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          重置資料
        </button>
        <button
          @click="clearLog"
          class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          清除日誌
        </button>
      </div>
    </div>

    <!-- 當前資料狀態顯示 -->
    <div class="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="p-4 bg-red-900 border border-red-500 rounded-lg">
        <h4 class="text-lg font-semibold text-red-300 mb-2">問題物件 (Reactive)</h4>
        <div class="text-sm text-white font-mono space-y-1">
          <div>姓名: {{ reactiveUser.name }}</div>
          <div>年齡: {{ reactiveUser.age }}</div>
          <div>信箱: {{ reactiveUser.email }}</div>
        </div>
      </div>

      <div class="p-4 bg-yellow-900 border border-yellow-500 rounded-lg">
        <h4 class="text-lg font-semibold text-yellow-300 mb-2">測試資料 (Reactive)</h4>
        <div class="text-sm text-white font-mono space-y-1">
          <div>count: {{ reactiveData.count }}</div>
          <div>text: "{{ reactiveData.text }}"</div>
          <div>user.name: {{ reactiveData.user.name }}</div>
          <div>user.age: {{ reactiveData.user.age }}</div>
        </div>
      </div>

      <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
        <h4 class="text-lg font-semibold text-green-300 mb-2">對比物件 (Ref)</h4>
        <div class="text-sm text-white font-mono space-y-1">
          <div>姓名: {{ refUser.name }}</div>
          <div>年齡: {{ refUser.age }}</div>
          <div>信箱: {{ refUser.email }}</div>
        </div>
      </div>
    </div>

    <!-- 測試按鈕區域 -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 左側：Reactive 限制測試 -->
      <div class="space-y-3">
        <div class="p-4 bg-red-900 border border-red-500 rounded-lg">
          <h4 class="text-lg font-semibold text-red-300 mb-3">❌ Reactive 限制測試</h4>

          <div class="space-y-2">
            <button
              @click="testReplaceReactiveObject"
              class="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              測試替換整個物件 (會失去響應性)
            </button>

            <button
              @click="testCorrectReplaceReactiveObject"
              class="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-sm"
            >
              正確方式：逐個更新屬性
            </button>

            <button
              @click="testReactiveDestructuring"
              class="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              測試解構原始型別 (會失去響應性)
            </button>

            <button
              @click="testReactiveObjectDestructuring"
              class="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
            >
              測試解構物件型別 (保持響應性)
            </button>

            <button
              @click="updateReactiveDataCorrectly"
              class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              ✅ 正確更新方式
            </button>
          </div>
        </div>
      </div>

      <!-- 右側：Ref 對比測試 -->
      <div class="space-y-3">
        <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
          <h4 class="text-lg font-semibold text-green-300 mb-3">✅ Ref 對比測試</h4>

          <div class="space-y-2">
            <button
              @click="testRefReplacement"
              class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              測試 ref 替換整個物件 (保持響應性)
            </button>

            <button
              @click="testRefDestructuring"
              class="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
            >
              測試 ref 解構 (同樣有限制)
            </button>
          </div>

          <div class="mt-4 p-3 bg-green-800 rounded text-sm">
            <h5 class="font-semibold text-green-200 mb-2">Ref 的優勢：</h5>
            <ul class="text-green-100 space-y-1 text-xs">
              <li>✅ 可以直接替換整個值</li>
              <li>✅ 使用方式一致</li>
              <li>✅ 沒有意外的限制陷阱</li>
              <li>⚠️ 解構原始值仍會失去響應性（通用限制）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 測試日誌 -->
    <div class="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-gray-300 mb-3">📋 測試日誌</h4>
      <div class="h-40 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700">
        <div
          v-if="restrictionLog.length === 0"
          class="text-gray-500 text-sm"
        >
          暫無測試記錄，點擊上面的按鈕開始測試！
        </div>
        <div
          v-for="(log, index) in restrictionLog"
          :key="index"
          class="text-sm font-mono mb-1"
          :class="{
            'text-red-300': log.includes('[ERROR]'),
            'text-yellow-300': log.includes('[WARNING]'),
            'text-green-300': log.includes('[SUCCESS]'),
            'text-blue-300': log.includes('[INFO]')
          }"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 問題總結與解決方案 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 問題總結 -->
      <div class="p-4 bg-red-900 border border-red-500 rounded-lg">
        <h4 class="text-lg font-semibold text-red-300 mb-3">⚠️ Reactive 的主要限制</h4>

        <div class="space-y-3">
          <div class="p-3 bg-red-800 rounded">
            <h5 class="font-semibold text-red-200 mb-2">1. 不能替換整個物件</h5>
            <div class="text-sm text-red-100">
              <code class="bg-red-700 px-1 rounded">reactiveObj = newObj</code> 會失去響應性
            </div>
          </div>

          <div class="p-3 bg-red-800 rounded">
            <h5 class="font-semibold text-red-200 mb-2">2. 解構原始型別失去響應性</h5>
            <div class="text-sm text-red-100">
              <code class="bg-red-700 px-1 rounded">let {count} = reactive</code> 後修改 count 無效
            </div>
          </div>

          <div class="p-3 bg-red-800 rounded">
            <h5 class="font-semibold text-red-200 mb-2">3. 僅支援物件和陣列</h5>
            <div class="text-sm text-red-100">
              不能用於字串、數字、布林等原始型別
            </div>
          </div>
        </div>
      </div>

      <!-- 解決方案 -->
      <div class="p-4 bg-green-900 border border-green-500 rounded-lg">
        <h4 class="text-lg font-semibold text-green-300 mb-3">✅ 推薦解決方案</h4>

        <div class="space-y-3">
          <div class="p-3 bg-green-800 rounded">
            <h5 class="font-semibold text-green-200 mb-2">1. 一律使用 Ref</h5>
            <div class="text-sm text-green-100">
              避免所有 reactive 的限制，統一使用 ref()
            </div>
          </div>

          <div class="p-3 bg-green-800 rounded">
            <h5 class="font-semibold text-green-200 mb-2">2. 如必須用 Reactive</h5>
            <div class="text-sm text-green-100">
              只修改屬性，不替換整個物件；避免解構原始值
            </div>
          </div>

          <div class="p-3 bg-green-800 rounded">
            <h5 class="font-semibold text-green-200 mb-2">3. 使用 toRefs</h5>
            <div class="text-sm text-green-100">
              <code class="bg-green-700 px-1 rounded">toRefs(reactive)</code> 可以安全解構
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳實踐提醒 -->
    <div class="mt-6 p-4 bg-blue-900 border border-blue-500 rounded-lg">
      <h4 class="text-lg font-semibold text-blue-300 mb-2">💡 最佳實踐提醒</h4>
      <div class="text-sm text-blue-100">
        <p class="mb-2">
          <strong>Vue 3 官方建議：</strong> 在大多數情況下使用 ref，除非你有特殊需求需要 reactive 的特性。
        </p>
        <p class="mb-2">
          <strong>一致性原則：</strong> 統一使用 ref 可以避免記憶各種限制，降低出錯機率。
        </p>
        <p>
          <strong>可讀性考量：</strong> .value 明確表示這是響應式狀態，提高程式碼的可理解性。
        </p>
      </div>
    </div>
  </div>
</template>