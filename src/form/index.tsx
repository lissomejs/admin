import { defineComponent, PropType, h, ConcreteComponent, computed, ComputedRef, getCurrentInstance, VNode, Component } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import { createNamespace, getComponent } from '../util'
import ButtonGroup, { ButtonGroupType, ButtonItems } from '../button-group'
import { getPlaceholder, type FormItems, type FormItem as FormItemType, ValidateRule, ComponentProps, getRequiredMessage, InputMap, ComponentOption } from './items'
import Layout from '../layout'
import CheckboxGroup from '../checkbox-group'
import RadioGroup from '../radio-group'
import Select from '../select'
import { LAYOUT_PROPS } from '../constants'

export type FormModel = Record<string, any>
export type ActionDirection = 'left' | 'right' | 'center'

export type FormProps = {
    model: FormModel
    items: FormItems
    submitTitle: string
    clearTitle: string
    actionsShow: boolean
    actionDirection: ActionDirection
    columnsCount: number
}

const FORM_DEFAULT_PROPS = {
    labelPosition: 'left',
    labelWidth: 'auto',
}

const [name, bem] = createNamespace('Form')

export default defineComponent({
    name,
    props: {
        items: {
            type: Object as PropType<FormItems>,
            required: true,
        },
        model: {
            type: Object as PropType<FormModel>,
            required: true,
        },
        submitTitle: {
            type: String,
            default: '提交',
        },
        clearTitle: {
            type: String,
            default: '重置',
        },
        // 是否显示提交重置按钮
        actionsShow: {
            type: Boolean,
            default: true,
        },
        actionDirection: {
            type: String as PropType<ActionDirection>,
            default: 'right',
        },
        ...LAYOUT_PROPS,
    },
    emits: ['updateItemValue', 'submit', 'reset'],
    expose: ['onSubmit'],
    setup(props, {
        emit,
    }) {
        const FormItem = getComponent<typeof ElFormItem>('FormItem')
        const INPUT_MAP: InputMap = {
            input: getComponent('Input'),
            select: Select,
            switch: getComponent('Switch'),
            checkbox: CheckboxGroup,
            radio: RadioGroup,
            date: getComponent('DatePicker'),
            textArea: {
                component: getComponent('Input'),
                props: {
                    type: 'textarea',
                },
            },
        }
        const getComponentOption = (type: keyof InputMap): ComponentOption => {
            const option = INPUT_MAP[type] as ComponentOption

            return !!(option?.component) ? option : { component: option as Component }
        }
        const instance = getCurrentInstance()
        const formComponent = computed(() => instance?.refs?.form as typeof ElForm)
        const validate = () => new Promise<boolean>((resolve, reject) => {
            if (!formComponent.value) return reject(`cann't find form component`)

            formComponent.value.validate((valid: boolean) => {
                if (valid) {
                    resolve(true)
                } else {
                    reject('validate fail!')

                    return false
                }
            })
        })
        const onSubmit = () => validate().then(() => emit('submit', props.model)).catch( reason => {
            console.log(reason)
        })
        const onReset = () => {
            formComponent.value && formComponent.value.resetFields()

            emit('reset')
        }
        const buttonItems: ComputedRef<ButtonItems> = computed((): ButtonItems => ([{
            key: 'submit',
            type: 'primary',
            label: props.submitTitle,
            onClick: onSubmit,
        }, {
            key: 'reset',
            label: props.clearTitle,
            onClick: onReset,
        }]))
        const renderCell = ({ type = 'input', key, label, placeholder, required, reg, items, ...otherProps }: FormItemType) => {
            const { component: InputComponent, props: propsInComponentOption = {} } = getComponentOption(type)
            const InputItem = h(InputComponent as ConcreteComponent<ComponentProps>, {
                ...propsInComponentOption,
                ...otherProps,
                items,
                modelValue: props.model[key],
                placeholder: placeholder || getPlaceholder(label, type),
                'onUpdate:modelValue': (value: any) => emit('updateItemValue', key, value),
            } as ComponentProps)
            const rules: Array<ValidateRule> = []

            if (required) {
                rules.push({
                    required,
                    message: getRequiredMessage(label),
                })
            }

            if (reg) rules.push(reg)

            return h(FormItem, {
                label,
                prop: key,
                rules,
            }, {
                default: () => InputItem,
            })
        }

        return {
            buttonItems,
            validate,
            renderCell,
            onSubmit,
        }
    },
    render() {
        const Form = getComponent<typeof ElForm>('Form')
        const { items, model, buttonItems, actionsShow, renderCell, actionDirection, columnsCount, rowColCounts, $slots: {
            default: defaultSlots,
        }, $attrs: attrs } = this
        const LayoutComponent = (<Layout items={items} renderCell={renderCell} columnsCount={columnsCount} rowColCounts={rowColCounts}></Layout>)
        const style = { textAlign: actionDirection }
        const FormButtonsComponent = (<ButtonGroup type={ButtonGroupType.Actions} items={buttonItems} style={style}></ButtonGroup>) as VNode
        const children = [LayoutComponent]
        const formFooter = []

        defaultSlots && formFooter.push(<div class={bem('slots')}>{defaultSlots()}</div>)
        actionsShow && formFooter.push(FormButtonsComponent)

        if (formFooter.length) children.push(<div class={bem('footer')}>{formFooter}</div>)

        const slots = {
            default: () => children ,
        }

        return <Form {...FORM_DEFAULT_PROPS} {...attrs} class={bem()} model={model} ref="form" v-slots={slots}></Form>
    },
})

export {
    type FormItemType as FormItem,
    type FormItems,
}
