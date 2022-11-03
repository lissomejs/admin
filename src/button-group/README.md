# ButtonGroup按钮组

ButtonGroup按钮组分为三种类型：

 * 普通操作型，可用于列表操作列，或者单独使用
 * 按钮组类型，即原来的`ButtonGroup`类型，按钮整体性较强
 * 表单操作类型，用于表单的`footer`，详见[Form 表单](/base/form)

## 普通操作型

:::demo buttongroup示例
```html
<div style="margin-bottom: 10px;">
    <l-radio-group v-model="type" :items="radios"></l-radio-group>
</div>
<l-button-group :items="items" :type="type"></l-button-group>
<script>
  export default {
    data() {
      return {
        type: 'actions',
        items: [{
            key: 'name',
            label: '姓名',
            onClick: this.onClick
        },{
            key: 'agree',
            label: '同意协议',
            type: 'primary',
            onClick: this.onClick
        },{
            key: 'hide',
            label: '不显示',
            type: 'primary',
            show: false
        }],
        radios: [{
            label: '操作型',
            value: 'actions'
        }, {
            label: '按钮组',
            value: 'group'
        }]
      }
    },
    methods: {
      onClick(...args) {
        console.log('onClick', args);
      }
    }
  }
</script>
```
:::