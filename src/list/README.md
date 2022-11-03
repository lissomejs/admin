# List 列表

:::demo 示例
```html
<l-list :fields="fields"></l-list>
<script>
  export default {
    data() {
      return {
        fields: [{
            key: 'name',
            label: '姓名',
            required: true,
        },{
            key: 'agree',
            label: '同意协议',
            type: 'switch',
            disabled: true
        },{
            key: 'sex',
            label: '性别',
            type: 'radio',
            items: [{
                label: '男',
                value: 0
            },{
                label: '女',
                value: 1
            }]
        },{
            key: 'type',
            label: '区域',
            type: 'select',
            items: [{
                    label: '抵押费',
                    value: 1
                },{
                    label: '解押费',
                    value: 2
                }]
        },{
            key: 'fee',
            label: '费用',
            type: 'checkbox',
            items: [{
                    label: '区域一',
                    value: 1
                },{
                    label: '区域二',
                    value: 2
                }]
        },{
            key: 'date',
            label: '日期',
            type: 'date'
        }, {
            key: 'desc',
            label: '描述',
            type: 'textArea',
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

## 属性

| 属性 | 类型 | 说明 |
| -- | -- | -- |
|`title` | `String`| 系统名称 |
