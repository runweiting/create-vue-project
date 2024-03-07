import axios from "axios";
import { defineStore } from "pinia";
import showSuccessToast from "@/utils/showSuccessToast";
import showErrorToast from "@/utils/showErrorToast";

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
      axios
        .get(url)
        .then((res) => {
          const { coupons, pagination } = res.data;
          const newCouponFormat = coupons.map((coupon) => ({
            ...coupon,
            // Number to Boolean
            is_enabled: Boolean(coupon.is_enabled),
          }));
          this.couponList = newCouponFormat;
          this.pagination = pagination;
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    // POST 優惠卷
    async postCoupon(code) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/coupon`;
      try {
        const res = await axios.post(url, {
          data: { code },
        });
        this.couponState = res.data;
        showSuccessToast(res.data.message);
      } catch (err) {
        showErrorToast(err.response.data.message);
      }
    },
    // 清除優惠卷
    clearCoupon() {
      this.couponState = {};
    },
    // DELETE 刪除指定優惠卷
    deleteCoupon(couponId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${couponId}`;
      axios
        .delete(url)
        .then((res) => {
          showSuccessToast(res.data.message);
          this.getCoupons();
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
  },
});
