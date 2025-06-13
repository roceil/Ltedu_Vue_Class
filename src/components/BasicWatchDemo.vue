<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

// 單一數據源監聽
const count = ref(0)
const countLog = ref<string[]>([])

watch(count, (newVal, oldVal) => {
  const message = `count 從 ${oldVal} 變為 ${newVal}`
  countLog.value.unshift(message)
  console.log(message)
})

// 多個數據源監聽-watch
const firstName = ref('張')
const lastName = ref('三')
const multiLog = ref<string[]>([])

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  const message = `姓名從 ${oldFirst}${oldLast} 變為 ${newFirst}${newLast}`
  multiLog.value.unshift(message)
  console.log(message)
})

// 多個數據源監聽-watchEffect
const firstName2 = ref('張')
const lastName2 = ref('三')
const multiLog2 = ref<string[]>([])

watchEffect(() => {
  const message = `姓名從 ${firstName2.value}${lastName2.value} 變為 ${firstName2.value}${lastName2.value}`
  multiLog2.value.unshift(message)
  console.log(message)
})

// 監聽 getter 函數
const userDataForGetter = ref({
  firstName: '大',
  lastName: '中天'
})

const getterLog = ref<string[]>([])
watch(
  () => userDataForGetter.value.firstName,
  (newFirstName, oldFirstName) => {
    const message = `姓氏從 "${oldFirstName}" → "${newFirstName}"`
    getterLog.value.unshift(message)
    console.log(message)
  }
)

// 也可以監聽多個屬性（展示另一種寫法）
const getterLog2 = ref<string[]>([])

watch(
  [
    () => userDataForGetter.value.firstName,
    () => userDataForGetter.value.lastName
  ],
  ([newFirst, newLast], [oldFirst, oldLast]) => {
    if (newFirst !== oldFirst || newLast !== oldLast) {
      const message = `屬性變化：姓氏 "${oldFirst}" → "${newFirst}"，名字 "${oldLast}" → "${newLast}"`
      getterLog2.value.unshift(message)
      console.log(message)
    }
  }
)

// 重置日誌
const clearLogs = () => {
  countLog.value = []
  multiLog.value = []
  multiLog2.value = []
  getterLog.value = []
  getterLog2.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- 單一數據源監聽 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-3">單一數據源監聽</h4>
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <button
            @click="count--"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            -
          </button>
          <span class="text-xl font-mono bg-gray-900 text-white px-3 py-1 rounded border border-gray-700">{{ count
          }}</span>
          <button
            @click="count++"
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            +
          </button>
        </div>

        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">監聽日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="countLog.length === 0"
              class="text-gray-500"
            >暫無變化</div>
            <div
              v-for="(log, index) in countLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        watch(count, (newVal, oldVal) => { ... })
      </div>
    </div>

    <!-- 多個數據源監聽-watch -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">多個數據源監聽｜Watch</h4>
      <div class="space-y-3">
        <div class="space-y-2">
          <div>
            <label class="block text-sm font-medium text-gray-300">姓氏</label>
            <input
              v-model="firstName"
              class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="輸入姓氏"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">名字</label>
            <input
              v-model="lastName"
              class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="輸入名字"
            />
          </div>
        </div>

        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">監聽日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="multiLog.length === 0"
              class="text-gray-500"
            >暫無變化</div>
            <div
              v-for="(log, index) in multiLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => { ... })
      </div>
    </div>

    <!-- 多個數據源監聽-watchEffect -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">多個數據源監聽｜WatchEffect</h4>
      <div class="space-y-3">
        <div class="space-y-2">
          <div>
            <label class="block text-sm font-medium text-gray-300">姓氏</label>
            <input
              v-model="firstName2"
              class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="輸入姓氏"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300">名字</label>
            <input
              v-model="lastName2"
              class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="輸入名字"
            />
          </div>
        </div>

        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">監聽日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="multiLog2.length === 0"
              class="text-gray-500"
            >暫無變化</div>
            <div
              v-for="(log, index) in multiLog2"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
        watchEffect(() => { ... })
      </div>
    </div>

    <!-- Getter 函數監聽 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-purple-400 mb-3">Getter 函數監聽</h4>
      <div class="space-y-2">
        <div>
          <label class="block text-sm font-medium text-gray-300">姓氏</label>
          <input
            v-model="userDataForGetter.firstName"
            class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="輸入姓氏"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300">名字</label>
          <input
            v-model="userDataForGetter.lastName"
            class="w-full px-3 py-1 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="輸入名字"
          />
        </div>
      </div>
      <div class="space-y-3 mt-4">
        <div class="p-3 bg-gray-900 rounded border border-gray-700">
          <div class="text-sm text-gray-400 mb-1">計算屬性結果：</div>
          <div class="text-lg font-semibold text-purple-300">{{ userDataForGetter.firstName }}{{
            userDataForGetter.lastName }}</div>
        </div>

        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">監聽全名變化日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="getterLog2.length === 0"
              class="text-gray-500"
            >暫無變化</div>
            <div
              v-for="(log, index) in getterLog2"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>

        <div class="text-sm mt-3">
          <div class="font-medium text-gray-300 mb-2">監聽個別屬性<span class="text-red-500">（姓氏）</span>變化日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="getterLog.length === 0"
              class="text-gray-500"
            >暫無變化</div>
            <div
              v-for="(log, index) in getterLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 space-y-2">
        <div class="p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch(() => userDataForGetter.value.firstName , (newFirstName, oldFirstName) => { ... })
        </div>
        <div class="p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch([() => firstName, () => lastName], ([newFirst, newLast], [oldFirst, oldLast]) => { ... })
        </div>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <div class="flex justify-center">
      <button
        @click="clearLogs"
        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        清除所有日誌
      </button>
    </div>


    <!-- 說明文字 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h5 class="text-blue-300 font-semibold mb-2">💡 學習重點</h5>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>單一監聽：</strong> watch(ref, callback) - 最簡單的用法</li>
        <li>• <strong>多個監聽：</strong> watch([ref1, ref2], callback) - 同時監聽多個數據源</li>
        <li>• <strong>Getter 監聽：</strong> watch(() => expression, callback) - 監聽計算結果</li>
        <li>• <strong>新舊值：</strong> callback 函數會接收 newValue 和 oldValue 參數</li>
        <li>• <strong>WatchEffect：</strong> 元件掛載後自動執行一次，不需要手動調用，但無法獲取舊值</li>
      </ul>
    </div>
  </div>
</template>