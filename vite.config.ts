import path from 'path'
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import markdownPlugins from './vite-loader/index'

// https://vitejs.dev/config/
export default defineConfig({
    // resolve: {
    //     extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    //     alias: {
    //         vue: 'vue/dist/vue.esm-browser.js',
    //         examples: path.resolve(__dirname),
    //     },
    // },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // <--
        }),
        dts(),
        jsx(),
        (markdownPlugins as (options: any) => Plugin)({}),
    ],
    build: {
        outDir: 'lib',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'LissomeAdmin',
        },
        rollupOptions: {
            external: ['vue', 'element-plus'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',
                },
            },
        },
    },
})
