<script lang="ts" setup>
import { ref, watch } from 'vue'

// 用戶資料物件
const user = ref({
  profile: {
    name: 'Frank',
    age: 25,
    contact: {
      email: 'frank@example.com',
      phone: '0912345678'
    }
  },
  preferences: {
    theme: 'light',
    language: 'zh-TW'
  }
})

// 監聽日誌
const shallowLog = ref<string[]>([])
const deepLog = ref<string[]>([])
const specificLog = ref<string[]>([])

// 淺層監聽（只監聽根級別的變化）
watch(user, (newUser, oldUser) => {
  const message = `淺層監聽觸發 - 整個 user 物件被替換`
  shallowLog.value.unshift(message)
  console.log(message, { newUser, oldUser })
}, { deep: false })

// 深層監聽（監聽所有層級的變化）
watch(user, (newUser, oldUser) => {
  const message = `深層監聽觸發 - 物件內部有變化`
  deepLog.value.unshift(message)
  console.log(message, { newUser, oldUser })
}, { deep: true })

// 監聽特定屬性
watch(() => user.value.profile.name, (newName, oldName) => {
  const message = `姓名從 "${oldName}" 變為 "${newName}"`
  specificLog.value.unshift(message)
  console.log(message)
})

watch(() => user.value.profile.contact.email, (newEmail, oldEmail) => {
  const message = `郵箱從 "${oldEmail}" 變為 "${newEmail}"`
  specificLog.value.unshift(message)
  console.log(message)
})

// 操作方法
const updateName = () => {
  user.value.profile.name = user.value.profile.name === 'Frank' ? 'John' : 'Frank'
}

const updateEmail = () => {
  const emails = ['frank@example.com', 'john@example.com', 'admin@example.com']
  const currentIndex = emails.indexOf(user.value.profile.contact.email)
  user.value.profile.contact.email = emails[(currentIndex + 1) % emails.length]
}

const updateAge = () => {
  user.value.profile.age += 1
}

const replaceUser = () => {
  user.value = {
    profile: {
      name: 'Alice',
      age: 30,
      contact: {
        email: 'alice@example.com',
        phone: '0987654321'
      }
    },
    preferences: {
      theme: 'dark',
      language: 'en-US'
    }
  }
}

const clearLogs = () => {
  shallowLog.value = []
  deepLog.value = []
  specificLog.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- 當前數據顯示 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-white mb-3">當前用戶資料</h4>
      <div class="bg-gray-900 p-3 rounded border border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="space-y-1">
            <div class="text-gray-300"><span class="text-blue-400">姓名：</span>{{ user.profile.name }}</div>
            <div class="text-gray-300"><span class="text-blue-400">年齡：</span>{{ user.profile.age }}</div>
            <div class="text-gray-300"><span class="text-blue-400">郵箱：</span>{{ user.profile.contact.email }}</div>
            <div class="text-gray-300"><span class="text-blue-400">電話：</span>{{ user.profile.contact.phone }}</div>
          </div>
          <div class="space-y-1">
            <div class="text-gray-300"><span class="text-green-400">主題：</span>{{ user.preferences.theme }}</div>
            <div class="text-gray-300"><span class="text-green-400">語言：</span>{{ user.preferences.language }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div class="flex flex-wrap gap-2">
      <button
        @click="updateName"
        class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
      >
        修改姓名
      </button>
      <button
        @click="updateEmail"
        class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
      >
        修改郵箱
      </button>
      <button
        @click="updateAge"
        class="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm"
      >
        年齡 +1
      </button>
      <button
        @click="replaceUser"
        class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
      >
        替換整個物件
      </button>
      <button
        @click="clearLogs"
        class="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
      >
        清除日誌
      </button>
    </div>

    <!-- 監聽結果對比 -->
    <div class="space-y-4">
      <!-- 淺層監聽 -->
      <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h4 class="text-lg font-semibold text-orange-400 mb-3">淺層監聽 (deep: false)</h4>
        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">觸發日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="shallowLog.length === 0"
              class="text-gray-500"
            >暫無觸發</div>
            <div
              v-for="(log, index) in shallowLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
          <div class="mt-2 p-2 bg-orange-900/30 border border-orange-600 rounded text-xs text-orange-300">
            <strong>說明：</strong>只有當整個物件被替換時才會觸發
          </div>
        </div>
        <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch(user, (newUser, oldUser) => { ... }, { deep: false })
        </div>
      </div>

      <!-- 深層監聽 -->
      <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h4 class="text-lg font-semibold text-purple-400 mb-3">深層監聽 (deep: true)</h4>
        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">觸發日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="deepLog.length === 0"
              class="text-gray-500"
            >暫無觸發</div>
            <div
              v-for="(log, index) in deepLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
          <div class="mt-2 p-2 bg-purple-900/30 border border-purple-600 rounded text-xs text-purple-300">
            <strong>說明：</strong>物件內部任何層級的變化都會觸發
          </div>
        </div>
        <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch(user, (newUser, oldUser) => { ... }, { deep: true })
        </div>
      </div>

      <!-- 特定屬性監聽 -->
      <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h4 class="text-lg font-semibold text-green-400 mb-3">特定屬性監聽（Name、Email）</h4>
        <div class="text-sm">
          <div class="font-medium text-gray-300 mb-2">觸發日誌：</div>
          <div class="h-20 overflow-y-auto bg-gray-900 p-2 rounded border border-gray-700 text-xs font-mono">
            <div
              v-if="specificLog.length === 0"
              class="text-gray-500"
            >暫無觸發</div>
            <div
              v-for="(log, index) in specificLog"
              :key="index"
              class="mb-1 text-gray-300"
            >
              {{ log }}
            </div>
          </div>
          <div class="mt-2 p-2 bg-green-900/30 border border-green-600 rounded text-xs text-green-300">
            <strong>說明：</strong>使用 getter 函數監聽特定屬性
          </div>
        </div>
        <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch(() => user.value.profile.name, (newName, oldName) => { ... })
        </div>
        <div class="mt-3 p-2 bg-gray-700 rounded text-xs text-gray-400 font-mono">
          watch(() => user.value.profile.contact.email, (newEmail, oldEmail) => { ... })
        </div>
      </div>
    </div>

    <!-- 性能提示 -->
    <div class="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
      <h5 class="text-yellow-300 font-semibold mb-2">⚡ 性能提示</h5>
      <ul class="text-sm text-yellow-200 space-y-1">
        <li>• <strong>深層監聽</strong>會遍歷所有嵌套屬性，性能開銷較大</li>
        <li>• <strong>特定屬性監聽</strong>只監聽需要的屬性，性能更好</li>
        <li>• <strong>淺層監聽</strong>性能最佳，但只能檢測引用變化</li>
      </ul>
    </div>
  </div>
</template>