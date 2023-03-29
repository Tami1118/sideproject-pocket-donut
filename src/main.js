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

// ckeditor5
import CKEditor from '@ckeditor/ckeditor5-vue'

// Vee Loading


// Swiper


// Vee Validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';


// 載入規則
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

// 載入語系
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 繁體中文語系
  validateOnInput: false, // 輸入同時驗證
});
setLocale('zh_TW');



// #2. const要在import後面
const app = createApp(App)



// #3. app.use要在createApp(App)後面引入套件
app
  .use(createPinia())
  .use(router)
  .use(VueAxios, axios)
  .use(CKEditor)
  .component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app')
