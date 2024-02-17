<!-- App.vue 用途：
  App.vue 根元件是整個應用程式的入口點，包含整體佈局、路由配置、全域樣式及全域行為
-->
<!-- 資料夾 的用途：
  # src/components 放子元件、utils.js
  # src/router 使用 createRouter 進行路由配置，根據不同 URL 顯示不同頁面
  # src/views 放 xxxView.vue 等頁面，包含該頁面的模板、資料、樣式等
-->

<template>
  <!-- 放置每頁重複出現的 HTML：如導航欄 -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-4">
        <a class="navbar-brand mb-0" href="index.html">Vue直播班</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav nav-pills gap-2">
            <li class="nav-item">
              <!-- RouterLink 生成路由連結，編譯後轉為 <a>，to 代表要進入的路由 -->
              <RouterLink 
              :to="{ name: 'home' }" class="nav-link text-decoration-none">商品列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink 
              :to="{ name: 'cart' }"
              class="nav-link text-decoration-none"
              >購物車<span class="badge rounded-pill bg-danger ms-2">{{ cartList.length }}</span></RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
              :to="{ name: 'login' }"
              class="nav-link text-decoration-none">登入後台</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
              :to="{ name: 'dashboard' }"
              class="nav-link text-decoration-none">後台商品列表</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <!-- 放置主要內容 -->
  <main>
    <!-- 渲染路由 "/" -->
    <RouterView />
  </main>
  <!-- 放置每頁重複出現的 HTML：如頁尾 <footer /> -->
</template>

<script>
import { mapState } from "pinia";
import cartStore from "./stores/cartStore";

export default {
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
};
</script>

<!-- Global Styles 全域樣式：
  設定全域樣式，例如背景色、字型、邊框等。
  使用 :root 或 body 元素是一種常見的做法。
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
  }
  body {
    font-family: 'Arial', sans-serif;
    background-color: var(--primary-color);
    color: #fff;
  }-->

<style scoped>
/* {
  outline: 1px solid yellowgreen
}*/
.nav-link.active {
  background-color: white;
  color: black;
}
</style>
