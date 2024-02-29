<template>
    <main class="container">
        <div class="row py-2">
            <main class="col mt-4 mb-4">
                <div class="container py-2">
                    <h2>這是優惠卷頁面</h2>
                    <div class="d-flex justify-content-between gap-2 py-2">
                        <p class="p-2 mb-0">
                        {{ `一頁顯示 ${Object.keys(this.tempCouponList).length} 項商品` }}
                        </p>
                        <!-- Button trigger modal -->
                        <div class="d-flex justify-content-end gap-2">
                          <button @click="deleteOrders" type="button" class="btn btn-danger">
                            新增優惠卷
                          </button>
                          <button @click="logout" type="button" class="btn btn-warning">
                              登出
                          </button>
                        </div>
                        <!-- orderModal -->
                        <coupon-modal ref="couponModal" :currentCoupon="selectedCoupon">
                        </coupon-modal>
                    </div>
                </div>
                <div class="container">
                  <table class="table table-hover">
                      <thead class="table-dark">
                      <tr>
                          <th scope="col" class="fw-bold">優惠卷標題</th>
                          <th scope="col" class="fw-bold">優惠碼</th>
                          <th scope="col" class="fw-bold">折扣</th>
                          <th scope="col" class="fw-bold">起始日</th>
                          <th scope="col" class="fw-bold">截止日</th>
                          <th scope="col" class="fw-bold">啟用狀態</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-if="!tempCouponList">
                          <td colspan="7">
                            <small class="text-muted">
                              目前沒有任何優惠卷
                            </small>
                          </td>
                        </tr>
                        <tr v-for="item in tempCouponList" :key="item.title">
                            <td>{{ item.title }}</td>
                            <td>{{ item.code }}</td>
                            <td>{{ item.percent }}</td>
                            <td>{{ formatDate(item.start_date) }}</td>
                            <td>{{ formatDate(item.due_date) }}</td>
                            <td>
                              <i v-if="item.is_enabled" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
                              <i v-else class="bi bi-x-circle-fill text-danger" style="scale: 150%;"></i>
                            </td>
                            <td>
                                <div
                                    class="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                >
                                    <button
                                    @click="checkCoupon(item)"
                                    type="button"
                                    class="btn btn-outline-primary btn-sm"
                                    >
                                    編輯
                                    </button>
                                    <button
                                    @click="deleteOrder(item.id)"
                                    type="button"
                                    class="btn btn-outline-danger btn-sm"
                                    >
                                    刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                      </tbody>
                  </table>
                </div>
                <Pagination :pages="pagination" @showPage="getCoupons" />
            </main>
        </div>
    </main>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'pinia';
import couponsStore from '@/stores/couponsStore';
import timestampToDate from '@/components/utils/timestampToDate';

import CouponModal from '../../components/week7/CouponModal.vue';
import Pagination from '../../components/week7/Pagination.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    CouponModal,
    Pagination,
  },
  data() {
    return {      
      title: '訂單列表',
      tempCouponList: [],
      selectedCoupon: {},
    };
  },
  created() {
    this.tempCouponList = [
      ...this.couponList
    ];
  },
  watch: {
    couponList: {
      deep: true,
      handler(updateCouponList) {
        this.tempCouponList = updateCouponList;
      }
    }
  },
  computed: {
    ...mapState(couponsStore, ['couponList', 'pagination']),
  },
  mounted() {
    this.getCoupons();
  },
  methods: {
    ...mapActions(couponsStore, ['getCoupons']),
    // 轉換 timestamp
    formatDate(timestamp) {
      const { formattedDate } = timestampToDate(timestamp);
      return formattedDate;
    },
    // 查看優惠卷
    checkCoupon(item) {
      this.selectedCoupon = { ...item };
      console.log('coupon',this.selectedCoupon);
      this.$refs.couponModal.couponModal.show();
    },
    // DELETE 刪除指定訂單
    deleteOrder(orderId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${orderId}`;
      this.axios.delete(url)
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
      })
    },
    // DELETE 刪除全部訂單
    deleteOrders() {
      // /v2/api/{api_path}/admin/orders/all
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/all`;
      this.axios.delete(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getOrders();
      });
    },
    // POST 登出
    logout() {
      const url = `${VITE_APP_URL}/logout`;
      this.axios.post(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 清除 token
          document.cookie = 'myToken=; expires=;';
          // 清除 headers
          this.axios.defaults.headers.common.Authorization = null;
          // 導向登入頁面
          this.$router.push({ name: 'login' });
        });
      });
    },
  },
};
</script>

<style>
/* label 樣式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
/* input 樣式，隱藏 checkbox */
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
/* span 樣式，透過 -webkit-transition 和 transition 屬性，設定滑動效果 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}
/* span :before 偽元素樣式 */
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  top: 2px;
  background-color: white;
  /*  -webkit- 支援舊版瀏覽器 */
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
/* 當 input:checked .slider 圓點背景顏色變成綠色 */
input:checked + .slider {
  background-color: green;
}
/* 當 input:checked .slider:before 圓點滑動至右側 */
input:checked + .slider:before {
  /*  -webkit- 、 -ms- 支援舊版瀏覽器 */
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
