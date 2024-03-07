<template>
  <!-- orderModal -->
  <div
  class="modal fade"
  id="orderModal"
  tabindex="-1"
  aria-labelledby="orderModalLabel"
  aria-hidden="true"
  ref="modal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark opacity-75 text-white">
          <h5 class="modal-title" id="orderModalLabel">
            <span>訂單編號：{{ tempOrder.id }}</span>
            <br>
          </h5>
          <button @click="cancelUpdateOrder"
            type="button"
            class="btn btn-outline-light"
            data-bs-dismiss="modal"
            aria-label="Close"
          ><i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-5">
              <div class="border rounded p-2 bg-light">
                <div class="row mb-2">
                  <div class="col-md-5 d-flex align-items-center gap-3">
                    <label for="payment" class="col-form-label">付款狀態：</label>
                    <div>
                      <select v-model="tempOrder.is_paid" :disabled="inputDisabled" class="form-select" id="payment">
                        <option :value="true">
                          已付款
                        </option>
                        <option :value="false">
                          未付款
                        </option>
                      </select>
                    </div>
                    <i v-if="tempOrder.is_paid" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
                    <i v-else class="bi bi-x-circle-fill text-danger" style="scale: 150%;"></i>
                  </div>
                  <div class="col-md-7">
                    <button @click="togglerEdit" type="button" class="btn btn-warning">修改訂單</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <h5>訂購資訊</h5>
                <form>
                  <div class="row mb-2">
                    <label for="date" class="col-sm-3 col-form-label">建立時間：</label>
                    <div class="col-sm-9">
                      <input
                      v-model="formatDate(tempOrder.create_at).formattedDate" :disabled="inputDisabled" type="text" class="form-control" id="date">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="Email" class="col-sm-3 col-form-label">Email：</label>
                    <div class="col-sm-9">
                      <input v-model="tempOrder.user.email" :disabled="inputDisabled" type="email" class="form-control" id="Email">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="name" class="col-sm-3 col-form-label">收件姓名：</label>
                    <div class="col-sm-9">
                      <input v-model="tempOrder.user.name" :disabled="inputDisabled" type="text" class="form-control" id="name">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="tel" class="col-sm-3 col-form-label">聯絡電話：</label>
                    <div class="col-sm-9">
                      <input v-model="tempOrder.user.tel" :disabled="inputDisabled" type="text" class="form-control" id="tel">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="address" class="col-sm-3 col-form-label">收件地址：</label>
                    <div class="col-sm-9">
                      <input v-model="tempOrder.user.address" :disabled="inputDisabled" type="text" class="form-control" id="address">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="note" class="col-sm-3 col-form-label">留言：</label>
                    <div class="col-sm-9">
                      <textarea v-model="tempOrder.user.message" :disabled="inputDisabled" class="form-control" name="note" id="note" cols="10" rows="10" style="height: 100px;"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-md-7">
                <div class="container">
                  <div class="d-flex justify-content-between">
                    <h5>商品內容</h5>
                  </div>
                </div>
                <div class="container table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-warning">
                      <tr class="align-middle" style="height: 48px">
                        <th scope="col" class="fw-bold" style="width: 60%">商品</th>
                        <th scope="col" class="fw-bold" style="width: 20%">數量</th>
                        <th scope="col" class="fw-bold text-end" style="width: 15%">單價</th>
                        <th style="width: 5%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item) in tempOrder.products" :key="item.id">
                        <td class="d-flex align-items-center gap-2">
                          <img :src="item.product.imageUrl" class="rounded order-img" />
                          <div>
                            <small>{{ item.product.title }}</small>
                            <br>
                            <small v-if="item.coupon" class="text-danger">優惠碼：{{ item.coupon.code }}、折數：{{ item.coupon.percent }}%</small>
                          </div>
                        </td>
                        <td class="pe-0">
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="input-group input-group-sm">
                              <input v-model="item.qty" :disabled="item.coupon" @click="updateSubTotal" 
                              type="number" min="1"
                              class="form-control" 
                              />
                              <span class="input-group-text">{{ item.product.unit }}</span>
                            </div>
                          </div>
                        </td>
                        <td class="text-end">
                          <p class="fs-6 mb-0">{{ item.product.price }}元</p>
                        </td>
                        <td class="text-end p-0">
                          <button :disabled="inputDisabled"  @click="deleteOrder"
                            type="button"
                            class="btn btn-outline-danger btn-sm py-0"
                            style="scale: 80%"
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <span>
                            {{ `總共 ${(Object.keys(tempOrder.products)).length} 項` }}
                          </span>
                        </td>
                        <td>
                          原始金額：
                          <br>
                          更新金額：
                          <br>
                          折扣金額：
                        </td>
                        <td class="text-end text-danger fw-bold">
                          <span :class="{ 'fw-normal': subTotal, 'text-dark': subTotal, 'text-decoration-line-through': subTotal }">
                              {{ tempOrder.calculateTotal }}元
                          </span>
                          <br>
                          <span :class="{ 'fw-normal': !subTotal, 'text-dark': !subTotal, 'text-decoration-line-through': !subTotal }">
                              {{ subTotal }}元
                          </span>
                          <br>
                          <span v-if="Object.values(tempOrder.products).some(item => item.coupon)">
                            {{ Math.round(tempOrder.total) }}元
                          </span>
                          <span v-else class="fw-normal text-dark">無優惠碼</span>
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="cancelUpdateOrder"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="updateOrder" type="button" class="btn btn-danger">
            更新訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

