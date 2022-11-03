import { defineComponent, h } from 'vue'
import { ElDialog } from 'element-plus'
import ButtonGroup, { ButtonGroupProps } from '../button-group'
import { UPDATE_MODEL_EVENT, UPDATE_MODEL_HANDLER } from '../constants'
import { createNamespace, getComponent } from '../util'

enum DialogButtonEvents {
    Confirm = 'confirm',
    Cancel = 'cancel'
}

const DEFAULT_DIALOG_PROPS =  {
    appendToBody: true,
}

const [name, bem] = createNamespace('Dialog')

export default defineComponent({
    name,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        footerShow: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['confirm', 'cancel', UPDATE_MODEL_EVENT],
    setup(props, { emit, attrs, slots }){
        const Dialog = getComponent<typeof ElDialog>('Dialog')
        const onUpdateModelValue = (visible: boolean) => emit(UPDATE_MODEL_EVENT, visible)
        const onConfirm = () => emit(DialogButtonEvents.Confirm)
        const onCancel = () => emit(DialogButtonEvents.Cancel)
        const footerButtons = [{
            type: 'primary',
            label: '确定',
            onClick: onConfirm,
        }, {
            label: '取消',
            onClick: onCancel,
        }]

        return () => h(Dialog as any, {
            class: bem(),
            ...DEFAULT_DIALOG_PROPS,
            ...attrs,
            ...props,
            [UPDATE_MODEL_HANDLER]: onUpdateModelValue,
        }, {
            ...slots,
            footer: props.footerShow ? () => h(ButtonGroup, {
                class: bem('footer'),
                items: footerButtons,
            } as ButtonGroupProps) : undefined,
        })
    },
})
