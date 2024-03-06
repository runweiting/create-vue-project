import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore("orderStore", {
  state: () => ({
    // 訂單列表
    orderList: [],
    pagination: {},
  }),
  actions: {
    // GET 訂單列表
    // 預設為第一頁，若 page 傳入值則取代 1
    getOrders(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders?page=${page}`;
      axios.get(url).then((res) => {
        const { orders, pagination } = res.data;
        // 將重新計算的訂單金額存到 orderList
        // 在資料結構中帶入要使用的參數 (很像 template+v-for+方法(參數))
        const newOrderFormat = orders.map((order) => ({
          // order 是每筆訂單
          ...order,
          calculateTotal: this.updateTotal(order),
        }));
        this.orderList = newOrderFormat;
        this.pagination = pagination;
      });
    },
    updateTotal(order) {
      if (!order || !order.products) {
        return 0;
      }
      let total = 0;
      // Object.values(order.products) 是每個品項
      Object.values(order.products).forEach((product) => {
        total += product.qty * product.product.price;
      });
      return total;
    },
    // DELETE 刪除指定訂單
    deleteOrder(orderId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${orderId}`;
      axios
        .delete(url)
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .then(() => {
          this.getOrders();
        });
    },
    // DELETE 刪除全部訂單
    deleteOrders() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/all`;
      axios.delete(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getOrders();
      });
    },
  },
});
