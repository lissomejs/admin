<template>
    <div v-loading="isLoading" :class="bem()">
        <search-form
            ref="searchForm"
            :class="bem('search')"
            v-bind="formProps"
            :model="model"
            :items="items"
            @update-item-value="updateItemValue"
            @submit="onSubmit"
        >
            <template v-if="actions?.length">
                <button-group :items="actions" />
            </template>
        </search-form>
        <data-table
            :class="bem('table')"
            :columns="columns"
            :data="data"
            :pagination="pagination"
            @update:currentPage="onUpdateCurrentPage"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed, ref } from 'vue'
import { ApiTypes, createNamespace } from '../util'
import SearchForm, { type FormItem, type FormItems } from '../form'
import DataTable, { type ColumnSchema, type Columns, Pagination } from '../table'
import ButtonGroup, { type ButtonItems } from '../button-group'
import { Data } from '@types'

const [name, bem] = createNamespace('List')

export enum FieldMode {
    Search = 'search',
    Data = 'data',
    All = 'all',
}

type BaseField = {
    mode: FieldMode
}

type Field = BaseField | FormItem | ColumnSchema

export type Fields = Field[]
type List = Data[]
export type ListData = {
    list: List
    pagination: Pagination
}

const DEFAULT_PAGINATION: Pagination = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
}

export type HandleSubmit = (model: Data) => Promise<ListData>
export type Apis = Record<ApiTypes | string, HandleSubmit>

export default defineComponent({
    name,
    components: {
        SearchForm,
        DataTable,
        ButtonGroup,
    },
    props: {
        fields: {
            type: Array as PropType<Fields>,
            required: true,
        },
        // 接口列表
        apis: {
            type: Object as PropType<Apis>,
            required: true,
        },
        actions: {
            type: Array as PropType<ButtonItems>,
            default: () => [],
        },
    },
    setup(props){
        const isLoading = ref(false)
        const searchForm = ref()
        const model = reactive({} as Data)
        const data = ref([] as List)
        const pagination = reactive({
            ...DEFAULT_PAGINATION,
        })
        const formProps = {
            labelPosition: 'right',
            labelWidth: 100,
            submitTitle: '查询',
        }
        const items = computed(() => props.fields.filter(field => (field as BaseField)?.mode !== FieldMode.Data ) as FormItems)
        const columns = computed(() => props.fields.filter(field => (field as BaseField)?.mode !== FieldMode.Search) as Columns)

        const updateItemValue = (key: string, value: any) => model[key] = value

        let isUpdateCurrentPage = false
        const onSubmit = async (model: Data) => {
            isLoading.value = true

            !isUpdateCurrentPage && Object.assign(pagination, DEFAULT_PAGINATION)

            const { apis } = props

            const { list, ...nextPagination } = apis && apis.list && (await apis.list({ ...model, ...pagination })) || {}

            data.value = list

            Object.assign(pagination, nextPagination)

            isLoading.value = false
            isUpdateCurrentPage = false
        }

        const onUpdateCurrentPage = (currentPage: number) => {
            pagination.currentPage = currentPage
            isUpdateCurrentPage = true
            searchForm.value?.onSubmit()
        }

        onSubmit(model)

        return {
            isLoading,
            bem,
            model,
            searchForm,
            items,
            pagination,
            columns,
            data,
            formProps,
            onSubmit,
            updateItemValue,
            onUpdateCurrentPage,
        }
    },
})
</script>
