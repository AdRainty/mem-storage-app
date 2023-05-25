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
const login = () => import('../views/system/Login.vue')

const routes = [
    { path: '/login', name: 'login', component: login },
    { path: '/404', name: '404', component: page404 },
    { path: '/:error*', name: 'error', redirect: '/404' },
    {
        path: '/home',
        name: 'home',
        component: home,
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
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router
