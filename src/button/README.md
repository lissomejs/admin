# 按钮组件

## 示例

:::demo 按钮示例，有`href`属性时，用el-link包裹
```html
<l-button type="primary" icon="plus">按钮</l-button>
<l-button href="mailto: haozhenjia@guazi.com">发邮件</l-button>
<l-button type="warning" href="tel:15210665018">打电话</l-button>
<l-button type="danger" confirm-title="确认删除？" confirmable @confirm="console.log(123)">删除</l-button>
```
:::

## 属性

| 属性 | 类型 | 说明 |
| -- | -- | -- |
|`type` | `String`| 类型, 同`el-button`的`type`。可选值primary / success / warning / danger / info / text |
|`nativeType` | `String`| 原生`type`属性，同`el-button`的`nativeType`, 可选值button / submit / reset |
|`href` | `String`| 跳转链接，有此属性时，用`el-link`包裹`el-button`，并且`click`事件失效 |
|`size` | `String`| 按钮尺寸，可选值medium / small / mini |
|`confirmable` | `Boolean`| 是否可确认，为`true`时，将打开一个`Popconfirm`，并触发`confirm`事件，`click`事件失效 |
|`confirmTitle` | `String`| `Popconfirm`的内容，默认为`'确定此操作？'` |
|`confirmButtonText` | `String`| 确定按钮文案，默认为`'确定'` |
|`cancelButtonText` | `String`| 取消按钮文案，默认为`'取消'` |

## 事件

| 事件名  | 说明 |
| -- |  -- |
|`click` | 点击按钮后触发该事件，在配置`href`或`confirmable`时无效 |
|`confirm` | `confirmable`为`true`时，点击确认弹窗的确定按钮之后会触发该事件 |