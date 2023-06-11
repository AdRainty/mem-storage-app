<template>
    <div class="message">
        <el-container>
            <el-aside width="300px">
                <Friend :callback="handleSessionChange" />
            </el-aside>
            <el-main>
                <Session :currentSession="currentSession" v-if="currentSession != undefined"/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Friend from './Message/Friend.vue'
import Session from './Message/Session.vue'
import { getCurrentInstance } from 'vue'

export default {
    name: 'Message',
    components: {
        Friend,
        Session
    },
    data () {
        return {
            currentSession: undefined
        }
    },
    setup() {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    methods: {
        handleSessionChange (view) {
            console.log(view)
            this.currentSession = view
        }
    }
}
</script>
