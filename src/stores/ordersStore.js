import axios from "axios";
// import Swal from "sweetalert2";
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
        console.log("orders", typeof orders, this.orders);
        console.log("orderList", typeof this.orderList, this.orderList);
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
    timestampToDate(timestamp) {
      // 建立 Date 實體，將時間戳 * 1000轉為毫秒
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      // 月份從 0 算起要 + 1
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedDate = `${year}/${month}/${day}`;
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      const formattedDay = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      return {
        formattedDate,
        formattedTime,
        formattedDay,
      };
    },
  },
});
