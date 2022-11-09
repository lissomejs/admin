import { AxiosRequestConfig, Method } from 'axios'
import { request } from './net'
import { isString } from '@lissome/util'

type Data<T = any> = {
    [key: string]: T
}

interface ServiceRequestConfig extends AxiosRequestConfig {
    api: string
}

type RequestConfig = string | ServiceRequestConfig


export interface ServiceConfig {
    name: string
    apis?: ApiTypes[]
    others?: RequestConfig[]
}

type Send = (data?: Data) => Promise<Data>

export type ApiTypes = 'add' | 'update' | 'delete' | 'list' | 'info'

export type Service = {
    [api in ApiTypes]?: Send
} & Data<Send>

type APIMethodMap = {
    [api in ApiTypes]: Method
}

const API_METHOD_MAP: APIMethodMap = {
    add: 'POST',
    update: 'POST',
    delete: 'POST',
    list: 'GET',
    info: 'GET',
}

const DEFAULT_APIS: ApiTypes[] = ['add', 'update', 'delete', 'list', 'info']

export function generateService({ name, apis = DEFAULT_APIS, others }: ServiceConfig) {
    const service: Service = {}

    apis.forEach(api => service[api] = data => request({
        url: name + '/' + api,
        method: API_METHOD_MAP[api],
    }, data))

    others?.forEach(other => {
        if (isString(other)) {
            other = {
                api: other,
            }
        }

        const { url } = other

        service[other.api] = (data?: Data) => request({
            ...(other as ServiceRequestConfig),
            url: url || name + '/' + (other as ServiceRequestConfig).api,
            method: 'get',
        }, data)
    })

    return service
}
