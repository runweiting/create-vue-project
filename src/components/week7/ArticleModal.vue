<!-- eslint-disable max-len -->
<template>
  <!-- articleModal -->
  <div
  class="modal fade"
  id="articleModal"
  tabindex="-1"
  aria-labelledby="articleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-dark opacity-75 text-white">
          <h5 class="modal-title" id="articleModalLabel">
            <span>文章 ID：{{ tempArticle.id }}</span>
            <br>
          </h5>
          <button @click="cancelUpdate"
            type="button"
            class="btn btn-outline-light"
            data-bs-dismiss="modal"
            aria-label="Close"
          ><i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-5">
              <div class="border rounded p-2 bg-light">
                <div class="row mb-2">
                  <div class="col-md-6 d-flex align-items-center gap-3">
                    <label for="enabled" class="col-form-label">啟用狀態：</label>
                    <div class="col-sm-6">
                      <select v-model="tempArticle.isPublic" :disabled="inputDisabled" class="form-select w-100" id="enabled">
                        <option :value="true">
                          公開
                        </option>
                        <option :value="false">
                          未公開
                        </option>
                      </select>
                    </div>
                    <i v-if="tempArticle.isPublic" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
                    <i v-else class="bi bi-x-circle-fill text-danger" style="scale: 150%;"></i>
                  </div>
                  <div class="col-md-6">
                    <button @click="togglerEdit" type="button" class="btn btn-warning">修改文章</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <h5>文章內容</h5>
              <div class="col-md-6">
                <form>
                  <div class="row mb-2">
                    <label for="title" class="col-sm-4 col-form-label">標題：</label>
                    <div class="col-sm-8">
                      <input
                      v-model="tempArticle.title" :disabled="inputDisabled" type="text" class="form-control" id="title">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="code" class="col-sm-4 col-form-label">作者：</label>
                    <div class="col-sm-8">
                      <input
                      v-model="tempArticle.author" :disabled="inputDisabled" type="text" class="form-control" id="code">
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="code" class="col-sm-4 col-form-label">敘述：</label>
                    <div class="col-sm-8">
                      <input
                      v-model="tempArticle.description" :disabled="inputDisabled" type="text" class="form-control" id="code">
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-md-6">
                <div class="row mb-2">
                    <label for="title" class="col-sm-4 col-form-label">文章標籤：</label>
                    <div class="col-sm-8">
                      <div class="input-group mb-2">
                        <input :disabled="inputDisabled" type="text" class="form-control" placeholder="輸入標籤" v-model="newTag" @keyup.enter="addTag">
                        <button class="btn btn-outline-secondary" type="button" @click="addTag">新增</button>
                      </div>
                      <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-secondary d-flex align-items-center" v-for="(tag, index) in tempArticle.tag" :key="index" style="opacity: 0.75;">
                          <span>{{ tag }}</span>
                          <button type="button" class="btn-close" aria-label="Close" @click="removeTag(index)" style="scale: 0.75;">
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <label for="dateInput" class="col-sm-4 col-form-label">發佈日期：</label>
                    <div class="col-sm-8">
                      <input
                      v-model="tempArticle.created_at" :disabled="inputDisabled" type="date" class="form-control" id="title">
                    </div>
                  </div>
              </div>
            </div>
            <div class="row mb-2">
              <h5>編輯文章</h5>
              <div class="col">
                <ckeditor :disabled="inputDisabled" :editor="editor" v-model="tempArticle.content" :config="editorConfig"></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="cancelUpdate"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button @click="updateArticle" type="button" class="btn btn-danger">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Modal from 'bootstrap/js/dist/modal';
import { mapActions } from 'pinia';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import articlesStore from '@/stores/articlesStore';
import timestampToDate from '../utils/timestampToDate';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  props: {
    currentArticle: Object,
    isNew: Boolean,
  },
  data() {
    return {
      articleModal: null,
      tempArticle: {},
      inputDisabled: true,
      // ckeditor
      editor: ClassicEditor,
      editorData: '<p>Hello world!!</p>',
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link']
      },
      // tags
      newTag: '',
    }
  },
  created() {
    // 初始化 tempCoupon
    this.tempArticle = {
      ...this.currentArticle,
    };
  },
  watch: {
    currentArticle: {
      deep: true,
      handler(updateArticle) {
        this.tempArticle = updateArticle;
      },
    },
  },
  mounted() {
    this.articleModal = new Modal(document.querySelector('#articleModal'), {
      // 禁用鍵盤 Esc 關閉 modal
      keyboard: false,
      // 禁止點擊 Modal 以外區域以關閉對話框
      backdrop: 'static',
    });
  },
  methods: {
    ...mapActions(articlesStore, ['getArticles']),
    // tags
    addTag() {
      if (this.newTag.trim() !== '') {
        this.tempArticle.tag.push(this.newTag.trim());
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.tempArticle.tag.splice(index, 1);
    },
    // timestamp to String
    formatDate(timestamp) {
      const { formattedDate } = timestampToDate(timestamp);
      return { formattedDate }
    },
    // 修改訂單
    togglerEdit() {
      this.inputDisabled = false;
    },
    // 關閉修改
    cancelUpdate() {
      this.inputDisabled = true;
    },
    // POST or PUT 文章
    updateArticle() {
      // -> 新增文章
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article`;
      let method = 'post';
      // -> 編輯文章
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        method = 'put';
      };
      this.axios[method](url, {
        "data": this.tempArticle})
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getArticles();
      })
      .then(() => {
        this.inputDisabled = true;
        this.articleModal.hide();
      })
      .catch((err) => {
        Swal.fire({
          title: err,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    },
  },
};
</script>

<style scoped>
.order-img {
  object-fit: cover;
  height: 50px;
}
</style>