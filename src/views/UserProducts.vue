<template>
  <main class="container">
    <h1 class="pt-5 text-center">商品列表</h1>
    <div class="row py-2">
      <product-list />
    </div>
  </main>
</template>

<script>
import ProductList from '../components/week5/ProductList.vue';

export default {
  components: {
    ProductList,
  },
};
</script>
