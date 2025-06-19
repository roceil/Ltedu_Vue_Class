<script lang="ts" setup>
import { ref } from 'vue'

// 基本屬性綁定演示狀態
const imageUrl = ref('https://placehold.jp/4285F4/ffffff/250x150.png?text=Vue+Image+1')
const linkUrl = ref('#')
const titleText = ref('這是動態標題')
const altText = ref('動態描述文字')
const inputPlaceholder = ref('請輸入文字...')

// 控制狀態
const imageIndex = ref(1)
const linkType = ref('home')

// 預設的示例圖片列表
const sampleImages = [
  'https://placehold.jp/4285F4/ffffff/250x150.png?text=Vue+Image+1',
  'https://placehold.jp/10B981/ffffff/300x180.png?text=Vue+Image+2',
  'https://placehold.jp/F59E0B/ffffff/350x210.png?text=Vue+Image+3'
]

function changeImage() {
  imageIndex.value = imageIndex.value === 3 ? 1 : imageIndex.value + 1
  imageUrl.value = sampleImages[imageIndex.value - 1]
  altText.value = `示例圖片 ${imageIndex.value}`
}

function changeLink() {
  if (linkType.value === 'home') {
    linkType.value = 'about'
    linkUrl.value = '#about'
    titleText.value = '關於我們頁面'
    return
  }

  if (linkType.value === 'about') {
    linkType.value = 'contact'
    linkUrl.value = '#contact'
    titleText.value = '聯絡我們頁面'
    return
  }

  linkType.value = 'home'
  linkUrl.value = '#home'
  titleText.value = '首頁連結'
}


const formData = ref([
  {
    formName: 'name',
    formType: 'text',
    formValue: '',
    formPlaceholder: '請輸入姓名...'
  },
  {
    formName: 'email',
    formType: 'email',
    formValue: '',
    formPlaceholder: '請輸入電子郵件'
  }
])




function changeFirstFieldType() {
  // 只在 text 和 password 之間切換
  if (formData.value[0].formType === 'text') {
    formData.value[0].formType = 'password'
    return
  }

  formData.value[0].formType = 'text'
}

function changePlaceholders() {
  // 中英文 placeholder 對照表
  const chineseToEnglish: Record<string, string> = {
    '請輸入姓名...': 'Please enter your name...',
    '請輸入電子郵件': 'Please enter your email'
  }

  const englishToChinese: Record<string, string> = {
    'Please enter your name...': '請輸入姓名...',
    'Please enter your email': '請輸入電子郵件'
  }

  // 更新 name placeholder
  const namePlaceholder = formData.value[0].formPlaceholder
  if (namePlaceholder in chineseToEnglish) {
    formData.value[0].formPlaceholder = chineseToEnglish[namePlaceholder]
  } else if (namePlaceholder in englishToChinese) {
    formData.value[0].formPlaceholder = englishToChinese[namePlaceholder]
  }

  // 更新 email placeholder
  const emailPlaceholder = formData.value[1].formPlaceholder
  if (emailPlaceholder in chineseToEnglish) {
    formData.value[1].formPlaceholder = chineseToEnglish[emailPlaceholder]
  } else if (emailPlaceholder in englishToChinese) {
    formData.value[1].formPlaceholder = englishToChinese[emailPlaceholder]
  }
}

// 動態樣式屬性
const dynamicStyles = ref({
  color: '#3b82f6',
  fontSize: '16px',
  fontWeight: 'normal',
  textDecoration: 'none'
})

function updateDynamicStyles() {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  const sizes = ['14px', '16px', '18px', '20px', '24px']
  const weights = ['normal', 'bold', '100', '500', '900']
  const decorations = ['none', 'underline', 'line-through', 'overline']

  const colorIndex = colors.indexOf(dynamicStyles.value.color)
  const sizeIndex = sizes.indexOf(dynamicStyles.value.fontSize)
  const weightIndex = weights.indexOf(dynamicStyles.value.fontWeight)
  const decorationIndex = decorations.indexOf(dynamicStyles.value.textDecoration)

  dynamicStyles.value = {
    color: colors[(colorIndex + 1) % colors.length],
    fontSize: sizes[(sizeIndex + 1) % sizes.length],
    fontWeight: weights[(weightIndex + 1) % weights.length],
    textDecoration: decorations[(decorationIndex + 1) % decorations.length]
  }
}

