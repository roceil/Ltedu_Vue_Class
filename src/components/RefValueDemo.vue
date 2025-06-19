<script lang="ts" setup>
import { ref } from 'vue'

// 響應式狀態
const message = ref('Hello World')
const count = ref(0)
const user = ref({
  name: '小明',
  email: 'xiaoming@example.com'
})

// 操作日誌
const operationLog = ref<string[]>([])

const addToLog = (operation: string) => {
  operationLog.value.unshift(`${new Date().toLocaleTimeString()}: ${operation}`)
}

// 在 script 中需要使用 .value 的操作
const updateMessageInScript = () => {
  // 使用 early return 寫法
  if (message.value === 'Hello World') {
    message.value = 'Vue is Awesome!'
    addToLog(`Script 中更新 message.value = "Vue is Awesome!"`)
    return
  }

  message.value = 'Hello World'
  addToLog(`Script 中更新 message.value = "Hello World"`)
}

const incrementInScript = () => {
  // ✅ 正確：在 script 中使用 .value
  count.value++
  addToLog(`Script 中執行 count.value++ (現在是 ${count.value})`)
}

const decrementInScript = () => {
  // 使用 early return 寫法
  if (count.value <= 0) {
    addToLog('計數器已經是 0，無法再減少')
    return
  }

  count.value--
  addToLog(`Script 中執行 count.value-- (現在是 ${count.value})`)
}

const updateUserInScript = () => {
  // ✅ 正確：在 script 中修改物件屬性也需要 .value
  const names = ['小紅', '小王', '小李', '小陳']
  const currentName = user.value.name
  const availableNames = names.filter(name => name !== currentName)
  const newName = availableNames[Math.floor(Math.random() * availableNames.length)]

  user.value.name = newName
  addToLog(`Script 中更新 user.value.name = "${newName}"`)
}

const resetAll = () => {
  // ✅ 正確：重置時也需要 .value
  message.value = 'Hello World'
  count.value = 0
  user.value = { name: '小明', email: 'xiaoming@example.com' }
  addToLog('Script 中重置所有值')
}

// 直接在模板中使用（不需要 .value）的示例函數
const getCountStatus = () => {
  // 使用 early return 寫法
  if (count.value === 0) return '歸零狀態'
  if (count.value > 0) return '正數狀態'
  return '負數狀態'
}

const clearLog = () => {
  operationLog.value = []
}
</script>

