<template>
  <main class="container">
    <h1 class="pt-5 text-center">商品列表</h1>
    <div class="row py-2">
      <product-list />
      <cart-list />
    </div>
  </main>
</template>

<script>
import ProductList from '../components/week6/ProductList.vue';
import CartList from '../components/week6/CartList.vue'

export default {
  components: {
    ProductList,
    CartList,
  },
};
</script>
