import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'
import http from './utils/httpRequest'
import store from './store'
import Particles from 'particles.vue3'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus).use(Particles).use(http)
app.mount('#app')

export default app
