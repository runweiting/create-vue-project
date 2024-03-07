<!-- eslint-disable max-len -->
<template>
  <!-- editModal -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
    ref="modal"
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
                    v-model="tempProduct.imageUrl"
                    type="url"
                    class="form-control mb-2"
                    id="imgUrl"
                    placeholder="請輸入網址"
                  />
                  <img :src="tempProduct.imageUrl" class="img-fluid" />
                </div>
                <!-- 多圖新增 -->
                <h4 class="fw-bold">多圖新增</h4>
                <!-- // ? v-if 資料是否已有多圖，有則顯示，沒有不顯示 -->
                <div v-if="Array.isArray(tempProduct.imagesUrl)" class="mb-4">
                  <div v-for="(imgUrl, index) in tempProduct.imagesUrl" :key="`url${index}`">
                    <label :for="`url${index}`" class="form-label"
                      >圖片網址</label
                    >
                    <input
                      :id="`url${index}`"
                      v-model="tempProduct.imagesUrl[index]"
                      type="url"
                      class="form-control mb-2"
                      placeholder="請輸入網址"
                    />
                    <img
                      :src="tempProduct.imagesUrl[index]"
                      class="img-fluid mb-2"
                    />
                  </div>
                  <div class="d-flex gap-2">
                    <!--
                      // ? 如沒有資料則可新增 or 最後一個有值顯示新增按鈕
                      // * 新增空字串到 imagesUrl，以觸發 v-if + v-for 渲染
                    -->
                    <button
                      v-if="
                        tempProduct.imagesUrl.length === 0 ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                      @click="tempProduct.imagesUrl.push('')"
                      type="button"
                      class="btn btn-outline-primary w-100"
                    >
                      新增圖片
                    </button>
                    <button
                      @click="tempProduct.imagesUrl.pop()"
                      type="button"
                      class="btn btn-outline-danger w-100"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <!-- 上傳圖片 -->
                <h4 class="fw-bold">上傳圖片</h4>
                <div class="mb-4">
                  <input
                    @change="upload"
                    class="form-control"
                    type="file"
                    id="formFile"
                    placeholder="請輸入圖片連結"
                  />
                </div>
              </div>
              <div class="col-md-8">
                <label for="title" class="form-label">標題</label>
                <input
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control mb-4"
                  name="title"
                  placeholder="請輸入標題"
                />
                <div class="row">
                  <div class="col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control mb-4"
                      id="category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input
                      v-model="tempProduct.unit"
                      type="text"
                      class="form-control mb-4"
                      id="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label for="original_price" class="form-label">原價</label>
                    <input
                      v-model.number="tempProduct.origin_price"
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
                      v-model.number="tempProduct.price"
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
                    v-model="tempProduct.description"
                    class="form-control mb-4"
                    placeholder="請輸入商品描述"
                    id="textarea"
                  ></textarea>
                </div>
                <div>
                  <label for="textarea" class="form-label">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    class="form-control mb-4"
                    placeholder="請輸入說明內容"
                    id="textarea"
                  ></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label for="range" class="form-label">商品評價</label>
                    <span class="ms-2 text-primary fw-bold fs-5">
                      {{ tempProduct.productRatings }} 分
                    </span>
                    <input
                      v-model="tempProduct.productRatings"
                      type="range"
                      class="form-range"
                      min="0"
                      max="5"
                      step="1"
                    />
                  </div>
                  <div class="col-md-6">
                    <div class="form-check">
                      <label class="form-label m-0" for="product-active">啟用商品</label>
                      <label class="switch ms-2">
                        <!-- <input> 開關、<span> 滑動圓點 -->
                        <input v-model="tempProduct.is_enabled" type="checkbox">
                        <span class="slider"></span>
                      </label>
                    </div>
                  </div>
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
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import showSuccessToast from '@/utils/showSuccessToast';
import showErrorToast from '@/utils/showErrorToast'

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  props: {
    tempData: Object,
    isNew: Boolean,
  },
  data() {
    return {
      editModal: null,
      tempProduct: {
        imagesUrl: [],
        productRatings: 0, 
      },
    };
  },
  emit: ['getData'],
  mixins: [modalMixin],
  created() {
    // 將 tempData 的值複製到 tempProduct
    this.tempProduct = { ...this.tempData };
  },
  watch: {
    // ? 解決 imageUrl 和 id，顯示 undefined 問題
    // * 當元件被創建時，tempData 可能還未被傳入。為了確保 tempProduct 在 tempData 更新時同步更新，使用 watch 監聽 tempData 的變化，然後更新 tempProduct。
    tempData: {
      // 若要深度監聽，對象內部屬性的變化也觸發
      deep: true,
      handler(updateData) {
        this.tempProduct = updateData;
      },
    },
  },
  methods: {
     // POST or PUT 新增商品
    updateData() {
      // -> 新增商品
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
      let method = 'post';
      // -> 編輯商品
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      this.axios[method](url, {
        data: this.tempProduct,
      })
        .then((res) => {
          showSuccessToast(res.data.message);
          this.modal.hide();
          this.$emit('getData');
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    // 上傳圖片
    upload() {
      const fileInput = document.querySelector('#formFile');
      // 取出 fileInput 內的 file 物件
      const file = fileInput.files[0];
      // 新增 formData 物件
      const formData = new FormData();
      // 在 formData 最後一個子節點插入 file 和 'file-to-upload'
      formData.append('file-to-upload', file);
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`;
      this.axios.post(url, formData);
    },
  },
};
</script>