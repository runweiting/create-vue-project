<script>
import Swal from 'sweetalert2';
import ShowModal from '../week5/ShowModal.vue';
import CartList from '../week5/CartList.vue'

export default {
  components: {
    ShowModal,
    CartList
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      title: '商品列表',
      // 商品列表
      products: [],
      // 指定商品
      product: {},
      // 購物車列表
      cartsList: {},
      // 購物車總計
      cartsTotal: 0,
    }
  },
  created() {
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    // GET 商品列表
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/products`;
      this.axios
      .get(url)
      .then((res)=> {
        this.products = res.data.products;
      })
    },
    // GET 指定商品
    getProduct(targetId) {
      const url = `${this.apiUrl}/api/${this.apiPath}/product/${targetId}`;
      this.axios
      .get(url)
      .then((res)=> {
        this.product = res.data.product;
        this.$refs.showModal.openModal();
      })
    },
    // POST 加入購物車 (因為 ProductList 也有加入購物車按鈕)
    addToCart(targetId, qty = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      const cart = {
        product_id: targetId,
        qty,
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
        this.getCart();
      })
    },
    // GET 購物車列表
    getCart() {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      this.axios
      .get(url)
      .then((res)=> {
        this.cartsList = res.data.data.carts;
        this.cartsTotal = res.data.data.total;
        console.log(this.cartsList)
      })
    },
    // PUT 修改購物車
    putCart(item) {
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
  },
}
</script>

<template>
  <div class="col-8 mt-4 mb-4">
    <div class="container py-2 d-flex justify-content-between">
      <h2>{{ title }}</h2>
      <p class="p-2 mb-0">
        {{ `目前有 ${(Object.keys(this.products)).length} 項商品` }}
      </p>
    </div>
    <div class="container table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-secondary">
          <tr>
            <th scope="col" class="fw-bold">圖片</th>
            <th scope="col" class="fw-bold">商品名稱</th>
            <th scope="col" class="fw-bold">價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.title">
            <td style="width: 100px"><img :src="item.imageUrl" class="rounded img-fluid " style="height: 100px"></td>
            <td style="width: 100px">{{ item.title }}</td>
            <td style="width: 100px">
              <del class="fs-6 fw-bold text-secondary">原價{{ item.origin_price }}元</del>
              <p class="fs-5 fw-bold mb-0">現在只要{{ item.price }}元</p>
            </td>
            <td style="width: 100px">
              <div class="d-flex flex-column gap-2">
                <button @click="getProduct(item.id)" type="button" class="btn btn-outline-secondary" id="modalBtn">查看更多</button>
                <button @click="addToCart(item.id)" type="button" class="btn btn-outline-danger">加入購物車</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ShowModal -->
    <show-modal ref="showModal" :product="product" @addToCart="addToCart"></show-modal>
  </div>
  <cart-list :carts="cartsList" :total="cartsTotal" @updateData="putCart" @deleteData="deleteCart" @deleteAllData="deleteCarts" class="sticky"></cart-list>
</template>

<style scoped>
.sticky {
  /* 適當的高度值，視你的設計需求而定 */
  max-height: 900px;
  overflow-y: auto; /* 使得內容超過高度時可以滾動 */
  position: sticky;
  top: 0;
}
</style>