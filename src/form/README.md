# Form 表单

## 示例

:::demo 通过items配置表单项
```html
<div style="margin-bottom: 10px;">
每行列数：<el-input v-model="columnsCount" type="number" />
</div>
<div style="margin-bottom: 10px;">
提交按钮：<el-switch v-model="actionsShow"></el-switch>
</div>
<div style="margin-bottom: 20px;">
按钮位置：<l-select v-model="actionDirection" :items="actionDirections"></l-select>
</div>
<l-form ref="form" :model="form" :actions-show="actionsShow" :items="items" :action-direction="actionDirection" :columns-count="+columnsCount" @updateItemValue="updateItemValue" @submit="onSubmit">
    <div>测试一下</div>
</l-form>
<script>
  export default {
    data() {
      return {
        columnsCount: 1,
        actionsShow: true,
        actionDirection: 'right',
        actionDirections: [{
            value: 'right',
            label: '右侧'
        },{
            value: 'center',
            label: '中间'
        },{
            value: 'left',
            label: '左侧'
        }],
        form: {
          name: '好',
          agree: false,
          sex: 0,
          type: '',
          fee: '',
        },
        items: [{
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

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string)

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

### Form-Item Scoped Slot
|  name  |   说明  |
|--------|--------|
|  error | 自定义表单校验信息的显示方式，参数为 { error } |

### Form-Item Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -
| clearValidate | 移除该表单项的校验结果 | -
