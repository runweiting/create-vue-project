import axios from 'axios';
import { defineStore } from 'pinia';

const apiUrl = import.meta.env.VITE_URL;
const apiPath = import.meta.env.VITE_PATH;

export default defineStore('cartStore', {
  state: () => ({
    // 購物車列表
    cartList: [],
    // 購物車總計
    cartTotal: 0,
  }),
  actions: {
    // GET 購物車列表
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.cartTotal = res.data.data.total;
          console.log(this.cartList);
        });
    },

  },
  getters: {
  },
});
