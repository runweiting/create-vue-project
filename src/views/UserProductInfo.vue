<template>
  <main class="container">
    <h1 class="pt-5 text-start">單一商品介紹</h1>
    <div class="row py-2">
      <div v-if="product">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-4">
              <img :src="product.imageUrl" class="img-fluid product-img" />
            </div>
            <div class="col-sm-8">
              <h2>
                {{ product.title }}
                <span class="badge bg-dark ms-2">{{ product.category }}</span>
              </h2>
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
  </main>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  mounted() {
    const { id } = this.$route.params;
    const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`;
    this.axios
    .get(url).then((res) => {
      this.product = res.data.product;
    })
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
  },
};
</script>

<style scoped>
.product-img {
  object-fit: cover;
}
</style>

