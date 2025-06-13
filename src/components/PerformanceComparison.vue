<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'

const showVIfContent = ref(false)
const showVShowContent = ref(false)
const toggleCount = ref(0)

// V-if 組件的狀態（每次創建都重置）
const vIfResult = ref('')
const vIfComputing = ref(false)
const vIfComputeCount = ref(0)
const vIfStartTime = ref(0)
const vIfEndTime = ref(0)

// V-show 組件的狀態（始終保持）
const vShowResult = ref('')
const vShowComputing = ref(false)
const vShowComputeCount = ref(0)
const vShowStartTime = ref(0)
const vShowEndTime = ref(0)

// V-if 組件的計算函數
const executeVIfComputation = async () => {
  if (vIfComputing.value) return

  vIfComputing.value = true
  vIfStartTime.value = performance.now()
  vIfComputeCount.value++
  console.log(`🔵 V-if 組件計算第 ${vIfComputeCount.value} 次`)

  setTimeout(() => {
    let result = 0
    for (let i = 0; i < 50000000; i++) {
      result += Math.random()
    }

    vIfEndTime.value = performance.now()
    const computeTime = (vIfEndTime.value - vIfStartTime.value).toFixed(2)
    console.log(`🔵 V-if 計算完成，耗時: ${computeTime}ms`)

    vIfResult.value = result.toFixed(2)
    vIfComputing.value = false
  }, 0)
}

// V-show 組件的計算函數
const executeVShowComputation = async () => {
  if (vShowComputing.value || vShowResult.value) return

  vShowComputing.value = true
  vShowStartTime.value = performance.now()
  vShowComputeCount.value++
  console.log(`🟢 V-show 組件計算第 ${vShowComputeCount.value} 次`)

  setTimeout(() => {
    let result = 0
    for (let i = 0; i < 50000000; i++) {
      result += Math.random()
    }

    vShowEndTime.value = performance.now()
    const computeTime = (vShowEndTime.value - vShowStartTime.value).toFixed(2)
    console.log(`🟢 V-show 計算完成，耗時: ${computeTime}ms`)

    vShowResult.value = result.toFixed(2)
    vShowComputing.value = false
  }, 0)
}

// 監聽 V-if 組件顯示狀態
watch(showVIfContent, (newVal) => {
  if (newVal) {
    // V-if 組件顯示時，重置狀態並重新計算
    vIfResult.value = ''
    vIfComputing.value = false
    vIfComputeCount.value = 0
    console.log('🔵 V-if 組件顯示，重置狀態並開始計算')
    executeVIfComputation()
  }
})

// 監聽 V-show 組件顯示狀態
watch(showVShowContent, (newVal) => {
  if (newVal && !vShowResult.value) {
    console.log('🟢 V-show 組件顯示，開始計算')
    executeVShowComputation()
  }
})

const toggle = async () => {
  const startTime = performance.now()
  toggleCount.value++
  console.log(`\n=== 第 ${toggleCount.value} 次切換開始 ===`)

  if (showVIfContent.value && showVShowContent.value) {
    showVIfContent.value = false
    showVShowContent.value = false
    console.log('🔄 隱藏所有組件')
  } else {
    showVIfContent.value = true
    showVShowContent.value = true
    console.log('🔄 開始顯示組件')
  }

  setTimeout(() => {
    const endTime = performance.now()
    const toggleTime = (endTime - startTime).toFixed(2)
    console.log(`切換操作耗時: ${toggleTime}ms`)
  }, 0)
}

const resetDemo = () => {
  showVIfContent.value = false
  showVShowContent.value = false
  toggleCount.value = 0
  vIfResult.value = ''
  vIfComputing.value = false
  vIfComputeCount.value = 0
  vShowResult.value = ''
  vShowComputing.value = false
  vShowComputeCount.value = 0
  console.clear()
  console.log('🔄 演示已重置')
}

const vIfComputeTime = computed(() => {
  if (vIfStartTime.value && vIfEndTime.value) {
    return (vIfEndTime.value - vIfStartTime.value).toFixed(2)
  }
  return '0'
})

const vShowComputeTime = computed(() => {
  if (vShowStartTime.value && vShowEndTime.value) {
    return (vShowEndTime.value - vShowStartTime.value).toFixed(2)
  }
  return '0'
})

