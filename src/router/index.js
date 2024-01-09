import { createRouter, createWebHashHistory } from 'vue-router'
import Week1View from '../views/Week1View.vue'
import Week2LoginView from '../views/Week2LoginView.vue'
import Week2AdminView from '../views/Week2AdminView.vue'
import Swal from 'sweetalert2';
import { isUserLoggedIn } from '../../src/components/utils/utils'

// 建立 VueRouter 實體物件
const router = createRouter({
  // VueRouter 處理前端路由的方式
  // URL Hash(#錨點) 可藉由 #/切換至不同 # 位置，避免引發網頁重新讀取
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 指定路由和對應的元件
    {
      path: '/week1',
      // name 的值必須與 RouterLink 中一致
      name: 'week1',
      // 非動態載入：在初始化時，一併直接導入
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
      path: '/week2-admin',
      name: 'admin',
      component: Week2AdminView,
      // 添加 beforeEnter 钩子
      beforeEnter: (to, from, next) => {
        // 驗證是否有 token
        if (isUserLoggedIn()) {
          // 已登入，可進入後台
          Swal.fire({
            title: '這是後台商品頁面',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          next();
        } else {
          // 未登入，導向登入頁面
          Swal.fire({
            title: '請先登入',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          next({ name: 'login' });
        }
      }
    }
  ]
})

export default router
