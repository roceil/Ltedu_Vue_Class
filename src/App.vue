<script setup lang="ts">
import { ref } from 'vue'

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Computed',
    path: '/computed',
  },
  {
    name: 'Watch',
    path: '/watch',
  },
  {
    name: 'For',
    path: '/for',
  },
  {
    name: 'If',
    path: '/if',
  },
]

const navRef = ref<HTMLElement>()
const hoverIndicator = ref<HTMLElement>()

// 更新 hover 指示器位置
const updateHoverIndicator = (event: MouseEvent) => {
  if (!navRef.value || !hoverIndicator.value) return

  const target = event.currentTarget as HTMLElement
  if (!target) return

  // 獲取內容區域（flex容器）
  const contentArea = navRef.value.querySelector('div.flex') as HTMLElement
  if (!contentArea) return

  const contentRect = contentArea.getBoundingClientRect()
  const linkRect = target.getBoundingClientRect()

  // 計算按鈕相對於內容區域的位置
  const left = linkRect.left - contentRect.left
  const width = linkRect.width

  hoverIndicator.value.style.transform = `translateX(${left}px)`
  hoverIndicator.value.style.width = `${width}px`
  hoverIndicator.value.style.opacity = '1'
}

// 隱藏 hover 指示器
const hideHoverIndicator = () => {
  if (!hoverIndicator.value) return
  hoverIndicator.value.style.opacity = '0'
}
</script>

<template>
  <!-- 導航欄 -->
  <nav
    ref="navRef"
    class="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-6 py-4 shadow-lg backdrop-blur-sm"
  >
    <!-- 導航欄頂部裝飾線 -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent">
    </div>

    <!-- 導航內容區域 -->
    <div class="relative flex items-center gap-1">
      <!-- Hover 指示器 -->
      <div
        ref="hoverIndicator"
        class="absolute bottom-[-16px] h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-200 ease-out opacity-0 shadow-lg shadow-purple-400/25"
        style="width: 0px; transform: translateX(0px);"
      ></div>

      <!-- 導航鏈結 -->
      <RouterLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="relative px-4 py-2 text-gray-300 font-medium text-sm hover:text-white transition-colors duration-200 rounded-md"
        active-class="text-white"
        @mouseenter="updateHoverIndicator"
        @mouseleave="hideHoverIndicator"
      >
        <span class="relative z-10">{{ link.name }}</span>
      </RouterLink>
    </div>
  </nav>

  <!-- 主要內容區域 -->
  <main class="min-h-screen bg-black">
    <RouterView />
  </main>
</template>
