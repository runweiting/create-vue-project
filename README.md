## 開發順序

1. 建立環境（套件、環境變數、Sass）
   1. 導入 Bootstrap Sass
      1. 複製 _variable.scss 至 assets/helpers
      2. 建立 all.scss
         - @import "bootstrap/scss/functions";
         - @import "./variables";
         - @import "bootstrap/scss/bootstrap.scss";
      3. 在 main.js import all.scss
   2. 建立 .env
   3. 在 main.js 匯入套件及功能
   4. 建立 deploy.sh

2. 版型二選一套用示範
   - 使用者故事 user story
   - 網站地圖 Sitemap
   - 線稿圖 wire frame

3. 完成切版
   1. 建立 .vue 檔案架構
      - FrontView.vue
      - dashboard.vue
   2. 建立資料夾 component/stores/utils/mixins/languages/...

4. 套用切版至 Vue 環境
   1. 建立路由表
      1. 建立 .vue
      2. 更新路由表 index.js
      3. 補上 <router-link />
      4. 分類產品動態路由
   2. 完成頁面拆分

5. 串接 API
   - 產品列表
     - 分類 category 利用 API query
   - 單一產品頁
     1. 在路由表中寫入動態路由 path: "products/:id'
     2. 在父組件加入 <RouterLink :to="/product/$(product.id”>
     3. 在子組件 const { id } = this.$route.params，id 帶入 axios.get 發出單一商品頁面請求
   - 購物車
   - 結帳

6. 畫面特效

7. 修飾

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
