import Markdown from './markdown'
import mdContainer from './container'
import { Plugin } from 'vite'
import { stripScript, stripTemplate, genInlineComponentText } from './util'
import hljs from 'highlight.js'
const createMarkdown = () => {
    const mdOptions = {
        html: true,        // Enable HTML tags in source
        langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
        linkify: true,        // Autoconvert URL-like text to links
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs language-${lang}"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
                } catch (__) { }
            }
            return '<pre class="hljs"><code>' + str + '</code></pre>'
        }
    }
    return new Markdown(mdOptions)
}
const compileStringToComponent = (source) => {
    let componentsGroup = ''
    const removeHtmlSource = source.replace(/<!--vue-lissome-demo\:([\s\S]*?)\:vue-lissome-demo-->/g, function ($0, $1) {
        const template = stripTemplate($1)
        const script = stripScript($1)
        let replaceResult = ''
        if (template) {
            const componentsKey = 'vue-lissome-component-' + Date.now() + '' + Math.round(Math.random() * 1000)
            componentsGroup += `'${componentsKey}': ${genInlineComponentText(template, script)},`
            replaceResult = `<${componentsKey}></${componentsKey}>`
        }
        return $1 = replaceResult
    })
    const sfc = `
        <template>
            <div class="demo-container">${removeHtmlSource}</div>
        </template>
        <script lang="ts">
            export default {
                components: {
                    ${componentsGroup}
                },
                setup(){
                    return {}
                }
            }
        </script>
    `
    // console.log(sfc, '=====sfc')
    return sfc
}
const compileMarkdownToVue = (md, raw, path) => {
    const source = md.render(raw)
    const result = compileStringToComponent(source)
    return result
}
// markdown to vue
export default function () {
    const getMarkdown = createMarkdown()
    // 初始化md标签
    mdContainer(getMarkdown)
    return {
        name: 'CompileToMarkdownLoader',
        enforce: "pre",
        transform(raw, path) {
            if (path.endsWith('.md')) {
                return compileMarkdownToVue(getMarkdown, raw, path)
            }
        }
    }
}