<template>
    <l-form :model="model" />
    <el-form ref="form">
        <el-row>
            <el-col>
                <el-form-item v-for="item in items">
                    <component is="getCom(item.type)" v-model="model.name" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import { ElInput } from 'element-plus'
export default {
    components: {},
    props: {
        items: Array,
    },
    data() {
        return {
            inputMap: {
                input: ElInput,
            },
            model: {
                name: '',
            },
        }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        getCom(type){
            return this.inputMap[type]
        },
        val(){
            this.$refs.form.value()
        },
    },
    methods: {

    },
}
</script>
