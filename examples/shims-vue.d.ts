declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, any>, Record<string, any>, any>
    export default component
}
declare module '*.md' {
    import { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}

interface Window {
    Vue: any
}
