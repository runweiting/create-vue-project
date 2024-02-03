<script>
import ProductList from '../components/week5/ProductList.vue';
import OrderDetail from '../components/week5/OrderDetail.vue'

export default {
  components: {
    ProductList,
    OrderDetail
  },
};
</script>
<template>
  <main class="container">
    <div class="row py-2">
      <product-list />
    </div>
    <order-detail />
  </main>
</template>

<style>
</style>
