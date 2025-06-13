<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

// 表單資料
const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
})

// 驗證狀態
const validation = ref({
  email: { isValid: false, message: '' },
  password: { isValid: false, message: '', strength: 0 },
  confirmPassword: { isValid: false, message: '' },
  username: { isValid: false, message: '', isChecking: false }
})

// 驗證規則
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordMinLength = 8

// 模擬用戶名檢查 API
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1000))
  // 模擬檢查結果（Frank 和 admin 不可用）
  return !['admin', 'test'].includes(username.toLowerCase())
}

// 郵件驗證監聽器
watch(() => formData.value.email, (newEmail) => {
  if (!newEmail) {
    validation.value.email = { isValid: false, message: '' }
    return
  }

  if (!emailRegex.test(newEmail)) {
    validation.value.email = { isValid: false, message: '請輸入有效的郵件地址' }
    return
  }

  validation.value.email = { isValid: true, message: '郵件格式正確' }
})

// 密碼強度檢查
const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0

  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[a-z]/.test(password)) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 15
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10

  return Math.min(strength, 100)
}

// 密碼驗證監聽器
watch(() => formData.value.password, (newPassword) => {
  if (!newPassword) {
    validation.value.password = { isValid: false, message: '', strength: 0 }
    return
  }

  const strength = calculatePasswordStrength(newPassword)

  if (newPassword.length < passwordMinLength) {
    validation.value.password = {
      isValid: false,
      message: `密碼至少需要 ${passwordMinLength} 個字符`,
      strength
    }
    return
  }

  let message = ''
  if (strength < 50) message = '密碼強度：弱'
  else if (strength < 80) message = '密碼強度：中等'
  else message = '密碼強度：強'

  validation.value.password = {
    isValid: true,
    message,
    strength
  }
})

// 確認密碼驗證監聽器
watch([() => formData.value.password, () => formData.value.confirmPassword],
  ([newPassword, newConfirmPassword]) => {
    if (!newConfirmPassword) {
      validation.value.confirmPassword = { isValid: false, message: '' }
      return
    }

    if (newPassword !== newConfirmPassword) {
      validation.value.confirmPassword = { isValid: false, message: '密碼不匹配' }
      return
    }

    validation.value.confirmPassword = { isValid: true, message: '密碼匹配' }
  }
)

// 用戶名驗證監聽器（防抖）
let usernameTimeout: number | null = null
watch(() => formData.value.username, async (newUsername) => {
  // 清除之前的檢查
  if (usernameTimeout) {
    clearTimeout(usernameTimeout)
  }

  if (!newUsername) {
    validation.value.username = { isValid: false, message: '', isChecking: false }
    return
  }

  if (newUsername.length < 3) {
    validation.value.username = {
      isValid: false,
      message: '用戶名至少需要 3 個字符',
      isChecking: false
    }
    return
  }

  // 防抖處理
  usernameTimeout = setTimeout(async () => {
    validation.value.username.isChecking = true

    try {
      const isAvailable = await checkUsernameAvailability(newUsername)

      if (isAvailable) {
        validation.value.username = {
          isValid: true,
          message: '用戶名可用',
          isChecking: false
        }
      } else {
        validation.value.username = {
          isValid: false,
          message: '用戶名已被使用',
          isChecking: false
        }
      }
    } catch (error) {
      validation.value.username = {
        isValid: false,
        message: '檢查用戶名時發生錯誤',
        isChecking: false
      }
    }
  }, 500) // 500ms 防抖
})

// 整體表單有效性
const isFormValid = computed(() => {
  return validation.value.email.isValid &&
    validation.value.password.isValid &&
    validation.value.confirmPassword.isValid &&
    validation.value.username.isValid
})

// 密碼強度顏色
const getPasswordStrengthColor = (strength: number) => {
  if (strength < 30) return 'bg-red-500'
  if (strength < 60) return 'bg-yellow-500'
  if (strength < 80) return 'bg-blue-500'
  return 'bg-green-500'
}

