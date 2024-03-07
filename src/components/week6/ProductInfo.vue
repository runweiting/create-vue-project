<template>
  <div v-if="selectedProduct">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4">
          <img :src="selectedProduct.imageUrl" class="img-fluid product-img" />
        </div>
        <div class="col-sm-8">
          <h2>
            {{ selectedProduct.title }}
            <span class="badge bg-dark ms-2">{{ selectedProduct.category }}</span>
          </h2>
          <small class="mb-2 text-secondary">商品敘述：</small>
          <p class="mb-3">{{ selectedProduct.description }}</p>
          <small class="mb-2 text-secondary">商品內容：</small>
          <p class="mb-3">{{ selectedProduct.content }}</p>
          <div class="mb-3">
            <del class="fs-6 fw-bold text-secondary me-2">
              原價{{ selectedProduct.origin_price }}元
            </del>
            <span class="fs-5 fw-bold text-danger">
              現在只要{{ selectedProduct.price }}元
            </span>
          </div>
          <div class="input-group">
            <select class="form-select" v-model="this.qty">
              <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
            </select>
            <button
              @click="addToCart(selectedProduct.id, this.qty)"
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
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userProductsStore from '@/stores/userProductsStore';
import cartStore from '@/stores/cartStore';

export default {
  data() {
    return {
      qty: 1,
    };
  },
  computed: {
    ...mapState(userProductsStore, ['selectedProduct'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
  },
  watch: {
    // 當傳入的 product 值有變化時，重置 qty
    selectedProduct() {
      this.qty = 1;
    },
  },
};
</script>

<style scoped>
.product-img {
  object-fit: cover;
}
</style>
