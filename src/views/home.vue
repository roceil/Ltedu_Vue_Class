<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const logoRef = ref<HTMLElement>()
const isAnimating = ref(false)

// Vue API 列表
const vueApis = [
  {
    name: 'Computed',
    description: '計算屬性 - 智能緩存的派生數據',
    path: '/computed',
    color: 'from-blue-900 to-cyan-900',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-400',
    icon: '⚡'
  },
  {
    name: 'Watch',
    description: '監聽器 - 響應式數據變化的副作用處理',
    path: '/watch',
    color: 'from-purple-900 to-pink-900',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-400',
    icon: '👁️'
  },
  {
    name: 'For',
    description: 'v-for 指令 - 列表渲染與優化技巧',
    path: '/for',
    color: 'from-green-900 to-emerald-900',
    borderColor: 'border-green-600',
    textColor: 'text-green-400',
    icon: '🔄'
  },
  {
    name: 'If',
    description: 'v-if & v-show - 條件渲染的效能比較',
    path: '/if',
    color: 'from-orange-900 to-red-900',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-400',
    icon: '🔀'
  }
]

// Logo 動畫觸發
const triggerLogoAnimation = () => {
  if (isAnimating.value || !logoRef.value) return

  isAnimating.value = true
  logoRef.value.style.transform = 'rotateY(180deg)'

  setTimeout(() => {
    if (logoRef.value) {
      logoRef.value.style.transform = 'rotateY(0deg)'
    }
    isAnimating.value = false
  }, 600)
}

// 自動觸發動畫
onMounted(() => {
  setTimeout(() => {
    triggerLogoAnimation()
  }, 1000)
})
</script>

<template>
  <div class="container mx-auto mt-4 px-4 max-w-6xl mb-10">
    <!-- 頁面標題區域 -->
    <div class="mb-8 text-center">
      <!-- Vue Logo -->
      <div class="mb-6 flex justify-center">
        <div
          ref="logoRef"
          class="w-32 h-32 cursor-pointer transition-transform duration-600 ease-in-out hover:scale-110"
          @click="triggerLogoAnimation"
        >
          <img
            src="https://vuejs.org/images/logo.png"
            alt="Vue.js Logo"
            class="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      <h1
        class="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
      >
        Vue.js API 實戰指南
      </h1>
      <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        深入探索 Vue.js 核心 API 的實際應用，從響應式系統到條件渲染，
        <br>每個章節都包含豐富的互動式演示和最佳實踐指南
      </p>
    </div>

    <!-- 特色介紹 -->
    <div class="mb-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold text-white mb-4 text-center">🎯 學習特色</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div class="text-4xl mb-3">🧪</div>
          <h3 class="text-lg font-semibold text-blue-400 mb-2">互動式演示</h3>
          <p class="text-sm text-gray-300">
            每個 API 都有豐富的互動式範例，讓你在實際操作中理解概念
          </p>
        </div>
        <div class="text-center p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div class="text-4xl mb-3">⚡</div>
          <h3 class="text-lg font-semibold text-purple-400 mb-2">性能優化</h3>
          <p class="text-sm text-gray-300">
            深入解析每個 API 的性能特點，學會在正確的場景使用正確的工具
          </p>
        </div>
        <div class="text-center p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div class="text-4xl mb-3">🎨</div>
          <h3 class="text-lg font-semibold text-green-400 mb-2">最佳實踐</h3>
          <p class="text-sm text-gray-300">
            提供實戰中的最佳實踐和常見陷阱，避免在開發中踩坑
          </p>
        </div>
      </div>
    </div>

    <!-- API 導航卡片 -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-6 text-center">🚀 探索 Vue API</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="api in vueApis"
          :key="api.path"
          class="relative group overflow-hidden rounded-lg"
        >
          <RouterLink
            :to="api.path"
            class="relative block p-6 bg-gradient-to-r rounded-lg border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border-animation-card"
            :class="[api.color, api.borderColor]"
          >
            <div class="flex items-start gap-4 relative z-10">
              <div class="text-4xl">{{ api.icon }}</div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {{ api.name }}
                </h3>
                <p class="text-gray-300 text-sm leading-relaxed group-hover:text-gray-100 transition-colors">
                  {{ api.description }}
                </p>
                <div
                  class="mt-4 flex items-center gap-2 text-sm font-medium transition-colors"
                  :class="api.textColor"
                >
                  <span>開始學習</span>
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 技術說明 -->
    <div class="p-6 bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-600 rounded-lg shadow-xl">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <span class="text-3xl">🤖</span>
        技術說明
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 class="text-lg font-semibold text-indigo-400 mb-3">🎨 UI 設計</h3>
          <p class="text-sm text-gray-300 leading-relaxed">
            本網站的視覺設計和用戶介面完全由 AI 協助生成和優化，
            採用現代化的深色主題和漸變效果，提供舒適的學習體驗。
          </p>
        </div>
        <div class="p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 class="text-lg font-semibold text-purple-400 mb-3">⚙️ 技術架構</h3>
          <div class="text-sm text-gray-300 space-y-2">
            <div><strong>框架：</strong> Vue.js 3 + TypeScript</div>
            <div><strong>樣式：</strong> Tailwind CSS</div>
            <div><strong>路由：</strong> Vue Router</div>
            <div><strong>構建：</strong> Vite</div>
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-indigo-800/30 border border-indigo-500 rounded-lg">
        <p class="text-sm text-indigo-200 text-center">
          💡 <strong>提示：</strong> 點擊上方的 Vue.js Logo 可以觸發旋轉動畫！每個頁面都有豐富的互動功能等你發現。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Logo 動畫樣式 */
.transition-transform {
  transition-property: transform;
}

.duration-600 {
  transition-duration: 600ms;
}

/* 漸變文字效果 */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* 卡片 hover 效果增強 */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* 邊框動畫效果 */
.border-animation-card {
  position: relative;
  overflow: hidden;
}

.border-animation-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: linear-gradient(45deg, transparent, transparent, transparent, currentColor);
  background-size: 400% 400%;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group:hover .border-animation-card::before {
  opacity: 1;
  animation: border-rotate 2s linear infinite;
}

@keyframes border-rotate {
  0% {
    background-position: 0% 0%;
  }

  25% {
    background-position: 100% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  75% {
    background-position: 0% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

/* 為不同API卡片設定不同的邊框顏色 */
.group:hover .from-blue-900.border-animation-card::before {
  background: linear-gradient(45deg,
      transparent 30%,
      #3b82f6 40%,
      #06b6d4 60%,
      transparent 70%);
  background-size: 300% 300%;
}

.group:hover .from-purple-900.border-animation-card::before {
  background: linear-gradient(45deg,
      transparent 30%,
      #8b5cf6 40%,
      #ec4899 60%,
      transparent 70%);
  background-size: 300% 300%;
}

.group:hover .from-green-900.border-animation-card::before {
  background: linear-gradient(45deg,
      transparent 30%,
      #10b981 40%,
      #059669 60%,
      transparent 70%);
  background-size: 300% 300%;
}

.group:hover .from-orange-900.border-animation-card::before {
  background: linear-gradient(45deg,
      transparent 30%,
      #f97316 40%,
      #ef4444 60%,
      transparent 70%);
  background-size: 300% 300%;
}
</style>
