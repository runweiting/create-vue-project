<template>
  <!-- 每頁重複出現的 <header> -->
  <!-- 放置主要內容 <main> -->
    <main>
    <!-- 渲染路由 "/" children：商品列表、購物車 -->
    <router-view></router-view>
  </main>
  <!-- 每頁重複出現的 <footer> -->
</template>

<style lang="scss">
* {
  outline: 1px solid yellowgreen
}
</style>
