<script>
import Swal from 'sweetalert2';

export default {
  components: {
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      title: '商品列表',
      // 商品列表
      products: [],
      isNew: false,
      tempData: {
        imagesUrl: [],
      },
    }
  },
  created() {
  },
  mounted() {
    this.getData();
  },
  methods: {
    // GET 商品列表
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/products`;
      this.axios
      .get(url)
      .then((res)=> {
        const { products } = res.data;
        this.products = products;
        console.log(res.data)
      })
    },

  },
}
</script>

<template>
  <div class="col mt-4 mb-4">
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
              <del class="fs-6 fw-bold">原價{{ item.origin_price }}元</del>
              <p class="fs-5 fw-bold">現在只要{{ item.price }}元</p>
            </td>
            <td style="width: 100px">
              <div class="d-flex flex-column gap-2">
                <button @click="openModal('edit')" type="button" class="btn btn-outline-secondary" id="modalBtn">查看更多</button>
                <button @click="addToCart(item)" type="button" class="btn btn-outline-danger">加入購物車</button>
              </div>
              <!-- editModal -->
              <!-- <show-modal ref="showModal" :tempData="tempData" :is-new="isNew" @getData="getData">
              </show-modal> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>