import Vue from '../main.js'
import router from '@/router'
import store from '@/store'

export function clearLoginInfo () {
    Vue.cookie.delete('token')
    store.commit('resetStore')
    router.options.isAddDynamicMenuRoutes = false
}
