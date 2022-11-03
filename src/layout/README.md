# Layout布局

## 示例

:::demo layout示例
```html
<div class="layout-demo">
    <l-layout :items="items" :render-cell="renderCell"></l-layout>
</div>
<script>
import { h } from 'vue';
export default {
    data() {
      return {
          items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
      }
    },
    methods: {
        renderCell(item, row, col){
            return h('div', {
            }, `第${row + 1}行，第${col + 1}列，内容是：${item}`)
        }
    }
}
</script>
```
:::

### 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| `columnsCount`   | 每行列数 | `Number`      |                  —                |  `4` |
| `rowColCounts`    | 单独配置每行列数 | `Array<number>` | — | — |