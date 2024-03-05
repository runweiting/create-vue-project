import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore("couponsStore", {
  state: () => ({
    // 優惠卷列表
    couponList: [],
    pagination: {},
    // 優惠卷狀態
    couponState: {},
  }),
  actions: {
    // GET 優惠卷列表
    // 預設為第一頁，若 page 傳入值則取代 1
    getCoupons(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons?page=${page}`;
      axios.get(url).then((res) => {
        console.log(res.data);
        const { coupons, pagination } = res.data;
        const newCouponFormat = coupons.map((coupon) => ({
          ...coupon,
          // Number to Boolean
          is_enabled: Boolean(coupon.is_enabled),
        }));
        this.couponList = newCouponFormat;
        this.pagination = pagination;
        console.log(this.couponList);
      });
    },
    // POST 優惠卷
    postCoupon(code) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/coupon`;
      return axios
        .post(url, {
          data: { code },
        })
        .then((res) => {
          this.couponState = res.data;
          console.log(this.couponState);
        })
        .catch((err) => {
          Swal.fire({
            title: err.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    // 清除優惠卷
    clearCoupon() {
      this.couponState = {};
    },
  },
});
