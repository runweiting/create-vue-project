<script>
// === 使用元件步驟 ===
// 父元件 App.vue、子元件 TheWelcome.vue
// -> 1. import 引入元件
import ProductList from '../components/week1/ProductList.vue';
import ProductItem from '../components/week1/ProductItem.vue';

// -> 2. components 註冊元件
export default {
  components: {
    ProductList,
    ProductItem,
  },
  data() {
    return {
      // 新增資料 selectedProduct
      selectedProduct: null,
    };
  },
  methods: {
    showProductDetail(item) {
      this.selectedProduct = item;
    },
    closeProductDetail() {
      this.selectedProduct = null;
    },
  },
};
</script>

<!-- -> 3. 顯示子元件 <ProductList />、<ProductItem /> -->
<!--
  <ProductList></ProductList> 是標準的 HTML/XML 的寫法、 <ProductList /> 則是 JSX（JavaScript XML）語法更加直觀，
  兩者等價都可使用。 -->
<template>
  <main class="container">
    <div class="row py-3">
      <!--
        1. <ProductList .../> 把子元件 ProductList 引入到父元件
         Week1View 顯示並觸發自定義事件 @showProductDetail，這是 Vue 的事件機制，讓父子元件間可以通信
        2. 當 ProductList 子元件中 @click='ItemInfo(item)' 被點擊時，
        執行 ItemInfo(item) { this.$emit('showProductDetail',item) }
        然後父元件 Week1View 接收到並執行 showProductDetail 方法
        3. 在 ProductList 渲染的同時就觸發 showProductDetail
      -->
      <ProductList @showProductDetail="showProductDetail" />
      <!--
        1. <ProductItem .../> 把子元件 ProductItem 引入到父元件 Week1View 顯示並觸發自定義事件 @closeProductDetail
        2. 當 ProductItem 子元件 @closeProductDetail 時，
        會執行父元件中的 closeProductDetail 方法，其目的是將 selectedProduct 設為 null，即清除資料
        3. 如果不觸發 closeProductDetail，在畫面上 selectedProduct 的值將一直存在。
        同時根據 v-if 條件，ProductItem 會隨著selectedProduct 變為 null 時從畫面上消失
        4. v-if 判斷 selectedProduct 有值的情況下，ProductItem 元件才會被渲染到畫面上
        5. :product="selectedProduct" 將 "selectedProduct"
        傳遞至 ProductItem 子元件中，在 ProductItem 用 props 接收並賦值
      -->
      <ProductItem
        v-if="selectedProduct"
        :product="selectedProduct"
        @closeProductDetail="closeProductDetail"
      />
    </div>
  </main>
  <!-- // ? 1. Vue 中的事件機制是非同步的
    所以當在父元件中使用 <ProductList @showProductDetail="showProductDetail" /> 時，
    即使 <ProductList /> 中的 @click='ItemInfo(item)' 被點擊並觸發
     ItemInfo(item) 方法，this.$emit('showProductDetail', item)
     的執行並不會立即觸發父元件中的 showProductDetail 方法。
     而是會在整個渲染過程結束後，Vue 按照事件隊列中的順序執行，
     這樣就確保了 @showProductDetail="showProductDetail"
     中的 showProductDetail 方法在 @closeProductDetail="closeProductDetail" 之前執行 -->
  <!-- // ? 2. 觸發的方法為什麼是寫在父元件，而不是子元件呢？
    在 Vue 中，一個基本的理念是子元件應該盡量保持獨立和可重用。這意味著子元件不應該直接操作或修改父元件的狀態，而是透過發送事件通知父元件需要進行的操作。
    讓父元件掌握子元件的生命週期和行為有助於維護代碼的可讀性和可維護性。如果所有邏輯都寫在子元件中，那麼理解和維護代碼會變得困難。透過事件通信，每個元件只需關心自己的邏輯，更容易理解和測試。
    當子元件發送事件時，它並不需要知道是哪個元件在監聽這個事件。
    這樣，子元件可以更通用，可以在不同的上下文中重用，而不需要修改內部的邏輯。同時，父元件可以更靈活地處理不同的子元件的事件，並根據需要執行相應的操作。 -->
</template>
