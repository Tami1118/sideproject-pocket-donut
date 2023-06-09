import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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
        path: 'articles',
        component: () => import('../views/front/ArticlesView.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/front/ArticleDetail.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartCheck.vue')
      },
      {
        path: 'payment/:orderId',
        component: () => import('../views/front/OrderPayment.vue')
      },
      {
        path: 'complete/:orderId',
        component: () => import('../views/front/OrderComplete.vue')
      },
      {
        path: 'faq',
        component: () => import('../views/front/FaqView.vue')
      },
      {
        path: 'test',
        component: () => import('../views/front/TestView.vue')
      }
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
        path: 'articles',
        component: () => import('../views/admin/AdminArticles.vue')
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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // linkActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
