<template>
  <!--  待補
        購物車 offcanvas
        購物車 數量

        搜尋 input
  -->

  <header class="header position-fixed w-100 bg-primary" style="z-index: 1">
    <div class="container">
      <nav class="navbar navbar-expand-md py-3 d-flex">
        <div class="navbar-logo">
          <router-link to="/" class="navbar-logo">
            <div
              :style="{ 'backgroundImage': `url(${brandLogo})` }"
              class="navbar-logo"
              style="height: 4.5rem"
            ></div>
          </router-link>
        </div>

        <!-- mobile -->
        <div class="mobile d-flex d-md-none">
          <div class="navbar-button">
            <!-- mobile button cart -->
            <button type="button" class="border-0 bg-transparent position-relative">
              <span
                class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                >1</span
              >
              <span class="material-symbols-outlined fs-1">shopping_cart</span>
            </button>
            <!-- mobile button menu -->
            <button
              type="button"
              class="border-0 bg-transparent ms-3"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="material-symbols-outlined fs-1">menu</span>
            </button>
          </div>
        </div>

        <!-- collapse -->
        <div class="collapse navbar-collapse d-md-flex justify-content-md-center" id="navbarText">
          <div class="d-flex justify-content-center text-center">
            <ul class="navbar-nav mb-md-0">
              <li class="nav-item m-2">
                <router-link to="/products" class="nav-link link-active">
                  <div>商品一覽</div>
                  <div class="mt-2" style="font-size: 0.8rem">Product</div>
                </router-link>
              </li>
              <li class="nav-item m-2">
                <router-link to="/news" class="nav-link link-active">
                  <div>最新消息</div>
                  <div class="mt-2" style="font-size: 0.8rem">Hot News</div>
                </router-link>
              </li>
              <li class="nav-item m-2">
                <router-link to="/about" class="nav-link link-active">
                  <div>關於我們</div>
                  <div class="mt-2" style="font-size: 0.8rem">About</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- PC -->
        <div class="pc d-none d-md-flex">
          <button type="button" class="border-0 bg-transparent position-relative">
            <span
              class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
              >1</span
            >
            <span class="material-symbols-outlined fs-1">shopping_cart</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
img,
.material-symbols-outlined {
  vertical-align: middle;
}

.nav-item > a {
  color: #fff;
}

.material-symbols-outlined {
  color: #fff;
}
</style>

<script>
import brandLogo from '@/assets/images/pocket donut_logo(w).png'
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      brandLogo: brandLogo,
    }
  },
  components: {
    RouterLink
  }
}
</script>