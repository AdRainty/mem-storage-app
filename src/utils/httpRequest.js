import axios from 'axios'
import router from '@/router'
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:9500'

axios.interceptors.request.use(
    async config => {
        config.headers.token = localStorage.token
        return config
    },
    error => {
        return Promise.error(error)
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                case 401:
                    break
                // 403 token过期
                case 403:
                    store.state.token = ''
                    router.push('/login')
                    break
                // 404请求不存在
                case 404:
                    break
                default:
            }
            return Promise.reject(error.response)
        }
    }
)

/**
 * get方法，对应get请求
 * @param {String} 请求的url地址
 * @param {Object} 请求时携带的参数
 */
const $get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} 请求的url地址
 * @param {Object} 请求时携带的参数
 */
const $post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} 请求的url地址
 * @param {Object} 请求时携带的参数
 */
const $upload = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export default {
    install: (app) => {
        app.config.globalProperties.$get = $get
        app.config.globalProperties.$post = $post
        app.config.globalProperties.$axios = axios
        app.config.globalProperties.$upload = $upload
    }
}
