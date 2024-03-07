import axios from "axios";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default defineStore("categoryStore", {
  state: () => ({
    // 從 GET 購物車列表中的 category 來分類
    categoryList: [],
  }),
  actions: {
    // GET 商品列表
    getCategory() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`;
      axios.get(url).then((res) => {
        const { products } = res.data;
        // new Set(...) 是一種 ES6 中的集合類型，可以存儲唯一的值，重複的值會被忽略
        const category = new Set(products.map((item) => item.category));
        this.categoryList = [...category];
      });
    },
  },
});