<template>
  <div class="space-y-8">
    <!-- 介紹說明 -->
    <div class="p-6 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 class="text-2xl font-bold text-orange-800 mb-4">🔧 .value 存取方式演示</h3>
      <p class="text-orange-700 mb-4">
        理解 Ref 的 .value 語法是 Vue 3 的關鍵概念。在 <code class="bg-orange-200 px-2 py-1 rounded">script</code> 中必須使用 <code
          class="bg-orange-200 px-2 py-1 rounded"
        >.value</code>，但在 <code class="bg-orange-200 px-2 py-1 rounded">template</code> 中會自動解包。
      </p>
    </div>

    <!-- Script 中的操作演示 -->
    <div class="space-y-6">
      <h4 class="text-xl font-bold text-gray-300">🔧 Script 中的操作（需要 .value）</h4>

      <!-- 字串操作演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">字串操作演示</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">當前值：</div>
            <div class="text-lg font-mono text-blue-600 mb-4 p-3 bg-blue-50 rounded border">{{ message }}</div>
            <button
              @click="updateMessageInScript"
              class="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              在 Script 中更新字串
            </button>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 在 script 中操作字串 Ref</div>
            <div class="text-yellow-400">const</div> <span class="text-white">updateMessageInScript</span> = () =>
            {<br />
            &nbsp;&nbsp;<div class="text-blue-400">// 使用 early return 寫法</div>
            &nbsp;&nbsp;<div class="text-purple-400">if</div> (message.<span class="text-red-400">value</span> === <span
              class="text-green-300"
            >'Hello World'</span>) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;message.<span class="text-red-400">value</span> = <span class="text-green-300">'Vue
              is Awesome!'</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div><br />
            &nbsp;&nbsp;}<br />
            <br />
            &nbsp;&nbsp;message.<span class="text-red-400">value</span> = <span class="text-green-300">'Hello
              World'</span><br />
            }
          </div>
          <div class="mt-3 text-sm text-orange-600 bg-orange-50 p-3 rounded">
            <strong>重點：</strong> 在 script 中必須使用 <code class="bg-orange-200 px-1 rounded">.value</code> 來存取 Ref 的值
          </div>
        </div>
      </div>

      <!-- 數字操作演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">數字操作演示</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">當前值：</div>
            <div class="text-3xl font-mono text-blue-600 mb-2 text-center p-3 bg-blue-50 rounded border">{{ count }}
            </div>
            <div class="text-sm text-center text-gray-600 mb-4">狀態: {{ getCountStatus() }}</div>
            <div class="flex gap-2">
              <button
                @click="incrementInScript"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                +1 (Script)
              </button>
              <button
                @click="decrementInScript"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                -1 (Script)
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 遞增操作</div>
            <div class="text-yellow-400">const</div> <span class="text-white">incrementInScript</span> = () => {<br />
            &nbsp;&nbsp;count.<span class="text-red-400">value</span>++<br />
            }<br />
            <br />
            <div class="text-blue-400">// 遞減操作（early return）</div>
            <div class="text-yellow-400">const</div> <span class="text-white">decrementInScript</span> = () => {<br />
            &nbsp;&nbsp;<div class="text-purple-400">if</div> (count.<span class="text-red-400">value</span>
            <=
              <span
              class="text-yellow-300"
            >0</span>) {<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-white">addToLog</span>(<span
                class="text-green-300">'無法再減少'</span>)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<div class="text-purple-400">return</div><br />
              &nbsp;&nbsp;}<br />
              <br />
              &nbsp;&nbsp;count.<span class="text-red-400">value</span>--<br />
              }
          </div>
          <div class="mt-3 text-sm text-orange-600 bg-orange-50 p-3 rounded">
            <strong>重點：</strong> 數字運算也需要透過 <code class="bg-orange-200 px-1 rounded">.value</code> 進行
          </div>
        </div>
      </div>

      <!-- 物件操作演示 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">物件操作演示</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">用戶資料：</div>
            <div class="mb-4 p-3 bg-blue-50 rounded border">
              <div class="font-mono text-blue-600">
                <div><strong>姓名:</strong> {{ user.name }}</div>
                <div><strong>信箱:</strong> {{ user.email }}</div>
              </div>
            </div>
            <button
              @click="updateUserInScript"
              class="w-full px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors mb-2"
            >
              在 Script 中更新物件
            </button>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">// 更新物件屬性</div>
            <div class="text-yellow-400">const</div> <span class="text-white">updateUserInScript</span> = () => {<br />
            &nbsp;&nbsp;<div class="text-yellow-400">const</div> <span class="text-white">names</span> = [<span
              class="text-green-300"
            >'小紅'</span>, <span class="text-green-300">'小王'</span>]<br />
            &nbsp;&nbsp;<div class="text-yellow-400">const</div> <span class="text-white">newName</span> = <span
              class="text-white"
            >getRandomName</span>()<br />
            <br />
            &nbsp;&nbsp;<div class="text-blue-400">// 修改物件屬性需要 .value</div>
            &nbsp;&nbsp;user.<span class="text-red-400">value</span>.<span class="text-cyan-400">name</span> = <span
              class="text-white"
            >newName</span><br />
            }<br />
            <br />
            <div class="text-blue-400">// 重置整個物件</div>
            user.<span class="text-red-400">value</span> = { <span class="text-cyan-400">name</span>: <span
              class="text-green-300"
            >'小明'</span> }
          </div>
          <div class="mt-3 text-sm text-orange-600 bg-orange-50 p-3 rounded">
            <strong>重點：</strong> 物件屬性修改和整個物件重新賦值都需要 <code class="bg-orange-200 px-1 rounded">.value</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Template 中的操作演示 -->
    <div class="space-y-6">
      <h4 class="text-xl font-bold text-gray-300">🎨 Template 中的操作（自動解包）</h4>

      <!-- Template 字串操作 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Template 字串操作</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">顯示值：</div>
            <div class="text-lg font-mono text-blue-600 mb-4 p-3 bg-blue-50 rounded border">{{ message }}</div>
            <button
              @click="message = message === 'Hello World' ? 'Template Magic!' : 'Hello World'"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              在 Template 中直接更新
            </button>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">&lt;!-- Template 中顯示 --&gt;</div>
            &lt;<span class="text-red-400">div</span>&gt;&lbrace;&lbrace; message &rbrace;&rbrace;&lt;/<span
              class="text-red-400"
            >div</span>&gt;<br />
            <br />
            <div class="text-blue-400">&lt;!-- Template 中直接修改 --&gt;</div>
            &lt;<span class="text-red-400">button</span><br />
            &nbsp;&nbsp;@<span class="text-yellow-400">click</span>=<span class="text-green-300">"message =
              newValue"</span><br />
            &gt;<br />
            &nbsp;&nbsp;更新訊息<br />
            &lt;/<span class="text-red-400">button</span>&gt;
          </div>
          <div class="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded">
            <strong>重點：</strong> Template 中 <strong>不需要</strong> <code
              class="bg-blue-200 px-1 rounded">.value</code>，Vue 會自動解包
          </div>
        </div>
      </div>

      <!-- Template 數字和條件操作 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">Template 數字操作</h5>

          <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">數字和狀態：</div>
            <div class="text-3xl font-mono text-blue-600 mb-2 text-center p-3 bg-blue-50 rounded border">{{ count }}
            </div>
            <div class="text-sm text-center text-gray-600 mb-4">狀態: {{ getCountStatus() }}</div>
            <div class="flex gap-2 mb-4">
              <button
                @click="count++"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                +1 (Template)
              </button>
              <button
                @click="count > 0 ? count-- : null"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                -1 (Template)
              </button>
            </div>

            <!-- 條件渲染 -->
            <div class="p-3 bg-gray-50 rounded border border-gray-200">
              <div class="text-sm text-gray-600 mb-2">條件渲染：</div>
              <div
                v-if="count === 0"
                class="text-yellow-600 font-medium"
              >🟡 計數器為零</div>
              <div
                v-else-if="count > 0"
                class="text-green-600 font-medium"
              >🟢 計數器為正數</div>
              <div
                v-else
                class="text-red-600 font-medium"
              >🔴 計數器為負數</div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h5 class="text-lg font-semibold text-gray-800 mb-4">📝 程式碼範例</h5>
          <div class="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <div class="text-blue-400">&lt;!-- 數字操作 --&gt;</div>
            &lt;<span class="text-red-400">button</span> @<span class="text-yellow-400">click</span>=<span
              class="text-green-300"
            >"count++"</span>&gt;+1&lt;/<span class="text-red-400">button</span>&gt;<br />
            &lt;<span class="text-red-400">button</span> @<span class="text-yellow-400">click</span>=<span
              class="text-green-300"
            >"count > 0 ? count-- : null"</span>&gt;<br />
            &nbsp;&nbsp;-1<br />
            &lt;/<span class="text-red-400">button</span>&gt;<br />
            <br />
            <div class="text-blue-400">&lt;!-- 條件渲染 --&gt;</div>
            &lt;<span class="text-red-400">div</span> <span class="text-yellow-400">v-if</span>=<span
              class="text-green-300"
            >"count === 0"</span>&gt;歸零&lt;/<span class="text-red-400">div</span>&gt;<br />
            &lt;<span class="text-red-400">div</span> <span class="text-yellow-400">v-else-if</span>=<span
              class="text-green-300"
            >"count > 0"</span>&gt;正數&lt;/<span class="text-red-400">div</span>&gt;<br />
            &lt;<span class="text-red-400">div</span> <span class="text-yellow-400">v-else</span>&gt;負數&lt;/<span
              class="text-red-400"
            >div</span>&gt;
          </div>
          <div class="mt-3 text-sm text-blue-600 bg-blue-50 p-3 rounded">
            <strong>重點：</strong> 事件處理和條件判斷都直接使用變數名，無需 <code class="bg-blue-200 px-1 rounded">.value</code>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center ">
      <button
        @click="resetAll"
        class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium w-full"
      >
        重置所有狀態 (Script 操作)
      </button>
    </div>


    <!-- 重要總結 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 class="text-lg font-semibold text-yellow-800 mb-4">⚠️ Script 中必須使用 .value</h4>
        <ul class="text-sm text-yellow-700 space-y-2">
          <li>• <strong>讀取值：</strong> <code class="bg-yellow-200 px-2 py-1 rounded">const val = ref.value</code></li>
          <li>• <strong>修改值：</strong> <code class="bg-yellow-200 px-2 py-1 rounded">ref.value = newValue</code></li>
          <li>• <strong>物件屬性：</strong> <code class="bg-yellow-200 px-2 py-1 rounded">ref.value.prop = val</code></li>
          <li>• <strong>陣列操作：</strong> <code class="bg-yellow-200 px-2 py-1 rounded">ref.value.push(item)</code></li>
          <li>• <strong>數字運算：</strong> <code class="bg-yellow-200 px-2 py-1 rounded">ref.value++</code></li>
        </ul>
        <div class="mt-4 p-3 bg-yellow-100 rounded">
          <p class="text-sm text-yellow-800">
            <strong>為什麼？</strong> 因為 ref 是一個包裝物件，真正的值存在 <code class="bg-yellow-200 px-1 rounded">.value</code> 屬性中
          </p>
        </div>
      </div>

      <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 class="text-lg font-semibold text-blue-800 mb-4">✨ Template 中自動解包</h4>
        <ul class="text-sm text-blue-700 space-y-2">
          <li>• <strong>顯示值：</strong> <code
              class="bg-blue-200 px-2 py-1 rounded">&lbrace;&lbrace; ref &rbrace;&rbrace;</code></li>
          <li>• <strong>事件處理：</strong> <code class="bg-blue-200 px-2 py-1 rounded">@click="ref = newValue"</code></li>
          <li>• <strong>條件判斷：</strong> <code class="bg-blue-200 px-2 py-1 rounded">v-if="ref > 0"</code></li>
          <li>• <strong>迴圈渲染：</strong> <code class="bg-blue-200 px-2 py-1 rounded">v-for="item in ref"</code></li>
          <li>• <strong>屬性綁定：</strong> <code class="bg-blue-200 px-2 py-1 rounded">:class="ref"</code></li>
        </ul>
        <div class="mt-4 p-3 bg-blue-100 rounded">
          <p class="text-sm text-blue-800">
            <strong>為什麼？</strong> Vue 的編譯器會自動處理 template 中的 ref，無需手動加 <code
              class="bg-blue-200 px-1 rounded">.value</code>
          </p>
        </div>
      </div>
    </div>

    <!-- 學習重點 -->
    <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="text-lg font-semibold text-green-800 mb-4">🎯 學習重點總結</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-white rounded border border-green-200">
          <h5 class="font-semibold text-green-700 mb-2">🧠 記憶口訣</h5>
          <p class="text-sm text-green-600">
            <strong>Script 要加 .value，Template 不用加</strong><br />
            這是 Vue 3 Composition API 的核心規則
          </p>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h5 class="font-semibold text-green-700 mb-2">⚡ 常見錯誤</h5>
          <p class="text-sm text-green-600">
            在 script 中忘記加 <code class="bg-green-200 px-1 rounded">.value</code> 是最常見的錯誤，會導致值無法正確更新
          </p>
        </div>
        <div class="p-4 bg-white rounded border border-green-200">
          <h5 class="font-semibold text-green-700 mb-2">💡 除錯技巧</h5>
          <p class="text-sm text-green-600">
            使用 <code class="bg-green-200 px-1 rounded">console.log(ref.value)</code> 在 script 中檢查 ref 的值
          </p>
        </div>
      </div>
    </div>
  </div>
</template>