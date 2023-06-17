<template>
    <div class="message">
        <el-row class="mb-4">
            <el-input v-model="keyword" style="width: 80%" placeholder="Please Input" :suffix-icon="Search" />
            <el-button type="info" style="margin-left: 10px">+</el-button>
        </el-row>
        <el-menu class="el-menu-vertical-demo" style="margin-top: 10px" @select="handleOpen">
            <el-menu-item :index="String(item.id)" v-for="item in talks" :key="item">
                <el-badge :value="item.count" :max="99" class="item" :hidden="item.count <= 0">
                    <el-avatar shape="square" :src="item.avatar" />
                </el-badge>
                <span style="margin-left: 5px">{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { getCurrentInstance, shallowRef } from 'vue'
import store from '../../../store'

export default {
    name: 'Friend',
    data() {
        return {
            Search: shallowRef(Search),
            squareUrl: '',
            keyword: '',
            talks: []
        }
    },
    props: {
        callback: { type: Function },
        currentSession: { type: String }
    },
    setup() {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    mounted() {
        this.proxy.$get('/api/im/getAllTalk').then(r => {
            this.talks = r.talk
            console.log(r)
        }).catch(e => {
            console.log(e)
        })
    },
    created() {
        const that = this
        store.state.socket.onmessage = function (event) {
            that.sortTalk(event.data)
        }
    },
    methods: {
        handleOpen(key, _) {
            this.readMessage(key)
            this.callback(key)
        },
        readMessage(key) {
            const filter = this.talks.filter(item => String(item.id) === key)
            if (filter) {
                const obj = filter[0]
                this.proxy.$get(`/api/im/message/readMessage?id=${obj.id}&chatType=0`).then(r => {
                    console.log(r)
                }).catch(e => {
                    console.log(e)
                })
                obj.count = 0
            }
        },
        sortTalk(data) {
            const filter = this.talks.filter(item => String(item.id) === data.sender)
            if (filter) {
                const obj = filter[0]
                if (store.currentSession !== String(obj.id)) {
                    obj.count += 1
                    this.talks.sort((a, b) => {
                        return ((a.count < b.count) ? -1 : 1)
                    })
                }
            }
        }
    }
}
</script>

<style>
.el-badge__content {
    margin-top: 10px;
}
</style>
