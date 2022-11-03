# Stack堆叠

:::demo 纵向时，容器高度为100%，最后一个子节点默认`flex: 1`
```html
<h3>横向</h3>

<l-stack>
    <div class="demo-item"></div>
    <div class="demo-item"></div>
</l-stack>
<h3>纵向</h3>
<div style="height: 300px">
    <l-stack direction="vertical">
        <div class="demo-item"></div>
        <div class="demo-item"></div>
    </l-stack>
</div>
```