const resetForm = () => {
  formData.value = {
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  }

  validation.value = {
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '', strength: 0 },
    confirmPassword: { isValid: false, message: '' },
    username: { isValid: false, message: '', isChecking: false }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 表單區域 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-blue-400 mb-4">即時表單驗證</h4>

      <div class="space-y-4">
        <!-- 郵件欄位 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">郵件地址</label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full px-3 py-2 border rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
            :class="{
              'border-gray-600 focus:ring-blue-500': !formData.email,
              'border-green-500 focus:ring-green-500': validation.email.isValid,
              'border-red-500 focus:ring-red-500': formData.email && !validation.email.isValid
            }"
            placeholder="請輸入郵件地址"
          />
          <div
            v-if="validation.email.message"
            class="mt-1 text-xs"
            :class="validation.email.isValid ? 'text-green-400' : 'text-red-400'"
          >
            {{ validation.email.message }}
          </div>
        </div>

        <!-- 密碼欄位 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">密碼</label>
          <input
            v-model="formData.password"
            type="password"
            class="w-full px-3 py-2 border rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
            :class="{
              'border-gray-600 focus:ring-blue-500': !formData.password,
              'border-green-500 focus:ring-green-500': validation.password.isValid,
              'border-red-500 focus:ring-red-500': formData.password && !validation.password.isValid
            }"
            placeholder="請輸入密碼"
          />

          <!-- 密碼強度指示器 -->
          <div
            v-if="formData.password"
            class="mt-2 space-y-1"
          >
            <div class="flex items-center space-x-2">
              <div class="flex-1 bg-gray-700 rounded-full h-1">
                <div
                  class="h-1 rounded-full transition-all duration-300"
                  :class="getPasswordStrengthColor(validation.password.strength)"
                  :style="{ width: `${validation.password.strength}%` }"
                ></div>
              </div>
              <span class="text-xs text-gray-400">{{ validation.password.strength }}%</span>
            </div>
            <div
              v-if="validation.password.message"
              class="text-xs"
              :class="validation.password.isValid ? 'text-green-400' : 'text-red-400'"
            >
              {{ validation.password.message }}
            </div>
          </div>
        </div>

        <!-- 確認密碼欄位 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">確認密碼</label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            class="w-full px-3 py-2 border rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
            :class="{
              'border-gray-600 focus:ring-blue-500': !formData.confirmPassword,
              'border-green-500 focus:ring-green-500': validation.confirmPassword.isValid,
              'border-red-500 focus:ring-red-500': formData.confirmPassword && !validation.confirmPassword.isValid
            }"
            placeholder="請再次輸入密碼"
          />
          <div
            v-if="validation.confirmPassword.message"
            class="mt-1 text-xs"
            :class="validation.confirmPassword.isValid ? 'text-green-400' : 'text-red-400'"
          >
            {{ validation.confirmPassword.message }}
          </div>
        </div>

        <!-- 用戶名欄位 -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">用戶名</label>
          <div class="relative">
            <input
              v-model="formData.username"
              type="text"
              class="w-full px-3 py-2 border rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
              :class="{
                'border-gray-600 focus:ring-blue-500': !formData.username,
                'border-green-500 focus:ring-green-500': validation.username.isValid,
                'border-red-500 focus:ring-red-500': formData.username && !validation.username.isValid && !validation.username.isChecking
              }"
              placeholder="請輸入用戶名"
            />
            <div
              v-if="validation.username.isChecking"
              class="absolute right-3 top-2.5 text-blue-400"
            >
              <div class="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <div
            v-if="validation.username.message"
            class="mt-1 text-xs"
            :class="validation.username.isValid ? 'text-green-400' : 'text-red-400'"
          >
            {{ validation.username.message }}
          </div>
        </div>
      </div>
    </div>

    <!-- 表單狀態 -->
    <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
      <h4 class="text-lg font-semibold text-green-400 mb-3">表單狀態</h4>
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="validation.email.isValid ? 'bg-green-500' : 'bg-red-500'"
          ></div>
          <span class="text-sm text-gray-300">郵件驗證：{{ validation.email.isValid ? '通過' : '失敗' }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="validation.password.isValid ? 'bg-green-500' : 'bg-red-500'"
          ></div>
          <span class="text-sm text-gray-300">密碼驗證：{{ validation.password.isValid ? '通過' : '失敗' }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="validation.confirmPassword.isValid ? 'bg-green-500' : 'bg-red-500'"
          ></div>
          <span class="text-sm text-gray-300">密碼確認：{{ validation.confirmPassword.isValid ? '通過' : '失敗' }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="w-2 h-2 rounded-full"
            :class="validation.username.isValid ? 'bg-green-500' : validation.username.isChecking ? 'bg-yellow-500' : 'bg-red-500'"
          ></div>
          <span class="text-sm text-gray-300">用戶名驗證：
            {{ validation.username.isChecking ? '檢查中...' : (validation.username.isValid ? '通過' : '失敗') }}
          </span>
        </div>
      </div>

      <div
        class="mt-4 p-3 rounded border"
        :class="isFormValid ? 'bg-green-900/30 border-green-600' : 'bg-red-900/30 border-red-600'"
      >
        <span
          class="font-medium"
          :class="isFormValid ? 'text-green-300' : 'text-red-300'"
        >
          整體表單狀態：{{ isFormValid ? '有效' : '無效' }}
        </span>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <div class="flex space-x-2">
      <button
        @click="resetForm"
        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
      >
        重置表單
      </button>
      <button
        :disabled="!isFormValid"
        class="px-4 py-2 rounded transition-colors"
        :class="isFormValid
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-gray-500 text-gray-300 cursor-not-allowed'"
      >
        提交表單
      </button>
    </div>

    <!-- 說明 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h5 class="text-blue-300 font-semibold mb-2">💡 驗證功能說明</h5>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>郵件驗證：</strong>即時檢查郵件格式</li>
        <li>• <strong>密碼強度：</strong>基於長度、大小寫、數字、特殊字符評分</li>
        <li>• <strong>密碼確認：</strong>即時比較兩次密碼輸入</li>
        <li>• <strong>用戶名檢查：</strong>500ms 防抖 + 模擬 API 檢查可用性</li>
      </ul>
    </div>
  </div>
</template>