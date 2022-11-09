import { AxiosRequestConfig } from 'axios'
import { Data } from '../../types'
import { getOption } from './'


export const request = (config: AxiosRequestConfig, data?: Data) => {
    const request = getOption('request')
    const method = config.method?.toLocaleUpperCase()
    let dataConfig = {}
    if (method === 'POST') {
        dataConfig = { data }
    } else if (method === 'GET') {
        dataConfig = { params: data }
    }

    const requestConfig = Object.assign({}, config, dataConfig)

    return request(requestConfig)
}
