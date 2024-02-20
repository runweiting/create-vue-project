// side effect
import "./assets/all.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.css";

// 匯入 createApp、createPinia
import { createApp } from "vue";
import { createPinia } from "pinia";
// 匯入 axios、VueAxios
import axios from "axios";
import VueAxios from "vue-axios";
// 匯入 VueLoading
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// 匯入 VeeValidate
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
// 匯入 CKEditor
import CKEditor from "@ckeditor/ckeditor5-vue";
// 匯入 vue-i18n
import { createI18n } from "vue-i18n";
import zh from "./languages/zh_TW.json";
import en from "./languages/en.json";

import App from "./App.vue";
import router from "./router";

// Object.keys 將 AllRules 轉為陣列 forEach 將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

// 建立 i18n 實體
const i18n = createI18n({
  legacy: false, // 啟用新的 Vue3 選項
  locale: "en", // 設置默認語言
  messages: {
    en,
    "zh-TW": zh, // 引入 zh-TW.json 文件
  },
});
// 建立 Vue 實體
const app = createApp(App);
// 建立 Pinia 實體
const pinia = createPinia();

// 啟用套件
app.use(pinia);
app.use(VueAxios, axios);
app.use(LoadingPlugin);
app.use(CKEditor);
app.use(i18n);

// 使 app 所有子元件都能存取全局屬性 this.$router 與 this.$route
// this.$router：存取路由 Router，用來進行導航、切換路由，提供方法如 push、replace、go，用於改變 URL 並觸發相應的路由
// this.$route：當前路由資訊物件 Route，如路由的 path、params、query
app.use(router);

// 全域註冊
// VeeValidate 元件
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);

// 掛載 Vue 實體至 DOM
app.mount("#app");
