const fs = require('fs-extra');
const type = 'component';
const { toPascalCase, checkComponent, updateComponents } = require('./util');

const DEPENDENCY_LIST = [{
    name: 'element-plus',
    prefix: 'el',
    getComponentPath(componentName){
        return `${this.name}/es/${this.prefix}-${componentName.toLowerCase()}/index`;
    },
    getStylePath(componentName){
        return `${this.name}/lib/theme-chalk/${this.prefix}-${componentName.toLowerCase()}.css`;
    },
}, {
    name: 'car-design',
    prefix: 'ca',
    getComponentPath(componentName){
        return `${this.name}/es/${this.prefix}-${componentName.toLowerCase()}/index`;
    },
    getStylePath(componentName){
        return `${this.name}/lib/theme-chalk/${this.prefix}-${componentName.toLowerCase()}.css`;
    },
}, { // 通用，不依赖其他库
    name: 'null',
    prefix: 'null',
    getComponentPath(){
        return '';
    },
    getStylePath(){
        return '';
    },
}];

const getDependency = source => DEPENDENCY_LIST.find( item => item.prefix === source );

const generator = {
    description: '新增组件',
    prompts: [{
        type: 'list',
        name: 'type',
        default: 'base',
        choices: ['base', 'plus'],
        message: '组件类型，base基础组件，plus高级物料',
    }, {
        type: 'list',
        name: 'source',
        default: 'el',
        choices: ['el', 'ca', 'null'],
        message: '依赖库，el为element-plus，ca为car-design, null为完全手写组件不依赖其他库',
    }, {
        type: 'input',
        name: 'name',
        async validate(name, options){
            var done = this.async();

            if(!name) return done('请填写组件名称！')

            const components = await fs.readJSON('./components.json');
            const checkResult = checkComponent({
                ...options,
                name,
            }, components);

            return done(checkResult)
        },
        filter: toPascalCase,
        message: '组件名称，例如button',
    }, {
        type: 'input',
        name: 'title',
        filter: (title, { name }) => name +  (title || ''),
        message: '组件中文名称，用于demo页面左侧菜单文案，例如按钮',
    }],
    actions: [{
        type: 'add',
        path: 'src/{{type}}/{{name}}/{{getFilePath source}}.ts',
        templateFile: 'scripts/component-template/index.hbs',
    }, {
        type: 'add',
        path: 'src/{{type}}/{{name}}/README.md',
        templateFile: 'scripts/component-template/README.hbs',
    }, {
        type: 'modify',
        path: 'src/packages.ts',
        pattern: '// next',
        template: `import {{name}} from \'./base/{{name}}/{{getFilePath source}}\';\r// next`,
    }, {
        type: 'modify',
        path: 'src/packages.ts',
        pattern: '// components',
        template: '    {{name}},\r// components',
        async skip(options){
            const { name, source, type, title } = options;
            const components = await fs.readJSON('./components.json');

            updateComponents(components, type, name, title, source);

            await fs.outputJSON('./components.json', components, {
                spaces: 4
            });

            return true;
        },
    }],
    runPrompts: undefined,
    runActions: undefined,
};

const helpers = {
    lowerCase(componentName){
        return componentName.toLowerCase();
    },
    getComponentPath(componentName){
        const dependency = getDependency(this.source);

        return dependency.getComponentPath(componentName);
    },
    getStylePath(componentName){
        const dependency = getDependency(this.source);

        return dependency.getStylePath(componentName);
    },
    getFilePath(){
        const {source} = this
        const file = 'index'

        return source === 'null' ? file : `${source}/${file}`
    }
};

module.exports = {
    type,
    generator,
    helpers,
}
;
