<script>
import Swal from 'sweetalert2';
import AdminMain from '../components/week4/AdminMain.vue';
import AdminFooter from '../components/week4/AdminFooter.vue'

export default {
  components: {
    AdminMain,
    AdminFooter
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      // 商品列表
      products: [],
      // 分頁
      pagination: {},
    }
  },
  // 資料建立完成
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    // axios headers 預設寫法
    this.axios.defaults.headers.common['Authorization'] = token;
  },
  // 已掛載 DOM
  mounted() {
    this.checkAdmin();
  },
  methods: {
    // POST 驗證登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      this.axios
      .post(url)
      .then(()=> {
        this.getData();
      })
      .catch(()=> {
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
    // 預設為第一頁，若 page 傳入值則取代 1
    getData(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      this.axios
      .get(url)
      .then((res)=> {
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination;
      })
    },
  },
};
</script>
<template>
  <main class="container">
    <div class="row py-2">
      <!-- 
        向 admin-main 傳遞 products 並帶入 products
       -->
      <admin-main :products="products" />
      <!-- 
        1. 向 admin-footer 傳遞 pages 並帶入 pagination
        2. 用 showPage 事件觸發 getData 
       -->
      <admin-footer :pages="pagination" @showPage="getData" />
    </div>
  </main>
</template>

<style>
</style>
