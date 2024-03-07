import axios from "axios";
import { defineStore } from "pinia";
import showErrorToast from "@/utils/showErrorToast";
import showSuccessToast from "@/utils/showSuccessToast";

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
      axios
        .get(url)
        .then((res) => {
          const { articles, pagination } = res.data;
          this.articleList = articles;
          this.pagination = pagination;
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
    postArticle() {
      this.selectedArticle = {
        title: "",
        description: "",
        image: "",
        tag: [],
        create_at: null,
        author: "",
      };
    },
    async getArticle(id) {
      try {
        const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${id}`;
        const res = await axios.get(url);
        this.selectedArticle = res.data.article;
      } catch (err) {
        showErrorToast(err.response.data.message);
      }
    },
    // DELETE 刪除指定文章
    deleteArticle(id) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${id}`;
      axios
        .delete(url)
        .then((res) => {
          showSuccessToast(res.data.message);
          this.getArticles();
        })
        .catch((err) => {
          showErrorToast(err.response.data.message);
        });
    },
  },
});
