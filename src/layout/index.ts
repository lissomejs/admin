import { PropType, defineComponent, computed, h, Fragment } from 'vue'
import { ElCol, ElRow } from 'element-plus'
import { GroupItemProps } from '../hooks/use-group'
import { LAYOUT_PROPS, ROW_PROPS } from '../constants'
import { createNamespace } from '../util'

const TOTAL_SPAN = 24
const [name, bem] = createNamespace('Layout')
type LayoutItems = Array<GroupItemProps>

export default defineComponent({
    name,
    props: {
        renderCell: {
            type: Function,
            required: true,
        },
        items: {
            type: Array as PropType<LayoutItems>,
            require: true,
        },
        ...LAYOUT_PROPS,
    },
    setup(props){
        const colSpan = computed( () => TOTAL_SPAN / props.columnsCount )
        const colsWithRows = computed( () => props.items?.reduce((rows: any[], item) => {
            if(!rows.length){ // 第一次
                const firstRow = [item]
                rows.push(firstRow)

                return rows
            }

            let [lastRow] = rows.slice(-1)

            if(lastRow.length < props.columnsCount){
                lastRow.push(item)
            }else{
                lastRow = [item]

                rows.push(lastRow)
            }

            return rows
        }, []))

        return {
            colsWithRows,
            colSpan,
        }
    },
    render(){
        const { colsWithRows, renderCell, colSpan } = this
        // 将items按行列分成一个二维数组
        const children = colsWithRows?.map( (row, rowIndex) => {
            const cols = row.map( (col: GroupItemProps, colIndex: number) => h(ElCol, {
                class: bem('col'),
                span: colSpan,
            }, {
                default: () => renderCell(col, rowIndex, colIndex),
            }))

            return h(
                ElRow, {
                    ...ROW_PROPS,
                    class: bem('row'),
                }, {
                    default: () => cols,
                })
        })


        return h(Fragment, children)
    },
})
