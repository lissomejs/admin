<template>
    <div
        class="demo-block"
        :class="[{ 'hover': hovering }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <div class="source">
            <slot name="source" />
        </div>
        <div ref="meta" class="meta">
            <div v-if="$slots.default" class="description">
                <slot />
            </div>
            <div class="highlight">
                <slot name="highlight" />
            </div>
        </div>
        <div
            ref="control"
            class="demo-block-control"
            :class="{ 'is-fixed': fixedControl }"
            @click="isExpanded = !isExpanded"
        >
            <transition name="arrow-slide">
                <i :class="[iconClass, { 'hovering': hovering }]" />
            </transition>
            <transition name="text-slide">
                <span v-show="hovering">{{ controlText }}</span>
            </transition>
            <div class="control-button-container">
                <el-button
                    v-show="hovering || isExpanded"
                    ref="copyButton"
                    size="small"
                    link
                    class="control-button copy-button"
                    @click.stop="copy"
                >
                    复制代码片段
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { nextTick } from 'vue'
import hljs from 'highlight.js'
import clipboardCopy from 'clipboard-copy'
import { stripScript, stripStyle, stripTemplate } from '../util/util'

const stripTemplateAndRemoveTemplate = code => {
    const result = stripTemplate(code)
    if (result.indexOf('<template>') === 0) {
        return result.replace(/^<template>/, '').replace(/<\/template>$/,'')
    }
    return result
}
export default {
    data() {
        return {
            codepen: {
                script: '',
                html: '',
                style: '',
            },
            hovering: false,
            isExpanded: false,
            fixedControl: false,
            scrollParent: null,
        }
    },
    computed: {
        iconClass() {
            return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
        },
        controlText() {
            return this.isExpanded ? '收起' : '展开'
        },
        codeArea() {
            return this.$el.getElementsByClassName('meta')[0]
        },
        codeAreaHeight() {
            if (this.$el.getElementsByClassName('description').length > 0) {
                return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20
            }
            return this.$el.getElementsByClassName('highlight')[0].clientHeight
        },
    },
    watch: {
        isExpanded(val) {
            this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0'
            if (!val) {
                this.fixedControl = false
                this.$refs.control.style.left = '0'
                this.removeScrollHandler()
                return
            }
            setTimeout(() => {
                this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap')
                this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler)
                this.scrollHandler()
            }, 200)
        },
    },
    mounted() {
        const highlight = this.$slots.highlight()
        if (highlight && highlight[0]) {
            let code = ''
            let cur = highlight[0]
            if (cur.type === 'pre' && (cur.children && cur.children[0])) {
                cur = cur.children[0]
                if (cur.type === 'code') {
                    code = cur.children
                }
            }
            if (code) {
                this.codepen.html = stripTemplateAndRemoveTemplate(code)
                this.codepen.script = stripScript(code)
                this.codepen.style = stripStyle(code)
            }
        }
    },
    mounted() {
        nextTick(() => {
            const dom = this.$el

            if(!dom) return

            const highlightElements = dom.getElementsByClassName('highlight')
            const description = dom.getElementsByClassName('description')

            let highlight = highlightElements && highlightElements[0]
            if (!description || description.length === 0) {
                highlight.style.width = '100%'
                highlight.borderRight = 'none'
            }
            try {
                const code = highlight.querySelector('code')
                code && hljs.highlightBlock(highlight.querySelector('code'))
            } catch (error) {
                console.log(error)
            }
        })
    },
    beforeUnmount() {
        this.removeScrollHandler()
    },
    methods: {
        copy() {
            const res = clipboardCopy(`
<template>
${this.codepen.html}
</template>
<script>
${'  ' + this.codepen.script}
\<\/script>
<style>
${this.codepen.style}
</style>
`)
            res.then(() => {
                this.$message({
                    showClose: true,
                    message: '复制成功',
                    type: 'success',
                })
            }).catch(() => {
                this.$message({
                    showClose: true,
                    message: '复制失败',
                    type: 'error',
                })
            })
        },
        scrollHandler() {
            const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
            const controlBarHeight = 44
            this.fixedControl = bottom + controlBarHeight > document.documentElement.clientHeight &&
          top <= document.documentElement.clientHeight
            this.$refs.control.style.left = this.fixedControl ? `${ left }px` : '0'
        },
        removeScrollHandler() {
            this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler)
        },
    },
}
</script>
<style lang="scss" scoped>
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    .demo-button {
      float: right;
    }
    .source {
      padding: 24px;
    }
    .meta {
      background-color: #fafafa;
      border-top: solid 1px #eaeefb;
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }
    .description {
      padding: 20px;
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      margin: 10px;
      background-color: #fff;
      p {
        margin: 0;
        line-height: 26px;
      }
      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }
    .highlight {
      pre {
        margin: 0;
      }
      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        &::before {
          content: none;
        }
      }
    }
    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
      &.is-fixed {
        position: sticky;
        bottom: 0;
      }
      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }
      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }
      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }
      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
      .control-button-container {
        line-height: 40px;
        position: absolute;
        top: 0;
        right: 0;
        padding-left: 5px;
        padding-right: 25px;
      }
      .control-button {
        font-size: 14px;
        margin: 0 10px;
      }
    }
  }
</style>