import ordersStore from '@/stores/ordersStore';
import timestampToDate from '@/utils/timestampToDate';
import modalMixin from '@/mixins/modalMixin';
import showSuccessToast from '@/utils/showSuccessToast';
import showErrorToast from '@/utils/showErrorToast';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  props: {
    currentOrder: Object,
  },
  data() {
    return {
      orderModal: null,
      tempOrder: {},
      inputDisabled: true,
      subTotal: 0,
    }
  },
  mixins: [modalMixin],
  created() {
    // 確保 tempOrder, user 使用前已初始化
    this.tempOrder = {
      ...this.currentOrder,
      products: {},
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
      }
    };
  },
  watch: {
    // watch 監視 currentOrder 屬性，當其值發生變化時，觸發 handler 方法
    currentOrder: {
      // 表示要深度監視 currentOrder，當其內部屬性發生變化時，觸發 handler 方法
      deep: true,
      // handler 方法接收一個參數 updateOrder (代表 currentOrder 的新值)
      handler(updateOrder) {
        // 將 currentOrder 的新值賦值 tempOrder，這樣可以保持 tempOrder 與 currentOrder 同步更新
        this.tempOrder = updateOrder;
        // this.putOrder(updateOrder);
      },
    },
    
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'timestampToDate']),
    // 轉換 timestamp
    formatDate(timestamp) {
      const { formattedDay, formattedDate } = timestampToDate(timestamp);
      return { formattedDay, formattedDate }
    },
    // 修改訂單
    togglerEdit() {
      this.inputDisabled = false;
      const productValues = Object.values(this.tempOrder.products);
      if (productValues.some(item => item.coupon && item.coupon.code)) {
        // 如果訂單中有優惠券
        this.subTotal = 0;
      } else {
        this.updateSubTotal();
      }
    },
    // 重新計算訂單總價
    updateSubTotal() {
      let total = 0;
      Object.values(this.tempOrder.products).forEach((product) => {
        total += product.qty * product.product.price;
      });
      this.subTotal = total;
    },
    // 關閉修改訂單
    cancelUpdateOrder() {
      this.subTotal = 0;
      this.inputDisabled = true;
    },
    // PUT 更新訂單
    updateOrder() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.axios
      .put(url, {
        "data": this.tempOrder,
      })
      .then((res) => {
        showSuccessToast(res.data.message);
        this.subTotal = 0;
        this.inputDisabled = true;
        this.modal.hide();
        this.getOrders();
      })
      .catch((err) => {
        showErrorToast(err.response.data.message);
      });
    },
  },
};
</script>

<style scoped>
.order-img {
  object-fit: cover;
  height: 50px;
}
</style>