import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import daysPlugin from './plugins/dayjs'
import EventBusPlugin from './plugins/EventBus'
import dayjs from "dayjs";
import mitt from 'mitt'

const emitter = mitt()

const application = createApp(App)

application.use(store)
    .use(router)
    .use(daysPlugin, dayjs)
    .use(EventBusPlugin, emitter)
    .mount('#app')