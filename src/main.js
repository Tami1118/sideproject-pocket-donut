// #1. import外部資源
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
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'

// ckeditor5
import CKEditor from '@ckeditor/ckeditor5-vue'



// #2. const要在import後面
const app = createApp(App)



// #3. app.use要在createApp(App)後面引入套件
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(CKEditor)
library.add(faCircleDollarToSlot)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
