<script lang="ts" setup>
import { ref, computed } from 'vue'

// 基本樣式物件
const baseStyles = ref({
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #e5e7eb',
  transition: 'all 0.3s ease'
})

const themeStyles = ref({
  backgroundColor: '#3b82f6',
  color: 'white'
})

const sizeStyles = ref({
  fontSize: '16px',
  minHeight: '120px'
})

// 條件式樣式
const defaultCardStyle = {
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  transition: 'all 0.3s ease'
}

const activeStyle = {
  backgroundColor: '#dcfce7',
  borderColor: '#10b981',
  color: '#065f46'
}

const inactiveStyle = {
  backgroundColor: '#f3f4f6',
  borderColor: '#9ca3af',
  color: '#6b7280'
}

const errorStyle = {
  backgroundColor: '#fef2f2',
  borderColor: '#ef4444',
  color: '#7f1d1d'
}

const elevatedStyle = {
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-2px)'
}

// 狀態變數
const isActive = ref(true)
const hasError = ref(false)
const isElevated = ref(false)

// 動態樣式陣列
const styleArray = ref<Record<string, any>[]>([
  { padding: '20px', borderRadius: '8px' },
  { backgroundColor: '#e0f2fe', color: '#0c4a6e' },
  { fontSize: '16px', fontWeight: '500' }
])

const overrideColor = ref('#8b5cf6')
const overrideFontSize = ref(18)

const overrideStyle = computed(() => ({
  backgroundColor: overrideColor.value,
  fontSize: overrideFontSize.value + 'px',
  color: 'white'
}))

// 方法
function changeTheme() {
  const themes = [
    { backgroundColor: '#3b82f6', color: 'white' },
    { backgroundColor: '#10b981', color: 'white' },
    { backgroundColor: '#f59e0b', color: 'white' },
    { backgroundColor: '#8b5cf6', color: 'white' }
  ]
  const currentIndex = themes.findIndex(
    theme => theme.backgroundColor === themeStyles.value.backgroundColor
  )
  const nextIndex = (currentIndex + 1) % themes.length
  themeStyles.value = themes[nextIndex]
}

function changeSize() {
  const sizes = ['14px', '16px', '18px', '20px', '24px']
  const currentIndex = sizes.indexOf(sizeStyles.value.fontSize)
  const nextIndex = (currentIndex + 1) % sizes.length
  sizeStyles.value.fontSize = sizes[nextIndex]

  const heights = ['100px', '120px', '140px', '160px', '180px']
  sizeStyles.value.minHeight = heights[nextIndex]
}

function resetState() {
  isActive.value = true
  hasError.value = false
  isElevated.value = false
}

