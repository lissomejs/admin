import { defineComponent, PropType, Component, h } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElEmpty } from 'element-plus'
import { ButtonProps } from '../button'
import { Data } from '../../types'
import ButtonGroup, { ButtonItems } from '../button-group'
import { isFunction, isArray, getComponent, createNamespace } from '../util'
import './style.scss'
import { InputMap, InputTypes } from '../form/items'

interface BaseSchema {
    key: string
    label: string
}

interface Action extends BaseSchema{
    show: boolean
    onClick(...args: any[]): void
    onConfirm(...args: any[]): void
}

type Actions = Array<Action>

type Formatter = (cellValue: any, column: ColumnSchema, row: Data, index: number) => string

export interface ColumnSchema extends BaseSchema{
    key: string
    type: InputTypes
    label: string
    actions?: Actions
    getActions: (slotProps: Data) => Actions
    formatter?: Formatter
    [key: string]: any
}

export type Columns = Array<ColumnSchema>
type TableData = Array<Data>
export type Pagination = {
    pageSize: number // pageSize
    currentPage: number // currentPage
    total: number // total
}

type TableProps = {
    columns: Columns
    data: TableData
    pagination: Pagination
}

const TABLE_DEFAULT_PROPS = {
    border: true,
}
const BUTTON_DEFAULT_PROPS: ButtonProps = {
    type: 'text',
}

const PAGINATION_DEFAULT_PROPS = {
    hideOnSinglePage: true,
}
type FormatterMaps = Partial<Record<keyof InputMap, Formatter>>

const FORMATTER_MAPS: FormatterMaps = {
    select(cellValue, column){
        const item = column.items?.find( (item: Data) => item.value === cellValue)

        return item && item.label
    },
}

const getDefaultFormatter = (type: InputTypes) => type && FORMATTER_MAPS[type]

type PaginationEvent = 'update:currentPage' | 'update:pageSize'

const [name, bem] = createNamespace('Table')

export default defineComponent({
    name,
    props: {
        data: {
            type: Array as PropType<TableData>,
        },
        columns: {
            type: Array as PropType<Columns>,
            required: true,
        },
        pagination: {
            type: Object as PropType<Pagination>,
        },
    },
    emits: ['update:currentPage', 'update:pageSize'] as PaginationEvent[],
    setup(props, { emit }){
        const handleUpdate = (event: 'currentPage' | 'pageSize', ...args: any[]) => emit(`update:${event}` as PaginationEvent, ...args)

        return {
            handleUpdate,
        }
    },
    render(){
        const Table = getComponent<typeof ElTable>('Table')
        const Column = getComponent<typeof ElTableColumn>('TableColumn')
        const Pagination = getComponent<typeof ElPagination>('Pagination')
        const Empty = getComponent<typeof ElEmpty>('Empty')
        const { columns, data, pagination, handleUpdate } = this
        const children = columns.map((column: ColumnSchema) => {
            const { actions, getActions, key: prop, label, type, formatter = getDefaultFormatter(type), ...columnProps } = column
            const slots: Data = {}
            const isSlots = (isFunction(getActions) || (isArray(actions) && (actions as Actions).length))

            if(isSlots){
                slots.default = (slotProps: any) => {
                    const { row } = slotProps
                    const finalActions = isFunction(getActions) ? getActions(slotProps) : actions as Actions
                    const items: ButtonItems = finalActions.filter( action => action.show !== false).map( ({ onClick, onConfirm, ...props }: Action) => ({
                        ...BUTTON_DEFAULT_PROPS,
                        ...props,
                        onClick: ($event: any) => onClick && onClick.call(this, row, slotProps, $event),
                        onConfirm: ($event: any) => onConfirm && onConfirm.call(this, row, slotProps, $event),
                    }))

                    return (<ButtonGroup items={items}></ButtonGroup>)
                }
            }

            return h(Column, {
                ...columnProps,
                prop,
                label,
                formatter: (row, col, cellValue, index) => formatter ? formatter(cellValue, column, row, index) : cellValue,
            }, slots)

        })

        const table = h(Table, {
            ...TABLE_DEFAULT_PROPS,
            class: bem('main'),
            data,
        }, {
            default: () => children,
            empty: () => <Empty></Empty>,
        })
        const elements = [table]

        if(data && data.length && pagination){
            const createPaginationInstance = () => h(Pagination, {
                ...PAGINATION_DEFAULT_PROPS,
                class: bem('pagination'),
                ...pagination,
                'onUpdate:currentPage': (value: number) => handleUpdate('currentPage', value),
                'onUpdate:pageSize': (value: number) => handleUpdate('pageSize', value),
            })

            elements.push(createPaginationInstance())
        }

        return <div class={bem()}>{elements}</div>
    },

}) as Component<TableProps>
