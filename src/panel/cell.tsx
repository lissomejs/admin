import { defineComponent, computed } from 'vue'
import './style.scss'
import { createNamespace } from '../util'

const [name, bem] = createNamespace('PanelCell')

export default defineComponent({
    name,
    props: {
        data: {
            type: Object,
            require: true,
        },
        prop: {
            type: String,
            require: true,
        },
        label: {
            type: String,
            require: true,
        },
    },
    setup(props){
        const cellValue = computed( () => {
            const { data, prop } = props
            const value = data && prop && data[prop]

            return value === undefined || value === null ? '' :  value
        })

        return {
            cellValue,
        }
    },
    render(){
        const { cellValue, label } = this

        return (<span class={bem()}>
            <span class={bem('label')}>{`${label}：`}</span>
            <span class={bem('value')}>{cellValue}</span>
        </span>)
    },
})
