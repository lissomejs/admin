import { defineComponent, h, PropType } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
import useGroup, { GroupDataProp } from '../hooks/use-group'
import { UPDATE_MODEL_EVENT, UPDATE_MODEL_HANDLER } from '../constants'
import { createNamespace, getComponent } from '../util'

const [name] = createNamespace('RadioGroup')

export default defineComponent({
    name,
    props: {
        modelValue: [String, Number, Boolean],
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
        const Radio = getComponent<typeof ElRadio>('Radio')
        const RadioGroup = getComponent<typeof ElRadioGroup>('RadioGroup')
        const { groupItems, modelValue } = this
        const children = groupItems && groupItems.map((item: any) => h(Radio, item, {
            default: () => item.text,
        }))

        return h(RadioGroup, {
            modelValue,
            [UPDATE_MODEL_HANDLER]: this.updateModel,
        }, {
            default: () => children,
        })
    },
})
