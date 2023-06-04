<template>
    <div class="login-container">
        <div class="admin-login-background">
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
                <el-link type="primary" @click="handleSwitchRegistry">Don't have count?</el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
import store from '@/store'
import { JSEncrypt } from 'jsencrypt'
import { getCurrentInstance, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            User: shallowRef(User),
            Lock: shallowRef(Lock)
        }
    },
    props: {
        redirect: { type: String },
        callback: { type: Function }
    },
    setup () {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    beforeMount () {
        this.getPublicKey()
    },
    methods: {
        handleLogin () {
            const encryptor = new JSEncrypt()
            const publicKey = store.state.publicKey
            encryptor.setPublicKey(publicKey)
            this.loginForm.password = encryptor.encrypt(this.loginForm.password)
            this.proxy.$post('/api/authority/login', this.loginForm).then(r => {
                if (r.code === 0) {
                    localStorage.token = r.token
                    this.getUserInfo()
                    if (this.redirect === '') {
                        this.$router.push('/index')
                    } else {
                        this.$router.push(this.redirect)
                    }
                } else {
                    ElMessage.error(r.msg)
                }
            }).catch(e => {
                console.log(e)
                ElMessage.error('System Error.')
            })
        },
        getUserInfo() {
            this.proxy.$get('/api/user/userInfo').then(r => {
                if (r.code === 0) {
                    console.log(r.user.username)
                    localStorage.username = r.user.username
                } else {
                    ElMessage.error(r.msg)
                }
            }).catch(e => {
                console.log(e)
                ElMessage.error('System Error.')
            })
        },
        handleSwitchRegistry () {
            this.callback('registry')
        },
        getPublicKey () {
            this.proxy.$get('/api/authority/publicKey').then(r => {
                if (r.code === 0) {
                    store.state.publicKey = r.publicKey
                } else {
                    ElMessage.error(r.msg)
                }
            }).catch(e => {
                console.log(e)
                ElMessage.error('Network Error.')
            })
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
