# Panel面板

## 示例

:::demo panel示例
```html
<l-panel title="基本信息" :data="data" :items="items"></l-panel>
<script>
  export default {
    data() {
      return {
        data: {
            name: '张三',
            sex: '男',
            type: '区域二',
            fee: '100.00',
            date: '2021-3-21'
        },
        items: [{
            key: 'name',
            label: '姓名',
        },{
            key: 'sex',
            label: '性别'
        },{
            key: 'type',
            label: '区域',
        },{
            key: 'fee',
            label: '费用',
        },{
            key: 'date',
            label: '日期',
        }]
      }
    },
    methods: {
        updateItemValue(key, value){
            console.log('updateItemValue', key, value)
            this.form[key] = value
        },
      onSubmit(model) {
        console.log('submit!', model);
      }
    }
  }
</script>
```
:::