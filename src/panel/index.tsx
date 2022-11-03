import { PropType, defineComponent, h } from 'vue'
import { ElCard } from 'element-plus'
import { GroupItemProps } from '../hooks/use-group'
import Cell from './cell'
import { LAYOUT_PROPS } from '../constants'
import Layout from '../layout'
import { createNamespace, getComponent } from '../util'

type PanelItems = Array<GroupItemProps>

const [name, bem] = createNamespace('Panel')

export default defineComponent({
    name,
    props: {
        data: {
            type: Object,
            require: true,
        },
        items: {
            type: Array as PropType<PanelItems>,
            require: true,
        },
        title: {
            type: String,
            default: '',
        },
        ...LAYOUT_PROPS,
    },
    setup(props){
        const renderCell = ({ key, label }: GroupItemProps) => <Cell data={props.data} prop={key} label={label}></Cell>

        return {
            renderCell,
        }
    },
    render(){
        const Card = getComponent<typeof ElCard>('Card')
        const { title: header, columnsCount, rowColCounts, items, renderCell } = this
        // 将items按行列分成一个二维数组
        const children = (<Layout items={items} renderCell={renderCell} columnsCount={columnsCount} rowColCounts={rowColCounts}></Layout>)
        const slots = {
            default: () => children,
        }

        return <Card class={bem()} header={header} v-slots={slots}></Card>
    },
})
