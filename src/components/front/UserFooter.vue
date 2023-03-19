<template>
  <footer class="footer bg-dark text-light fw-light">
    <!-- footer-navbar -->
    <div class="footer-info py-3 text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start py-2">
            <router-link to="/" class="navbar-logo">
              <!-- <div
                :style="{ 'backgroundImage': `url(${brandLogo})` }"
                class="navbar-logo"
                style="height: 4.5rem"
              ></div> -->
              <img src="@/assets/images/pocket donut_logo(w).png"
            style="height: 4rem" alt="">
            </router-link>
          </div>
          <div class="col-12 col-md-6 py-2">
            <ul class="nav justify-content-center justify-content-md-end">
              <li class="nav-item">
                <router-link to="/products" class="nav-link link-active">商品一覽</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/news" class="nav-link link-active">最新消息</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link link-active">關於我們</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- footer-right -->
    <div class="footer-right py-3 text-center">
      <div class="container">
        <div class="mb-2">
          資料、圖片僅作練習，無商業用途 |
          <router-link to="/login" class="link-light text-decoration-none">後台登入</router-link>
        </div>
        <div class="small">
          Copyright &copy; Pocket Donut All Rights Reserved. Designed by Chen Ziyi
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-right {
  border-top: 0.5px solid #68676c;
}

.link-active:focus {
  color: #fff;
  font-weight: 600;
}

.nav-item:hover .link-active {
  color: #fff;
  font-weight: 600;
}
</style>

<script>
// import brandLogo from '../../assets/images/pocket donut_logo(w).png'
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      // brandLogo:brandLogo,
    }
  },
  components: {
    RouterLink
  }
}
</script>