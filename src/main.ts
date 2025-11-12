import { createApp, type Component } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax-alpha'
import * as VuesaxAlphaIconsVue from '@vuesax-alpha/icons-vue'

import 'vuesax-alpha/theme-chalk/index.css'
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'

const app = createApp(App)

// 👇 Cast de tipo para que TypeScript entienda que cada "component" es un componente de Vue
for (const [key, component] of Object.entries(VuesaxAlphaIconsVue)) {
  app.component(`VsIcon${key}`, component as Component)
}

app.use(router)
app.use(Vuesax)

app.mount('#app')
