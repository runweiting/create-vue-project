<script>
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';

// 匯入 Components
import ShowModal from '../week5/ShowModal.vue';
import CartList from '../week5/CartList.vue';
import OrderDetail from '../week5/OrderDetail.vue';
import CategoryList from '../week5/CategoryList.vue';

// 匯入 Stores
import productsStore from '@/stores/productsStore';
import cartStore from '@/stores/cartStore';
import categoryStore from '@/stores/categoryStore';

export default {
  components: {
    ShowModal,
    CartList,
    OrderDetail,
    CategoryList
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      title: '商品列表',
      // 指定商品
      product: {},
      // vue-loading-overlay
      fullPage: false,
      // 重置表單
      resetForm: false,
      // Bootstrap Spinners
      loadingStatus: {
        getProduct: '',
        updateQty: '',
      },
    }
  },
  mounted() {
    this.getProducts(this.$loading)
    this.getCart();
    this.getCategory();
  }, 
  computed: {
    ...mapState(productsStore, ['productList']),
    ...mapState(cartStore, ['cartList', 'cartTotal']),
    ...mapState(categoryStore, ['categoryList'])
  },
  methods: {
    ...mapActions(productsStore, ['getProducts']),
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(categoryStore, ['getCategory']),

    // GET 指定商品
    getProduct(targetId) {
      this.loadingStatus.getProduct = targetId;
      const url = `${this.apiUrl}/api/${this.apiPath}/product/${targetId}`;
      this.axios
      .get(url)
      .then((res)=> {
        this.loadingStatus.getProduct = '';
        this.product = res.data.product;
        this.$refs.showModal.openModal();
      })
    },
    // POST 加入購物車 (因為 ProductList 也有加入購物車按鈕)
    addToCart(targetId, qty = 1) {
      this.loadingStatus.updateQty = targetId;
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      const cart = {
        product_id: targetId,
        qty: qty,
      };
      this.$refs.showModal.hideModal();
      this.axios
      .post(url, { data: cart })
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadingStatus.updateQty = '';
        this.getCart();
      })
    },
    // PUT 修改購物車
    putCart(item) {
      this.loadingStatus.updateQty = item.id;
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.axios
      .put(url, { data: cart })
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.loadingStatus.updateQty = '';
        this.getCart();
      })
    },
    // DELETE 刪除購物車指定商品
    deleteCart(targetId) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${targetId}`;
      this.axios
      .delete(url)
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getCart();
      })
    },
    // DELETE 刪除購物車
    deleteCarts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/carts`;
      this.axios
      .delete(url)
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getCart();
      })
    },
    // POST 結帳
    createOrder(data) {
      const order = {
        data: data
      };
      const url = `${this.apiUrl}/api/${this.apiPath}/order`;
      this.axios
      .post(url, order)
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // OrderDetail重置表單
        this.resetForm = true;
        this.getCart();
      })
      .catch((err)=> {
        Swal.fire({
          title: err.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
    },
  },
}
</script>

<template>
  <div class="col-8 mt-4 mb-4" ref="productList">
    <div class="container py-2 d-flex justify-content-between">
      <h2>{{ title }}</h2>
      <p class="p-2 mb-0">
        {{ `目前有 ${(Object.keys(productList)).length} 項商品` }}
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
              <img :src="item.imageUrl" class="rounded product-img">
            </td>
            <td>{{ item.title }}</td>
            <!-- 如果原價和價格一樣，就顯示價格 -->
            <td>
              <p v-if="item.origin_price === item.price" class="fs-5 fw-bold mb-0">{{ item.price }}元</p>
              <!-- 如果不一樣，就顯示原價刪除線、價格 -->
              <div v-else>
                <del class="fs-6 fw-bold text-secondary">原價{{ item.origin_price }}元</del>
                <p class="fs-5 fw-bold mb-0">現在只要{{ item.price }}元</p>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column gap-2">
                <button :disabled="item.id === this.loadingStatus.getProduct" @click="getProduct(item.id)" type="button" class="btn btn-outline-secondary" id="modalBtn">查看更多
                  <span v-if="item.id === this.loadingStatus.getProduct" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button @click="addToCart(item.id)" type="button" class="btn btn-outline-danger">加入購物車
                  <span v-if="item.id === this.loadingStatus.updateQty" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ShowModal -->
    <show-modal ref="showModal" :product="product" @addToCart="addToCart"></show-modal>
  </div>
  <cart-list :updateQty="loadingStatus.updateQty" @updateData="putCart" @deleteData="deleteCart" @deleteAllData="deleteCarts" class="sticky"></cart-list>
  <!-- 向 OrderDetail 傳入 resetState -->
  <order-detail @sendOrder="createOrder" :resetState="resetForm" />
</template>

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