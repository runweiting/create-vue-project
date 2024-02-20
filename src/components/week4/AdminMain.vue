<template>
  <div class="col mt-4 mb-4">
    <div class="container py-2">
      <h2>{{ title }}</h2>
      <div class="d-flex justify-content-between gap-2 py-2">
        <p class="p-2 mb-0">
          {{ `目前有 ${Object.keys(this.products).length} 項商品` }}
        </p>
        <!-- Button trigger modal -->
        <div class="d-flex justify-content-end gap-2">
          <button
            @click="openModal('new')"
            type="button"
            class="btn btn-primary"
            id="modalBtn"
          >
            建立新的商品
          </button>
          <button @click="logout" type="button" class="btn btn-warning">
            登出
          </button>
        </div>
        <!-- editModal -->
        <edit-modal
          ref="editModal"
          :tempData="tempData"
          :is-new="isNew"
          @getData="getData"
        >
        </edit-modal>
        <!-- delModal -->
        <del-modal ref="delModal" :tempData="tempData" @getData="getData">
        </del-modal>
      </div>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="fw-bold">分類</th>
            <th scope="col" class="fw-bold">商品名稱</th>
            <th scope="col" class="fw-bold">原價</th>
            <th scope="col" class="fw-bold">售價</th>
            <th scope="col" class="fw-bold">是否啟用</th>
            <th scope="col" class="fw-bold">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.title">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td :class="{ 'text-success': item.is_enabled }">
              {{ item.is_enabled ? "啟用" : "未啟用" }}
            </td>
            <td>
              <div
                class="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  @click="openModal('edit', item)"
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                >
                  編輯
                </button>
                <button
                  @click="openModal('delete', item)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @showPage="getData" />
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import EditModal from '@/components/week4/EditModal.vue';
import DelModal from '@/components/week4/DelModal.vue';
import Pagination from './Pagination.vue';

export default {
  components: {
    EditModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      title: '可編輯的商品列表',
      // 商品列表
      products: [],
      isNew: false,
      tempData: {
        imagesUrl: [],
      },
      // 分頁
      pagination: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // GET 商品列表
    // 預設為第一頁，若 page 傳入值則取代 1
    getData(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      this.axios.get(url).then((res) => {
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination;
      });
    },
    // 切換 modal 狀態：新增、編輯、刪除
    openModal(isNew, item) {
      // 新增 -> 清空資料、POST、開啟 editModal
      if (isNew === 'new') {
        this.tempData = {
          imagesUrl: [],
        };
        this.isNew = true;
        // $refs.editModal 是對子組件的引用，而 .editModal 則是子組件中 Bootstrap Modal 實例的屬性或方法
        this.$refs.editModal.editModal.show();
        // 編輯 -> 淺拷貝、PUT、開啟 editModal
      } else if (isNew === 'edit') {
        this.tempData = { ...item };
        // * 如果沒有多圖的 item，要新增多圖
        if (!Array.isArray(this.tempData.imagesUrl)) {
          this.tempData.imagesUrl = [];
        }
        this.isNew = false;
        this.$refs.editModal.editModal.show();
        // 刪除 -> 淺拷貝、開啟 delModal
      } else if (isNew === 'delete') {
        this.tempData = { ...item };
        this.$refs.delModal.delModal.show();
      }
    },
    // POST 登出
    logout() {
      const url = `${this.apiUrl}/logout`;
      this.axios.post(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 清除 token
          document.cookie = 'myToken=; expires=;';
          // 清除 headers
          this.axios.defaults.headers.common.Authorization = null;
          // 導向登入頁面
          this.$router.push({ name: 'login' });
        });
      });
    },
  },
};
</script>
