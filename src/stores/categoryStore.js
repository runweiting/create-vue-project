import axios from 'axios';
import { defineStore } from 'pinia';

const apiUrl = import.meta.env.VITE_URL;
const apiPath = import.meta.env.VITE_PATH;

export default defineStore('categoryStore', {
  state: ()=> ({
    // 從 GET 購物車列表中的 category 來分類
    categoryList: []
  }),
  actions: {
    // GET 商品列表
    getCategory() {
      const url = `${apiUrl}/api/${apiPath}/products/all`;
      axios.get(url)
      .then((res)=> {
        const products = res.data.products;
        // new Set(...) 是一種 ES6 中的集合類型，可以存儲唯一的值，重複的值會被忽略
        const category = new Set(products.map(item => item.category ));
        this.categoryList = [ ...category ];
      })
    }

  }
})