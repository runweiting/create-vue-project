import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore("articlesStore", {
  state: () => ({
    // 文章列表
    articleList: [],
    pagination: {},
    // 特定文章
    selectedArticle: {},
  }),
  actions: {
    // GET 文章列表
    // 預設為第一頁，若 page 傳入值則取代 1
    getArticles(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/articles?page=${page}`;
      axios.get(url).then((res) => {
        const { articles, pagination } = res.data;
        this.articleList = articles;
        this.pagination = pagination;
      });
    },
    postArticle() {
      this.selectedArticle = {};
    },
    getArticle(id) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${id}`;
      return axios.get(url).then((res) => {
        this.selectedArticle = res.data.article;
      });
    },
    // DELETE 刪除指定文章
    deleteArticle(id) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${id}`;
      axios.delete(url).then((res) => {
        Swal.fire({
          title: res.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getArticles();
      });
    },
  },
});
