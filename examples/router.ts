import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { kebabCase } from '@lissome/util'
import PageParent from './components/PageParent.vue'
import components from '../components.json'

const routes: [RouteRecordRaw] = [{
    path: '/',
    name: 'index',
    meta: {
        title: '开发指南',
    },
    component: ()=> import('../README.md'),
}]

const componentsRoutes = components.map( ({ type, title, components: componentList }) => {
    const children = componentList.map( ({ component, title }) => ({
        path: kebabCase(component),
        name: `${type}.${component}`,
        meta: { title },
        component: () => import(`../src/${kebabCase(component) }/README.md`),
    } as RouteRecordRaw))

    return {
        path: `/${type}`,
        name: type,
        meta: { title },
        component: PageParent,
        children,
    } as RouteRecordRaw
})

routes.push(...componentsRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

