import { PropType } from 'vue'

export const UPDATE_MODEL_EVENT = 'update:modelValue'
export const UPDATE_MODEL_HANDLER = 'onUpdate:modelValue'
export const MODEL_VALUE = 'modelValue'

// 布局相关属性，多组件公用
export const LAYOUT_PROPS = {
    columnsCount: {
        type: Number,
        default: 4,
    },
    rowColCounts: {
        type: Array as PropType<number[]>,
    },
}

export const ROW_PROPS = {
    gutter: 24,
}
