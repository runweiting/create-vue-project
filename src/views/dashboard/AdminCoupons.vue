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
                          <button @click="openModal('new')" type="button" class="btn btn-danger">
                            新增優惠卷
                          </button>
                        </div>
                        <!-- couponModal -->
                        <coupon-modal ref="couponModal" :currentCoupon="selectedCoupon" :is-new="isNew">
                        </coupon-modal>
                    </div>
                </div>
                <div class="container">
                  <table class="table table-hover">
                      <thead class="table-dark">
                      <tr class="fw-bold">
                          <th scope="col">優惠卷標題</th>
                          <th scope="col">優惠碼</th>
                          <th scope="col">折扣</th>
                          <th scope="col">起始日</th>
                          <th scope="col">截止日</th>
                          <th scope="col">啟用狀態</th>
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
                                    @click="openModal('edit', item)"
                                    type="button"
                                    class="btn btn-outline-primary btn-sm"
                                    >
                                    編輯
                                    </button>
                                    <button
                                    @click="deleteCoupon(item.id)"
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
import { mapActions, mapState } from 'pinia';
import couponsStore from '@/stores/couponsStore';
import timestampToDate from '@/utils/timestampToDate';

import CouponModal from '@/components/week7/CouponModal.vue';
import Pagination from '@/components/week7/Pagination.vue';

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
      isNew: false,
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
    ...mapActions(couponsStore, ['getCoupons', 'deleteCoupon']),
    // 轉換 timestamp
    formatDate(timestamp) {
      const { formattedDate } = timestampToDate(timestamp);
      return formattedDate;
    },
    // 切換 modal 狀態：新增、編輯
    openModal(state, item) {
      // 新增
      if (state === 'new') {
        this.selectedCoupon = {};
        this.isNew = true;
        this.$refs.couponModal.openModal();
        // 編輯
      } else if (state === 'edit') {
        this.selectedCoupon = { ...item };
        this.isNew = false;
        this.$refs.couponModal.openModal();
      }
    },
  },
};
</script>
