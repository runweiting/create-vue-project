import { defineStore } from "pinia";

export default defineStore("productInfoStore", {
  state: () => ({
    // 指定商品
    selectedProduct: null,
  }),
  actions: {
    setSelectedProduct(product) {
      this.selectedProduct = product;
    },
  },
});
