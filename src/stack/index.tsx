import { PropType, defineComponent, h } from 'vue'
import { createNamespace } from '../util'
import './style.scss'

enum StackDirectionTypes {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
}

type StackDirection = StackDirectionTypes.Horizontal | StackDirectionTypes.Vertical

const [name, bem] = createNamespace('Stack')

export default defineComponent({
    name,
    props: {
        // props list
        direction: {
            type: String as PropType<StackDirection>,
            default: StackDirectionTypes.Horizontal,
        },
    },
    setup: (props, { slots }) => {
        return () => h('div', {
            class: bem(['', props.direction]),
        }, slots)
    },
})
