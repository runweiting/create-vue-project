import axios from "axios";
import { defineStore } from "pinia";
import showSuccessToast from "@/utils/showSuccessToast";
import showErrorToast from "@/utils/showErrorToast";
import loadingStore from "./loadingStore";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
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
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`;
      const cart = {
        product_id: targetId,
        qty,
      };
      axios
        .post(url, { data: cart })
        .then((res) => {
          showSuccessToast(res.data.message);
          loading.loadingStatus.updateQty = "";
          this.getCart();
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    // GET 購物車列表
    getCart() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`;
      axios
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts;
          this.cartTotal = res.data.data.total;
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    // PUT 修改購物車
    async putCart(item) {
      // 使用 loadingStore
      const loading = loadingStore();
      loading.loadingStatus.updateQty = item.id;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      try {
        const res = await axios.put(url, { data: cart });
        showSuccessToast(res.data.message);
        loading.loadingStatus.updateQty = "";
      } catch (err) {
        showErrorToast(err.response.data.message);
      } finally {
        this.getCart();
      }
    },
    // DELETE 刪除購物車指定商品
    deleteCart(targetId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${targetId}`;
      axios
        .delete(url)
        .then((res) => {
          showSuccessToast(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    // DELETE 刪除購物車
    deleteCarts() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`;
      axios
        .delete(url)
        .then((res) => {
          showSuccessToast(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
  },
});
