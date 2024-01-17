<script>
import Swal from 'sweetalert2';
import ProductList from '../components/week3/ProductList.vue';

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      // GET 商品列表
      products: [],
    }
  },
  // 資料建立完成
  created() {
  },
  // 已掛載 DOM
  mounted() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    // axios headers 預設寫法
    this.axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  },
  methods: {
    // POST 驗證登入
    checkLogin() {
      const url = `${this.apiUrl}/api/user/check`;
      this.axios
      .post(url)
      .then(()=> {
        this.getData();
      })
      .catch((err)=> {
        console.log(err.response);
        Swal.fire({
          title: `驗證錯誤，請重新登入`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
        .then(()=> {
          this.$router.push({ name: 'login' });
        })
      })
    },
    // GET 商品列表
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      this.axios
      .get(url)
      .then((res)=> {
        this.products = res.data.products;
        console.log(this.products)
      })
      .catch((err)=> {
        console.log(err)
      })
    },
  },
};

</script>

<template>
  <main class="container">
    <div class="row py-3">
      <ProductList />
      
    </div>
  </main>
</template>

<style>
</style>
