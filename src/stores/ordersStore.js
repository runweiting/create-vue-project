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
        this.orderList = orders;
        this.pagination = pagination;
        console.log(res.data);
      });
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
