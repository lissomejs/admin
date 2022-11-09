import { App } from 'vue'
export type Data<T = any> = Record<string, T>

// Group类组件通用类型
interface ItemCommonProps {
    key?: string
    label: string
    value?: string
}

export type GroupItemProps<T = Data> = T & ItemCommonProps

export * from '../src/index'

type LissomeAdmin = {
    version: string
    install(Vue: App): void
}

export default LissomeAdmin
