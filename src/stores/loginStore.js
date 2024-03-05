import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL } = import.meta.env;

export default defineStore("loginStore", {
  actions: {
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
          this.axios.defaults.headers.common.Authorization = null;
          // 導向登入頁面
          this.$router.push({ name: "login" });
        });
      });
    },
  },
});
