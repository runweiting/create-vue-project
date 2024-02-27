<template>
    <main class="container">
        <div class="row py-2">
            <main class="col mt-4 mb-4">
                <div class="container py-2">
                    <h2>這是訂單頁面</h2>
                    <div class="d-flex justify-content-between gap-2 py-2">
                        <p class="p-2 mb-0">
                        {{ `一頁顯示 ${Object.keys(this.orderList).length} 項商品` }}
                        </p>
                        <!-- Button trigger modal -->
                        <div class="d-flex justify-content-end gap-2">
                          <button @click="deleteOrders" type="button" class="btn btn-danger">
                            刪除全部訂單
                          </button>
                          <button @click="logout" type="button" class="btn btn-warning">
                              登出
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
                        <tr>
                            <th scope="col" class="fw-bold">日期</th>
                            <th scope="col" class="fw-bold">序號</th>
                            <th scope="col" class="fw-bold">訂單編號</th>
                            <th scope="col" class="fw-bold">品項</th>
                            <th scope="col" class="fw-bold">金額</th>
                            <th scope="col" class="fw-bold">訂單狀態</th>
                            <th scope="col" class="fw-bold">付款日期</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in orderList" :key="item.title">
                            <td>
                                <span class="d-block">
                                    {{ timestampToDate(item.create_at).formattedDate }}
                                </span>
                                <small class="text-muted">
                                    {{ timestampToDate(item.create_at).formattedTime }}
                                </small>
                            </td>
                            <td>{{ item.num }}</td>
                            <td>{{ item.id }}</td>
                            <td>
                                {{ (Object.keys(item.products)).length }}
                            </td>
                            <td>
                                {{ item.total }}
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
                                    @click="checkOrder(item.id)"
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
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'pinia';
import ordersStore from '@/stores/ordersStore';

import OrderModal from '../../components/week7/OrderModal.vue';
import Pagination from '../../components/week7/Pagination.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    OrderModal,
    Pagination,
  },
  data() {
    return {      
      title: '訂單列表',
      selectedOrder: [],
    };
  },
  computed: {
    ...mapState(ordersStore, ['orderList', 'pagination']),
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'timestampToDate']),
    // 查看訂單
    checkOrder(id) {
      this.selectedOrder = this.orderList.filter((item) => item.id === id);
      console.log('order',this.selectedOrder);
      this.$refs.orderModal.orderModal.show();
    },
    // DELETE 刪除指定訂單
    deleteOrder(orderId) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${orderId}`;
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
    // DELETE 刪除全部訂單
    deleteOrders() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`;
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