// 條件屬性演示
const conditionalProps = ref({
  isDisabled: false
})

function toggleConditional(prop: keyof typeof conditionalProps.value) {
  conditionalProps.value[prop] = !conditionalProps.value[prop]
}
</script>

<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg space-y-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">基本 v-bind 使用演示</h3>

    <!-- 圖片屬性綁定 -->
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 class="font-semibold text-blue-800 mb-3">1. 圖片屬性綁定</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 圖片展示 -->
          <div class="text-center">
            <img
              v-bind:src="imageUrl"
              v-bind:alt="altText"
              v-bind:title="titleText"
              class="rounded-lg border shadow-sm mx-auto"
            />
            <div class="text-sm text-gray-600 mt-2">
              <div>src: {{ imageUrl }}</div>
              <div>alt: {{ altText }}</div>
              <div>title: {{ titleText }}</div>
            </div>
          </div>

          <!-- 控制面板 -->
          <div class="space-y-3">
            <button
              @click="changeImage"
              class="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              更換圖片 (當前: {{ imageIndex }})
            </button>

            <div class="bg-white p-3 rounded border">
              <div class="text-sm font-medium mb-2 text-gray-500">HTML 輸出：</div>
              <code class="text-xs text-blue-600 block break-all">
                &lt;img src="{{ imageUrl }}" alt="{{ altText }}" title="{{ titleText }}" /&gt;
              </code>
            </div>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-blue-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 圖片屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">imageUrl</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'https://placehold.jp/4285F4/ffffff/250x150.png?text=Vue+Image+1'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">titleText</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'這是動態標題'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">altText</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'動態描述文字'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">imageIndex</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-orange-300">1</span><span class="text-white">)</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">sampleImages</span> <span class="text-white">= [</span>
  <span class="text-green-300">'https://placehold.jp/4285F4/ffffff/250x150.png?text=Vue+Image+1'</span><span class="text-white">,</span>
  <span class="text-green-300">'https://placehold.jp/10B981/ffffff/300x180.png?text=Vue+Image+2'</span><span class="text-white">,</span>
  <span class="text-green-300">'https://placehold.jp/F59E0B/ffffff/350x210.png?text=Vue+Image+3'</span>
<span class="text-white">]</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeImage</span><span class="text-white">() {</span>
  <span class="text-blue-300">imageIndex</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">imageIndex</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=== </span><span class="text-orange-300">3</span> <span class="text-white">? </span><span class="text-orange-300">1</span> <span class="text-white">: </span><span class="text-blue-300">imageIndex</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">+ </span><span class="text-orange-300">1</span>
  <span class="text-blue-300">imageUrl</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-blue-300">sampleImages</span><span class="text-white">[</span><span class="text-blue-300">imageIndex</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">- </span><span class="text-orange-300">1</span><span class="text-white">]</span>
  <span class="text-blue-300">altText</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">`示例圖片 </span><span class="text-cyan-300">${imageIndex.value}</span><span class="text-green-300">`</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;img</span>
    <span class="text-cyan-300">v-bind:src</span><span class="text-white">=</span><span class="text-green-300">"imageUrl"</span>
    <span class="text-cyan-300">v-bind:alt</span><span class="text-white">=</span><span class="text-green-300">"altText"</span> 
    <span class="text-cyan-300">v-bind:title</span><span class="text-white">=</span><span class="text-green-300">"titleText"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"rounded-lg border shadow-sm"</span>
  <span class="text-red-400">/&gt;</span>
  
  <span class="text-gray-500">&lt;!-- 或使用簡寫語法 --&gt;</span>
  <span class="text-red-400">&lt;img</span>
    <span class="text-cyan-300">:src</span><span class="text-white">=</span><span class="text-green-300">"imageUrl"</span>
    <span class="text-cyan-300">:alt</span><span class="text-white">=</span><span class="text-green-300">"altText"</span>
    <span class="text-cyan-300">:title</span><span class="text-white">=</span><span class="text-green-300">"titleText"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"rounded-lg border shadow-sm"</span>
  <span class="text-red-400">/&gt;</span>
  
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeImage"</span><span class="text-red-400">&gt;</span>
    更換圖片 (當前: <span class="text-purple-300">{{ imageIndex }}</span>)
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 連結屬性綁定 -->
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-semibold text-green-800 mb-3">2. 連結屬性綁定</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 連結展示 -->
          <div class="text-center">
            <a
              v-bind:href="linkUrl"
              v-bind:title="titleText"
              @click.prevent="(e) => e.preventDefault()"
              class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 no-underline"
            >
              {{ linkType.toUpperCase() }} 連結
            </a>
            <div class="text-sm text-gray-600 mt-2">
              <div>href: {{ linkUrl }}</div>
              <div>title: {{ titleText }}</div>
            </div>
          </div>

          <!-- 控制按鈕 -->
          <div class="space-y-3">
            <button
              @click="changeLink"
              class="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              切換連結類型 ({{ linkType }})
            </button>

            <div class="bg-white p-3 rounded border">
              <div class="text-sm font-medium mb-2 text-gray-500">HTML 輸出：</div>
              <code class="text-xs text-green-600 block break-all">
                &lt;a href="{{ linkUrl }}" title="{{ titleText }}"&gt;{{ linkType.toUpperCase() }} 連結&lt;/a&gt;
              </code>
            </div>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-green-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 連結屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">linkUrl</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'#'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">titleText</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'這是動態標題'</span><span class="text-white">)</span>
