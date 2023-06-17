<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header-class">
                <Header />
            </el-header>
            <el-container class="container-class">
                <el-aside width="200px">
                    <Aside :callback="handleRouterView"/>
                </el-aside>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from './layout/Header.vue'
import Aside from './layout/Aside.vue'
import store from '../store'

export default {
    name: 'HomeView',
    components: {
        Header,
        Aside
    },
    mounted() {
        const token = sessionStorage.token
        const websocket = new WebSocket(`ws://localhost:9540/im/websocket?token=${token}`)
        websocket.onerror = function() {
            console.log('error')
        }
        websocket.onopen = function(event) {
            console.log('websocket connect', event.data)
        }
        websocket.onmessage = function(event) {
            console.log('')
        }
        websocket.onclose = function() {
            console.log('websocket clost')
        }
        store.state.socket = websocket
    },
    methods: {
        handleRouterView (view) {
            console.log(view)
            this.$router.push({ path: `/${view}` })
        }
    }
}
</script>

<style scoped>

.header-class{
    margin-top: 20px;
}

.container-class{
    margin-top: 10px;
}

</style>
