import { defineComponent, ref, onUnmounted, computed } from 'vue'
import { debounce, createNamespace } from '../util'

const [name, bem] = createNamespace('Iframe')

export default defineComponent({
    name,
    props: {
        href: {
            type: String,
        },
        offset: {
            type: Number,
            default: 0,
        },
        block: {
            type: Boolean,
        },
    },
    setup(props){
        const heightNumber = ref(0)
        const style = computed( () => !props.block ? { height: `${heightNumber.value}px` } : undefined )
        const setHeight = (windowHeight?: number) => windowHeight && !props.block && (heightNumber.value = windowHeight - props.offset) && console.log('setHeight', windowHeight)
        const resizeListener = (e: Event) => setHeight((e.target as Window)?.innerHeight)
        const debouncedResizeListener = debounce(resizeListener, 200)

        setHeight(window.innerHeight)

        window.addEventListener('resize', debouncedResizeListener)
        onUnmounted(() => window.removeEventListener('resize', debouncedResizeListener ) )

        return () => (<iframe
            style={style.value}
            class={bem()}
            src={props.href}
            frameborder="0"
            ref="iframe"
        />)
    },
})
