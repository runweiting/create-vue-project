<template>
  <main class="container">
    <h1 class="pt-5 text-start">單一商品介紹</h1>
    <div class="row py-2">
      <product-info />
    </div>
  </main>
</template>

<script>
import ProductInfo from '@/components/week6/ProductInfo.vue';

export default {
  components: {
    ProductInfo,
  },
};
</script>
