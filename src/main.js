import App from './App'

import { createApp } from 'vue'
import router from "@/router";
import { createPinia } from 'pinia'

import components from '@/components/Base';
const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(createPinia())
    .mount('#app');