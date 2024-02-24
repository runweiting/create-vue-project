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
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">
            <span>訂單編號：{{ order.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <p :class="{'text-success': order.is_paid, 'text-danger': !order.is_paid}">
              訂單狀態：{{ order.is_paid }}
            </p>
            <div class="row">
              <div class="col-md-6">
                <h3>訂購資訊</h3>
                  
              </div>
              <div class="col-md-6">
                <h3>商品內容</h3>

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
          <button @click="updateData" type="button" class="btn btn-primary">
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

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  props: {
    currentOrder: Object,
  },
  emits: ['getData'],
  data() {
    return {
      orderModal: null,
      order: {},
    };
  },
  created() {
    this.order = { ...this.currentOrder };
  },
  mounted() {
    console.log(this.order);
    this.orderModal = new Modal(document.querySelector('#orderModal'), {
      // 禁用鍵盤 Esc 關閉 modal
      keyboard: false,
      // 禁止點擊 Modal 以外區域以關閉對話框
      backdrop: 'static',
    });
    // 將 order 的值複製到 currentOrder    
  },
  methods: {
    // POST 新增商品 or PUT 編輯商品
    updateData() {
      // -> 新增商品
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
      let method = 'post';
      // -> 編輯現有商品
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      this.axios[method](url, {
        data: this.tempProduct,
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
          this.$emit('getData');
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