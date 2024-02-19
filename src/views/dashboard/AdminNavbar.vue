<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-4">
        <a class="navbar-brand mb-0" href="index.html">UNIQLOLO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav gap-2">
            <li class="nav-item">
              <!-- RouterLink 生成路由連結，編譯後轉為 <a>，to 代表要進入的路由 -->
              <RouterLink 
              :to="{ name: 'admin/products' }" class="nav-link text-decoration-none">商品列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink 
              :to="{ name: 'admin/orders' }" class="nav-link text-decoration-none">訂單列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink 
              :to="{ name: 'home' }" class="nav-link text-decoration-none">回到前台</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <!-- 渲染路由 "/admin" children：dashboard-->
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
.nav-link.active {
  color: white !important;
}
</style>