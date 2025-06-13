<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue'

const showVIf = ref(false)
const showVShow = ref(false)
const vIfMountCount = ref(0)
const vShowMountCount = ref(0)

// V-if 子組件
const VIfChild = defineComponent({
  setup() {
    onMounted(() => {
      vIfMountCount.value++
      console.log(`V-if 子組件掛載，次數: ${vIfMountCount.value}`)
    })

    onUnmounted(() => {
      console.log('V-if 子組件卸載')
    })

    return () => h('div', {
      class: 'p-4 border border-blue-500 rounded-lg bg-blue-900'
    }, [
      h('h4', { class: 'text-lg font-semibold text-blue-300 mb-2' }, 'V-if 子組件'),
      h('p', { class: 'text-blue-200 mb-2' }, `掛載次數: ${vIfMountCount.value}`),
      h('p', { class: 'text-sm text-blue-400' }, '每次條件為 true 時都會重新掛載')
    ])
  }
})

// V-show 子組件
const VShowChild = defineComponent({
  setup() {
    onMounted(() => {
      vShowMountCount.value++
      console.log(`V-show 子組件掛載，次數: ${vShowMountCount.value}`)
    })

    onUnmounted(() => {
      console.log('V-show 子組件卸載')
    })

    return () => h('div', {
      class: 'p-4 border border-green-500 rounded-lg bg-green-900'
    }, [
      h('h4', { class: 'text-lg font-semibold text-green-300 mb-2' }, 'V-show 子組件'),
      h('p', { class: 'text-green-200 mb-2' }, `掛載次數: ${vShowMountCount.value}`),
      h('p', { class: 'text-sm text-green-400' }, '只會掛載一次，之後只是隱藏/顯示')
    ])
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">生命週期差異測試</h2>

    <div class="mb-6 flex flex-wrap gap-4">
      <button
        @click="showVIf = !showVIf"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        切換 V-if ({{ showVIf ? '隱藏' : '顯示' }})
      </button>
      <button
        @click="showVShow = !showVShow"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        切換 V-show ({{ showVShow ? '隱藏' : '顯示' }})
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- v-if: 每次切換都會創建/銷毀組件 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-blue-400">V-if 組件（重新創建）</h3>
        <VIfChild v-if="showVIf" />
        <div
          v-if="!showVIf"
          class="p-4 border-2 border-dashed border-blue-500 rounded-lg text-center text-blue-400"
        >
          組件已銷毀
        </div>
      </div>

      <!-- v-show: 組件只創建一次，之後只是隱藏/顯示 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-green-400">V-show 組件（保持存在）</h3>
        <VShowChild v-show="showVShow" />
        <div
          v-if="!showVShow"
          class="p-4 border-2 border-dashed border-green-500 rounded-lg text-center text-green-400"
        >
          組件已隱藏但仍存在於 DOM
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-purple-900 border-l-4 border-purple-500 rounded">
      <h4 class="font-bold text-purple-300 mb-2">生命週期觀察：</h4>
      <ul class="text-sm text-purple-200 space-y-1">
        <li>• 打開開發者工具的 Console 查看掛載/卸載訊息</li>
        <li>• V-if：每次切換都會觸發 onMounted 和 onUnmounted</li>
        <li>• V-show：只會在第一次顯示時觸發 onMounted</li>
        <li>• 如果組件有複雜的初始化邏輯，V-if 每次都會重新執行</li>
      </ul>
    </div>
  </div>
</template>