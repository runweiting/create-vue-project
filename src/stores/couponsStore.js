import axios from "axios";
// import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore("couponsStore", {
  state: () => ({
    // 優惠卷列表
    couponList: [],
    pagination: {},
  }),
  actions: {
    // GET 優惠卷列表
    // 預設為第一頁，若 page 傳入值則取代 1
    // /v2/api/{api_path}/admin/coupons
    getCoupons(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons?page=${page}`;
      axios.get(url).then((res) => {
        console.log(res.data);
        const { coupons, pagination } = res.data;
        const newCouponFormat = coupons.map((coupon) => ({
          ...coupon,
          // 加入起始日屬性
          start_date: null,
        }));
        this.couponList = newCouponFormat;
        this.pagination = pagination;
        console.log(this.couponList);
      });
    },
  },
});
