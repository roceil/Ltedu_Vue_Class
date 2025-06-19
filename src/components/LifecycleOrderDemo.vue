<script lang="ts" setup>
import { ref } from 'vue'
import LifecycleDemoChild from './LifecycleDemoChild.vue'

const count = ref(0)
const message = ref('初始訊息')
const lifecycleLogs = ref<string[]>([])
const showDemoComponent = ref(true)
const logCounter = ref(0) // 日誌序號計數器

// 添加日誌記錄函數
const addLog = (stage: string, description: string) => {
  logCounter.value++
  const timestamp = new Date().toLocaleTimeString()
  const logMessage = `[${timestamp}] ${logCounter.value}. ${stage}: ${description}`
  lifecycleLogs.value.unshift(logMessage) // 使用 unshift 讓新日誌顯示在最上面
  console.log(logMessage)
}

// 主組件不再記錄自己的生命週期，只作為控制器



const toggleComponent = () => {
  showDemoComponent.value = !showDemoComponent.value
}

const clearLogs = () => {
  lifecycleLogs.value.splice(0)
  logCounter.value = 0 // 重置序號計數器
  console.clear()
}

// 獲取日誌樣式類別的函數
const getLogStyle = (log: string) => {
  if (log.includes('setup')) {
    return 'bg-purple-900 text-purple-300 border-l-4 border-purple-500'
  }

  if (log.includes('onBeforeMount')) {
    return 'bg-blue-900 text-blue-300 border-l-4 border-blue-500'
  }

  if (log.includes('onMounted') && !log.includes('onBeforeMount')) {
    return 'bg-green-900 text-green-300 border-l-4 border-green-500'
  }

  if (log.includes('onBeforeUpdate')) {
    return 'bg-yellow-900 text-yellow-300 border-l-4 border-yellow-500'
  }

  if (log.includes('onUpdated') && !log.includes('onBeforeUpdate')) {
    return 'bg-orange-900 text-orange-300 border-l-4 border-orange-500'
  }

  if (log.includes('onBeforeUnmount')) {
    return 'bg-red-900 text-red-300 border-l-4 border-red-500'
  }

  if (log.includes('onUnmounted') && !log.includes('onBeforeUnmount')) {
    return 'bg-gray-700 text-gray-300 border-l-4 border-gray-500'
  }

  return 'bg-gray-800 text-gray-300 border-l-4 border-gray-600'
}
</script>

<template>
  <div class="p-6 bg-gray-800 border border-gray-600 rounded-lg">
    <h3 class="text-xl font-bold text-white mb-6">生命週期執行順序演示</h3>

    <!-- 當前狀態顯示 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="p-4 bg-gray-700 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-400 mb-3">當前狀態</h4>
        <div class="space-y-2">
          <div class="p-2 bg-gray-600 rounded">
            <span class="text-gray-300 text-sm">訊息：</span>
            <span class="text-white">{{ message }}</span>
          </div>
          <div class="p-2 bg-gray-600 rounded">
            <span class="text-gray-300 text-sm">計數：</span>
            <span class="text-white">{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="p-4 bg-gray-700 rounded-lg">
        <h4 class="text-lg font-semibold text-green-400 mb-3">生命週期控制</h4>
        <div class="space-y-2">
          <button
            @click="toggleComponent"
            class="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            {{ showDemoComponent ? '銷毀組件 (觸發卸載階段)' : '創建組件 (觸發創建階段)' }}
          </button>
          <button
            @click="clearLogs"
            class="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            清除日誌
          </button>
        </div>
      </div>
    </div>

    <!-- 組件演示區域 -->
    <div
      class="mb-6"
      v-if="showDemoComponent"
    >
      <h4 class="text-lg font-semibold text-purple-400 mb-3">🧩 組件生命週期演示</h4>
      <LifecycleDemoChild :onLog="addLog" />
    </div>
    <div
      class="mb-6"
      v-else
    >
      <div class="p-4 bg-gray-700 border border-gray-500 rounded-lg text-center">
        <h4 class="text-lg font-semibold text-gray-400 mb-2">🔄 組件已銷毀</h4>
        <p class="text-sm text-gray-500">點擊「創建組件」按鈕重新創建並觀察完整生命週期</p>
      </div>
    </div>

    <!-- 生命週期日誌 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-orange-400 mb-3">生命週期執行日誌</h4>
      <div class="h-64 overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
        <div
          v-if="lifecycleLogs.length === 0"
          class="text-gray-500 text-center"
        >
          暫無執行記錄
        </div>
        <div
          v-for="(log, index) in lifecycleLogs"
          :key="index"
          class="mb-2 p-2 text-sm font-mono rounded"
          :class="getLogStyle(log)"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 說明區域 -->
    <div class="p-4 bg-indigo-900 border border-indigo-600 rounded-lg">
      <h4 class="font-bold text-indigo-300 mb-2">📝 觀察要點：</h4>
      <ul class="text-sm text-indigo-200 space-y-1">
        <li>• <strong>創建階段：</strong> setup → onBeforeMount → onMounted 依序執行</li>
        <li>• <strong>更新階段：</strong> 組件會自動觸發一次更新來演示 onBeforeUpdate → onUpdated</li>
        <li>• <strong>卸載階段：</strong> 點擊「銷毀組件」觀察 onBeforeUnmount → onUnmounted</li>
        <li>• <strong>完整流程：</strong> 創建/銷毀組件來查看完整的 7 個生命週期階段</li>
        <li>• <strong>控制台：</strong> 打開開發者工具查看完整的生命週期執行流程</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>