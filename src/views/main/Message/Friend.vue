<template>
    <div class="message">
        <el-row class="mb-4">
            <el-input v-model="keyword" style="width: 80%" placeholder="Please Input" :suffix-icon="Search" />
            <el-button type="info" style="margin-left: 10px">+</el-button>
        </el-row>
        <el-menu class="el-menu-vertical-demo" style="margin-top: 10px" @select="handleOpen">
            <el-menu-item :index="String(item)" v-for="item in 10" :key="item">
                <el-badge :value="100" :max="99" class="item" :hidden="false">
                    <el-avatar shape="square" :src="squareUrl" />
                </el-badge>
                <span style="margin-left: 5px">聊天{{ item }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { getCurrentInstance, shallowRef } from 'vue'

export default {
    name: 'Friend',
    data() {
        return {
            Search: shallowRef(Search),
            squareUrl: '',
            keyword: ''
        }
    },
    props: {
        callback: { type: Function }
    },
    setup() {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    mounted() {
        this.proxy.$get('/api/im/group/searchGroupTalk').then(r => {
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    },
    methods: {
        handleOpen(key, _) {
            this.callback(key)
        }
    }
}
</script>

<style>
.el-badge__content {
    margin-top: 10px;
}
</style>
