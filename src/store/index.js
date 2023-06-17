import { createStore } from 'vuex'

export default createStore({
    state: {
        username: '',
        avatarUrl: '',
        user: undefined,
        talk: undefined,
        socket: undefined,
        lastMessage: undefined
    },
    getters: {
    },
    mutations: {
        changeMessage(msg) {
            console.log(msg)
        }
    },
    actions: {
        changeMessage({ commit }) {
            console.log(commit)
        }
    },
    modules: {
    }
})
