<template>
    <div class="login-container">
        <div class="admin-login-background">
            <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="options"
            />
            <el-form class="login-form" :model="loginForm" label-width="60px">
                <h1 class="logo-title">Login</h1>
                <el-form-item class="login-form-item" label="Usename">
                    <el-input
                        :prefix-icon="User"
                        v-model="loginForm.username"
                    />
                </el-form-item>
                <el-form-item
                    class="login-form-item"
                    label="Password"
                    prop="pass"
                >
                    <el-input
                        :prefix-icon="Lock"
                        v-model="loginForm.password"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item class="login-form-item">
                    <el-button type="primary" @click="handleLogin"
                        >Login</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
import store from '@/store'
import { loadFull } from 'tsparticles'
import { options } from '@/utils/option'
import { getCurrentInstance, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'Login',
    data () {
        return {
            redirect: '',
            loginForm: {
                username: '',
                password: '',
                uuid: ''
            },
            User: shallowRef(User),
            Lock: shallowRef(Lock)
        }
    },
    setup () {
        const particlesInit = async (engine) => {
            await loadFull(engine)
        }

        const particlesLoaded = async (container) => {
            console.log('Particles container loaded', container)
        }

        const { proxy } = getCurrentInstance()

        return {
            particlesInit, particlesLoaded, options, proxy
        }
    },
    methods: {
        handleLogin () {
            this.proxy.$post('/api/authority/login', this.loginForm).then(r => {
                // console.log(response)
                if (r.code === 200) {
                    store.state.token = r.token
                    if (this.redirect === '') {
                        this.$router.push('/home')
                    } else {
                        this.$router.push(this.redirect)
                    }
                } else {
                    ElMessage.error(r.msg)
                }
            }).catch(e => {
                console.log(e)
                ElMessage.error('Network Error.')
            })
        }
    },
    mounted () {
        const query = this.$route.query
        console.log(query)
        if (query.redirect !== undefined) {
            const redirect = query.redirect
            this.redirect = redirect
        }
    }
}
</script>

<style scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    background-color: #1e9fff;
}

.admin-login-background {
    width: 360px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -180px;
    margin-top: -100px;
}
.logo-title {
    text-align: center;
    letter-spacing: 2px;
    padding: 14px 0;
}
.logo-title h1 {
    color: #1e9fff;
    font-size: 25px;
    font-weight: bold;
}
.login-form {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 14px 20px;
    box-shadow: 0 0 8px #eeeeee;
}
.login-form .login-form-item {
    position: relative;
}
.login-form .login-form-item label {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 38px;
    line-height: 36px;
    text-align: center;
    color: #d2d2d2;
}
.login-form .login-form-item input {
    padding-left: 36px;
}

.login-form .login-form-item button {
    margin-left: 25%;
}
</style>
