<template>
  <main class="container">
    <h1 class="pt-5 text-center">登入後台</h1>
    <div class="row py-5 flex-column align-items-center">
      <div class="col-md-6 text-center mb-3">
        <h3>請先登入</h3>
      </div>
      <div class="col-md-6">
        <form>
          <div class="form-floating mb-3">
            <input
              v-model="user.username"
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              autocomplete="email"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              autocomplete="current-password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="d-flex gap-2">
            <router-link to="/" class="btn btn-primary w-50">回到首頁</router-link>
            <button @click="login" type="button" class="btn btn-primary w-50">
              登入
            </button>
          </div>
        </form>
        <p class="text-secondary text-center pt-5">&copy; create-vue-project</p>
      </div>
    </div>
  </main>
</template>

<script>
import Swal from "sweetalert2";
import isUserLoggedIn from '@/utils/isUserLoggedIn';
import showSuccessToast from "@/utils/showSuccessToast";

const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // POST 登入及驗證
    login() {
      // 驗證是否有 token
      if (isUserLoggedIn()) {
        this.goToAdmin();
        return;
      }
      const url = `${VITE_APP_URL}/admin/signin`;
      this.axios
        .post(url, this.user)
        .then((res) => {
          // 將 expired 和 token 存入 cookies
          const { expired, token } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          showSuccessToast(res.data.message)
          .then(() => {
            this.goToAdmin();
          });
          // 清空 user
          this.user = {};
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            Swal.fire({
              title: '請輸入正確的帳號和密碼',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else if (this.user.username === '' || this.user.password === '') {
            Swal.fire({
              title: '請輸入登入信箱和密碼',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          };
        });
    },
    // 如有 token 導向後台
    goToAdmin() {
      if (isUserLoggedIn()) {
        // 已登入，可進入後台
        this.$router.push({ name: 'admin' });
      } else {
        // 未登入，導向登入頁面
        Swal.fire({
          title: '請先登入',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>