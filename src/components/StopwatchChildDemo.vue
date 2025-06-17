<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  onLog: (message: string) => void
}>()

const seconds = ref(0)
const timer = ref<number | null>(null)

// 掛載時開始計時
onMounted(() => {
  props.onLog('onMounted: 組件掛載完成 - 自動開始計時器')
  startTimer()
})

// 卸載時停止計時
onUnmounted(() => {
  props.onLog('onUnmounted: 組件卸載完成 - 自動停止計時器並清理資源')
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})

const startTimer = () => {
  props.onLog('計時器啟動 - 每秒更新一次')
  timer.value = setInterval(() => {
    seconds.value++
  }, 1000)
}

// 格式化時間顯示
const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 記錄組件創建
props.onLog('setup: 計時器組件創建 - 初始化響應式數據')
</script>

<template>
  <div class="p-4 bg-gradient-to-r from-blue-800 to-indigo-800 border border-blue-500 rounded-lg">
    <h4 class="text-lg font-bold text-white mb-4">⏱️ 計時器組件</h4>

    <!-- 計時器顯示 -->
    <div class="p-6 bg-gray-900 rounded-lg text-center">
      <div class="text-3xl font-mono text-blue-300 mb-2">
        {{ formatTime(seconds) }}
      </div>
      <div class="text-sm text-blue-200 mb-3">
        已運行 {{ seconds }} 秒
      </div>
      <div class="flex items-center justify-center">
        <div class="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span class="text-sm text-green-300">計時器運行中</span>
      </div>
    </div>

    <div class="mt-4 p-3 bg-blue-900 rounded border border-blue-600">
      <p class="text-xs text-blue-200">
        💡 這個計時器會在組件掛載時自動開始，在卸載時自動停止並清理資源
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>