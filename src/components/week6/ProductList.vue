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
          <tr class="align-middle fw-bold" style="height: 48px">
            <th scope="col" style="width: 17%">
              <category-list @category-selected="handleCategoryChange" />
            </th>
            <th scope="col" style="width: 30%">商品名稱</th>
            <th scope="col" style="width: 28%">價格</th>
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
      <pagination-group @page-selected="handlePageChange"></pagination-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import userProductsStore from '@/stores/userProductsStore';
import cartStore from '@/stores/cartStore';
import categoryStore from '@/stores/categoryStore';
import loadingStore from '@/stores/loadingStore';

import showErrorToast from '@/utils/showErrorToast'
import CategoryList from '../week5/CategoryList.vue';
import PaginationGroup from '../week5/PaginationGroup.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  components: {
    CategoryList,
    PaginationGroup,
  },
  data() {
    return {
      title: '商品列表',
      // 指定商品
      product: {},
    };
  },
  mounted() {
    this.getProducts();
    this.getCategory();
  },
  computed: {
    ...mapState(userProductsStore, ['productList']),
    ...mapState(categoryStore, ['categoryList']),
    ...mapState(loadingStore, ['loadingStatus'])
  },
  methods: {
    ...mapActions(userProductsStore, ['getProducts']),
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(categoryStore, ['getCategory']),
    // 更新選取類別的商品列表
    handleCategoryChange(category) {
      this.getProducts(category)
    },
    // 更新選取頁面的商品列表
    handlePageChange(category, page) {
      this.getProducts(category, page)
    },
    // GET 指定商品
    async getProduct(targetId) {
      // 使用 loadingStore
      const loading = loadingStore();
      loading.loadingStatus.getProduct = targetId;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${targetId}`;
      this.$route.params.id = targetId;
      try {
        const res = await this.axios.get(url);
        this.product = res.data.product;
        loading.loadingStatus.getProduct = "";
      } catch(err) {
        showErrorToast(err.response.data.message)
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
