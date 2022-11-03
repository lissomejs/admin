import { defineComponent,PropType, SetupContext } from 'vue'
import { ButtonType, ButtonNativeType } from 'element-plus'
import { createNamespace, getComponent } from '../util'

export type ButtonProps = {
    type?: ButtonType
    nativeType?: ButtonNativeType
    href?: string
    confirmable?: boolean
    confirmTitle?: string
    confirmButtonText?: string
    cancelButtonText?: string
    onClick?(...args: any[]): void
    onConfirm?(...args: any[]): void
    [P: string]: any
}

const [name] = createNamespace('Button')

export default defineComponent({
    name,
    props: {
        type: {
            type: String as PropType<ButtonType>,
        },
        nativeType: {
            type: String as PropType<ButtonNativeType>,
            default: 'button',
        },
        href: {
            type: String,
            default: '',
        },
        confirmable: {
            type: Boolean,
            default: false,
        },
        confirmTitle: {
            type: String,
            default: '确定此操作？',
        },
        confirmButtonText: {
            type: String,
        },
        cancelButtonText: {
            type: String,
        },
    },
    emits: ['click', 'confirm'],
    setup: (props, { emit }: SetupContext) => {
        const handleClick = () => emit('click')
        const handleConfirm = () => emit('confirm')

        return {
            handleClick,
            handleConfirm,
        }
    },
    render(){
        const Button = getComponent('Button')
        const Link = getComponent('Link')
        const Popconfirm = getComponent('Popconfirm')
        const { $slots: slots, handleClick, handleConfirm, href, type, nativeType, confirmable, confirmTitle, confirmButtonText, cancelButtonText } = this
        const buttonProps = {
            type,
            nativeType,
        }
        const onClick = href ? undefined : handleClick  // 只有button形态才出发click
        let Component = (<Button {...buttonProps} onClick={onClick} v-slots={slots}></Button>)

        let componentSlots

        if(href){
            const Button = Component
            componentSlots = {
                default: () => Button,
            }

            Component = (<Link href={href} underline={false} v-slots={componentSlots}></Link>)
        }

        if(confirmable){
            const confirmProps = {
                title: confirmTitle,
                confirmButtonText,
                cancelButtonText,
            }
            const ReferenceComponent = Component
            componentSlots = {
                reference: () => ReferenceComponent,
            }

            Component = (<Popconfirm {...confirmProps} onConfirm={handleConfirm} v-slots={componentSlots}></Popconfirm>)
        }

        return Component
    },
})
