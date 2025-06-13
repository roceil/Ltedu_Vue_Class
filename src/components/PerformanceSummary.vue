<script lang="ts" setup>
import { ref } from 'vue'

const performanceData = ref([
  {
    aspect: '初始渲染',
    vif: '較快（條件為 false 時不渲染）',
    vshow: '較慢（總是渲染但可能隱藏）',
    winner: 'vif'
  },
  {
    aspect: '切換性能',
    vif: '較慢（需要創建/銷毀 DOM）',
    vshow: '較快（只改變 CSS display）',
    winner: 'vshow'
  },
  {
    aspect: '記憶體使用',
    vif: '較少（不需要的元素不在 DOM 中）',
    vshow: '較多（隱藏的元素仍在 DOM 中）',
    winner: 'vif'
  },
  {
    aspect: '適用場景',
    vif: '條件很少改變、昂貴組件、權限控制',
    vshow: '頻繁切換、選項卡、模態對話框',
    winner: 'both'
  },
])

const getWinnerStyle = (winner: string, type: 'vif' | 'vshow') => {
  if (winner === 'both') return 'bg-purple-800 text-purple-200'
  if (winner === type) return 'bg-green-800 text-green-200 font-semibold'
  return 'bg-yellow-800 text-yellow-200'
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-white">性能比較總結</h2>

    <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-600">
      <table class="w-full bg-gray-800">
        <thead>
          <tr class="bg-gray-700 border-b border-gray-600">
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-200 border-r border-gray-600">
              比較項目
            </th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-blue-400 border-r border-gray-600">
              V-if
            </th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-green-400">
              V-show
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in performanceData"
            :key="item.aspect"
            :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'"
            class="border-b border-gray-600"
          >
            <td class="px-6 py-4 font-semibold text-gray-200 bg-gray-700 border-r border-gray-600">
              {{ item.aspect }}
            </td>
            <td
              class="px-6 py-4 text-sm border-r border-gray-600"
              :class="getWinnerStyle(item.winner, 'vif')"
            >
              {{ item.vif }}
            </td>
            <td
              class="px-6 py-4 text-sm"
              :class="getWinnerStyle(item.winner, 'vshow')"
            >
              {{ item.vshow }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- V-if 優勢 -->
      <div class="p-6 bg-blue-900 border border-blue-600 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-300 mb-4">🚀 V-if 優勢</h3>
        <ul class="space-y-2 text-sm text-blue-200">
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>初始渲染更快（條件為 false 時）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>節省記憶體（不渲染不需要的元素）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>避免不必要的組件初始化</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>適合權限控制和條件渲染</span>
          </li>
        </ul>
      </div>

      <!-- V-show 優勢 -->
      <div class="p-6 bg-green-900 border border-green-600 rounded-lg">
        <h3 class="text-lg font-semibold text-green-300 mb-4">⚡ V-show 優勢</h3>
        <ul class="space-y-2 text-sm text-green-200">
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>切換速度更快（只改變 CSS）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>保持組件狀態和 DOM 結構</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>支援 CSS 過渡動畫</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400 font-bold">✓</span>
            <span>適合頻繁切換的元素</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 選擇決策樹 -->
    <div class="mt-8 p-6 bg-purple-900 border border-purple-600 rounded-lg">
      <h3 class="text-lg font-semibold text-purple-300 mb-4">🤔 如何選擇？</h3>
      <div class="space-y-4">
        <div class="p-4 bg-gray-800 border border-purple-500 rounded">
          <h4 class="font-semibold text-purple-300 mb-2">選擇 V-if 的情況：</h4>
          <ul class="text-sm text-purple-200 space-y-1">
            <li>• 條件很少改變（如權限控制）</li>
            <li>• 組件初始化成本很高</li>
            <li>• 包含大量 DOM 元素</li>
            <li>• 希望節省記憶體使用</li>
          </ul>
        </div>

        <div class="p-4 bg-gray-800 border border-purple-500 rounded">
          <h4 class="font-semibold text-purple-300 mb-2">選擇 V-show 的情況：</h4>
          <ul class="text-sm text-purple-200 space-y-1">
            <li>• 需要頻繁切換顯示/隱藏</li>
            <li>• 需要保持組件狀態</li>
            <li>• 需要 CSS 動畫效果</li>
            <li>• 切換響應速度要求高</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-gray-800 border-l-4 border-gray-500 rounded">
      <h4 class="font-bold text-gray-200 mb-2">💡 最佳實踐建議：</h4>
      <ul class="text-sm text-gray-300 space-y-1">
        <li>• 不確定時優先選擇 V-if（較為安全）</li>
        <li>• 測量實際性能影響後再優化</li>
        <li>• 考慮用戶體驗和開發維護成本</li>
        <li>• 避免在同一元素上使用 v-for 和 v-if</li>
      </ul>
    </div>
  </div>
</template>