onMounted(() => {
  console.log('🚀 性能比較組件已掛載')
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">性能比較測試</h2>

    <div class="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-lg">
      <div class="flex flex-wrap items-center gap-4">
        <button
          @click="toggle"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          切換顯示 ({{ (showVIfContent || showVShowContent) ? '隱藏' : '顯示' }})
        </button>

        <button
          @click="resetDemo"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          重置演示
        </button>

        <span class="text-sm text-gray-300">切換次數: {{ toggleCount }}</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- V-if 組件 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-blue-400">🔵 V-if 組件（重新創建）</h3>
        <div
          v-if="showVIfContent"
          class="p-6 border-2 border-blue-500 rounded-lg bg-blue-900 max-h-80 overflow-y-auto relative"
        >
          <div
            v-if="vIfComputing"
            class="absolute inset-0 bg-blue-800 bg-opacity-75 flex items-center justify-center rounded-lg"
          >
            <div class="text-blue-300 font-semibold flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
              計算中...
            </div>
          </div>
          <h4 class="text-lg font-semibold text-blue-300 mb-4">V-if 組件</h4>
          <p class="mb-4 text-blue-200">
            複雜計算結果:
            <span
              v-if="vIfComputing"
              class="italic"
            >計算中...</span>
            <span v-else>{{ vIfResult }}</span>
          </p>
          <div class="text-xs text-blue-400 mb-2">
            本實例計算次數: {{ vIfComputeCount }} | 耗時: {{ vIfComputeTime }}ms
          </div>
          <ul class="grid grid-cols-5 gap-1 text-xs">
            <li
              v-for="i in 50"
              :key="i"
              class="p-1 bg-blue-800 text-blue-200 rounded text-center"
            >
              {{ i }}
            </li>
          </ul>
        </div>
        <div
          v-else
          class="p-6 border-2 border-dashed border-blue-500 rounded-lg text-center text-blue-400"
        >
          組件已銷毀 - 下次顯示會重新創建
        </div>
      </div>

      <!-- V-show 組件 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-green-400">🟢 V-show 組件（保持存在）</h3>
        <div
          v-show="showVShowContent"
          class="p-6 border-2 border-green-500 rounded-lg bg-green-900 max-h-80 overflow-y-auto relative"
        >
          <div
            v-show="vShowComputing"
            class="absolute inset-0 bg-green-800 bg-opacity-75 flex items-center justify-center rounded-lg"
          >
            <div class="text-green-300 font-semibold flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-green-300 border-t-transparent rounded-full animate-spin"></div>
              計算中...
            </div>
          </div>
          <h4 class="text-lg font-semibold text-green-300 mb-4">V-show 組件</h4>
          <p class="mb-4 text-green-200">
            複雜計算結果:
            <span
              v-show="vShowComputing && !vShowResult"
              class="italic"
            >計算中...</span>
            <span v-show="!vShowComputing || vShowResult">{{ vShowResult }}</span>
          </p>
          <div class="text-xs text-green-400 mb-2">
            本實例計算次數: {{ vShowComputeCount }} | 耗時: {{ vShowComputeTime }}ms
          </div>
          <ul class="grid grid-cols-5 gap-1 text-xs">
            <li
              v-for="i in 50"
              :key="i"
              class="p-1 bg-green-800 text-green-200 rounded text-center"
            >
              {{ i }}
            </li>
          </ul>
        </div>
        <div
          v-show="!showVShowContent"
          class="p-6 border-2 border-dashed border-green-500 rounded-lg text-center text-green-400"
        >
          組件已隱藏但仍存在於 DOM - 計算結果被保留
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-amber-900 border-l-4 border-amber-500 rounded">
      <h4 class="font-bold text-amber-300 mb-2">🎯 觀察重點：</h4>
      <ul class="text-sm text-amber-200 space-y-1">
        <li>• 打開開發者工具的 Console 查看詳細計算日誌</li>
        <li>• <strong>第一次切換</strong>：兩個組件都會計算，但會獨立顯示，不互相阻塞</li>
        <li>• <strong>第二次切換</strong>：V-if 重新計算，V-show 立即顯示（復用結果）</li>
        <li>• 注意觀察哪個組件先完成計算並顯示內容</li>
        <li>• V-show 在第二次以後切換會瞬間顯示（幾乎沒有延遲）</li>
        <li>• V-if 每次都需要重新計算，所以每次都有延遲</li>
      </ul>
    </div>
  </div>
</template>