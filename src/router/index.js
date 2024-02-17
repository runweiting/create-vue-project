import { createRouter, createWebHashHistory } from 'vue-router';
import Week5View from '@/views/Week5View.vue';
import Swal from 'sweetalert2';
import Week1View from '../views/Week1View.vue';
import Week2LoginView from '../views/Week2LoginView.vue';
import Week2AdminView from '../views/Week2AdminView.vue';
import Week3AdminView from '../views/Week3AdminView.vue';
import Week4AdminView from '../views/Week4AdminView.vue';
import isUserLoggedIn from '../components/utils/utils';

// 1. 定義基本路由 baseRoutes
const baseRoutes = [
  {
    path: '/',
    redirect: '/week1', // 根路徑的重定向
  },
  {
    path: '/week1',
    name: 'week1',
    component: Week1View,
  },
  {
    path: '/week2',
    name: 'week2',
    component: Week2LoginView,
  },
  {
    path: '/week2-login',
    name: 'login',
    component: Week2LoginView,
  },
  {
    path: '/week5',
    name: 'week5',
    component: Week5View,
  },
];
// 2. 定義後台相關路由 adminRoutes
const adminRoutes = [
  {
    path: '/week2-admin',
    name: 'week2-admin',
    component: Week2AdminView,
    // meta 屬性添加 requiresAuth 和 message，前者表示是否需要驗證，後者是額外的信息
    meta: {
      requiresAuth: true,
      message: '這是後台商品頁面',
    },
  },
  {
    path: '/week3-admin',
    name: 'week3-admin',
    component: Week3AdminView,
    meta: {
      requiresAuth: true,
      message: '這是後台商品頁面',
    },
  },
  {
    path: '/week4-admin',
    name: 'week4-admin',
    component: Week4AdminView,
    meta: {
      requiresAuth: true,
      message: '這是後台商品頁面',
    },
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
  linkActiveClass: 'active',
});

// 4. 全域前置守衛 router.beforeEach
// 在每次路由切換前進行驗證。如果目標路由需要驗證 requiresAuth 為 true 並且用戶未登入，則彈出提醒框，並將用戶導向登入頁面
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    Swal.fire({
      title: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    next({ name: 'login' });
  } else {
    next();
  }
});

// 5. 導出 Vue Router 實例
export default router;
