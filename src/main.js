import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import http from './utils/httpRequest'
import store from './store'
import Particles from 'particles.vue3'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus).use(Particles).use(http)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

export default app
