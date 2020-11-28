import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import daysPlugin from './plugins/dayjs'
import dayjs from "dayjs";

createApp(App)
    .use(store)
    .use(router)
    .use(daysPlugin, dayjs)
    .mount('#app')