<span class="text-pink-400">const</span> <span class="text-blue-300">linkType</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">(</span><span class="text-green-300">'home'</span><span class="text-white">)</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeLink</span><span class="text-white">() {</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">linkType</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=== </span><span class="text-green-300">'home'</span><span class="text-white">) {</span>
    <span class="text-blue-300">linkType</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'about'</span>
    <span class="text-blue-300">linkUrl</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'#about'</span>
    <span class="text-blue-300">titleText</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'關於我們頁面'</span>
    <span class="text-pink-400">return</span>
  <span class="text-white">}</span>

  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">linkType</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=== </span><span class="text-green-300">'about'</span><span class="text-white">) {</span>
    <span class="text-blue-300">linkType</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'contact'</span>
    <span class="text-blue-300">linkUrl</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'#contact'</span>
    <span class="text-blue-300">titleText</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'聯絡我們頁面'</span>
    <span class="text-pink-400">return</span>
  <span class="text-white">}</span>

  <span class="text-blue-300">linkType</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'home'</span>
  <span class="text-blue-300">linkUrl</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'#home'</span>
  <span class="text-blue-300">titleText</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">=</span> <span class="text-green-300">'首頁連結'</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;a</span>
    <span class="text-cyan-300">v-bind:href</span><span class="text-white">=</span><span class="text-green-300">"linkUrl"</span>
    <span class="text-cyan-300">v-bind:title</span><span class="text-white">=</span><span class="text-green-300">"titleText"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"inline-block px-4 py-2 bg-green-600 text-white rounded"</span>
  <span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ linkType.toUpperCase() }}</span> 連結
  <span class="text-red-400">&lt;/a&gt;</span>
  
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeLink"</span><span class="text-red-400">&gt;</span>
    切換連結類型 (<span class="text-purple-300">{{ linkType }}</span>)
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 表單屬性綁定 -->
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-semibold text-purple-800 mb-3">3. 表單屬性綁定</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 表單 -->
          <div class="space-y-3 text-black">
            <!-- name 欄位 -->
            <div>
              <input
                v-bind:type="formData[0].formType"
                v-bind:placeholder="formData[0].formPlaceholder"
                v-model="formData[0].formValue"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <!-- email 欄位 -->
            <div>
              <input
                v-bind:type="formData[1].formType"
                v-bind:placeholder="formData[1].formPlaceholder"
                v-model="formData[1].formValue"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <!-- 控制面板 -->
          <div class="space-y-3">
            <button
              @click="changeFirstFieldType"
              class="block w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              切換 Text/Password ({{ formData[0].formType }})
            </button>

            <button
              @click="changePlaceholders"
              class="block w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              中英文切換
            </button>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-purple-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 表單屬性綁定
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">formData</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">([</span>
  <span class="text-white">{</span>
    <span class="text-cyan-300">formName</span><span class="text-white">: </span><span class="text-green-300">'name'</span><span class="text-white">,</span>
    <span class="text-cyan-300">formType</span><span class="text-white">: </span><span class="text-green-300">'text'</span><span class="text-white">,</span>
    <span class="text-cyan-300">formValue</span><span class="text-white">: </span><span class="text-green-300">''</span><span class="text-white">,</span>
    <span class="text-cyan-300">formPlaceholder</span><span class="text-white">: </span><span class="text-green-300">'請輸入姓名...'</span>
  <span class="text-white">},</span>
  <span class="text-white">{</span>
    <span class="text-cyan-300">formName</span><span class="text-white">: </span><span class="text-green-300">'email'</span><span class="text-white">,</span>
    <span class="text-cyan-300">formType</span><span class="text-white">: </span><span class="text-green-300">'email'</span><span class="text-white">,</span>
    <span class="text-cyan-300">formValue</span><span class="text-white">: </span><span class="text-green-300">''</span><span class="text-white">,</span>
    <span class="text-cyan-300">formPlaceholder</span><span class="text-white">: </span><span class="text-green-300">'請輸入電子郵件'</span>
  <span class="text-white">}</span>
<span class="text-white">])</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changeFirstFieldType</span><span class="text-white">() {</span>
  <span class="text-gray-500">// 只在 text 和 password 之間切換</span>
  <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">[</span><span class="text-orange-300">0</span><span class="text-white">].</span><span class="text-cyan-300">formType</span> <span class="text-white">=== </span><span class="text-green-300">'text'</span><span class="text-white">) {</span>
    <span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">[</span><span class="text-orange-300">0</span><span class="text-white">].</span><span class="text-cyan-300">formType</span> <span class="text-white">=</span> <span class="text-green-300">'password'</span>
    <span class="text-pink-400">return</span>
  <span class="text-white">}</span>
  
  <span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">[</span><span class="text-orange-300">0</span><span class="text-white">].</span><span class="text-cyan-300">formType</span> <span class="text-white">=</span> <span class="text-green-300">'text'</span>
