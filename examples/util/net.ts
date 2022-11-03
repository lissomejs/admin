import Axios, { AxiosRequestConfig } from 'axios'

const DEFAULT_CONFIG: AxiosRequestConfig = {
    timeout: 5000,
    withCredentials: true,
}

const axios = Axios.create(DEFAULT_CONFIG)

const NEED_LOGIN_CODES = [
    401,
]

const SUCCESS_CODES = [
    0,
]

const needLogin = (code: number): boolean => NEED_LOGIN_CODES.includes(code)

const isSuccess = (code: number): boolean => SUCCESS_CODES.includes(code)


axios.interceptors.request.use(request => request)
axios.interceptors.response.use(response => {
    const { data: responseData } = response
    const { code, data = {} } = (responseData) || {}

    if (needLogin(code)) {
        return console.warn('needLogin with error code', code)
    }

    return isSuccess(code) ? data : Promise.reject(responseData)
})

export {
    axios,
}
