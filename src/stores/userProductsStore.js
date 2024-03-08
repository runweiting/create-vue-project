import axios from "axios";
import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";

import showErrorToast from "@/utils/showErrorToast";

// 在 Vue.js 中，使用 $ 前綴來表示這是一個特殊的對象或全局對象
// $loading 代表使用 useLoading({}) 建立的一個對象，它提供了顯示和隱藏 loading 等功能
const $loading = useLoading({});

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default defineStore("userProductsStore", {
  state: () => ({
    // 商品列表
    productList: [],
    pagination: {},
    // vue-loading-overlay
    // fullPage: false, 須指定渲染容器，才需設定
  }),
  actions: {
    // GET 商品列表
    async getProducts(category, page = 1) {
      // 如需指定渲染的 container
      // 可寫在 .show({ container: this.fullPage ? null : this.$refs.xxx })
      // 建立 loader 實體
      const loader = $loading.show();
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?page=${page}`;
      if (category) {
        url += `&category=${category}`;
      }
      try {
        const res = await axios.get(url);
        const { products, pagination } = res.data;
        this.productList = products;
        this.pagination = pagination;
        console.log(res.data);
        console.log(this.productList);
        console.log(this.pagination);
        // 異步操作完成後，調用排序邏輯
        this.sortProducts();
      } catch (err) {
        showErrorToast(err.response.data.message);
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
