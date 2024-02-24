<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    tempData: Object,
  },
  emit: ['getData'],
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      delModal: null,
    };
  },
  mounted() {
    this.delModal = new Modal(document.querySelector('#delModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    // DELETE 刪除商品
    deleteData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
      this.axios
        .delete(url)
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .then(() => {
          this.delModal.hide();
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

<template>
  <!-- delModal -->
  <div
    class="modal fade modal-lg"
    id="delModal"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="delModalLabel">刪除商品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 刪除商品 -->
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-8">
                <h5 class="fw-bold text-danger">
                  {{ tempData.title }}
                  <span class="badge bg-dark ms-2">{{
                    tempData.category
                  }}</span>
                </h5>
                <p>{{ tempData.description }}</p>
                <p>
                  <small class="text-muted">
                    原價: {{ tempData.origin_price }} / 售價:
                    {{ tempData.price }}
                  </small>
                </p>
              </div>
              <div class="col-sm-4">
                <img :src="tempData.imageUrl" class="img-fluid" />
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
          <button @click="deleteData" type="button" class="btn btn-danger">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
