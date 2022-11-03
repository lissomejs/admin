const { compileTemplate, TemplateCompiler } = require('@vue/compiler-sfc')
const templateReplaceRegex = /<template>([\s\S]+)<\/template>/g;

function stripTemplate(content) {
    content = content.trim()
    if (!content) {
      return content
    }
    if (templateReplaceRegex.test(content)) {
        content = content.replace(templateReplaceRegex, '$1')
    }
    return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
  }
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}
function genInlineComponentText(template, script) {
    // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
    let source = template
    if (templateReplaceRegex.test(source)) {
      source = source.replace(templateReplaceRegex, '$1')
    }
    const finalOptions = {
      source: `${source}`,
      filename: 'inline-component', // TODO：这里有待调整
      compiler: TemplateCompiler,
      compilerOptions: {
        mode: 'function',
      },
    }
    const compiled = compileTemplate(finalOptions)
    // tips
    if (compiled.tips && compiled.tips.length) {
      compiled.tips.forEach(tip => {
        console.warn(tip)
      })
    }
    // errors
    if (compiled.errors && compiled.errors.length) {
      console.error(
        `\n  Error compiling template:\n${compiled.source}\n` +
          compiled.errors.map(e => `  - ${e}`).join('\n') +
          '\n',
      )
    }
    let demoComponentContent = `
      ${(compiled.code).replace('return function render','function render')}
    `
    script = script.trim()
    if (script) {
      script = script
        .replace(/export\s+default/, 'const democomponentExport =')
        .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
        // .replace(/import ({.*}) from 'element-plus'/g, (s, s1) => `const ${s1} = require('element-plus')`)
        .replace(/import ({.*}) from 'element-plus'/g, (s, s1) => ``)
    } else {
      script = 'const democomponentExport = {}'
    }
    demoComponentContent = `(function() {
      ${demoComponentContent}
      ${script}
      return {
        render,
        ...democomponentExport
      }
    })()`
    return demoComponentContent
  }

export {
    stripScript,
    stripStyle,
    stripTemplate,
    genInlineComponentText
};
