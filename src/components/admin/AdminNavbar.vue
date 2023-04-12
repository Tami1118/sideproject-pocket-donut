<template>
  <header class="header position-fixed w-100 bg-white shadow-sm" style="z-index: 1">
    <div class="container">
      <nav class="navbar navbar-expand-lg py-3 d-flex">
        <div class="navbar-logo">
          <router-link to="/admin" class="navbar-logo">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/ziyi/1679379672763.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mgVnhBJyCU%2FxiMRP44hcgOwDpb9p9cE3%2Fxw3gnfRCMUjNJJcY%2FO1X%2F5zs4UNzusSS3MKbsTcxp6N64bN5VB9JsVnTfTmEdJLkUlJUY3zVWTPKA6NThrOKFmmYoL2cDNGoJaPoygtV7Ogh5t2YwKEqu%2Bg%2BeVwAzQwX2PQ2jDTgnlHsRF6VBAgjmqjdoe6xrXLh%2BtFwTNc%2FBb868nF3UyfUMsdQcR8djhnCXJ3DsBojLkJP%2BUl1wpKJ4f6kXTWFjcxccpiTL6wEFFLjnszNz27IVQbecAGaL6cjd7%2B9YESu%2FqsaE1UMUNjo7GuFAsyZldEHX0MBnx58oBxRtCaoeQ%2BfQ%3D%3D"
              style="height: 4rem"
              alt=""
            />
          </router-link>
        </div>

        <!-- mobile -->
        <div class="mobile d-flex d-lg-none">
          <div class="navbar-button">
            <!-- mobile button cart -->
            <button
              type="button"
              class="navbar_button_cart border-0 bg-transparent position-relative"
              @click="logout"
            >
              <span class="material-symbols-outlined fs-1 text-primary"> account_circle </span>
            </button>
            <!-- mobile button menu -->
            <button
              type="button"
              class="navbar_button_menu border-0 bg-transparent ms-3"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="material-symbols-outlined fs-1 text-primary">menu</span>
            </button>
          </div>
        </div>

        <!-- collapse -->
        <div class="collapse navbar-collapse d-lg-flex justify-content-lg-center" id="navbarText">
          <div class="d-flex justify-content-center text-center">
            <ul class="navbar-nav mb-lg-0">
              <li class="nav-item mx-1">
                <router-link to="/admin/products" class="nav-link link-active text-primary">
                  <div>產品管理</div>
                  <div class="mt-1" style="font-size: 0.8rem">Products</div>
                </router-link>
              </li>
              <li class="nav-item mx-1">
                <router-link to="/admin/orders" class="nav-link link-active text-primary">
                  <div>訂單管理</div>
                  <div class="mt-1" style="font-size: 0.8rem">Orders</div>
                </router-link>
              </li>
              <li class="nav-item mx-1">
                <router-link to="/admin/news" class="nav-link link-active text-primary">
                  <div>消息管理</div>
                  <div class="mt-1" style="font-size: 0.8rem">News</div>
                </router-link>
              </li>
              <li class="nav-item mx-1">
                <router-link to="/admin/coupons" class="nav-link link-active text-primary">
                  <div>優惠券管理</div>
                  <div class="mt-1" style="font-size: 0.8rem">Coupons</div>
                </router-link>
              </li>
              <li class="nav-item mx-1">
                <router-link to="/admin/images" class="nav-link link-active text-primary">
                  <div>圖片管理</div>
                  <div class="mt-1" style="font-size: 0.8rem">Images</div>
                </router-link>
              </li>
              <li class="nav-item mx-1">
                <router-link to="/" class="nav-link link-active text-primary">
                  <div>前台首頁</div>
                  <div class="mt-1" style="font-size: 0.8rem">Front</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- PC -->
        <div class="pc d-none d-lg-flex rounded-5 p-1" style="background-color: #fbecec">
          <button type="button" class="border-0 bg-transparent position-relative" @click="logout">
            <span class="material-symbols-outlined fs-1 text-primary"> account_circle </span>
            <span class="text-primary fw-bold ms-1 pe-2">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
// 補:按下連結後自動收縮

import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  methods: {
    logout() {
      document.cookie = `hexToken=;expires=${new Date()}`
      this.$router.push('/login')
    }
  }
}
</script>