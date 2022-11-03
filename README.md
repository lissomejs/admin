# Lissome Admin

`Lissome Admin`是一个基于[element-plus](https://element-plus.gitee.io/#/zh-CN)封装的，数据驱动的，面向中台系统的业务组件库。

技术栈为`Vue 3.0 + TS`。构建工具为`Vite 2.0`。

## 开发指南

### 本地启动开发环境

#### 启动命令

```sh
# 首次下载请install，推荐使用yarn，目前提交了yarn.lock
yarn dev
# or
npm run dev
```

#### 开发环境

访问开发环境[http://localhost:3000](http://localhost:3000)

### 添加新的基础组件

1. 运行`yarn addComponent`，按照提示输入相关信息
2. 在组件目录下的`README.md`文件用于该组件文档和`demo`的撰写。**该文件会被编译为`Vue`组件，并作为该组件的文档和`demo`显示**

### demo及文档

开发`demo`及文档在组件目录下的`README.md`中书写。采用`markdown-it-container`自动编译`demo`，`demo`内容采用`:::demo`和`:::`包裹

:::demo demo示例，目前仅支持`template`内容
```html
<el-button type="primary">按钮</el-button>
```
:::
