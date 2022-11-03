import { reactive } from 'vue'
import { AxiosInstance } from 'axios'

export type GlobalConfig = {
    fetch?: AxiosInstance
}

const globalConfig = reactive({} as GlobalConfig)
const getGlobalConfig = (key: keyof GlobalConfig) => globalConfig[key]
const updateGlobalConfig = (nextConfig: GlobalConfig) => Object.assign(globalConfig, nextConfig)

export function useGlobalConfig(){
    return {
        getGlobalConfig,
        updateGlobalConfig,
    }
}