<span class="text-white">}</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">changePlaceholders</span><span class="text-white">() {</span>
  <span class="text-gray-500">// 中英文 placeholder 對照表</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">chineseToEnglish</span> <span class="text-white">= {</span>
    <span class="text-green-300">'請輸入姓名...'</span><span class="text-white">: </span><span class="text-green-300">'Please enter your name...'</span><span class="text-white">,</span>
    <span class="text-green-300">'請輸入電子郵件'</span><span class="text-white">: </span><span class="text-green-300">'Please enter your email'</span>
  <span class="text-white">}</span>
  
  <span class="text-pink-400">const</span> <span class="text-blue-300">englishToChinese</span> <span class="text-white">= {</span>
    <span class="text-green-300">'Please enter your name...'</span><span class="text-white">: </span><span class="text-green-300">'請輸入姓名...'</span><span class="text-white">,</span>
    <span class="text-green-300">'Please enter your email'</span><span class="text-white">: </span><span class="text-green-300">'請輸入電子郵件'</span>
  <span class="text-white">}</span>
  
  <span class="text-gray-500">// 切換所有欄位的 placeholder</span>
  <span class="text-blue-300">formData</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-yellow-300">forEach</span><span class="text-white">(</span><span class="text-blue-300">field</span> <span class="text-white">=&gt; {</span>
    <span class="text-pink-400">if</span> <span class="text-white">(</span><span class="text-blue-300">chineseToEnglish</span><span class="text-white">[</span><span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span><span class="text-white">]) {</span>
      <span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span> <span class="text-white">=</span> <span class="text-blue-300">chineseToEnglish</span><span class="text-white">[</span><span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span><span class="text-white">]</span>
    <span class="text-white">} </span><span class="text-pink-400">else if</span> <span class="text-white">(</span><span class="text-blue-300">englishToChinese</span><span class="text-white">[</span><span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span><span class="text-white">]) {</span>
      <span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span> <span class="text-white">=</span> <span class="text-blue-300">englishToChinese</span><span class="text-white">[</span><span class="text-blue-300">field</span><span class="text-white">.</span><span class="text-cyan-300">formPlaceholder</span><span class="text-white">]</span>
    <span class="text-white">}</span>
  <span class="text-white">})</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- name 欄位 --&gt;</span>
  <span class="text-red-400">&lt;input</span>
    <span class="text-cyan-300">v-bind:type</span><span class="text-white">=</span><span class="text-green-300">"formData[0].formType"</span>
    <span class="text-cyan-300">v-bind:placeholder</span><span class="text-white">=</span><span class="text-green-300">"formData[0].formPlaceholder"</span>
    <span class="text-cyan-300">v-model</span><span class="text-white">=</span><span class="text-green-300">"formData[0].formValue"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"w-full px-3 py-2 border rounded"</span>
  <span class="text-red-400">/&gt;</span>

  <span class="text-gray-500">&lt;!-- email 欄位 --&gt;</span>
  <span class="text-red-400">&lt;input</span>
    <span class="text-cyan-300">v-bind:type</span><span class="text-white">=</span><span class="text-green-300">"formData[1].formType"</span>
    <span class="text-cyan-300">v-bind:placeholder</span><span class="text-white">=</span><span class="text-green-300">"formData[1].formPlaceholder"</span>
    <span class="text-cyan-300">v-model</span><span class="text-white">=</span><span class="text-green-300">"formData[1].formValue"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"w-full px-3 py-2 border rounded"</span>
  <span class="text-red-400">/&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changeFirstFieldType"</span><span class="text-red-400">&gt;</span>
    切換 Text/Password (<span class="text-purple-300">{{ formData[0].formType }}</span>)
  <span class="text-red-400">&lt;/button&gt;</span>
  
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"changePlaceholders"</span><span class="text-red-400">&gt;</span>
    中英文切換
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 動態樣式屬性 -->
    <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <h4 class="font-semibold text-orange-800 mb-3">4. 動態樣式屬性</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 樣式展示 -->
          <div class="text-center">
            <div class="p-4 border-2 border-gray-300 rounded-lg bg-white">
              <p v-bind:style="{
                color: dynamicStyles.color,
                fontSize: dynamicStyles.fontSize,
                fontWeight: dynamicStyles.fontWeight,
                textDecoration: dynamicStyles.textDecoration,
              }">
                動態樣式文字展示
              </p>
            </div>
          </div>

          <!-- 控制面板 -->
          <div class="space-y-3">
            <button
              @click="updateDynamicStyles"
              class="block w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              更新樣式
            </button>

            <div class="bg-white p-3 rounded border">
              <div class="text-sm font-medium mb-2 text-gray-500">當前樣式：</div>
              <div class="text-xs space-y-1">
                <div :style="{ color: dynamicStyles.color }">color: {{ dynamicStyles.color }}</div>
                <div :style="{ color: dynamicStyles.color }">fontSize: {{ dynamicStyles.fontSize }}</div>
                <div :style="{ color: dynamicStyles.color }">fontWeight: {{ dynamicStyles.fontWeight }}</div>
                <div :style="{ color: dynamicStyles.color }">textDecoration: {{ dynamicStyles.textDecoration }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-orange-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 動態樣式屬性
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">dynamicStyles</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">color</span><span class="text-white">: </span><span class="text-green-300">'#3b82f6'</span><span class="text-white">,</span>
  <span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-green-300">'16px'</span><span class="text-white">,</span>
  <span class="text-cyan-300">fontWeight</span><span class="text-white">: </span><span class="text-green-300">'normal'</span><span class="text-white">,</span>
  <span class="text-cyan-300">textDecoration</span><span class="text-white">: </span><span class="text-green-300">'none'</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">updateDynamicStyles</span><span class="text-white">() {</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">colors</span> <span class="text-white">= [</span><span class="text-green-300">'#3b82f6'</span><span class="text-white">, </span><span class="text-green-300">'#10b981'</span><span class="text-white">, </span><span class="text-green-300">'#f59e0b'</span><span class="text-white">, </span><span class="text-green-300">'#ef4444'</span><span class="text-white">, </span><span class="text-green-300">'#8b5cf6'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">sizes</span> <span class="text-white">= [</span><span class="text-green-300">'14px'</span><span class="text-white">, </span><span class="text-green-300">'16px'</span><span class="text-white">, </span><span class="text-green-300">'18px'</span><span class="text-white">, </span><span class="text-green-300">'20px'</span><span class="text-white">, </span><span class="text-green-300">'24px'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">weights</span> <span class="text-white">= [</span><span class="text-green-300">'normal'</span><span class="text-white">, </span><span class="text-green-300">'bold'</span><span class="text-white">, </span><span class="text-green-300">'100'</span><span class="text-white">, </span><span class="text-green-300">'500'</span><span class="text-white">, </span><span class="text-green-300">'900'</span><span class="text-white">]</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">decorations</span> <span class="text-white">= [</span><span class="text-green-300">'none'</span><span class="text-white">, </span><span class="text-green-300">'underline'</span><span class="text-white">, </span><span class="text-green-300">'line-through'</span><span class="text-white">, </span><span class="text-green-300">'overline'</span><span class="text-white">]</span>

  <span class="text-pink-400">const</span> <span class="text-blue-300">colorIndex</span> <span class="text-white">=</span> <span class="text-blue-300">colors</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">dynamicStyles</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">color</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">sizeIndex</span> <span class="text-white">=</span> <span class="text-blue-300">sizes</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">dynamicStyles</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">fontSize</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">weightIndex</span> <span class="text-white">=</span> <span class="text-blue-300">weights</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">dynamicStyles</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">fontWeight</span><span class="text-white">)</span>
  <span class="text-pink-400">const</span> <span class="text-blue-300">decorationIndex</span> <span class="text-white">=</span> <span class="text-blue-300">decorations</span><span class="text-white">.</span><span class="text-yellow-300">indexOf</span><span class="text-white">(</span><span class="text-blue-300">dynamicStyles</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">.</span><span class="text-cyan-300">textDecoration</span><span class="text-white">)</span>

  <span class="text-blue-300">dynamicStyles</span><span class="text-white">.</span><span class="text-cyan-300">value</span> <span class="text-white">= {</span>
    <span class="text-cyan-300">color</span><span class="text-white">: </span><span class="text-blue-300">colors</span><span class="text-white">[(</span><span class="text-blue-300">colorIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">colors</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">],</span>
    <span class="text-cyan-300">fontSize</span><span class="text-white">: </span><span class="text-blue-300">sizes</span><span class="text-white">[(</span><span class="text-blue-300">sizeIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">sizes</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">],</span>
    <span class="text-cyan-300">fontWeight</span><span class="text-white">: </span><span class="text-blue-300">weights</span><span class="text-white">[(</span><span class="text-blue-300">weightIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">weights</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">],</span>
    <span class="text-cyan-300">textDecoration</span><span class="text-white">: </span><span class="text-blue-300">decorations</span><span class="text-white">[(</span><span class="text-blue-300">decorationIndex</span> <span class="text-white">+ </span><span class="text-orange-300">1</span><span class="text-white">) % </span><span class="text-blue-300">decorations</span><span class="text-white">.</span><span class="text-cyan-300">length</span><span class="text-white">]</span>
  <span class="text-white">}</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-red-400">&lt;div</span> <span class="text-cyan-300">v-bind:style</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">    color: dynamicStyles.color,</span>
<span class="text-green-300">    fontSize: dynamicStyles.fontSize,</span>
<span class="text-green-300">    fontWeight: dynamicStyles.fontWeight,</span>
<span class="text-green-300">    textDecoration: dynamicStyles.textDecoration,</span>
<span class="text-green-300">    padding: '16px',</span>
<span class="text-green-300">    border: '2px solid #d1d5db',</span>
<span class="text-green-300">    borderRadius: '8px',</span>
<span class="text-green-300">    backgroundColor: '#ffffff'</span>
<span class="text-green-300">  }"</span><span class="text-red-400">&gt;</span>
    動態樣式文字展示
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"updateDynamicStyles"</span><span class="text-red-400">&gt;</span>
    更新樣式
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 條件屬性綁定 -->
    <div class="p-4 bg-pink-50 border border-pink-200 rounded-lg">
      <h4 class="font-semibold text-pink-800 mb-3">5. 條件屬性綁定（二元判斷）</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 條件展示 -->
          <div class="space-y-3">
            <a
              href="#"
              :disabled="conditionalProps.isDisabled"
              :class="{
                'opacity-50 cursor-not-allowed': conditionalProps.isDisabled,
                'text-blue-600 hover:text-blue-800': !conditionalProps.isDisabled
              }"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded hover:border-gray-400 no-underline text-blue-600 hover:text-blue-800 bg-white disabled:text-gray-800"
            >
              連結
            </a>

            <div class="text-xs text-gray-600 space-y-1 bg-white p-4 rounded-lg border border-gray-300">
              <div>禁用狀態: {{ conditionalProps.isDisabled ? '是' : '否' }}</div>
            </div>
          </div>

          <!-- 控制開關 -->
          <div class="space-y-3">
            <button
              @click="toggleConditional('isDisabled')"
              class="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {{ conditionalProps.isDisabled ? '啟用連結' : '禁用連結' }}
            </button>
          </div>
        </div>

        <!-- 範例程式碼 -->
        <div class="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-lg">
          <h5 class="text-sm font-semibold text-pink-300 mb-3 flex items-center">
            <span class="mr-2">📝</span>程式碼範例 - 條件屬性綁定（二元判斷）
          </h5>
          <pre class="text-xs overflow-x-auto leading-relaxed"><code><span class="text-purple-400">&lt;script setup&gt;</span>
<span class="text-pink-400">import</span> <span class="text-yellow-300">{ ref }</span> <span class="text-pink-400">from</span> <span class="text-green-300">'vue'</span>

<span class="text-pink-400">const</span> <span class="text-blue-300">conditionalProps</span> <span class="text-white">=</span> <span class="text-yellow-300">ref</span><span class="text-white">({</span>
  <span class="text-cyan-300">isDisabled</span><span class="text-white">: </span><span class="text-orange-300">false</span>
<span class="text-white">})</span>

<span class="text-pink-400">function</span> <span class="text-yellow-300">toggleConditional</span><span class="text-white">(</span><span class="text-blue-300">prop</span><span class="text-white">) {</span>
  <span class="text-blue-300">conditionalProps</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">[</span><span class="text-blue-300">prop</span><span class="text-white">] = !</span><span class="text-blue-300">conditionalProps</span><span class="text-white">.</span><span class="text-cyan-300">value</span><span class="text-white">[</span><span class="text-blue-300">prop</span><span class="text-white">]</span>
<span class="text-white">}</span>
<span class="text-purple-400">&lt;/script&gt;</span>

<span class="text-purple-400">&lt;template&gt;</span>
  <span class="text-gray-500">&lt;!-- disabled 屬性與 class 物件的二元判斷 --&gt;</span>
  <span class="text-red-400">&lt;a</span>
    <span class="text-cyan-300">href</span><span class="text-white">=</span><span class="text-green-300">"#"</span>
    <span class="text-cyan-300">:disabled</span><span class="text-white">=</span><span class="text-green-300">"conditionalProps.isDisabled"</span>
    <span class="text-cyan-300">:class</span><span class="text-white">=</span><span class="text-green-300">"{</span>
<span class="text-green-300">      'opacity-50 cursor-not-allowed': conditionalProps.isDisabled,</span>
<span class="text-green-300">      'text-blue-600 hover:text-blue-800': !conditionalProps.isDisabled</span>
<span class="text-green-300">    }"</span>
    <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"inline-flex items-center px-4 py-2 border rounded bg-white"</span>
  <span class="text-red-400">&gt;</span>
    連結
  <span class="text-red-400">&lt;/a&gt;</span>

  <span class="text-gray-500">&lt;!-- 顯示狀態的二元判斷 --&gt;</span>
  <span class="text-red-400">&lt;div</span> <span class="text-cyan-300">class</span><span class="text-white">=</span><span class="text-green-300">"text-xs text-gray-600 bg-white p-4 rounded-lg border"</span><span class="text-red-400">&gt;</span>
    禁用狀態: <span class="text-purple-300">{{ conditionalProps.isDisabled ? '是' : '否' }}</span>
  <span class="text-red-400">&lt;/div&gt;</span>

  <span class="text-gray-500">&lt;!-- 動態按鈕文字使用二元判斷 --&gt;</span>
  <span class="text-red-400">&lt;button</span> <span class="text-cyan-300">@click</span><span class="text-white">=</span><span class="text-green-300">"toggleConditional('isDisabled')"</span><span class="text-red-400">&gt;</span>
    <span class="text-purple-300">{{ conditionalProps.isDisabled ? '啟用連結' : '禁用連結' }}</span>
  <span class="text-red-400">&lt;/button&gt;</span>
<span class="text-purple-400">&lt;/template&gt;</span></code></pre>
        </div>
      </div>
    </div>

    <!-- 語法對照 -->
    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">📋 v-bind 語法總結</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">用法</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">語法</th>
              <th class="border border-gray-300 px-3 py-2 text-left text-gray-800">說明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">完整語法</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-blue-600">v-bind:src="imageUrl"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">綁定任何 HTML 屬性</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">簡寫語法</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-green-600">:src="imageUrl"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">省略 v-bind，更簡潔</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">條件綁定</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-purple-600">:title="condition ? value :
                undefined"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">根據條件決定是否綁定</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-3 py-2 font-medium text-gray-800">樣式綁定</td>
              <td class="border border-gray-300 px-3 py-2 font-mono text-orange-600">:style="{ color: 'red' }"</td>
              <td class="border border-gray-300 px-3 py-2 text-gray-800">動態綁定內聯樣式</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 說明文字 -->
    <div class="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h5 class="font-semibold text-yellow-800 mb-2">💡 重點說明：</h5>
      <ul class="space-y-1">
        <li>• <code class="bg-yellow-100 px-1 rounded">v-bind</code> 可以綁定任何 HTML 屬性到響應式資料</li>
        <li>• 簡寫語法 <code class="bg-yellow-100 px-1 rounded">:</code> 更常用，程式碼更簡潔</li>
        <li>• 綁定的值是 <strong>JavaScript 表達式</strong>，可以使用變數、函式、運算等</li>
        <li>• 當綁定的值為 <code class="bg-yellow-100 px-1 rounded">null</code> 或 <code
            class="bg-yellow-100 px-1 rounded">undefined</code> 時，該屬性會被移除</li>
        <li>• 這是 Vue 響應式系統的基礎，屬性會隨資料變化自動更新</li>
      </ul>
    </div>
  </div>
</template>