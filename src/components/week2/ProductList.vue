<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      user: {
        username: '',
        password: '',
      },
      products: [],
      title: '產品列表',
    };
  },
  // created() 在初始化後立即調用，在讀取和掛載 DOM 之前，如設置初始數據、監聽事件等
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // axios headers 預設寫法
    this.axios.defaults.headers.common.Authorization = token;
  },
  methods: {
    // POST 登出
    logout() {
      const url = `${this.apiUrl}/logout`;
      this.axios.post(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // 清空 user
          this.user = {};
          // 清除 token
          document.cookie = 'myToken=; expires=;';
          // 清除 headers
          this.axios.defaults.headers.common.Authorization = null;
          // 導向登入頁面
          this.$router.push({ name: 'login' });
        });
      });
    },
    // 2. 執行 $emit 將'showProductDetail' 事件和 item 傳入 Week2AdminView <ProductList>
    ItemInfo(item) {
      this.$emit('showProductDetail', item);
    },
  },
  // 初始化後，執行的第一個方法
  mounted() {
    // GET 取得後台產品列表
    const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
    this.axios.get(url).then((res) => {
      this.products = res.data.products;
    });
  },
};
</script>

<template>
  <div class="col-md-8 mt-4 mb-4">
    <h2>{{ title }}</h2>
    <p class="text-secondary">請選擇一個商品查看細節</p>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" class="fw-bold">產品名稱</th>
          <th scope="col" class="fw-bold">原價</th>
          <th scope="col" class="fw-bold">售價</th>
          <th scope="col" class="fw-bold">是否啟用</th>
          <th scope="col" class="fw-bold">查看細節</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.title">
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td :class="{ 'text-success': item.is_enabled }">
            {{ item.is_enabled ? "啟用" : "未啟用" }}
          </td>
          <td>
            <!-- 1. 觸發 ItemInfo(item) -->
            <button
              type="button"
              class="btn btn-primary"
              @click="ItemInfo(item)"
            >
              查看細節
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex gap-2">
      <p class="p-2 mb-0">{{ `目前有 ${this.products.length} 項產品` }}</p>
      <button @click="logout" type="button" class="btn btn-warning">
        登出
      </button>
    </div>
  </div>
</template>

<style scoped></style>
