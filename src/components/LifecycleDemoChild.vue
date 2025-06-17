<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const props = defineProps<{
  onLog: (stage: string, description: string) => void
}>()

const childCount = ref(0)

// 追蹤更新階段是否已記錄，防止重複記錄
const hasLoggedUpdate = ref(false)

// 子組件的生命週期
onBeforeMount(() => {
  props.onLog('onBeforeMount', '演示子組件｜掛載前 - DOM 尚未創建，做最後準備工作')
})

onMounted(() => {
  props.onLog('onMounted', '演示子組件｜掛載完成 - DOM 已創建完成，可以安全操作 DOM')

  // 為了演示更新階段，自動觸發一次更新
  setTimeout(() => {
    childCount.value = 1
  }, 200)
})

onBeforeUpdate(() => {
  props.onLog('onBeforeUpdate', '演示子組件｜更新前 - 數據改變，準備更新 DOM')
  hasLoggedUpdate.value = true
})

onUpdated(() => {
  if (hasLoggedUpdate.value) {
    props.onLog('onUpdated', '演示子組件｜更新完成 - DOM 已更新完成')
    hasLoggedUpdate.value = false // 重置標記，讓下次更新可以正常記錄
  }
})

onBeforeUnmount(() => {
  props.onLog('onBeforeUnmount', '演示子組件｜卸載前 - 準備清理工作')
})

onUnmounted(() => {
  props.onLog('onUnmounted', '演示子組件｜卸載完成 - 清除計時器、移除監聽器')
})

const updateChildCount = () => {
  childCount.value++
}

// 子組件創建時記錄
props.onLog('setup', '演示子組件｜組件創建階段 - 初始化響應式數據、設置計算屬性')
</script>

<template>
  <div class="p-4 bg-gradient-to-r from-purple-800 to-pink-800 border border-purple-500 rounded-lg">
    <h4 class="text-lg font-bold text-white mb-4">📦 演示子組件</h4>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-3 bg-gray-900 rounded">
        <h5 class="text-sm font-semibold text-purple-300 mb-2">子組件狀態</h5>
        <div class="space-y-1">
          <div class="text-xs text-gray-300">
            子組件計數：<span class="text-white">{{ childCount }}</span>
          </div>
          <div class="text-xs text-gray-300">
            狀態：<span class="text-green-400">運行中</span>
          </div>
        </div>
      </div>

      <div class="p-3 bg-gray-900 rounded">
        <h5 class="text-sm font-semibold text-purple-300 mb-2">子組件操作</h5>
        <button
          @click="updateChildCount"
          class="w-full px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          更新子組件數據
        </button>
      </div>
    </div>

    <div class="mt-3 p-2 bg-purple-900 rounded border border-purple-600">
      <p class="text-xs text-purple-200">
        💡 這個子組件會經歷完整的生命週期，包括創建、掛載、更新和卸載階段
      </p>
    </div>
  </div>
</template>