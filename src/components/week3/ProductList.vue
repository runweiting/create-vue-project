<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_URL,
      apiPath: import.meta.env.VITE_PATH,
      title: '可編輯的商品列表',
      // GET 商品列表
      products: [],
      // POST 新增商品
      showAddImgSection: false,
      newData: {},
      tempData: {
        imagesUrl: [],
      },
      myModal: null,
      myModalTitle: '新增商品',
      // PUT 編輯商品

    }
  },
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    // axios headers 預設寫法
    this.axios.defaults.headers.common['Authorization'] = token;
  },
  // 已掛載 DOM
  mounted() {
    // 建立 myModal 實體
    // 1. 先選取 DOM 元件
    const modal = document.querySelector('#modal');
    // 2. myModal 實體化
    this.myModal = new bootstrap.Modal(modal);
    // POST 驗證登入
    const urlCheck = `${this.apiUrl}/api/user/check`;
    this.axios
    .post(urlCheck)
    .then((res)=> {
      console.log(res);
      // GET 商品列表
      const urlProducts = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      return this.axios.get(urlProducts);
    })
    .then((res)=> {
      this.products = res.data.products;
    })
    .catch((err)=> {
      console.log(err);
      Swal.fire({
        title: `驗證錯誤，請重新登入`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
      .then(()=> {
        this.$router.push({ name: 'login' });
      })
    });
  },
  computed: {
    productsLength() {
      return this.products.length;
    }
  },
  methods: {
    // POST 登出
    logout(){
      const url = `${this.apiUrl}/logout`;
      this.axios
      .post(url)
      .then((res)=> {
        console.log(res.data);
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        .then(()=>{
          // 清空 user
          this.user = {};
          // 清除 token
          document.cookie = "myToken=; expires=;";
          // 清除 headers
          this.axios.defaults.headers.common['Authorization'] = null;
          // 導向登入頁面
          this.$router.push({ name: 'login' });
        });
        })
      .catch((err)=> {
        console.log(err.response)
        })
    },
    openModal() {
      this.myModal.show();
    },
    closeModal() {
      this.myModal.hide();
    },
    // 多圖新增 - 顯示圖片
    showAddImg() {
      // 在 imagesUrl 陣列寫入一個空字串，以觸發 v-if + v-for 渲染輸入框及刪除按鈕
      this.tempData.imagesUrl.push('');
      this.showAddImgSection = true;
    },
    // 多圖新增 - 新增圖片
    addImg() {
      this.tempData.imagesUrl.push('')
    },
    // 多圖新增 - 刪除圖片
    deleteImg() {
      if(this.tempData.imagesUrl.length > 1) {
        this.tempData.imagesUrl.pop();
      } else {
        this.tempData.imagesUrl = [''];
      }
    },    
    // POST 新增商品
    addData() {
      if(Array.isArray(this.tempData.imagesUrl)) {
        this.newData = {
          data: this.tempData,
          id: new Date().getTime()
        }
      };
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      this.axios
      .post(url, this.newData)
      .then((res)=>{
        console.log(this.newData);
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=> {
          // 重新整理頁面
          location.reload();
        })
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire({
          title: err.response,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    },
    // DELETE 刪除商品
    removeData(id) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
      this.axios
      .delete(url)
      .then((res)=> {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=> {
          // 重新整理頁面
          location.reload();
        })
      })
      .catch((err)=> {
        console.log(err)
        Swal.fire({
          title: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    },
    // PUT 編輯資料
  },
}
</script>

<template>
  <div class="col mt-4 mb-4">
    <div class="container py-2">
      <h2>{{ title }}</h2>
      <div class="d-flex justify-content-between gap-2 py-2">
        <p class="p-2 mb-0">{{ `目前有 ${productsLength} 項商品` }}</p>
        <!-- Button trigger modal -->
        <div class="d-flex justify-content-end gap-2">
          <button @click="openModal" type="button" class="btn btn-primary" id="modalBtn">建立新的商品</button>
          <button @click="logout" type="button" class="btn btn-warning">登出</button>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ myModalTitle }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <div class="mb-4">
                      <label for="imgUrl" class="form-label">主要圖片</label>
                      <input v-model="tempData.imageUrl" type="url" class="form-control mb-2" id="imgUrl" placeholder="請輸入網址">
                      <img :src="tempData.imageUrl">
                    </div>
                    <h4 class="fw-bold">多圖新增</h4>
                    <!-- 多圖新增 -->
                    <div v-if="showAddImgSection" class="mb-4">
                      <!-- // ? v-if 隱藏圖片網址區塊 
                      -->
                      <div v-for="(url, key) in tempData.imagesUrl" :key="key">
                        <label :for="`url${key}`" class="form-label">圖片網址</label>
                        <input :id="`url${key}`" v-model="tempData.imagesUrl[key]" type="url" class="form-control mb-2"  placeholder="請輸入網址">
                        <img :src="tempData.imagesUrl[key]" class="img-fluid mb-2">
                      </div>
                      <div class="d-flex gap-2">
                        <button @click="addImg" type="button" class="btn btn-outline-primary w-100">新增圖片</button>
                        <button @click="deleteImg" type="button" class="btn btn-outline-danger w-100">刪除圖片</button>
                      </div>
                    </div>
                    <div v-else>
                      <!-- // ? v-else 顯示新增圖片按鈕 -->
                      <button @click="showAddImg" type="button" class="btn btn-outline-primary w-100">新增圖片</button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <label for="title" class="form-label">標題</label>
                    <input v-model="tempData.title" type="text" class="form-control mb-4" name="title" placeholder="請輸入標題">
                    <div class="row">
                      <div class="col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <input v-model="tempData.category" type="text" class="form-control mb-4" id="category" placeholder="請輸入分類">
                      </div>
                      <div class="col-md-6">
                        <label for="unit" class="form-label">單位</label>
                        <input v-model="tempData.unit" type="text" class="form-control mb-4" id="unit" placeholder="請輸入單位">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label for="original_price" class="form-label">原價</label>
                        <input v-model="tempData.origin_price" type="number" min="0" class="form-control mb-4" id="original_price" placeholder="請輸入原價">
                      </div>
                      <div class="col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <input v-model="tempData.price" type="number" min="0" class="form-control mb-4" id="price" placeholder="請輸入售價">
                      </div>
                    </div>
                    <hr>
                    <div>
                      <label for="textarea" class="form-label">商品描述</label>
                      <textarea v-model="tempData.description" class="form-control mb-4" placeholder="請輸入商品描述" id="textarea"></textarea>
                    </div>
                    <div>
                      <label for="textarea" class="form-label">說明內容</label>
                      <textarea v-model="tempData.content" class="form-control mb-4" placeholder="請輸入說明內容" id="textarea"></textarea>
                    </div>
                    <div class="form-check">
                      <input v-model="tempData.is_enabled" class="form-check-input" type="checkbox" id="checkbox">
                      <label class="form-check-label" for="checkbox">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button 
              @mousedown="addData" @mouseup="closeModal" type="button" class="btn btn-primary">確認</button>
            </div>
          </div>
        </div>
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
            <td :class="{ 'text-success': item.is_enabled }">{{ item.is_enabled ? '啟用' : '未啟用' }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button @click="openModal" type="button" class="btn btn-outline-primary btn-sm">編輯</button>
                <button @click="removeData(item.id)" type="button" class="btn btn-outline-danger btn-sm">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
  </div>
</template>

<style scoped>
</style>