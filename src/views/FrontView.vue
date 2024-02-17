<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-4">
        <a class="navbar-brand mb-0" href="index.html">UNIQLOLO</a>
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
    <div class="container pt-4 pb-2 text-center">
        <h2>WELCOME UNIQLOLO 網路旗艦店</h2>
    </div>
    <!-- 渲染路由 "/" children：商品列表、購物車 -->
    <router-view></router-view>
</template>

<script>
import { mapState } from "pinia";
import cartStore from "../stores/cartStore";

export default {
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
};
</script>