<template>
    <div>
        <l-button type="success" @click="handelMessageSuccess">
            success
        </l-button>
        <l-button type="info" @click="handelMessageInfo">info</l-button>
        <l-button type="warning" @click="handelMessageWarn">warning</l-button>
        <l-button type="danger" @click="handelMessageError">error</l-button>
    </div>
</template>
<script lang="ts">
import { getCurrentInstance } from 'vue'

export default{
    setup(){
        const { ctx } = getCurrentInstance() as any
        const handelMessageSuccess=()=>{
            ctx.SeMessage({
                type: 'success',
                message: '成功',
            })
        }
        const handelMessageInfo=()=>{
            ctx.SeMessage({
                type: 'info',
                message: '提示',
            })
        }
        const handelMessageWarn=()=>{
            ctx.SeMessage({
                type: 'warning',
                message: '警告',
            })
        }
        const handelMessageError=()=>{
            ctx.SeMessage({
                type: 'error',
                message: '错误',
            })
        }
        return {
            handelMessageSuccess,
            handelMessageInfo,
            handelMessageWarn,
            handelMessageError,
        }
    },
}
</script>
