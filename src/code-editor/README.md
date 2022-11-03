# CodeEditor代码编辑器

## 示例

:::demo codeeditor示例
```html
<l-code-editor v-model="value"></l-code-editor>
<script>
import { defineComponent, ref } from 'vue'

export default {
  data(){
      return {
          value: 'var a = 1;'
      }
  }
}
</script>
```
:::