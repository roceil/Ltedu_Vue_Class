<script lang="ts" setup>
import { ref } from 'vue'

const fruits = ref(['蘋果', '香蕉', '橘子'])
const user = ref({
  name: 'John',
  age: 25,
  email: 'john@example.com',
})
const message = ref('Hello')
</script>

<template>
  <div class="space-y-6">
    <!-- 遍歷數組 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-3">遍歷數組</h4>
      <div class="bg-gray-900 p-3 rounded border border-gray-700">
        <p class="text-gray-300 text-sm mb-2">水果列表：</p>
        <ul class="space-y-1">
          <li
            v-for="(fruit, index) in fruits"
            :key="index"
            class="text-gray-200 text-sm"
          >
            {{ index + 1 }}. {{ fruit }}
          </li>
        </ul>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        v-for="(fruit, index) in fruits" :key="index"
      </div>
    </div>

    <!-- 遍歷物件 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">遍歷物件</h4>
      <div class="bg-gray-900 p-3 rounded border border-gray-700">
        <p class="text-gray-300 text-sm mb-2">用戶資訊：</p>
        <ul class="space-y-1">
          <li
            v-for="(value, key) in user"
            :key="key"
            class="text-gray-200 text-sm"
          >
            <span class="text-green-400">{{ key }}</span>: {{ value }}
          </li>
        </ul>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        v-for="(value, key) in user" :key="key"
      </div>
    </div>

    <!-- 遍歷字串 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-purple-400 mb-3">遍歷字串</h4>
      <div class="bg-gray-900 p-3 rounded border border-gray-700">
        <p class="text-gray-300 text-sm mb-2">字符列表：</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(char, index) in message"
            :key="index"
            class="bg-purple-900/50 text-purple-200 px-2 py-1 rounded text-sm border border-purple-600"
          >
            Key：{{ index }}｜Word：{{ char }}
          </li>
        </ul>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        v-for="(char, index) in message" :key="index"
      </div>
    </div>

    <!-- 遍歷數字 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-yellow-400 mb-3">遍歷數字</h4>
      <div class="bg-gray-900 p-3 rounded border border-gray-700">
        <p class="text-gray-300 text-sm mb-2">數字序列：</p>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="n in 10"
            :key="n"
            class="bg-yellow-900/50 text-yellow-200 px-3 py-1 rounded text-sm border border-yellow-600 font-mono"
          >
            {{ n }}
          </li>
        </ul>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        v-for="n in 10" :key="n"
      </div>
    </div>

    <!-- 說明 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-2">💡 重點說明</h4>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>數組：</strong> 最常用的數據源，獲取項目和索引</li>
        <li>• <strong>對象：</strong> 遍歷屬性，獲取值和鍵名</li>
        <li>• <strong>字符串：</strong> 遍歷每個字符，獲取字符和位置</li>
        <li>• <strong>數字：</strong> 生成 1 到 n 的序列，常用於重複元素</li>
      </ul>
    </div>
  </div>
</template>