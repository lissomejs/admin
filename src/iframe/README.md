# Iframe内联框架

## 示例

:::demo iframe示例
```html
是否为块状：<l-switch v-model="block" style="margin-bottom: 10px"></l-switch>
<l-iframe href="https://element-plus.gitee.io/zh-CN/" :block="block"></l-iframe>

<script>
export default {
    name: 'IframeDemo',
    data() {
        return {
            block: false
        }
    }
}
</script>
```
:::