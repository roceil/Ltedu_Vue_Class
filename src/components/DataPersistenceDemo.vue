<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

// 用戶偏好設定
const userPreferences = ref({
  theme: 'light',
  language: 'zh-TW',
  fontSize: 16,
  autoSave: true,
  notifications: {
    email: true,
    push: false,
    sms: false
  }
})

// 統計資料
const statistics = ref({
  lastSaved: '',
  saveCount: 0,
  totalChanges: 0
})

// 日誌
const saveLog = ref<string[]>([])

// 從 localStorage 載入數據
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      const parsedData = JSON.parse(saved)
      userPreferences.value = { ...userPreferences.value, ...parsedData }
      addLog('✅ 從本地存儲載入用戶偏好')
    }

    const savedStats = localStorage.getItem('preferencesStats')
    if (savedStats) {
      statistics.value = { ...statistics.value, ...JSON.parse(savedStats) }
    }
  } catch (error) {
    console.error('載入數據失敗:', error)
    addLog('❌ 載入數據失敗')
  }
}

// 保存到 localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences.value))

    const now = new Date().toLocaleString('zh-TW')
    statistics.value.lastSaved = now
    statistics.value.saveCount += 1

    localStorage.setItem('preferencesStats', JSON.stringify(statistics.value))
    addLog(`💾 自動保存完成 (${now})`)
  } catch (error) {
    console.error('保存失敗:', error)
    addLog('❌ 保存失敗')
  }
}

// 添加日誌
const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  saveLog.value.unshift(`[${timestamp}] ${message}`)
  if (saveLog.value.length > 50) {
    saveLog.value = saveLog.value.slice(0, 50)
  }
}

// 監聽偏好設定變化
watch(userPreferences, (newPreferences, oldPreferences) => {
  if (!oldPreferences) return // 忽略初始化

  statistics.value.totalChanges += 1

  if (newPreferences.autoSave) {
    saveToStorage()
  } else {
    addLog('⚠️ 設定已修改，自動保存已停用')
  }
}, { deep: true })

// 監聽 theme 變化
watch(() => userPreferences.value.theme, (newTheme, oldTheme) => {
  if (oldTheme) {
    addLog(`🎨 主題從 "${oldTheme}" 變更為 "${newTheme}"`)
  }
})

// 監聽 language 變化  
watch(() => userPreferences.value.language, (newLang, oldLang) => {
  if (oldLang) {
    addLog(`🌐 語言從 "${oldLang}" 變更為 "${newLang}"`)
  }
})

// 監聽字體大小變化
watch(() => userPreferences.value.fontSize, (newSize, oldSize) => {
  if (oldSize) {
    addLog(`📏 字體大小從 ${oldSize}px 變更為 ${newSize}px`)
  }
})

// 手動保存
const manualSave = () => {
  saveToStorage()
  addLog('👆 手動保存觸發')
}

// 重置設定
const resetPreferences = () => {
  userPreferences.value = {
    theme: 'light',
    language: 'zh-TW',
    fontSize: 16,
    autoSave: true,
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  }
  addLog('🔄 偏好設定已重置')
}

// 清除存儲
const clearStorage = () => {
  localStorage.removeItem('userPreferences')
  localStorage.removeItem('preferencesStats')
  statistics.value = {
    lastSaved: '',
    saveCount: 0,
    totalChanges: 0
  }
  addLog('🗑️ 本地存儲已清除')
}

// 匯出設定
const exportSettings = () => {
  const data = {
    preferences: userPreferences.value,
    statistics: statistics.value,
    exportTime: new Date().toISOString()
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'user-preferences.json'
  a.click()

  addLog('📤 設定已匯出')
}

// 匯入設定
const importSettings = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      if (data.preferences) {
        userPreferences.value = data.preferences
        addLog('📥 設定匯入成功')
      }
    } catch (error) {
      console.error('匯入失敗:', error)
      addLog('❌ 匯入失敗，文件格式錯誤')
    }
  }
  reader.readAsText(file)
}

const clearLogs = () => {
  saveLog.value = []
}

// 組件掛載時載入數據
onMounted(() => {
  loadFromStorage()
})
</script>

