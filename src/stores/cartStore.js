import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";
import loadingStore from "./loadingStore";

const apiUrl = import.meta.env.VITE_APP_URL;
const apiPath = import.meta.env.VITE_APP_PATH;

export default defineStore("cartStore", {
  state: () => ({
    // 購物車列表
    cartList: [],
    // 購物車總計
    cartTotal: 0,
  }),
  actions: {
    // POST 加入購物車
    addToCart(targetId, qty = 1) {
      // 使用 loadingStore
      const loading = loadingStore();
      loading.loadingStatus.updateQty = targetId;
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const cart = {
        product_id: targetId,
        qty,
      };
      axios.post(url, { data: cart }).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        loading.loadingStatus.updateQty = "";
        this.getCart();
      });
    },
    // GET 購物車列表
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((res) => {
        this.cartList = res.data.data.carts;
        this.cartTotal = res.data.data.total;
      });
    },
    // PUT 修改購物車
    async putCart(item) {
      // 使用 loadingStore
      const loading = loadingStore();
      loading.loadingStatus.updateQty = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      try {
        const res = await axios.put(url, { data: cart });
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        loading.loadingStatus.updateQty = "";
      } finally {
        this.getCart();
      }
    },
    // DELETE 刪除購物車指定商品
    deleteCart(targetId) {
      const url = `${apiUrl}/api/${apiPath}/cart/${targetId}`;
      axios.delete(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCart();
      });
    },
    // DELETE 刪除購物車
    deleteCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCart();
      });
    },
  },
});
