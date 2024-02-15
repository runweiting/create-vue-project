<template>
  <main class="container">
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
