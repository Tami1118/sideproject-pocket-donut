import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/front/FontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'about',
          component: () => import('../views/front/AboutView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/UserProducts.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/UserProductDetail.vue')
        },
        {
          path: 'news',
          component: () => import('../views/front/UserNews.vue')
        },
        {
          path: 'new/:id',
          component: () => import('../views/front/UserNewDetail.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/UserCart.vue')
        },
        {
          path: 'payment',
          component: () => import('../views/front/UserPayment.vue')
        },
        {
          path: 'complete',
          component: () => import('../views/front/UserComplete.vue')
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../views/front/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: 'news',
          component: () => import('../views/admin/AdminNews.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupon.vue')
        },
        {
          path: 'images',
          component: () => import('../views/admin/AdminImage.vue')
        },
      ]
    }
  ]
})

export default router