function addStyleToArray() {
  const randomStyles = [
    { border: '3px solid #10b981' },
    { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
    { transform: 'rotate(2deg)' },
    { borderRadius: '20px' },
    { opacity: '0.9' }
  ]
  const randomIndex = Math.floor(Math.random() * randomStyles.length)
  styleArray.value.push(randomStyles[randomIndex])
}

function removeLastStyle() {
  if (styleArray.value.length > 1) {
    styleArray.value.pop()
  }
}

function clearStyleArray() {
  styleArray.value = [
    { padding: '20px', borderRadius: '8px' },
    { backgroundColor: '#e0f2fe', color: '#0c4a6e' },
    { fontSize: '16px', fontWeight: '500' }
  ]
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">:style 陣列語法演示</h3>

    <!-- 基本陣列樣式 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 基本陣列樣式組合</h4>
      <div class="space-y-4">
        <div
          :style="[baseStyles, themeStyles, sizeStyles]"
          class="text-center transition-all duration-300"
        >
          <h5 class="font-medium mb-2">組合樣式展示</h5>
          <p class="text-sm">
            基礎 + 主題 + 尺寸樣式組合
          </p>
        </div>

        <div class="flex gap-2">
          <button
            @click="changeTheme"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            切換主題
          </button>
          <button
            @click="changeSize"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            切換尺寸
          </button>
        </div>

        <div class="text-sm text-gray-600">
          <p><strong>當前樣式：</strong></p>
          <div class="bg-gray-50 p-3 rounded mt-2">
            <div><strong>基礎樣式：</strong> {{ JSON.stringify(baseStyles, null, 2) }}</div>
            <div><strong>主題樣式：</strong> {{ JSON.stringify(themeStyles, null, 2) }}</div>
            <div><strong>尺寸樣式：</strong> {{ JSON.stringify(sizeStyles, null, 2) }}</div>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 基本陣列樣式綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed text-gray-300"><code>&lt;script setup&gt;
import { ref } from 'vue'

const baseStyles = ref({
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #e5e7eb',
  transition: 'all 0.3s ease'
})

const themeStyles = ref({
  backgroundColor: '#3b82f6',
  color: 'white'
})

const sizeStyles = ref({
  fontSize: '16px',
  minHeight: '120px'
})

function changeTheme() {
  const themes = [
    { backgroundColor: '#3b82f6', color: 'white' },
    { backgroundColor: '#10b981', color: 'white' },
    { backgroundColor: '#f59e0b', color: 'white' }
  ]
  // 循環切換主題...
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div
    :style="[baseStyles, themeStyles, sizeStyles]"
    class="text-center transition-all duration-300"
  &gt;
    &lt;h5 class="font-medium mb-2"&gt;組合樣式展示&lt;/h5&gt;
    &lt;p class="text-sm"&gt;
      基礎 + 主題 + 尺寸樣式組合
    &lt;/p&gt;
  &lt;/div&gt;

  &lt;button @click="changeTheme"&gt;切換主題&lt;/button&gt;
  &lt;button @click="changeSize"&gt;切換尺寸&lt;/button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- 條件式陣列樣式 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 條件式陣列樣式</h4>
      <div class="space-y-4">
        <div
          :style="[
            defaultCardStyle,
            isActive ? activeStyle : inactiveStyle,
            hasError ? errorStyle : null,
            isElevated ? elevatedStyle : {}
          ]"
          class="text-center transition-all duration-300"
        >
          <h5 class="font-medium mb-2">智慧卡片</h5>
          <p class="text-sm">
            狀態：{{ isActive ? '啟用' : '停用' }} |
            錯誤：{{ hasError ? '是' : '否' }} |
            陰影：{{ isElevated ? '有' : '無' }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            @click="isActive = !isActive"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            {{ isActive ? '停用' : '啟用' }}
          </button>
          <button
            @click="hasError = !hasError"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            {{ hasError ? '清除錯誤' : '觸發錯誤' }}
          </button>
          <button
            @click="isElevated = !isElevated"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            {{ isElevated ? '移除陰影' : '添加陰影' }}
          </button>
          <button
            @click="resetState"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            重設
          </button>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 條件式陣列樣式
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed text-gray-300"><code>&lt;script setup&gt;
const isActive = ref(true)
const hasError = ref(false)
const isElevated = ref(false)

const defaultCardStyle = {
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  transition: 'all 0.3s ease'
}

const activeStyle = {
  backgroundColor: '#dcfce7',
  borderColor: '#10b981',
  color: '#065f46'
}

const inactiveStyle = {
  backgroundColor: '#f3f4f6',
  borderColor: '#9ca3af',
  color: '#6b7280'
}

const errorStyle = {
  backgroundColor: '#fef2f2',
  borderColor: '#ef4444',
  color: '#7f1d1d'
}

const elevatedStyle = {
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  transform: 'translateY(-2px)'
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div
    :style="[
      defaultCardStyle,
      isActive ? activeStyle : inactiveStyle,
      hasError ? errorStyle : null,
      isElevated ? elevatedStyle : {}
    ]"
    class="text-center transition-all duration-300"
  &gt;
    &lt;h5 class="font-medium mb-2"&gt;智慧卡片&lt;/h5&gt;
    &lt;p class="text-sm"&gt;
      狀態：{{ isActive ? '啟用' : '停用' }}
    &lt;/p&gt;
  &lt;/div&gt;

  &lt;button @click="isActive = !isActive"&gt;切換狀態&lt;/button&gt;
  &lt;button @click="hasError = !hasError"&gt;切換錯誤&lt;/button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- 動態樣式組合 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 動態樣式組合與優先級</h4>
      <div class="space-y-4">
        <div
          :style="[
            ...styleArray,
            overrideStyle
          ]"
          class="text-center transition-all duration-300"
        >
          <h5 class="font-medium mb-2">樣式優先級演示</h5>
          <p class="text-sm">
            後面的樣式會覆蓋前面相同的屬性
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">覆蓋背景顏色：</label>
            <input
              v-model="overrideColor"
              type="color"
              class="w-full h-10 rounded border border-gray-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">覆蓋字體大小：</label>
            <input
              v-model.number="overrideFontSize"
              type="range"
              min="12"
              max="24"
              class="w-full"
            />
            <div class="text-xs text-gray-600 mt-1">{{ overrideFontSize }}px</div>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="addStyleToArray"
            class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
          >
            添加隨機樣式
          </button>
          <button
            @click="removeLastStyle"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            移除最後樣式
          </button>
          <button
            @click="clearStyleArray"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            清空樣式陣列
          </button>
        </div>

        <div class="bg-white p-3 rounded border">
          <div class="text-sm font-medium text-gray-700 mb-2">當前樣式陣列：</div>
          <pre
            class="text-xs text-purple-600 overflow-x-auto max-h-32">{{ JSON.stringify([...styleArray, overrideStyle], null, 2) }}</pre>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 動態樣式組合
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed text-gray-300"><code>&lt;script setup&gt;
const styleArray = ref([
  { padding: '20px', borderRadius: '8px' },
  { backgroundColor: '#e0f2fe', color: '#0c4a6e' },
  { fontSize: '16px', fontWeight: '500' }
])

const overrideColor = ref('#8b5cf6')
const overrideFontSize = ref(18)

const overrideStyle = computed(() =&gt; ({
  backgroundColor: overrideColor.value,
  fontSize: overrideFontSize.value + 'px',
  color: 'white'
}))

function addStyleToArray() {
  const randomStyles = [
    { border: '3px solid #10b981' },
    { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' },
    { transform: 'rotate(2deg)' }
  ]
  const randomIndex = Math.floor(Math.random() * randomStyles.length)
  styleArray.value.push(randomStyles[randomIndex])
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div
    :style="[
      ...styleArray,
      overrideStyle
    ]"
    class="text-center transition-all duration-300"
  &gt;
    &lt;h5 class="font-medium mb-2"&gt;樣式優先級演示&lt;/h5&gt;
    &lt;p class="text-sm"&gt;
      後面的樣式會覆蓋前面相同的屬性
    &lt;/p&gt;
  &lt;/div&gt;

  &lt;button @click="addStyleToArray"&gt;添加隨機樣式&lt;/button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- 語法對照 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 :style 陣列語法特點</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">特點</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">說明</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">範例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">樣式合併</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">陣列中的所有樣式物件會合併到一個樣式中</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600 text-xs">[style1, style2, style3]</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">後者覆蓋</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">後面的樣式會覆蓋前面相同的 CSS 屬性</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600 text-xs">[{color:'red'},
                {color:'blue'}]</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">忽略空值</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">null、undefined、false 等空值會被忽略</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-purple-600 text-xs">[style1, null, style2]</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">動態組合</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">可以使用展開運算子動態添加樣式</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-orange-600 text-xs">[...baseStyles, extraStyle]
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-800 bg-teal-50 border border-teal-200 rounded-lg p-4">
      <h5 class="font-semibold text-teal-800 mb-3">💡 重點說明：</h5>
      <ul class="space-y-2 text-gray-700">
        <li>• 陣列語法適合需要組合多個樣式物件的場景</li>
        <li>• 後面的樣式會覆蓋前面相同的 CSS 屬性，形成樣式優先級</li>
        <li>• 可以在陣列中使用條件表達式來動態添加樣式</li>
        <li>• 空值 <code class="bg-teal-100 px-1 rounded">null</code>、<code
            class="bg-teal-100 px-1 rounded">undefined</code>、<code class="bg-teal-100 px-1 rounded">false</code> 會被忽略
        </li>
        <li>• 常用於元件庫中提供基礎樣式，然後允許用戶覆蓋特定屬性</li>
      </ul>
    </div>

    <!-- 最佳實務建議 -->
    <div class="text-sm text-gray-800 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h5 class="font-semibold text-yellow-800 mb-3">✅ 最佳實務建議：</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <h6 class="font-medium text-yellow-700">推薦寫法：</h6>
          <ul class="space-y-1 text-gray-700">
            <li>• 使用語意化的樣式物件名稱</li>
            <li>• 基礎樣式放在陣列前面，特殊樣式放後面</li>
            <li>• 使用條件表達式控制樣式的啟用</li>
            <li>• 善用展開運算子合併樣式陣列</li>
          </ul>
        </div>
        <div class="space-y-2">
          <h6 class="font-medium text-red-700">避免的寫法：</h6>
          <ul class="space-y-1 text-gray-700">
            <li>• 避免在陣列中使用太多樣式物件</li>
            <li>• 避免樣式物件間有太多重複的屬性</li>
            <li>• 避免在模板中直接寫複雜的樣式邏輯</li>
            <li>• 避免忽略樣式覆蓋的優先級順序</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>