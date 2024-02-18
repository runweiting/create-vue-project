<template>
  <div class="col-8 mt-4 mb-4" ref="productList">
    <div class="container d-flex justify-content-between">
      <h2>{{ title }}</h2>
      <p class="p-2 mb-0">
        {{ `目前有 ${productList.length} 項商品` }}
      </p>
    </div>
    <div class="container table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-secondary">
          <tr class="align-middle" style="height: 48px">
            <th scope="col" style="width: 17%">
              <category-list />
            </th>
            <th scope="col" class="fw-bold" style="width: 30%">商品名稱</th>
            <th scope="col" class="fw-bold" style="width: 28%">價格</th>
            <th scope="col" style="width: 25%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productList" :key="item.title">
            <td>
              <img :src="item.imageUrl" class="rounded product-img" />
            </td>
            <td>{{ item.title }}</td>
            <!-- 如果原價和價格一樣，就顯示價格 -->
            <td>
              <p
                v-if="item.origin_price === item.price"
                class="fs-5 fw-bold mb-0"
              >
                {{ item.price }}元
              </p>
              <!-- 如果不一樣，就顯示原價刪除線、價格 -->
              <div v-else>
                <del class="fs-6 fw-bold text-secondary"
                  >原價{{ item.origin_price }}元</del
                >
                <p class="fs-5 fw-bold mb-0">現在只要{{ item.price }}元</p>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column gap-2">
                <!-- 當用戶重複點擊時，disabled button -->
                <button
                  :disabled="item.id === this.loadingStatus.getProduct"
                  @click="getProduct(item.id)"
                  type="button"
                  class="btn btn-outline-secondary"
                  id="modalBtn"
                >
                  查看更多
                  <!-- 當用戶點擊時，啟用 spinner 效果 -->
                  <span
                    v-if="item.id === this.loadingStatus.getProduct"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
                <button
                  @click="addToCart(item.id)"
                  type="button"
                  class="btn btn-outline-danger"
                >
                  加入購物車
                  <span
                    v-if="item.id === this.loadingStatus.updateQty"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination-group></pagination-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';

// 匯入 stores
import productsStore from '@/stores/productsStore';
import cartStore from '@/stores/cartStore';
import categoryStore from '@/stores/categoryStore';
import loadingStore from '@/stores/loadingStore';
import productInfoStore from '@/stores/productInfoStore';

// 匯入 components
import CategoryList from '../week5/CategoryList.vue';
import PaginationGroup from '../week5/PaginationGroup.vue';

export default {
  components: {
    CategoryList,
    PaginationGroup,
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      title: '商品列表',
      // 指定商品
      product: {},
      // vue-loading-overlay
      fullPage: false,
    };
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.getCategory();
  },
  computed: {
    ...mapState(productsStore, ['productList']),
    ...mapState(categoryStore, ['categoryList']),
    ...mapState(loadingStore, ['loadingStatus'])
  },
  methods: {
    ...mapActions(productsStore, ['getProducts']),
    ...mapActions(cartStore, ['getCart', 'addToCart']),
    ...mapActions(categoryStore, ['getCategory']),
    ...mapActions(productInfoStore, ['setSelectedProduct']),

    // GET 指定商品
    async getProduct(targetId) {
      // 使用 loadingStore
      const loading = loadingStore();
      loading.loadingStatus.getProduct = targetId;
      const url = `${this.apiUrl}/api/${this.apiPath}/product/${targetId}`;
      this.$route.params.id = targetId;
      try {
        const res = await this.axios.get(url);
        this.product = res.data.product;
        // 將 product 帶入 productInfoStore
        const targetProduct = productInfoStore();
        targetProduct.setSelectedProduct(this.product);
        loading.loadingStatus.getProduct = "";
      } finally {
        this.$router.push({ name: "productInfo" });
      }
    },
  },
};
</script>

<style scoped>
.sticky {
  /* 填滿整個視窗高度 */
  height: 100vh;
  top: 0;
  overflow-y: auto;
}
.product-img {
  object-fit: cover;
  height: 100px;
}
</style>
