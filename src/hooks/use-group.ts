import { SetupContext, computed, ComputedRef } from 'vue'
import { Data } from '../../types'

// Group类组件通用类型
type ItemCommonProps = {
    key?: string
    label: string
    value?: string
}

export type GroupItemProps<T = any> = T & ItemCommonProps

export type GroupDataProp<T = Data> = Array<GroupDataProp<T>>

type GroupProps<T = Data> = {
    items: GroupDataProp<T>
    [key: string]: any
}

type GroupItem = {
    label: string
    text: string
}

type GroupItems = Array<GroupItem>

export default function useGroup(props: GroupProps, { emit }: SetupContext<string[]>){
    const groupItems: ComputedRef<GroupItems> = computed( () => {
        return props.items ? props.items.map((item: GroupItemProps) => ({ label: item.value, text: item.label })) : []
    })
    const updateModel = (value: any) => emit('update:modelValue', value)

    return {
        groupItems,
        updateModel,
    }
}
