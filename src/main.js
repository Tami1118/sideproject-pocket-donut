import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/all.scss'


// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 根據icon樣式，匯入目標icon
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'
// import { faDonut } from '@fortawesome/free-regular-svg-icons'
// import { faDiscord } from '@fortawesome/free-brands-svg-icons'

// icon新增到library
library.add(faCircleDollarToSlot)


const app = createApp(App)

// 外部套件引入
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
