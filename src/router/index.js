import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/FontLayout.vue'),
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
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/ProductDetail.vue')
        },
        {
          path: 'news',
          component: () => import('../views/front/NewsView.vue')
        },
        {
          path: 'new/:id',
          component: () => import('../views/front/NewDetail.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'payment',
          component: () => import('../views/front/PaymentView.vue')
        },
        {
          path: 'complete',
          component: () => import('../views/front/CompleteView.vue')
        },
        {
          path: 'faq',
          component: () => import('../views/front/FaqView.vue')
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView.vue'),
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
          component: () => import('../views/admin/AdminCoupons.vue')
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
