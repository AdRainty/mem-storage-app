<template>
    <div class="layout-header" style="boxShadow: --el-box-shadow;">
        <div>
            <img class="logo" alt="logo" src="@/assets/cover.png">
        </div>
        <div class="block">
            <el-popover>
                <template #reference>
                    <el-avatar :size="50" :src="avatarUrl" />
                </template>
                <template #default>
                    <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                        <div>
                            <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
                                {{ username }}
                            </p>
                        </div>

                        <div>
                            <el-link @click="handleLogout">退出登录</el-link>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    components: {
    },
    data () {
        return {
            avatarUrl: '',
            username: ''
        }
    },
    created () {
        this.username = localStorage.username
        this.avatarUrl = localStorage.avatarUrl
    },
    methods: {
        handleLogout () {
            localStorage.token = ''
            localStorage.user = {}
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.block {
    position: absolute;
    right: 5%;
}

.logo {
    height: 60px;
    position: absolute;
    left: 0%;
}
</style>
