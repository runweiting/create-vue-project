/*
1. import pinia
2. defineStore
3. state
4. actions
5. getters
*/
import { defineStore } from "pinia";

export default defineStore({
  id: "loadingStore",
  state: () => ({
    // Bootstrap Spinner
    loadingStatus: {
      getProduct: "",
      updateQty: "",
    },
  }),
});
