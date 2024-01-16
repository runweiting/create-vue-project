<script>
import Swal from 'sweetalert2';
import ProductList from '../components/week3/ProductList.vue';

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      // 新增資料 selectedProduct
      selectedProduct: null,
    }
  },
  methods: {
  }
};

</script>

<template>
  <main class="container">
    <div class="row py-3">
      <ProductList />
      
    </div>
  </main>
</template>

<style>
</style>
