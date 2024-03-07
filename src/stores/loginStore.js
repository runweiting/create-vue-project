import Swal from "sweetalert2";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { useLoading } from "vue-loading-overlay";

const $loading = useLoading();
const { VITE_APP_URL } = import.meta.env;

export default defineStore("loginStore", {
  actions: {
    // POST 驗證登入
    checkLogin() {
      // 開啟 loading
      const loader = $loading.show();
      const url = `${VITE_APP_URL}/api/user/check`;
      // 從 cookies 讀取 token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      // axios headers 預設寫法
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      axios
        .post(url)
        .then(() => {})
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            router.push({ name: "login" });
          });
        })
        .finally(() => {
          // 關閉 loading
          loader.hide();
        });
    },
    // POST 登出
    logout() {
      const url = `${VITE_APP_URL}/logout`;
      axios.post(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 清除 token
          document.cookie = "myToken=; expires=;";
          // 清除 headers
          axios.defaults.headers.common.Authorization = null;
          // 導向登入頁面
          router.push({ name: "home" });
        });
      });
    },
  },
});
