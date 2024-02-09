import { createRouter, createWebHashHistory } from 'vue-router'
import Week1View from '../views/Week1View.vue'
import Week2LoginView from '../views/Week2LoginView.vue'
import Week2AdminView from '../views/Week2AdminView.vue'
import Week3AdminView from '../views/Week3AdminView.vue'
import Week4AdminView from '../views/Week4AdminView.vue'
import Week5View from '@/views/Week5View.vue'
import Swal from 'sweetalert2';
import { isUserLoggedIn } from '../../src/components/utils/utils'

// 1. 定義基本路由 baseRoutes
const baseRoutes = [
  {
    path: '/',
    redirect: '/week1', // 根路徑的重定向
  },
  {
    path: '/week1',
    name: 'week1',
    component: Week1View
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
  // URL Hash(#錨點) 可藉由 #/切換至不同 # 位置，避免引發網頁重新讀取
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...adminRoutes],
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
export default router
