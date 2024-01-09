<script>
// === 使用元件步驟 ===
// 父元件 App.vue、子元件 TheWelcome.vue
// -> 1. import 引入元件
import ProductList from '../components/week1/ProductList.vue'
import ProductItem from '../components/week1/ProductItem.vue'

// -> 2. components 註冊元件
export default {
  components: {
    ProductList,
    ProductItem
  },
  data() {
    return {
      // 新增資料 selectedProduct
      selectedProduct: null
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
}
</script>

<!-- -> 3. 顯示元件 <TheWelcome /> -->
<!-- 
  <TheWelcome></TheWelcome> 是標準的 HTML/XML 的寫法、 <TheWelcome /> 則是 JSX（JavaScript XML）語法更加直觀，兩者等價都可使用。 -->
<template>
  <main class="container">
    <div class="row py-3">
      <!-- 當 ProductList 觸發 showProductDetail 事件時，執行 Week1View 組件中的 showProductDetail 方法 -->
      <ProductList @showProductDetail="showProductDetail" />
      <!-- 
        1. v-if 判斷 selectedProduct 屬性是否有值
        2. :product="selectedProduct": 綁定 product 屬性，將 selectedProduct 的值傳遞給 ProductItem 組件的 product 屬性
      -->
      <ProductItem v-if="selectedProduct" :product="selectedProduct" @closeProductDetail="closeProductDetail" />
    </div>
  </main>
</template>
