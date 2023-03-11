import MarkdownItContainer from 'markdown-it-container';
const createCustomMarkContainer = (md) => {
    md.use(MarkdownItContainer, 'demo', {
        validate(params) {
          return params.trim().match(/^demo\s*(.*)$/)
        },
        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : ''
                const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
                return `<demo-block>
                        ${description ? `${md.render(description)}` : ''}
                        <template #source><!--vue-lissome-demo: ${content}:vue-lissome-demo--></template>
                `
            }
            return '</demo-block>'
        },
      })
    md.use(MarkdownItContainer, 'tip')
    md.use(MarkdownItContainer, 'warning')
}
export default createCustomMarkContainer;