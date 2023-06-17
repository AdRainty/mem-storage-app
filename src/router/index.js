import { createRouter, createWebHistory } from 'vue-router'

// home
const home = () => import('../views/HomeView.vue')
const index = () => import('../views/main/Index.vue')
const message = () => import('../views/main/Message.vue')

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
            { path: '/index', name: 'index', component: index, meta: { requireAuth: true } },
            { path: '/message', name: 'message', component: message, meta: { requireAuth: true } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    if (to.path === '/login' && sessionStorage.token !== undefined && sessionStorage.token !== '') {
        // 如果请求路径为login, 但是带了token, 跳转到首页
        next({
            path: '/index'
        })
    } else if (to.meta.requireAuth) {
        // 如果请求需要权限, 但是没带token, 跳转到登录页
        if (sessionStorage.token === undefined || sessionStorage.token === '') {
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
