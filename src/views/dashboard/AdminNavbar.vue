<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-4">
        <a class="navbar-brand mb-0" href="index.html">UNIQLOLO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav gap-2">
            <li class="nav-item">
              <!-- RouterLink 生成路由連結，編譯後轉為 <a>，to 代表要進入的路由 -->
              <RouterLink 
              :to="{ name: 'admin/products' }" class="nav-link text-decoration-none">商品列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink 
              :to="{ name: 'admin/orders' }" class="nav-link text-decoration-none">訂單列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink 
              :to="{ name: 'home' }" class="nav-link text-decoration-none">回到前台</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <!-- 渲染路由 "/admin" children：dashboard-->
    <router-view></router-view>
  </main>
</template>

<script>
import Swal from 'sweetalert2';

const { VITE_APP_URL } = import.meta.env;

export default {
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // axios headers 預設寫法
    this.axios.defaults.headers.common.Authorization = token;
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    // POST 驗證登入
    checkAdmin() {
      const url = `${VITE_APP_URL}/api/user/check`;
      this.axios
        .post(url)
        .catch(() => {
          Swal.fire({
            title: '驗證錯誤，請重新登入',
            icon: 'error',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'login' });
          });
        });
    },
  }
}
</script>

<style lang="scss">
.nav-link.active {
  color: white !important;
}
</style>