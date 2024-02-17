<template>
  <!-- 每頁重複出現的 <header> -->
  <!-- 放置主要內容 <main> -->
  <!-- 渲染路由 "/" -->
  <RouterView />
  <!-- 每頁重複出現的 <footer> -->
</template>

<style lang="scss">
/* {
  outline: 1px solid yellowgreen
}*/
.nav-link.active {
  background-color: white;
  color: black;
}
</style>
