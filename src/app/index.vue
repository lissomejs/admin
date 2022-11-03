<template>
    <el-container :class="bem()">
        <el-aside :class="bem('aside')">
            <div :class="bem('logo')">
                <el-image v-if="logo" :class="bem('logo-pic')" :src="logo" />
                <h1 v-if="title">{{ title }}</h1>
            </div>
            <div :class="bem('menu')">
                <l-menu :routes="routes" :current-route="currentRoute" />
            </div>
        </el-aside>
        <el-container>
            <el-header :class="bem('header')" />
            <el-main :class="bem('main')">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LMenu, { RouteRecord, RouteRecordList  } from './menu.vue'
import { createNamespace } from '../util'

const [name, bem] = createNamespace('App')

export default defineComponent({
    name,
    components: { LMenu },
    props: {
        title: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            default: '',
        },
        routes: {
            type: Array as PropType<RouteRecordList>,
            default: () => [],
        },
        currentRoute: {
            type: Object as PropType<RouteRecord>,
        },
    },
    setup(){
        return {
            bem,
        }
    },
})
</script>
