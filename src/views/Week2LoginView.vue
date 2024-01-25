<script>
import Swal from 'sweetalert2';
import { isUserLoggedIn } from '../../src/components/utils/utils';

export default {
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      user: {
        "username": "",
        "password": ""
      }
    }
  },
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",
    );
    // axios headers 預設寫法
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = token;
    }
  },
  methods: {
    // POST 登入及驗證
    login(){
      // 驗證是否有 token
      if (isUserLoggedIn()) {
        Swal.fire({
          title: '已成功登入，不需重複登入',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.goToWeek4Admin();
        return
      };
      const url = `${this.apiUrl}/admin/signin`;
      this.axios
      .post(url, this.user)
      .then((res)=> {
        // 將 expired 和 token 存入 cookies
        const { expired, token } = res.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
        Swal.fire({
          title: `您已成功登入`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.goToWeek3Admin();
        });
        // 清空 user
        this.user = {};
      })
      .catch((err)=> {
        if (err.response && err.response.status === 400){
          Swal.fire({
            title: '登入帳號或密碼錯誤',
            text: '請輸入正確的帳號和密碼',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else if (this.user.username === '' || this.user.password === ''){
          Swal.fire({
            title: '請輸入登入信箱和密碼',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
    },
    // 如有 token 導向後台
    goToWeek4Admin(){
      if (isUserLoggedIn()) {
        // 已登入，可進入後台
        Swal.fire({
          title: '這是後台商品頁面',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.$router.push({ name: 'week4-admin' });
      } else {
        // 未登入，導向登入頁面
        Swal.fire({
            title: '請先登入',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        this.$router.push({ name: 'login' });
      }
    },
  }
}
</script>

<template>
  <main class="container">
    <div class="row py-5 flex-column align-items-center">
      <div class="col-md-6 text-center mb-3">
        <h3>請先登入</h3>
      </div>
      <div class="col-md-6">
        <form>
          <div class="form-floating mb-3">
            <input v-model="user.username" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" autocomplete="email">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="user.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="current-password">
            <label for="floatingPassword">Password</label>
          </div>
          <div>
            <button @click="login"  type="button" class="btn btn-primary w-100">登入</button>
          </div>
        </form>
        <p class="text-secondary text-center pt-5">&copy; create-vue-project</p>
      </div>
    </div>
  </main>
</template>

<style>
</style>
