import './assets/main.css'

// 具名匯入、sideEffects
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 啟用套件的寫法
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
