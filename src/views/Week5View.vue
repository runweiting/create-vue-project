<script>
import ProductList from '../components/week5/ProductList.vue';
import CartList from '../components/week5/CartList.vue';
import OrderDetail from '../components/week5/OrderDetail.vue'

export default {
  components: {
    ProductList,
    CartList,
    OrderDetail
  },
};
</script>
<template>
  <main class="container">
    <div class="row py-2">
      <product-list />
      <cart-list />
    </div>
    <order-detail />
  </main>
</template>

<style>
</style>
