import { defineComponent, h, PropType } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { GroupItemProps } from '../hooks/use-group'
import { MODEL_VALUE, UPDATE_MODEL_EVENT, UPDATE_MODEL_HANDLER } from '../constants'
import { createNamespace, getComponent } from '../util'

type TabItems = Array<GroupItemProps>

export type TabsProps = {
    [MODEL_VALUE]: string
    items: TabItems
}

const [name] = createNamespace('Tabs')

export default defineComponent({
    name,
    props: {
        [MODEL_VALUE]: {
            type: String,
            default: '',
        },
        items: {
            type: Array as PropType<TabItems>,
            required: true,
        },
    },
    emits: [UPDATE_MODEL_EVENT],
    setup(props, { emit }){
        const updateModelValue = (newV: string) => emit(UPDATE_MODEL_EVENT, newV)

        return {
            updateModelValue,
        }
    },
    render(){
        const Tabs = getComponent<typeof ElTabs>('Tabs')
        const TabPane = getComponent<typeof ElTabPane>('TabPane')
        const { items, $slots: slots, updateModelValue, modelValue } = this
        const children = items?.map( ({ key: name, label }: GroupItemProps) => h(TabPane, {
            label, name,
        }, {
            default: slots[name as string],
        }))

        return h(Tabs, {
            modelValue,
            [UPDATE_MODEL_HANDLER]: updateModelValue,
        }, {
            default: () => children,
        })
    },
})