<template>
  <div class="space-y-6">
    <!-- 用戶偏好設定 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-4">用戶偏好設定</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 基本設定 -->
        <div class="space-y-4">
          <h5 class="text-sm font-semibold text-gray-300">基本設定</h5>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">主題</label>
            <select
              v-model="userPreferences.theme"
              class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">亮色主題</option>
              <option value="dark">暗色主題</option>
              <option value="auto">跟隨系統</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">語言</label>
            <select
              v-model="userPreferences.language"
              class="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="zh-CN">簡體中文</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">
              字體大小: {{ userPreferences.fontSize }}px
            </label>
            <input
              type="range"
              v-model.number="userPreferences.fontSize"
              min="12"
              max="24"
              step="1"
              class="w-full"
            />
          </div>
        </div>

        <!-- 進階設定 -->
        <div class="space-y-4">
          <h5 class="text-sm font-semibold text-gray-300">進階設定</h5>

          <div>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="userPreferences.autoSave"
                class="rounded focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-300">自動保存</span>
            </label>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-300">通知設定</div>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="userPreferences.notifications.email"
                class="rounded focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-300">郵件通知</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="userPreferences.notifications.push"
                class="rounded focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-300">推送通知</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="userPreferences.notifications.sms"
                class="rounded focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-300">簡訊通知</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 統計資訊 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">統計資訊</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-3 bg-gray-900 rounded border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">最後保存時間</div>
          <div class="text-sm font-mono text-gray-300">
            {{ statistics.lastSaved || '尚未保存' }}
          </div>
        </div>
        <div class="p-3 bg-gray-900 rounded border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">保存次數</div>
          <div class="text-lg font-bold text-green-400">{{ statistics.saveCount }}</div>
        </div>
        <div class="p-3 bg-gray-900 rounded border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">總變更次數</div>
          <div class="text-lg font-bold text-blue-400">{{ statistics.totalChanges }}</div>
        </div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div class="flex flex-wrap gap-2">
      <button
        @click="manualSave"
        class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
      >
        手動保存
      </button>
      <button
        @click="resetPreferences"
        class="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
      >
        重置設定
      </button>
      <button
        @click="clearStorage"
        class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
      >
        清除存儲
      </button>
      <button
        @click="exportSettings"
        class="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
      >
        匯出設定
      </button>
      <label
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm cursor-pointer">
        匯入設定
        <input
          type="file"
          @change="importSettings"
          accept=".json"
          class="hidden"
        />
      </label>
      <button
        @click="clearLogs"
        class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
      >
        清除日誌
      </button>
    </div>

    <!-- 監聽日誌 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-purple-400 mb-3">監聽與保存日誌</h4>
      <div class="h-48 overflow-y-auto bg-gray-900 p-3 rounded border border-gray-700 text-sm font-mono">
        <div
          v-if="saveLog.length === 0"
          class="text-gray-500"
        >暫無操作日誌</div>
        <div
          v-for="(log, index) in saveLog"
          :key="index"
          class="mb-1 text-gray-300"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <!-- 實際應用說明 -->
    <div class="space-y-4">
      <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
        <h5 class="text-blue-300 font-semibold mb-2">💡 實際應用場景</h5>
        <ul class="text-sm text-blue-200 space-y-1">
          <li>• <strong>用戶偏好：</strong>主題、語言、字體等個人化設定</li>
          <li>• <strong>表單草稿：</strong>防止用戶意外關閉頁面丟失數據</li>
          <li>• <strong>購物車：</strong>臨時保存用戶選購的商品</li>
          <li>• <strong>閱讀進度：</strong>記錄用戶在文章或課程中的位置</li>
        </ul>
      </div>

      <div class="p-4 bg-green-900/30 border border-green-600 rounded-lg">
        <h5 class="text-green-300 font-semibold mb-2">⚡ Watch 監聽特點</h5>
        <ul class="text-sm text-green-200 space-y-1">
          <li>• <strong>深層監聽：</strong>使用 deep: true 監聽物件內部變化</li>
          <li>• <strong>自動保存：</strong>數據變化時立即觸發保存邏輯</li>
          <li>• <strong>選擇性監聽：</strong>可以選擇監聽特定屬性變化</li>
          <li>• <strong>防抖優化：</strong>避免頻繁觸發保存操作</li>
        </ul>
      </div>

      <div class="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
        <h5 class="text-yellow-300 font-semibold mb-2">🔧 技術實現</h5>
        <ul class="text-sm text-yellow-200 space-y-1">
          <li>• 使用 <code class="bg-yellow-100/20 px-1 rounded">localStorage</code> 實現本地數據持久化</li>
          <li>• 結合 <code class="bg-yellow-100/20 px-1 rounded">watch</code> 監聽器自動保存變化</li>
          <li>• 提供匯入/匯出功能便於數據遷移</li>
          <li>• 實現統計功能追蹤使用情況</li>
        </ul>
      </div>
    </div>
  </div>
</template>