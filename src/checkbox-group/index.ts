import { defineComponent, h, PropType } from 'vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import useGroup, { GroupDataProp } from '../hooks/use-group'
import { UPDATE_MODEL_EVENT, UPDATE_MODEL_HANDLER } from '../constants'
import { createNamespace, getComponent } from '../util'

const [name] = createNamespace('CheckboxGroup')

export default defineComponent({
    name,
    props: {
        modelValue: [Array, String, Number, Boolean, Object],
        items: {
            type: Array as PropType<GroupDataProp>,
            required: true,
        },
    },
    emits: [UPDATE_MODEL_EVENT] as string[],
    setup(props, context){
        const { groupItems, updateModel } = useGroup(props, context)

        return {
            groupItems,
            updateModel,
        }
    },
    render(){
        const Checkbox = getComponent<typeof ElCheckbox>('Checkbox')
        const CheckboxGroup = getComponent<typeof ElCheckboxGroup>('CheckboxGroup')
        const { groupItems, modelValue } = this
        const children = groupItems && groupItems.map((item: any) => h(Checkbox, item, {
            default: () => item.text,
        }))

        return h(CheckboxGroup, {
            modelValue,
            [UPDATE_MODEL_HANDLER]: this.updateModel,
        }, {
            default: () => children,
        })
    },
})
