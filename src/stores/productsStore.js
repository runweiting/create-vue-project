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
        async getProducts(page = 1, category) {
            const loader = $loading.show();
            let url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
            if (category) { url += `&category=${category}` };
            try {
                const res = await axios.get(url);
                const { products, pagination } = res.data;
                this.productList = products;
                this.pagination = pagination;
                // 異步操作完成後，調用排序邏輯
                this.sortProducts();
            } catch(err) {
                console.log('資料取得失敗', err)
            } finally {
                loader.hide();
            }
        },
        // sort 商品列表
        sortProducts() {
            this.productList = this.productList.sort((a, b) => a.price - b.price);
        }
    },
    getters: {
        
    },
})