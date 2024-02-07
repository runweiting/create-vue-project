import axios from "axios";
import { defineStore } from "pinia";
import { useLoading } from 'vue-loading-overlay';

const $loading = useLoading({});

const apiUrl = import.meta.env.VITE_URL;
const apiPath = import.meta.env.VITE_PATH;

export default defineStore('productsStore', {
    state: ()=> ({
        // 商品列表
        productList: [],
        pagination: {},
        fullPage: false,
    }),
    actions: {
        // GET 商品列表
        getProducts(page = 1, category) {
            const loader = $loading.show();
            let url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
            if (category) { url += `&category=${category}` }
            axios.get(url)
            .then((res)=> {
                const { products, pagination } = res.data;
                this.productList = products;
                this.pagination = pagination;
            })
            .catch((err)=> {
                console.log('資料取得失敗', err)
            })
            .finally(()=> {
                loader.hide();
            })
        },
    },
    getters: {
    },
})