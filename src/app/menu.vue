<template>
    <el-menu :default-active="activeIndex" :default-openeds="openedSubMenus" router>
        <template v-for="menu in menus" :key="menu.key">
            <el-menu-item v-if="!menu.subs || !menu.subs.length" :index="menu.key" :route="menu.route">
                <span>{{ menu.label }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="menu.key">
                <template #title>
                    <span>{{ menu.label }}</span>
                </template>
                <el-menu-item
                    v-for="sub in menu.subs"
                    :key="sub.key"
                    :index="sub.key"
                    :route="sub.route"
                >
                    <span>{{ sub.label }}</span>
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
    route: RouteRecord
    subs?: Menus
}

type Menus = Array<MenuItem>

const generateMenuFormRoutes = (routes: RouteRecordList): Menus => routes
    ?.filter( route => route.meta?.isMenu !== false )
    ?.map( route => ({
        label: route.meta?.title || '未命名菜单',
        key: route.name,
        route,
        subs: route.children?.length ? generateMenuFormRoutes(route.children) : undefined,
    }))

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
        const menus = computed(() => generateMenuFormRoutes(props.routes))
        const openedSubMenus: Array<string> = []
        const activeIndex = computed( () =>  props.currentRoute?.name)

        return { activeIndex, openedSubMenus, menus }
    },
})
</script>
