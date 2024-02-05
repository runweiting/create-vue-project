import './assets/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../node_modules/sweetalert2/dist/sweetalert2.css';

// 具名匯入、sideEffects
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';

// 引入 VueLoading
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// 引入 VeeValidate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// Object.keys 將 AllRules 轉為陣列 forEach 將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule)=> {
    defineRule(rule, AllRules[rule])
});
// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
});
setLocale('zh_TW');


// 建立 Vue 實體元件
const app = createApp(App);

// 啟用套件的寫法
app.use(createPinia());
// 使 app 所有子元件都能存取全局屬性 this.$router 與 this.$route
// this.$router：存取路由 Router，用來進行導航、切換路由，提供方法如 push、replace、go，用於改變 URL 並觸發相應的路由
// this.$route：當前路由資訊物件 Route，如路由的 path、params、query
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin);

// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

// 掛載 Vue 實體至 DOM
app.mount('#app');

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';