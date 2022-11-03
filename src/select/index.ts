import { defineComponent, h, PropType } from 'vue'
import { Data } from '../../types'
import { ElSelect, ElOption } from 'element-plus'
import { GroupItemProps } from '../../types'
import { createNamespace, getComponent } from '../util'

type OptionProps = GroupItemProps<Data>
type OptionItems = Array<OptionProps>

const [name] = createNamespace('Select')

export default defineComponent({
    name,
    props: {
        modelValue: [Array, String, Number, Boolean, Object],
        items: {
            type: Array as PropType<OptionItems>,
            required: true,
        },
        placeholder: {
            type: String,
        },
    },
    emits: ['update:modelValue'],
    render(){
        const Select = getComponent<typeof ElSelect>('Select')
        const Option = getComponent<typeof ElOption>('Option')
        const { items, modelValue, placeholder, $attrs: attrs } = this
        const children = items && items.map((item: any) => h(Option as any, item))

        return h(Select, {
            ...attrs,
            modelValue,
            placeholder,
            'onUpdate:modelValue': (value: any) => this.$emit('update:modelValue', value),
        }, {
            default: () => children,
        })
    },
})
