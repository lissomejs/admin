import { Component, defineComponent,PropType, SetupContext } from 'vue'
import { type ButtonType, type ButtonNativeType, ElLink, ElButton, ElPopconfirm } from 'element-plus'
import { createNamespace, getComponent } from '../util'
import { pascalCase } from '@lissome/util'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { Data } from '../../types'

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
        icon: {
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
        const getIcon = (icon: string) => {
            const component = (ElementPlusIcons as Data<Component>)[pascalCase(icon)]
            console.log('getIcon', icon, component)

            return component

        }

        return {
            handleClick,
            handleConfirm,
            getIcon,
        }
    },
    render(){
        const Button = getComponent<typeof ElButton>('Button')
        const Link = getComponent<typeof ElLink>('Link')
        const Popconfirm = getComponent<typeof ElPopconfirm>('Popconfirm')
        const { $slots: slots, handleClick, handleConfirm, getIcon, href, type, nativeType, confirmable, confirmTitle, confirmButtonText, cancelButtonText, icon } = this
        const buttonProps = {
            type,
            nativeType,
            icon: icon ? getIcon(icon) : undefined,
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
