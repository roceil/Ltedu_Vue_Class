<script lang="ts" setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name: '前端技術',
    skills: [
      { id: 101, name: 'Vue.js', completed: true },
      { id: 102, name: 'React', completed: false },
      { id: 103, name: 'Angular', completed: false },
    ],
  },
  {
    id: 2,
    name: '後端技術',
    skills: [
      { id: 201, name: 'Node.js', completed: true },
      { id: 202, name: 'Python', completed: true },
      { id: 203, name: 'Java', completed: false },
    ],
  },
])

const toggleItem = (item: any) => {
  item.completed = !item.completed
}

const addItemToCategory = (categoryId: number) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (!category) return

  // 處理空數組的情況
  const newId = category.skills.length > 0
    ? Math.max(...category.skills.map(item => item.id)) + 1
    : categoryId * 100 + 1
  const techNames = ['TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'MongoDB', 'Redis', 'Webpack', 'Vite']
  const randomTech = techNames[Math.floor(Math.random() * techNames.length)]

  category.skills.push({
    id: newId,
    name: randomTech,
    completed: false,
  })
}

const removeItem = (categoryId: number, itemId: number) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (!category) return

  const index = category.skills.findIndex(item => item.id === itemId)
  if (index > -1) {
    category.skills.splice(index, 1)
  }
}

const addCategory = () => {
  // 處理空數組的情況
  const newId = categories.value.length > 0
    ? Math.max(...categories.value.map(cat => cat.id)) + 1
    : 1
  const categoryNames = ['資料庫技術', '雲端服務', '開發工具', '測試框架', '設計模式']
  const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)]

  categories.value.push({
    id: newId,
    name: randomCategory,
    skills: [],
  })
}

const removeCategory = (categoryId: number) => {
  const index = categories.value.findIndex(cat => cat.id === categoryId)
  if (index > -1) {
    categories.value.splice(index, 1)
  }
}

// 計算統計信息
const getCompletedCount = (category: any) => {
  return category.skills.filter((item: any) => item.completed).length
}

const getTotalProgress = () => {
  if (categories.value.length === 0) return 0

  const totalItems = categories.value.reduce((sum, cat) => sum + cat.skills.length, 0)
  const completedItems = categories.value.reduce((sum, cat) =>
    sum + cat.skills.filter(item => item.completed).length, 0)
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
}
</script>

