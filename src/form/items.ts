// 表单项类型策略配置
import { Component } from 'vue'

export type ComponentProps = Record<string, any>

export type InputMap = {
    input: Component
    select: Component
    checkbox: Component
    radio: Component
    switch: Component
    textArea: {
        component: Component
        props: ComponentProps
    }
    date: Component
    dateRange?: {
        component: Component
        props: ComponentProps
    }
    month?: {
        component: Component
        props: ComponentProps
    }
    upload?: Component
}

export type ComponentOption = {
    component: Component
    props?: ComponentProps
}

export type InputTypes = keyof InputMap | undefined

export type OptionItem = {
    value: string
    label: string
    [key: string]: any
}

export type ValidateRule = {
    required?: boolean
    pattern?: string  // 表单校验验证正则字符串
    message: string  // 校验出错的提示信息
}

export type FormItem = {
    type: InputTypes
    key: string
    label: string
    inputType?: string // input类型
    value?: string
    required?: boolean
    reg: ValidateRule
    items?: OptionItem[]
    placeholder?: boolean
    disabled?: boolean
}

export type FormItems = Array<FormItem>

export type FormItemComponentProps = {
    label?: string
    labelWidth?: string
    prop?: string
    rules?: unknown
    error?: string
    validateStatus?: string
    for?: string
    size?: unknown
}

export const getPlaceholder = (label: string, type: InputTypes) => type === 'select' ? `请选择${label}` : `请输入${label}`
export const getRequiredMessage = (label: string) => `${label || '该项'}为必填项`
