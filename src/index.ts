import { version } from '../package.json'
import { App, Component } from 'vue'
import { components } from './packages'
import { useGlobalConfig, type GlobalConfig } from './hooks/use-config'
import './style/index.scss'

const install = (app: App, options: GlobalConfig) => {
    components.forEach(component => {
        if (!component || typeof component === 'string') return

        app.component((component as Component).name || '', component as Component)

        const { updateGlobalConfig } = useGlobalConfig()

        updateGlobalConfig(options)
    })
}

export { GlobalConfig }

export default {
    version,
    install,
}

export * from './packages'