<template>
  <div class="space-y-6">
    <!-- 總體統計 -->
    <div class="p-4 bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-600 rounded-lg">
      <div class="flex justify-between items-center">
        <div>
          <h4 class="text-xl font-bold text-white">📚 學習進度追蹤</h4>
          <p class="text-purple-200 text-sm">
            {{ categories.length }} 個分類，總進度 {{ getTotalProgress() }}%
          </p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-purple-300">
            {{ getTotalProgress() }}%
          </div>
          <div class="text-sm text-purple-400">完成度</div>
        </div>
      </div>

      <!-- 進度條 -->
      <div class="mt-4 bg-purple-800 rounded-full h-2">
        <div
          class="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full transition-all duration-500"
          :style="{ width: getTotalProgress() + '%' }"
        ></div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div class="flex gap-3">
      <button
        @click="addCategory"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
      >
        新增分類
      </button>
    </div>

    <!-- 嵌套列表說明 -->
    <div class="p-4 bg-blue-900/30 border border-blue-600 rounded-lg">
      <h4 class="text-blue-300 font-semibold mb-2">🔄 嵌套 V-for 結構</h4>
      <p class="text-sm text-blue-200 mb-2">
        這個範例展示了兩層嵌套的 V-for 結構：
      </p>
      <ul class="text-sm text-blue-200 space-y-1">
        <li>• <strong>外層：</strong> 遍歷分類列表 (categories)</li>
        <li>• <strong>內層：</strong> 遍歷每個分類下的技能 (category.skills)</li>
        <li>• <strong>Key 管理：</strong> 外層使用 category.id，內層使用 skill.id</li>
        <li>• <strong>狀態管理：</strong> 每個層級都有獨立的操作和狀態</li>
      </ul>
    </div>

    <!-- 分類列表 -->
    <ul class="space-y-4">
      <li
        v-for="category in categories"
        :key="category.id"
        class="border border-gray-600 rounded-lg overflow-hidden bg-gray-800"
      >
        <!-- 分類標題 -->
        <div class="p-4 bg-gray-700 border-b border-gray-600">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <h5 class="text-lg font-semibold text-white">{{ category.name }}</h5>
              <span class="text-xs text-purple-400 bg-purple-900/50 px-2 py-1 rounded">
                分類 ID: {{ category.id }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <!-- 進度顯示 -->
              <div class="text-sm text-gray-300">
                {{ getCompletedCount(category) }} / {{ category.skills.length }} 完成
              </div>

              <!-- 操作按鈕 -->
              <button
                @click="addItemToCategory(category.id)"
                class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                新增技能
              </button>
              <button
                @click="removeCategory(category.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                刪除分類
              </button>
            </div>
          </div>
        </div>

        <!-- 項目列表 -->
        <div class="p-4">
          <div
            v-if="category.skills.length === 0"
            class="text-center py-8 text-gray-500"
          >
            <div class="text-4xl mb-2">📝</div>
            <p>這個分類還沒有技能</p>
            <button
              @click="addItemToCategory(category.id)"
              class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              新增第一個技能
            </button>
          </div>

          <ul
            v-else
            class="space-y-2"
          >
            <li
              v-for="skill in category.skills"
              :key="skill.id"
              class="p-3 bg-gray-900 border border-gray-700 rounded hover:bg-gray-800 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    :checked="skill.completed"
                    @change="toggleItem(skill)"
                    class="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                  />
                  <span
                    class="text-white"
                    :class="{ 'line-through opacity-60': skill.completed }"
                  >
                    {{ skill.name }}
                  </span>
                  <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">
                    ID: {{ skill.id }}
                  </span>
                </div>

                <button
                  @click="removeItem(category.id, skill.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                >
                  移除
                </button>
              </div>
            </li>
          </ul>
        </div>
      </li>

      <!-- 空狀態 -->
      <div
        v-if="categories.length === 0"
        class="p-12 text-center bg-gray-800 border border-gray-600 rounded-lg"
      >
        <div class="text-6xl mb-4">📚</div>
        <h4 class="text-gray-300 font-medium mb-2">還沒有任何分類</h4>
        <p class="text-gray-500 text-sm mb-4">
          點擊「新增分類」來開始建立你的學習計劃
        </p>
        <button
          @click="addCategory"
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-colors"
        >
          新增第一個分類
        </button>
      </div>
    </ul>

    <!-- 技術說明 -->
    <div class="p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <h4 class="text-gray-300 font-semibold mb-3">🔧 嵌套 V-for 技術要點</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="text-yellow-400 font-medium mb-2">Key 管理策略</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• 外層：:key="category.id"</li>
            <li>• 內層：:key="skill.id"</li>
            <li>• 確保每層的 key 都是唯一的</li>
            <li>• 避免使用 index 作為 key</li>
          </ul>
        </div>
        <div>
          <h5 class="text-green-400 font-medium mb-2">性能考量</h5>
          <ul class="text-sm text-gray-400 space-y-1">
            <li>• Vue 會智能地只更新變化的部分</li>
            <li>• 正確的 key 確保最小化 DOM 操作</li>
            <li>• 計算屬性緩存統計結果</li>
            <li>• 避免在模板中進行複雜計算</li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
        <h5 class="text-purple-400 font-medium mb-2">程式碼結構</h5>
        <pre class="text-xs text-gray-300 font-mono">&lt;div v-for="category in categories" :key="category.id"&gt;
  &lt;div v-for="skill in category.skills" :key="skill.id"&gt;
    &#123;&#123; skill.name &#125;&#125;
  &lt;/div&gt;
&lt;/div&gt;</pre>
      </div>
    </div>
  </div>
</template>