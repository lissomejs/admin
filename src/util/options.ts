import { AxiosRequestConfig } from 'axios'

export interface Options {
    request: (config: AxiosRequestConfig) => Promise<any>
}

let options: Options

export const setOptions = (nextOptions: Options) => options = nextOptions
export const getOption = (key: keyof Options) => options[key]
