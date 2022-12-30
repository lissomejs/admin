import { isFunction, isArray, isFalse, isTrue, isString } from '@lissome/util'
import { Component, resolveComponent } from 'vue'

/**
 * 函数防抖
 *
 * @param   {[type]}  handler  [handler description]
 * @param   {[type]}  delay    [delay description]
 *
 * @return  {[type]}           [return description]
 */
export function debounce(handler: (...args: any[]) => void, delay: number) {
    let timer: number | null = null
    return function debounceHandler(...args: any[]) {
        if (timer) clearTimeout(timer)

        const finalHandler: TimerHandler = () => {
            handler(...args)
        }
        timer = setTimeout(finalHandler, delay)
    }
}

export function getComponentName(name: string): string {
    return import.meta.env.VITE_TAG_PREFIX + name
}
type Data = {
    [key: string]: any
}
export type Mod = string | Data
export type Mods = Mod | Mod[]

function genBem(name: string, mods?: Mods): string {
    if (!mods) {
        return ''
    }

    if (typeof mods === 'string') {
        return ` ${name}--${mods}`
    }

    if (isArray<string>(mods)) {
        return mods.reduce((ret, item) => ret + genBem(name, item), '')
    }

    return Object.keys(mods).reduce(
        (ret, key) => ret + ((mods as Data)[key] ? genBem(name, key) : ''),
        '',
    )
}

export function createBEM(name: string) {
    const prefixName = `${import.meta.env.VITE_TAG_PREFIX}-${name}`.toLocaleLowerCase()
    return (el?: Mods, mods?: Mods): Mods => {
        if (el && typeof el !== 'string') {
            mods = el
            el = ''
        }

        el = el ? `${prefixName}__${el}` : prefixName

        return `${el}${genBem(el, mods)}`
    }
}

export type BEM = ReturnType<typeof createBEM>;

export function createNamespace(name: string) {
    return [
        getComponentName(name),
        createBEM(name),
    ] as const
}

export const getComponent = <T = Component>(name: string) => resolveComponent(`El${name}`) as T

export {
    isArray,
    isFunction,
    isFalse,
    isTrue,
    isString,
}

export * from './options'
export * from './net'
export * from './services'
