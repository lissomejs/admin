<template>
    <el-menu
        :default-active="activeIndex"
        :default-openeds="openedSubMenus"
        router
    >
        <template v-for="menu in menus">
            <el-menu-item
                v-if="!menu.children"
                :key="menu.name"
                :index="menu.name"
                :route="menu"
            >
                <i class="el-icon-s-home" />
                <span>{{ menu.meta.title }}</span>
            </el-menu-item>
            <el-submenu v-else :key="menu.name" :index="menu.name">
                <template #title>
                    <i class="el-icon-menu" />
                    <span>{{ menu.meta.title }}</span>
                </template>
                <el-menu-item
                    v-for="sub in menu.children"
                    :key="sub.name"
                    :index="sub.name"
                    :route="sub"
                >
                    {{ sub.meta.title }}
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
    name: 'AppMenu',
    setup: () => {
        const router = useRouter();
        const { routes: menus } = router.options;
        const route = useRoute();
        const { name: activeIndex } = toRefs(route);
        const openedSubMenus: Array<string> = [];

        return { menus, activeIndex, openedSubMenus };
    },
});
</script>
