<!-- eslint-disable max-len -->
<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      // 新增 apiUrl、apiPath
      apiUrl: import.meta.env.VITE_APP_URL,
      apiPath: import.meta.env.VITE_APP_PATH,
      title: '可編輯的商品列表',
      // 商品列表
      products: [],
      // true 表示正在新增商品，false 表示正在編輯現有商品
      isNew: false,
      tempData: {
        imagesUrl: [],
      },
      editModal: null,
      delModal: null,
    };
  },
  created() {
    // 從 cookies 讀取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // axios headers 預設寫法
    this.axios.defaults.headers.common.Authorization = token;
  },
  mounted() {
    // 建立 editModal delModal 實體
    // eslint-disable-next-line max-len
    // Bootstrap Modal 中，keyboard 用於控制鍵盤，可接受 true (預設值)：允許操作，Esc 關閉 modal、false：禁用鍵盤， Esc 無法關閉 modal，keyboard: false 限制用戶只能按下 modal 內的按鈕，才能關閉 modal
    this.editModal = new Modal(document.querySelector('#editModal'), {
      keyboard: false,
    });
    this.delModal = new Modal(document.querySelector('#delModal'), {
      keyboard: false,
    });
    this.checkAdmin();
  },
  methods: {
    // POST 驗證登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      this.axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch(() => {
          Swal.fire({
            title: '驗證錯誤，請重新登入',
            icon: 'error',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push({ name: 'login' });
          });
        });
    },
    // GET 商品列表
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      this.axios.get(url).then((res) => {
        this.products = res.data.products;
      });
    },
    // POST 登出
    logout() {
      const url = `${this.apiUrl}/logout`;
      this.axios.post(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
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
    // POST 新增商品 or PUT 編輯商品
    updateData() {
      // -> 新增商品
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let method = 'post';
      // -> 編輯現有商品
      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
        method = 'put';
      }
      this.axios[method](url, {
        data: this.tempData,
      })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .then(() => {
          this.editModal.hide();
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
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
        this.editModal.show();
        // 編輯 -> 淺拷貝、PUT、開啟 editModal
      } else if (isNew === 'edit') {
        this.tempData = { ...item };
        // 如果沒有多圖的 item，要新增多圖
        if (!Array.isArray(this.tempData.imagesUrl)) {
          this.tempData.imagesUrl = [];
        }
        this.isNew = false;
        this.editModal.show();
        // 刪除 -> 淺拷貝、開啟 delModal
      } else if (isNew === 'delete') {
        this.tempData = { ...item };
        this.delModal.show();
      }
    },
    // DELETE 刪除商品
    deleteData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempData.id}`;
      this.axios
        .delete(url)
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        })
        .then(() => {
          this.delModal.hide();
          this.getData();
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    },
  },
};
</script>

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
      </div>
      <!-- editModal -->
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">
                <span v-if="isNew">新增商品</span>
                <span v-else>編輯商品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <div class="mb-4">
                      <label for="imgUrl" class="form-label">主要圖片</label>
                      <input
                        v-model="tempData.imageUrl"
                        type="url"
                        class="form-control mb-2"
                        id="imgUrl"
                        placeholder="請輸入網址"
                      />
                      <img :src="tempData.imageUrl" class="img-fluid" />
                    </div>
                    <!-- 多圖新增 -->
                    <h4 class="fw-bold">多圖新增</h4>
                    <!-- // ? 判斷 v-if 是否已有多圖 -->
                    <div v-if="Array.isArray(tempData.imagesUrl)" class="mb-4">
                      <div v-for="(url, key) in tempData.imagesUrl" :key="key">
                        <label :for="`url${key}`" class="form-label"
                          >圖片網址</label
                        >
                        <input
                          :id="`url${key}`"
                          v-model="tempData.imagesUrl[key]"
                          type="url"
                          class="form-control mb-2"
                          placeholder="請輸入網址"
                        />
                        <img
                          :src="tempData.imagesUrl[key]"
                          class="img-fluid mb-2"
                        />
                      </div>
                      <div class="d-flex gap-2">
                        <!--
                          // ? 如果沒有資料則可新增 or 最後一個有值，顯示新增按鈕
                          // * 新增空字串到 imagesUrl，以觸發 v-if + v-for 渲染
                        -->
                        <button
                          v-if="
                            tempData.imagesUrl.length === 0 ||
                            tempData.imagesUrl[tempData.imagesUrl.length - 1]
                          "
                          @click="tempData.imagesUrl.push('')"
                          type="button"
                          class="btn btn-outline-primary w-100"
                        >
                          新增圖片
                        </button>
                        <button
                          v-else
                          @click="tempData.imagesUrl.pop()"
                          type="button"
                          class="btn btn-outline-danger w-100"
                        >
                          刪除圖片
                        </button>
                      </div>
                    </div>
                    <div v-else>
                      <!-- // ? v-else 顯示新增圖片按鈕 -->
                      <button
                        type="button"
                        class="btn btn-outline-primary w-100"
                      >
                        新增圖片
                      </button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <label for="title" class="form-label">標題</label>
                    <input
                      v-model="tempData.title"
                      type="text"
                      class="form-control mb-4"
                      name="title"
                      placeholder="請輸入標題"
                    />
                    <div class="row">
                      <div class="col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <input
                          v-model="tempData.category"
                          type="text"
                          class="form-control mb-4"
                          id="category"
                          placeholder="請輸入分類"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="unit" class="form-label">單位</label>
                        <input
                          v-model="tempData.unit"
                          type="text"
                          class="form-control mb-4"
                          id="unit"
                          placeholder="請輸入單位"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label for="original_price" class="form-label"
                          >原價</label
                        >
                        <input
                          v-model.number="tempData.origin_price"
                          type="number"
                          min="0"
                          class="form-control mb-4"
                          id="original_price"
                          placeholder="請輸入原價"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <input
                          v-model.number="tempData.price"
                          type="number"
                          min="0"
                          class="form-control mb-4"
                          id="price"
                          placeholder="請輸入售價"
                        />
                      </div>
                    </div>
                    <hr />
                    <div>
                      <label for="textarea" class="form-label">商品描述</label>
                      <textarea
                        v-model="tempData.description"
                        class="form-control mb-4"
                        placeholder="請輸入商品描述"
                        id="textarea"
                      ></textarea>
                    </div>
                    <div>
                      <label for="textarea" class="form-label">說明內容</label>
                      <textarea
                        v-model="tempData.content"
                        class="form-control mb-4"
                        placeholder="請輸入說明內容"
                        id="textarea"
                      ></textarea>
                    </div>
                    <div class="form-check">
                      <input
                        v-model="tempData.is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        id="checkbox"
                      />
                      <label class="form-check-label" for="checkbox">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button @click="updateData" type="button" class="btn btn-primary">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- delModal -->
      <div
        class="modal fade modal-lg"
        id="delModal"
        tabindex="-1"
        aria-labelledby="delModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delModalLabel">刪除商品</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- 刪除商品 -->
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-8">
                    <h5 class="fw-bold text-danger">
                      {{ tempData.title }}
                      <span class="badge bg-dark ms-2">{{
                        tempData.category
                      }}</span>
                    </h5>
                    <p>{{ tempData.description }}</p>
                    <p>
                      <small class="text-muted">
                        原價: {{ tempData.origin_price }} / 售價:
                        {{ tempData.price }}
                      </small>
                    </p>
                  </div>
                  <div class="col-sm-4">
                    <img :src="tempData.imageUrl" class="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button @click="deleteData" type="button" class="btn btn-danger">
                確認刪除
              </button>
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
  </div>
</template>

<style scoped></style>
