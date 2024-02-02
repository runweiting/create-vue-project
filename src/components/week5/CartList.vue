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
      title: '購物車列表',
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
    // GET 購物車列表
    // /v2/api/{api_path}/cart
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
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
      <button @click="deleteAll" type="button" class="btn btn-outline-danger">清空購物車</button>
    </div>
    <div class="container table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-warning">
          <tr>
            <th scope="col" class="fw-bold">品名</th>
            <th scope="col" class="fw-bold">數量/單位</th>
            <th scope="col" class="fw-bold">單價</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 150px"><img src="" class="rounded img-fluid " style="height: 100px"></td>
            <td style="width: 100px">
              <div class="input-group mb-3">
                <input type="number" min="1" class="form-control">
                <span class="input-group-text">個</span>
              </div>
            </td>
            <td style="width: 100px">
              <p class="fs-5 fw-bold">900元</p>
            </td>
            <td style="width: 50px">
              <button @click="deleteItem(item)" type="button" class="btn btn-outline-danger">x</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>總計</td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>