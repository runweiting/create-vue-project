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
      <div class="modal-content" v-for="item in tempOrder" :key="item.id">
        <div class="modal-header bg-warning">
          <h5 class="modal-title" id="orderModalLabel">
            <span>訂單編號：{{ item.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close text-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-2 pb-2">
              <div class="col-md-5">
                <h5>訂單狀態</h5>
                <div class="d-flex gap-2">
                  <div class="form-check">
                    <input v-model="item.is_paid" class="form-check-input" type="checkbox" value="" id="flexCheckDefault" true-value="true"
                    false-value="false">
                    <label class="form-check-label" for="flexCheckDefault">
                      已付款
                    </label>
                  </div>
                  <div class="form-check">
                    <input v-model="item.is_paid" class="form-check-input" type="checkbox" value="" id="flexCheckDefault" true-value="false"
                    false-value="true">
                    <label class="form-check-label" for="flexCheckDefault">
                      未付款
                    </label>
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
                      <input v-model="timestampToDate(item.create_at).formattedDay" type="text" class="form-control" id="date">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="Email" class="col-sm-3 col-form-label">Email：</label>
                    <div class="col-sm-9">
                      <input v-model="item.user.email" type="email" class="form-control" id="Email">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="name" class="col-sm-3 col-form-label">收件姓名：</label>
                    <div class="col-sm-9">
                      <input v-model="item.user.name" type="text" class="form-control" id="name">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="tel" class="col-sm-3 col-form-label">聯絡電話：</label>
                    <div class="col-sm-9">
                      <input v-model="item.user.tel" type="text" class="form-control" id="tel">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="address" class="col-sm-3 col-form-label">收件地址：</label>
                    <div class="col-sm-9">
                      <input v-model="item.user.address" type="text" class="form-control" id="address">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="note" class="col-sm-3 col-form-label">備註：</label>
                    <div class="col-sm-9">
                      <textarea class="form-control" name="note" id="note" cols="10" rows="10" style="height: 150px;"></textarea>
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
                      <tr v-for="item in item.products" :key="item.id">
                        <td class="d-flex align-items-center gap-1">
                          <img :src="item.product.imageUrl" class="rounded order-img" />
                          <small>{{ item.product.title }}</small>
                        </td>
                        <td class="pe-0">
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="input-group input-group-sm">
                              <input                                v-model="item.qty"
                                type="number" min="1"
                                class="form-control" id="qty"
                              />
                              <span class="input-group-text">{{ item.product.unit }}</span>
                            </div>
                          </div>
                        </td>
                        <td class="text-end">
                          <p class="fs-6 mb-0">{{ item.product.price }}元</p>
                        </td>
                        <td class="text-end p-0">
                          <button
                            @click="deleteOrder(item.id)"
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
                            {{ `總共 ${(Object.keys(item.products)).length} 項` }}
                          </span>
                        </td>
                        <td>訂單金額</td>
                        <td class="text-end fs-5 text-danger fw-bold">{{ item.total }}元</td>
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
          <button @click="updateOrder(item.id)" type="button" class="btn btn-danger">
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
    };
  },
  mounted() {
    this.orderModal = new Modal(document.querySelector('#orderModal'), {
      // 禁用鍵盤 Esc 關閉 modal
      keyboard: false,
      // 禁止點擊 Modal 以外區域以關閉對話框
      backdrop: 'static',
    });
    console.log(this.tempOrder);
    console.log(this.currentOrder);
  },
  created() {
    this.tempOrder = { ...this.currentOrder };
  },
  watch: {
    // 當元件被創建時，currentOrder 可能還未被傳入。為了確保 tempOrder 在 currentOrder 更新時同步更新，使用 watch 監聽 currentOrder 的變化，然後更新 tempOrder
    currentOrder: {
      // 若要深度監聽，對象內部屬性的變化也觸發
      deep: true,
      handler(updateOrder) {
        this.tempOrder = updateOrder;
      },
    },
  },
  methods: {
    ...mapActions(ordersStore, ['getOrders', 'timestampToDate']),
    // PUT 訂單
    updateOrder(id) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${id}`;
      this.axios
      .put(url, {
        data: this.tempOrder,
      })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .then(() => {
          this.orderModal.hide();
          this.getOrders();
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