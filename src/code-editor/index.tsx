import { PrismEditor } from 'vue-prism-editor'
import { defineComponent } from 'vue'
import { MODEL_VALUE, UPDATE_MODEL_EVENT, UPDATE_MODEL_HANDLER } from '../constants'
import { createNamespace } from '../util'
import Prism from 'prismjs'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

const [name, bem] = createNamespace('CodeEditor')

export default defineComponent({
    name,
    props: {
        [MODEL_VALUE]: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            // default: false,
        },
        placeholder: {
            type: String,
        },
    },
    emits: [UPDATE_MODEL_EVENT],
    setup(props, { emit }){
        const events = {
            [UPDATE_MODEL_HANDLER]: (newV: string) => emit(UPDATE_MODEL_EVENT, newV),
        }
        const highlight = (code: string) => Prism.highlight(code, Prism.languages.js, 'js')

        return () => (<PrismEditor class={bem()} modelValue={props.modelValue} {...events} highlight={highlight} readonly={props.disabled} placeholder={props.placeholder}></PrismEditor>)
    },
})
