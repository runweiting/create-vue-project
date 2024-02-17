<script>
import ProductList from '../components/week2/ProductList.vue';
import ProductItem from '../components/week2/ProductItem.vue';
import addProduct from '../components/week2/addProduct.vue';

export default {
  components: {
    ProductList,
    ProductItem,
    addProduct,
  },
  data() {
    return {
      // 新增資料 selectedProduct
      selectedProduct: null,
    };
  },
  methods: {
    // 4. 執行 showProductDetail
    showProductDetail(item) {
      this.selectedProduct = item;
    },
    closeProductDetail() {
      this.selectedProduct = null;
    },
  },
};
</script>

<template>
  <main class="container">
    <div class="row py-3">
      <!-- 3. 觸發 showProductDetail -->
      <ProductList @showProductDetail="showProductDetail" />
      <!-- 5. 觸發 v-if="selectedProduct" 執行 :product="selectedProduct" 到 ProductItem -->
      <ProductItem
        v-if="selectedProduct"
        :product="selectedProduct"
        @closeProductDetail="closeProductDetail"
      />
      <!-- v-else 當 selectedProduct 為 null時 -->
      <div v-else>
        <p>No product selected</p>
      </div>
      <addProduct />
    </div>
  </main>
</template>

<style></style>
