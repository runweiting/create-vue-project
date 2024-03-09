import { createRouter, createWebHashHistory } from "vue-router";
import Swal from "sweetalert2";
import isUserLoggedIn from "../utils/isUserLoggedIn";

// 1. 定義基本路由 baseRoutes
const baseRoutes = [
  {
    path: "/",
    redirect: "home",
    component: () => import("../views/UserNavbar.vue"),
    meta: { navbarType: "frontend" },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/UserHome.vue"),
        meta: {
          title: "UNIQLOLO 網路旗艦店",
        },
      },
      {
        path: "products",
        name: "products",
        component: () => import("../views/UserProducts.vue"),
        meta: {
          title: "商品列表",
        },
      },
      {
        path: "products/:id",
        name: "productInfo",
        component: () => import("../views/UserProductInfo.vue"),
        meta: {
          title: "單一商品介紹",
        },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/UserCart.vue"),
        meta: {
          title: "購物車",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserLogin.vue"),
    // meta 屬性添加 requiresAuth 和 message，前者表示是否需要驗證，後者是額外的信息
    meta: {
      title: "登入後台",
    },
  },
  {
    // 匹配任意路徑 -> 404 頁面
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
  {
    // 特定頁面下的重新導向 -> products 頁面
    path: "/home/:pathMatch(.*)*",
    redirect: {
      name: "products",
    },
  },
];
// 2. 定義後台相關路由 adminRoutes
const adminRoutes = [
  {
    path: "/admin",
    name: "admin",
    redirect: "admin/products",
    component: () => import("../views/dashboard/AdminNavbar.vue"),
    meta: {
      requiresAuth: true,
      message: "這是後台商品頁面",
      navbarType: "backend",
    },
    children: [
      {
        path: "products",
        name: "admin/products",
        component: () => import("../views/dashboard/AdminProducts.vue"),
        meta: {
          title: "後台 - 商品管理",
        },
      },
      {
        path: "orders",
        name: "admin/orders",
        component: () => import("../views/dashboard/AdminOrders.vue"),
        meta: {
          title: "後台 - 訂單管理",
        },
      },
      {
        path: "coupons",
        name: "admin/coupons",
        component: () => import("../views/dashboard/AdminCoupons.vue"),
        meta: {
          title: "後台 - 優惠卷管理",
        },
      },
      {
        path: "articles",
        name: "admin/articles",
        component: () => import("../views/dashboard/AdminArticles.vue"),
        meta: {
          title: "後台 - 文章管理",
        },
      },
    ],
  },
];

// 3. 建立 VueRouter 實體物件
const router = createRouter({
  // 網址路徑模式：使用 URL Hash(#錨點)
  // 可藉由 #/切換至不同 # 位置，避免引發網頁重新讀取
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...adminRoutes],
  // scrollBehavior 可自定義路由的滾動行為
  // 接收三個參數：to 表示目標路由，from 表示當前路由，savedPosition 表示從緩存中獲取的滾動位置
  scrollBehavior(to, from, savedPosition) {
    // 如果存在 savedPosition，將頁面滾動到 savedPosition 的位置
    if (savedPosition) {
      return savedPosition;
      // 如果目標路由有 hash，將頁面滾動到 hash 所在的位置
    }
    if (to.hash) {
      return { selector: to.hash };
      // 其他情況將頁面滾動到頂部
    }
    return { top: 0 };
  },
  // linkActiveClass 用於開啟 <router-link>的默認樣式
  // 當路由啟用時 <router-link> 會呈現 active 狀態(Bootstrap樣式)
  linkActiveClass: "active",
});

// 4. 全域前置守衛 router.beforeEach
// 在每次路由切換前進行驗證。如果目標路由需要驗證 requiresAuth 為 true 並且用戶未登入，則彈出提醒框，並將用戶導向登入頁面
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    Swal.fire({
      title: "請先登入",
      icon: "error",
      confirmButtonText: "OK",
    });
    next({ name: "login" });
  } else {
    next();
  }
});

// 5. 導出 Vue Router 實例
export default router;
