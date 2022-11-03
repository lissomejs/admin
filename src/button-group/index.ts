import { defineComponent, Component, PropType, h, computed } from 'vue'
import { ElButtonGroup, ElFormItem } from 'element-plus'
import Button, { ButtonProps } from '../button'
import { createNamespace, getComponent, isFalse } from '../util'

export const enum ButtonGroupType{
    Actions = 'actions',  // 操作类型，外层容器为div
    ButtonGroup = 'group', // 按钮组，外层容器为ButtonGroup，Button的整体性更强
    FormActions = 'formActions'  // 表单底部提交按钮等
}

export type ButtonItems = Array<ButtonProps>

export type ButtonGroupProps = {
    type?: ButtonGroupType
    items: ButtonItems
}

export type WrapperComponent = Component | keyof HTMLElementTagNameMap

export type ButtonWrapper = Record<ButtonGroupType, WrapperComponent >

const [name] = createNamespace('ButtonGroup')

export default defineComponent({
    name,
    props: {
        type: {
            type: String as PropType<ButtonGroupType>,
            default: ButtonGroupType.Actions,
        },
        items: {
            type: Array as PropType<ButtonItems>,
            required: true,
        },
    },
    setup(props) {
        const showItems = computed(() => props.items?.filter(item => !isFalse(item.show)) || [])
        const FormItem = getComponent<typeof ElFormItem>('FormItem')
        const ButtonGroup = getComponent<typeof ElButtonGroup>('ButtonGroup')
        const BUTTON_WRAPPER: ButtonWrapper = {
            [ButtonGroupType.Actions]: 'div',
            [ButtonGroupType.ButtonGroup]: ButtonGroup,
            [ButtonGroupType.FormActions]: FormItem,
        }
        const Wrapper: any = computed(() => BUTTON_WRAPPER[props.type as ButtonGroupType])

        return {
            showItems,
            Wrapper,
        }
    },
    render() {
        const { showItems, Wrapper } = this
        const children = showItems.map((item: any) => h(Button, item, {
            default: () => item.label,
        }))

        return h(Wrapper, {}, {
            default: () => children,
        })
    },
})

