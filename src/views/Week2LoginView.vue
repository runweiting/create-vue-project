<script>
import Swal from 'sweetalert2';

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
    this.axios.defaults.headers.common['Authorization'] = token    
  },
  methods: {
    // POST 登入及驗證
    login(){
      // 驗證是否有 token
      if (this.isUserLoggedIn()) {
        Swal.fire({
          title: '已成功登入，不需重複登入',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        return;
      }
      const url = `${this.apiUrl}/admin/signin`;
      this.axios
      .post(url, this.user)
      .then((res)=> {
        // 將 expired 和 token 存入 cookies
        const { expired, token } = res.data;
        document.cookie = `myToken=${token}; expired=${new Date(expired)}`;
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        // 清空 user
        this.user = {};
      })
      .catch((err)=> {
        if (this.user.username === '' || this.user.password === ''){
          Swal.fire({
          title: '請輸入登入信箱和密碼',
          icon: 'error',
          confirmButtonText: 'OK'
          })
        }
      })
    },
    // POST 驗證是否登入
    checkLogin(){
      const url = `${this.apiUrl}/api/user/check`;
      this.axios
      .post(url)
      .then((res)=> {
        console.log(res.data);
        Swal.fire({
          title: '已成功登入',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.goToAdmin();
        });
        // 清空 user
        this.user = {};
      })
      .catch((err)=> {
        console.log(err.response);
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
          })
      })
    },
    // 如有 token 導向後台
    goToAdmin(){
      if (this.isUserLoggedIn()) {
        // 已登入，可進入後台
        this.$router.push({ name: 'admin' });
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
    // 驗證是否有 token
    isUserLoggedIn(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      return !!token;
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
          <div class="d-flex gap-2">
            <button @click="login"  type="button" class="btn btn-primary">登入</button>
            <button @click="checkLogin" type="button" class="btn btn-primary">驗證登入 -> 前往後台</button>
            <button @click="goToAdmin" type="button" class="btn btn-primary">前往後台</button>
          </div>
        </form>
        <p class="text-secondary text-center pt-5">&copy; create-vue-project</p>
      </div>
    </div>
  </main>
</template>

<style>
</style>
