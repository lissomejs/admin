# RadioGroup单选框组

## 示例

:::demo radiogroup示例
```html
<l-radio-group v-model="value" :items="items"></l-radio-group>
<p>已选值：{{value}}</p>
<script>
  export default {
    data() {
      return {
        value: 1,
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