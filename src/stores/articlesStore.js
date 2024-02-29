import axios from "axios";
// import Swal from "sweetalert2";
import { defineStore } from "pinia";

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore("articlesStore", {
  state: () => ({
    // 優惠卷列表
    articleList: [],
    pagination: {},
  }),
  actions: {
    // GET 文章列表
    // 預設為第一頁，若 page 傳入值則取代 1
    // /v2/api/{api_path}/admin/articles
    getArticles(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/articles?page=${page}`;
      axios.get(url).then((res) => {
        console.log(res.data);
        const { articles, pagination } = res.data;
        this.articleList = articles;
        this.pagination = pagination;
        console.log(this.articleList);
      });
    },
  },
});
