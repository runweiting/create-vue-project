<!-- App.vue 用途：
  App.vue 主組件是整個應用程式的入口點，包含應用程式的整體佈局、路由配置、全域樣式，以及可能的全域行為 -->
<!-- 資料夾 的用途：
  # src/components 放子元件、utils.js
  # src/router 放 index.js 使用 createRouter 進行路由配置，根據不同 URL 顯示不同的頁面組件
  # src/views 放 xxxView.vue 等頁面組件，包含了該頁面的模板、資料、樣式等，用於渲染和呈現特定的內容 -->

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      activeNavLink: null,
    }
  },
  // watch 監聽 $route，在 created() 調用 updateNavClass
  // 這樣切換路由時一同更新 activeNavLink
  watch: {
    '$route'(to, from){
      this.updateNavClass(to, from);
    }
  },
  methods: {
    // updateNavClass 接受兩個參數 to 和 from，分別代表即將進入的路由和即將離開的路由，藉此更新 activeNavLink 設為當前路由名稱
    updateNavClass(to, from) {
      this.activeNavLink = to.name;
    },
  },
  created() {
    this.updateNavClass(this.$route, null);
  }
}
</script>

<template>
  <!-- 放置每頁重複出現的 HTML：如導航欄 -->
  <header>
    <nav class="nav nav-pills justify-content-end gap-2">
      <!-- RouterLink 生成路由鏈接，編譯後轉為 a 標籤，to 代表即將進入的路由 -->
      <!-- :class 綁定 active 判斷 activeNavLink 的值 -->
      <RouterLink :to="{ name: 'week2' }" class="nav-link text-decoration-none" :class="{ active: activeNavLink === 'week2' }">登入</RouterLink>
      <RouterLink :to="{ name: 'week1' }" class="nav-link text-decoration-none" :class="{ active: activeNavLink === 'week1' }">第一週主線作業</RouterLink>
      <RouterLink :to="{ name: 'week2-admin' }" class="nav-link text-decoration-none" :class="{ active: activeNavLink === 'week2-admin' }">第二週主線作業</RouterLink>
      <RouterLink :to="{ name: 'week3-admin' }" class="nav-link text-decoration-none" :class="{ active: activeNavLink === 'week3-admin'}">第三週主線作業</RouterLink>
    </nav>
  </header>

  <!-- 放置主要內容 -->
  <main>
    <!-- <RouterView> 渲染路由內容 -->
    <RouterView />
  </main>

  <!-- 放置每頁重複出現的 HTML：如頁尾 -->
  <footer>
  </footer>
</template>

<!-- Global Styles 全域樣式：
  設定全域樣式，例如背景色、字型、邊框等。使用 :root 或 body 元素是一種常見的做法。 
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
  background-color: #0d6efd;
  color: white;
}
</style>
