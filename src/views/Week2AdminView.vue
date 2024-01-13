<script>
import Swal from 'sweetalert2';
import ProductList from '../components/week2/ProductList.vue';
import ProductItem from '../components/week2/ProductItem.vue';
import addProduct from '../components/week2/addProduct.vue';

export default {
  components: {
    ProductList,
    ProductItem,
    addProduct
  },
  data() {
    return {
      // 新增資料 selectedProduct
      selectedProduct: null,
    }
  },
  methods: {
    showProductDetail(item){
      this.selectedProduct = item
    },
    closeProductDetail(){
      this.selectedProduct = null
    }
  }
};

</script>

<template>
  <main class="container">
    <div class="row py-3">
      <!-- 當 ProductList 觸發 showProductDetail 事件時，執行 Week2AdminView 組件中的 showProductDetail 方法 -->
      <ProductList @showProductDetail="showProductDetail" />
      <!-- 
        1. v-if 判斷 selectedProduct 屬性是否有值
        2. :product="selectedProduct" :綁定 product 屬性，將 selectedProduct 的值傳遞給 ProductItem 組件的 product 屬性
      -->
      <ProductItem v-if="selectedProduct" :product="selectedProduct" @closeProductDetail="closeProductDetail" />
      <!-- v-else 當 selectedProduct 為 null時 -->
      <div v-else>
        <p>No product selected</p>
      </div>
      <addProduct />
    </div>
  </main>
</template>

<style>
</style>
