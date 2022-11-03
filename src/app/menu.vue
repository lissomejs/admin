<template>
    <el-menu :default-active="activeIndex" :default-openeds="openedSubMenus" router>
        <template v-for="menu in routes" :key="menu.name">
            <el-menu-item v-if="!menu.children || !menu.children.length" :index="menu.name" :route="menu">
                <span>{{ menu.meta?.title }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="menu.name">
                <template #title>
                    <span>{{ menu.meta?.title }}</span>
                </template>
                <el-menu-item
                    v-for="sub in menu.children"
                    :key="sub.name"
                    :index="sub.name"
                    :route="sub"
                >
                    <span>{{ sub.meta?.title }}</span>
                </el-menu-item>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { createNamespace } from '../util'

interface RouteMeta {
    // 菜单的显示名称
    title: string
    // 标识该路由是否需要在菜单显示
    isMenu?: boolean
}

export interface RouteRecord {
    path: string
    name: string
    meta: RouteMeta
    children: RouteRecordList
}

export type RouteRecordList = Array<RouteRecord>

const [name] = createNamespace('Menu')

type MenuItem = {
    index?: boolean // 是否为首页
    label: string // 菜单文案
    key: string // 路由路径及name
    subs?: Menus
}

type Menus = Array<MenuItem>

export default defineComponent({
    name,
    props: {
        routes: {
            type: Array as PropType<RouteRecordList>,
            default: () => [],
        },
        currentRoute: {
            type: Object as PropType<RouteRecord>,
        },
    },
    setup(props){
        const openedSubMenus: Array<string> = []
        const activeIndex = computed( () =>  props.currentRoute?.name)

        return { activeIndex, openedSubMenus }
    },
})
</script>
