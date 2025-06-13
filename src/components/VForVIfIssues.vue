<script lang="ts" setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: '張三', isActive: true, role: 'admin' },
  { id: 2, name: '李四', isActive: false, role: 'user' },
  { id: 3, name: '王五', isActive: true, role: 'user' },
  { id: 4, name: '趙六', isActive: false, role: 'admin' },
])

const showInactive = ref(false)

// ✅ 正確的做法 1：使用計算屬性過濾
const filteredUsers = computed(() => {
  if (showInactive.value) {
    return users.value
  }
  return users.value.filter(user => user.isActive)
})

// 使用 early return 模式的函數
const getUserStatusText = (user: any) => {
  if (!user) return '無效用戶'
  if (!user.isActive) return '非活躍'
  return '活躍'
}

const getUserRoleColor = (role: string) => {
  if (role === 'admin') return 'text-red-300 bg-red-800'
  if (role === 'user') return 'text-blue-300 bg-blue-800'
  return 'text-gray-300 bg-gray-600'
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">V-for 與 V-if 的使用問題</h2>

    <div class="mb-6">
      <label class="flex items-center gap-2 text-gray-200">
        <input
          type="checkbox"
          v-model="showInactive"
          class="text-blue-500"
        />
        <span class="font-medium">顯示非活躍用戶</span>
      </label>
    </div>

    <!-- ❌ 錯誤：不要在同一元素上使用 v-for 和 v-if -->
    <div class="mb-8 p-6 bg-red-900 border border-red-600 rounded-lg">
      <h4 class="text-lg font-semibold text-red-300 mb-4">❌ 錯誤做法（不要這樣做）</h4>
      <div class="p-4 bg-red-800 border border-red-500 rounded font-mono text-sm text-red-200 mb-4">
        &lt;!-- 這在 Vue 3 中會出錯，因為 v-if 無法訪問 user 變數 --&gt;<br>
        &lt;div<br>
        &nbsp;&nbsp;v-for="user in users"<br>
        &nbsp;&nbsp;v-if="user.isActive || showInactive"<br>
        &nbsp;&nbsp;:key="user.id"<br>
        &gt;<br>
        &nbsp;&nbsp;{{ '{' }}{{ '{' }} user.name {{ '}' }}{{ '}' }}<br>
        &lt;/div&gt;
      </div>
      <p class="text-red-200 font-medium">⚠️ 在同一元素上使用 v-for 和 v-if 會導致錯誤</p>
    </div>

    <!-- ✅ 正確做法 1：使用計算屬性 -->
    <div class="mb-8 p-6 bg-green-900 border border-green-600 rounded-lg">
      <h4 class="text-lg font-semibold text-green-300 mb-4">✅ 正確做法 1：使用計算屬性過濾</h4>
      <div class="space-y-2">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded shadow-sm"
        >
          <span class="font-medium text-white">{{ user.name }}</span>
          <div class="flex items-center gap-2">
            <span
              class="px-2 py-1 text-xs rounded"
              :class="user.isActive ? 'bg-green-800 text-green-200' : 'bg-gray-600 text-gray-300'"
            >
              {{ getUserStatusText(user) }}
            </span>
            <span
              class="px-2 py-1 text-xs rounded"
              :class="getUserRoleColor(user.role)"
            >
              {{ user.role }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 正確做法 2：使用模板包裝 -->
    <div class="mb-8 p-6 bg-blue-900 border border-blue-600 rounded-lg">
      <h4 class="text-lg font-semibold text-blue-300 mb-4">✅ 正確做法 2：使用模板包裝</h4>
      <div class="space-y-2">
        <template
          v-for="user in users"
          :key="user.id"
        >
          <div
            v-if="user.isActive || showInactive"
            class="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded shadow-sm"
          >
            <span class="font-medium text-white">{{ user.name }}</span>
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-1 text-xs rounded"
                :class="user.isActive ? 'bg-green-800 text-green-200' : 'bg-gray-600 text-gray-300'"
              >
                {{ getUserStatusText(user) }}
              </span>
              <span
                class="px-2 py-1 text-xs rounded"
                :class="getUserRoleColor(user.role)"
              >
                {{ user.role }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- ✅ 正確做法 3：條件渲染不同的列表 -->
    <div class="mb-8 p-6 bg-purple-900 border border-purple-600 rounded-lg">
      <h4 class="text-lg font-semibold text-purple-300 mb-4">✅ 正確做法 3：條件渲染不同的列表</h4>

      <div v-if="showInactive">
        <h5 class="font-semibold mb-3 text-purple-200">所有用戶：</h5>
        <div class="space-y-2">
          <div
            v-for="user in users"
            :key="user.id"
            class="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded shadow-sm"
          >
            <span class="font-medium text-white">{{ user.name }}</span>
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-1 text-xs rounded"
                :class="user.isActive ? 'bg-green-800 text-green-200' : 'bg-gray-600 text-gray-300'"
              >
                {{ getUserStatusText(user) }}
              </span>
              <span
                class="px-2 py-1 text-xs rounded"
                :class="getUserRoleColor(user.role)"
              >
                {{ user.role }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <h5 class="font-semibold mb-3 text-purple-200">活躍用戶：</h5>
        <div class="space-y-2">
          <div
            v-for="user in users.filter(u => u.isActive)"
            :key="user.id"
            class="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded shadow-sm"
          >
            <span class="font-medium text-white">{{ user.name }}</span>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs rounded bg-green-800 text-green-200">
                活躍
              </span>
              <span
                class="px-2 py-1 text-xs rounded"
                :class="getUserRoleColor(user.role)"
              >
                {{ user.role }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-amber-900 border-l-4 border-amber-500 rounded">
      <h4 class="font-bold text-amber-300 mb-2">重要提醒：</h4>
      <ul class="text-sm text-amber-200 space-y-1">
        <li>• Vue 3 中 v-if 的優先級高於 v-for</li>
        <li>• 不要在同一元素上同時使用 v-for 和 v-if</li>
        <li>• 使用計算屬性是最推薦的解決方案</li>
        <li>• 模板包裝適用於複雜的條件邏輯</li>
        <li>• 函數中使用 early return 模式提高可讀性</li>
      </ul>
    </div>
  </div>
</template>