<template>
    <main class="container">
        <div class="row py-2">
            <main class="col mt-4 mb-4">
                <div class="container py-2">
                    <h2>這是訂單頁面</h2>
                    <div class="d-flex justify-content-between gap-2 py-2">
                        <p class="p-2 mb-0">
                        {{ `一頁顯示 ${Object.keys(this.tempOrderList).length} 項商品` }}
                        </p>
                        <!-- Button trigger modal -->
                        <div class="d-flex justify-content-end gap-2">
                          <button @click="deleteOrders" type="button" class="btn btn-danger">
                            刪除全部訂單
                          </button>
                        </div>
                        <!-- orderModal -->
                        <order-modal ref="orderModal" :currentOrder="selectedOrder">
                        </order-modal>
                    </div>
                </div>
                <div class="container">
                    <table class="table table-hover">
                        <thead class="table-dark">
                        <tr class="fw-bold">
                            <th scope="col">日期</th>
                            <th scope="col">序號</th>
                            <th scope="col">訂單編號</th>
                            <th scope="col">品項</th>
                            <th scope="col">金額</th>
                            <th scope="col">優惠卷</th>
                            <th scope="col">訂單狀態</th>
                            <th scope="col">付款日期</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr v-if="!tempOrderList">
                            <td colspan="7">
                              <small class="text-muted">
                                目前沒有任何訂單
                              </small>
                            </td>
                          </tr>
                          <tr v-for="item in tempOrderList" :key="item.title">
                              <td>
                                  <span class="d-block">
                                      {{ formatDate(item.create_at).formattedDate }}
                                  </span>
                                  <small class="text-muted">
                                      {{ formatDate(item.create_at).formattedTime }}
                                  </small>
                              </td>
                              <td>{{ item.num }}</td>
                              <td>{{ item.id }}</td>
                              <td>
                                  {{ (Object.keys(item.products)).length }}
                              </td>
                              <td>
                                <!-- 有優惠卷 total 折後金額，沒有優惠卷不能用 -->
                                <span v-if="Object.values(item.products).some(item => item.coupon)">
                                  {{ Math.round(item.total) }}
                                </span>
                                <span v-else>
                                  {{ item.calculateTotal }}
                                </span>
                              </td>
                              <td>
                                <i v-if="item.calculateTotal !== item.total" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
                                <i v-else class="bi bi-x-circle-fill text-danger" style="scale: 150%;"></i>
                              </td>
                              <td :class="{ 'text-success': item.is_paid, 'text-danger': !item.is_paid }">
                                  {{ item.is_paid ? "已付款" : "未付款" }}
                              </td>
                              <td></td>
                              <td>
                                  <div
                                      class="btn-group"
                                      role="group"
                                      aria-label="Basic outlined example"
                                  >
                                      <button
                                      @click="checkOrder(item)"
                                      type="button"
                                      class="btn btn-outline-primary btn-sm"
                                      >
                                      查看訂單
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
                <Pagination :pages="pagination" @showPage="getOrders" />
            </main>
        </div>
    </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import ordersStore from '@/stores/ordersStore';
import timestampToDate from '@/utils/timestampToDate';

import OrderModal from '../../components/week7/OrderModal.vue';
import Pagination from '../../components/week7/Pagination.vue';

export default {
  components: {
    OrderModal,
    Pagination,
  },
  data() {
    return {      
      title: '訂單列表',
      tempOrderList: [],
      selectedOrder: {},
    };
  },
  created() {
    this.tempOrderList = [
      ...this.orderList
    ];
  },
  watch: {
    orderList: {
      deep: true,
      handler(updateOrderList) {
        this.tempOrderList = updateOrderList;
      }
    }
  },
  computed: {
    ...mapState(ordersStore, ['orderList', 'pagination', 'calculateTotal']),
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'deleteOrder', 'deleteOrders']),
    // 轉換 timestamp
    formatDate(timestamp) {
      const { formattedDate, formattedTime } = timestampToDate(timestamp);
      return {
        formattedDate, formattedTime
      }
    },
    // 查看訂單
    checkOrder(item) {
      this.selectedOrder = { ...item };
      this.$refs.orderModal.openModal();
    },
  },
};
</script>