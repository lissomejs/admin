module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
    ],
    ignorePatterns: ['index.html', '*.js', 'scripts/**', 'lib/**'],
    rules: {
        // js/ts
        'eol-last': 'error',
        'no-trailing-spaces': 'error',
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'always-multiline'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        camelcase: ['error', { properties: 'never' }],
        semi: ['error', 'never'],
        // fix eslint lint stack error Tip: https://github.com/eslint/eslint/issues/13956
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        'object-curly-spacing': ['error', 'always'],
        'arrow-parens': ['error', 'as-needed'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
            },
        ],
        // vue
        'vue/html-indent': ['error', 4, {}],
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': ['error', {
            html: {
                void: 'always', // void元素
                normal: 'always',
                component: 'always',
            },
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: 3,
            multiline: 1,
        }],
        'vue/script-setup-uses-vars': 'off',
        'vue/require-default-prop': 'off',
        'vue/html-closing-bracket-spacing': 'error',
    },
};
