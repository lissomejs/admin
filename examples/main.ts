import { createApp } from 'vue'
import * as Vue from 'vue'
import ElementPlus from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'normalize.css'
import 'highlight.js/styles/github.css'

import 'element-plus/dist/index.css'

import App from './App.vue'
import './assets/styles/common.css'
import router from './router'
import LissomeAdmin, { GlobalConfig } from '../src/index'
import DemoBlock from './components/DemoBlock.vue'
import { axios } from './util/net'

window.Vue = Vue

const app = createApp(App)

app.component('DemoBlock', DemoBlock)

app.use(ElementPlus, {
    locale: lang,
})
app.use(LissomeAdmin, {
    fetch: axios,
} as GlobalConfig)
app.use(router)

app.mount('#app')
