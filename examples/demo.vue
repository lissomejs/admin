<template>
    <l-form
        ref="form"
        :model="form"
        :actions-show="actionsShow"
        :items="items"
        :action-direction="actionDirection"
        :columns-count="columnsCount"
        @updateItemValue="updateItemValue"
        @submit="onSubmit"
    />
</template>

<script>
export default {
    data() {
        return {
            columnsCount: 1,
            actionsShow: true,
            actionDirection: 'right',
            form: {
                name: '好',
                agree: false,
                sex: 0,
                type: '',
                fee: '',
                sql: 'SELECT 0 AS car_id, 0 AS city_id, 0 AS operator_id, 0 AS order_id, 0 AS warehouse_id',
            },
            items: [{
                key: 'name',
                label: '姓名',
                required: true,

            },{
                key: 'agree',
                label: '同意协议',
                type: 'switch',
                meta: {
                    disabled: true,
                },
            },{
                key: 'sex',
                label: '性别',
                type: 'radio',
                items: [{
                    label: '男',
                    value: 0,
                },{
                    label: '女',
                    value: 1,
                }],
            },{
                key: 'type',
                label: '区域',
                type: 'select',
                items: [{
                    label: '抵押费',
                    value: 1,
                },{
                    label: '解押费',
                    value: 2,
                }],
            },{
                key: 'fee',
                label: '费用',
                type: 'checkbox',
                items: [{
                    label: '区域一',
                    value: 1,
                },{
                    label: '区域二',
                    value: 2,
                }],
            },{
                key: 'date',
                label: '日期',
                type: 'date',
            },{
                key: 'sql',
                label: 'SQL',
                type: 'codeEditor',
            }],
        }
    },
    methods: {
        updateItemValue(key, value){
            console.log('updateItemValue', key, value)
            this.form[key] = value
        },
        onSubmit(model) {
            console.log('submit!', model)
        },
    },
}
</script>
