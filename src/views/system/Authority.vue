<template>
    <div class="login-container">
        <div class="admin-login-background">
            <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :options="options"
            />
            <Login :redirect="redirect" :callback="handleTypeChange" v-if="type === 'login'"/>
            <Registry :redirect="redirect" :callback="handleTypeChange" v-if="type === 'registry'"/>
        </div>
    </div>
</template>

<script>
import { loadFull } from 'tsparticles'
import { options } from '@/utils/option'
import Login from './Login.vue'
import Registry from './Registry.vue'

export default {
    components: { Login, Registry },
    name: 'authority',
    data () {
        return {
            redirect: '',
            type: 'login'
        }
    },
    setup () {
        const particlesInit = async (engine) => {
            await loadFull(engine)
        }

        return {
            particlesInit, options
        }
    },
    mounted () {
        const query = this.$route.query
        if (query.redirect !== undefined) {
            const redirect = query.redirect
            this.redirect = redirect
        }
    },
    methods: {
        handleTypeChange (type) {
            this.type = type
        }
    }
}
</script>

<style scoped>
</style>
