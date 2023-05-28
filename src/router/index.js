import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// home
const home = () => import('../views/HomeView.vue')
const index = () => import('../views/main/Index.vue')
const message = () => import('../views/main/Message.vue')
const setting = () => import('../views/main/Setting.vue')

// error
const page404 = () => import('../views/error/404.vue')

// system
const login = () => import('../views/system/Authority.vue')

const routes = [
    { path: '/login', name: 'login', component: login },
    { path: '/404', name: '404', component: page404 },
    { path: '/:error*', name: 'error', redirect: '/404' },
    {
        path: '/',
        name: 'home',
        component: home,
        redirect: '/index',
        meta: { requireAuth: true },
        children: [
            { path: '/index', name: 'index', component: index },
            { path: '/message', name: 'message', component: message },
            { path: '/setting', name: 'setting', component: setting }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    if (to.path === '/login' && store.state.token !== undefined && store.state.token !== '') {
        console.log(1)
        // 如果请求路径为login, 但是带了token, 跳转到首页
        next({
            path: '/index'
        })
    } else if (to.meta.requireAuth) {
        console.log(2)
        // 如果请求需要权限, 但是没带token, 跳转到登录页
        if (store.state.token === undefined || store.state.token === '') {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
