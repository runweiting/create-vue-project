<template>
  <!-- showModal -->
  <div
    class="modal fade modal-lg"
    id="showModal"
    tabindex="-1"
    aria-labelledby="showModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="delModalLabel">
            {{ product.title }}
            <span class="badge bg-dark ms-2">{{ product.category }}</span>
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
            <div class="row">
              <div class="col-sm-4">
                <img :src="product.imageUrl" class="img-fluid" />
              </div>
              <div class="col-sm-8">
                <small class="mb-2 text-secondary">商品敘述：</small>
                <p class="mb-3">{{ product.description }}</p>
                <small class="mb-2 text-secondary">商品內容：</small>
                <p class="mb-3">{{ product.content }}</p>
                <div class="mb-3">
                  <del class="fs-6 fw-bold text-secondary me-2">
                    原價{{ product.origin_price }}元
                  </del>
                  <span class="fs-5 fw-bold text-danger">
                    現在只要{{ product.price }}元
                  </span>
                </div>
                <div class="input-group">
                  <select class="form-select" v-model="this.qty">
                    <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                  </select>
                  <button
                    @click="addToCart(product.id, this.qty)"
                    type="button"
                    class="btn btn-primary"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    product: Object,
  },
  emits: ['addToCart'],
  data() {
    return {
      showModal: null,
      qty: 1,
    };
  },
  mounted() {
    this.showModal = new Modal(document.querySelector('#showModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    openModal() {
      this.showModal.show();
    },
    hideModal() {
      this.showModal.hide();
    },
    addToCart(id) {
      this.$emit('addToCart', id, this.qty);
    },
  },
  watch: {
    // 當傳入的 product 值有變化時，重置 qty
    product() {
      this.qty = 1;
    },
  },
};
</script>
