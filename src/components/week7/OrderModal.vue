<!-- eslint-disable max-len -->
<template>
  <!-- orderModal -->
  <div
  class="modal fade"
  id="orderModal"
  tabindex="-1"
  aria-labelledby="orderModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div v-for="order in tempOrder" :key="'orderID-' + order.id"
      class="modal-content">
        <div class="modal-header bg-dark opacity-75 text-white">
          <h5 class="modal-title" id="orderModalLabel">
            <span>訂單編號：{{ order.id }}</span>
            <br>
          </h5>
          <button
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
                      <select v-model="order.is_paid" :disabled="inputDisabled" class="form-select" id="payment">
                        <option :value="true">
                          已付款
                        </option>
                        <option :value="false">
                          未付款
                        </option>
                      </select>
                    </div>
                    <i v-if="order.is_paid" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
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
                      <input v-model="timestampToDate(order.create_at).formattedDay" :disabled="inputDisabled" type="text" class="form-control" id="date">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="Email" class="col-sm-3 col-form-label">Email：</label>
                    <div class="col-sm-9">
                      <input v-model="order.user.email" :disabled="inputDisabled" type="email" class="form-control" id="Email">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="name" class="col-sm-3 col-form-label">收件姓名：</label>
                    <div class="col-sm-9">
                      <input v-model="order.user.name" :disabled="inputDisabled" type="text" class="form-control" id="name">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="tel" class="col-sm-3 col-form-label">聯絡電話：</label>
                    <div class="col-sm-9">
                      <input v-model="order.user.tel" :disabled="inputDisabled" type="text" class="form-control" id="tel">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="address" class="col-sm-3 col-form-label">收件地址：</label>
                    <div class="col-sm-9">
                      <input v-model="order.user.address" :disabled="inputDisabled" type="text" class="form-control" id="address">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="note" class="col-sm-3 col-form-label">留言：</label>
                    <div class="col-sm-9">
                      <textarea v-model="order.user.message" :disabled="inputDisabled" class="form-control" name="note" id="note" cols="10" rows="10" style="height: 100px;"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-md-7">
                <div class="container">
                  <div class="d-flex justify-content-between">
                    <h5>商品內容</h5>
                    <span class="fs-6 text-danger">優惠碼：</span>
                  </div>
                </div>
                <div class="container table-responsive">
                  <table class="table table-hover align-middle">
                    <thead class="table-warning">
                      <tr class="align-middle" style="height: 48px">
                        <th scope="col" class="fw-bold" style="width: 60%">商品</th>
                        <th scope="col" class="fw-bold" style="width: 15%">數量</th>
                        <th scope="col" class="fw-bold text-end" style="width: 20%">單價</th>
                        <th style="width: 5%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in order.products" :key="item.product.title">
                        <td class="d-flex align-items-center gap-1">
                          <img :src="item.product.imageUrl" class="rounded order-img" />
                          <small>{{ item.product.title }}</small>
                        </td>
                        <td class="pe-0">
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="input-group input-group-sm">
                              <input v-model="item.qty" :disabled="inputDisabled" @click="updateTotal" 
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
                            {{ `總共 ${(Object.keys(order.products)).length} 項` }}
                          </span>
                        </td>
                        <td>訂單金額</td>
                        <td class="text-end fs-5 text-danger fw-bold">
                          <span v-if="inputDisabled">
                            {{ order.total }}元
                          </span>
                          <span v-else>
                            {{ calculateTotal }}元
                          </span>
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
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="updateOrder(order)" type="button" class="btn btn-danger">
            更新訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';
import { mapActions } from 'pinia';
import ordersStore from '@/stores/ordersStore';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  props: {
    currentOrder: Array,
  },
  data() {
    return {
      orderModal: null,
      tempOrder: [],
      inputDisabled: true,
      calculateTotal: null,
    }
  },
  created() {
    this.tempOrder = [ ...this.currentOrder ];
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
  mounted() {
    this.orderModal = new Modal(document.querySelector('#orderModal'), {
      // 禁用鍵盤 Esc 關閉 modal
      keyboard: false,
      // 禁止點擊 Modal 以外區域以關閉對話框
      backdrop: 'static',
    });
    console.log(this.tempOrder)
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'timestampToDate']),
    // 編輯開關
    togglerEdit() {
      this.inputDisabled = false;
      this.updateTotal();
    },
    // 重新計算訂單總價
    updateTotal() {
      
      const subTotal = [];
      // 遍歷訂單中每個商品
      this.tempOrder.forEach((order) => {
        Object.values(order.products).forEach((product) => {
          console.log(product);
          console.log(product.qty);
          subTotal.push(product.qty * product.product.price);
        });
      });
      console.log(subTotal);
      this.calculateTotal = subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      console.log(this.calculateTotal);
      console.log(this.tempOrder)
    },
    // PUT 更新訂單
    updateOrder() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.axios
      .put(url, {
        "data": this.tempOrder[0],
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .then(() => {
        this.orderModal.hide();
        // 獲取最新的訂單數據
        this.getOrders();
        // 將新的訂單數據設置給組件的數據屬性
        this.tempOrder = [...this.currentOrder];
        // 將 inputDisabled 屬性重置為 true，以禁用編輯功能
        this.inputDisabled = true;
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
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