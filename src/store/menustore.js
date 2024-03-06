import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const createApp = createApp()


App.use(pinia)
App.mount('#app')