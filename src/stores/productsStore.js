import axios from "axios";
import { defineStore } from "pinia";
// 因為是獨立作用域的 .js，所以需要額外載入
import { useLoading } from "vue-loading-overlay";
// 在 Vue.js 中，使用 $ 前綴來表示這是一個特殊的對象或全局對象
// $loading 代表使用 useLoading({}) 方法建立的一個對象，它提供了顯示和隱藏 loading 等功能
const $loading = useLoading({});

const apiUrl = import.meta.env.VITE_APP_URL;
const apiPath = import.meta.env.VITE_APP_PATH;

export default defineStore("productsStore", {
  state: () => ({
    // 商品列表
    productList: [],
    pagination: {},
    // vue-loading-overlay
    fullPage: false,
  }),
  actions: {
    // GET 商品列表
    async getProducts(category, page = 1) {
      const loader = $loading.show();
      let url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }
      try {
        const res = await axios.get(url);
        const { products, pagination } = res.data;
        this.productList = products;
        this.pagination = pagination;
        // 異步操作完成後，調用排序邏輯
        this.sortProducts();
      } finally {
        loader.hide();
      }
    },
    // sort 商品列表
    sortProducts() {
      this.productList = this.productList.sort((a, b) => a.price - b.price);
    },
  },
});
