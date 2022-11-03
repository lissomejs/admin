# CheckboxGroup复选框组

## 示例

:::demo checkboxgroup示例
```html
<l-checkbox-group v-model="value" :items="items"></l-checkbox-group>
<p>已选值：{{value}}</p>
<script>
  export default {
    data() {
      return {
        value: [],
        items: [{
            value: 1,
            label: '文学',
        },{
            value: 2,
            label: '体育'
        },{
            value: 3,
            label: '音乐',
        }],
      }
    },
  }
</script>
```
:::