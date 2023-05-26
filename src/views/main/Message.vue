<template>
    <div class="message">
        <el-container>
            <el-aside width="300px">
                <Friend :callback="handleSessionChange" />
            </el-aside>
            <el-main>
                <Session :currentSession="currentSession" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Friend from './Message/Friend.vue'
import Session from './Message/Session.vue'

export default {
    name: 'Message',
    components: {
        Friend,
        Session
    },
    data () {
        return {
            currentSession: ''
        }
    },
    methods: {
        handleSessionChange (view) {
            this.currentSession = view
        }
    }
}
</script>
