import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './assets/all.scss'
import './assets/main.css'


// axios
import axios from 'axios'
import VueAxios from 'vue-axios'




const app = createApp(App)

// 外部套件引入
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
