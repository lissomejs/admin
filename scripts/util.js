/**
 * 将字符串转为大驼峰格式
 */
const toPascalCase = str => str.replace(/[-_](\w)/g, (matched, letter) => letter.toUpperCase()).replace(/^\w/, letter => letter.toUpperCase());

const checkComponent = ({ name, source, type }, components) => {
    const typedComponents = components.find( item => item.type === type );

    if(!typedComponents) return true;

    const { components: componentList } = typedComponents;

    if(!componentList || !componentList.length) return true;

    const component = componentList.find( item => item.component === name);

    if(!component) return true;

    const { sources } = component;

    if(!sources || !sources.length || !sources.includes(source)) return true;

    return `已经存在名称为${name}、组件类型为${type}、依赖库为 ${source}的组件了，请不要重复创建`;
};
const updateComponents = (components, type, name, title, source) => {
    let typedComponents = components.find( item => item.type === type );

    if(!typedComponents){
        typedComponents = {
            type,
            title: type === 'plus' ? '高级物料' : type,
            components: [],
        };

        components.push(typedComponents);
    }

    const { components: componentList } = typedComponents;
    let component = componentList.find( item => item.component === name);

    if(!component){
        component = {
            component: name,
            title,
            sources: [],
        };

        componentList.push(component);
    }

    const { sources } = component;

    if(!sources.includes(source)) sources.push(source);
};

module.exports = {
    toPascalCase,
    checkComponent,
    updateComponents
}