<template>
  <footer class="footer bg-dark text-light fw-light">
    <!-- footer-navbar -->
    <div class="footer-info py-3 text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-2 d-flex justify-content-center justify-content-md-start py-2">
            <router-link to="/" class="navbar-logo">
              <!-- <div
                :style="{ 'backgroundImage': `url(${brandLogo})` }"
                class="navbar-logo"
                style="height: 4.5rem"
              ></div> -->
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/ziyi/1679370005750.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Kps%2FNPZOKfdIxvuMiPh3WhmT%2BVvr7px9lmoWlyzghI3mgEEnh4lqBKOVhTzKBhXw1bKznqZl4Ueu5byKdbLuxoYgYxPKrMMwS8NKKkZA643klvFOvNNaUTowuz2%2BZvoOLcVt3upWgYG1WzehC4ttT8jRC8fxLXjSkXqxXraWd%2Blx7nmspvwek4nja8ldQA986M8VmUebx%2FL7EfJHzHVZH5ZT2CWM304vZaClAiKrcccwz0dWSUUsfbzm2YRDJz03nv94UQkGjV7NhCyclodkIWzPHvlIIhRi9Q%2FqmLUxMALaAZd6YEPfhNDCW1mH3rJlndGEtMdjMyngFDI7ZvnaNA%3D%3D"
            style="height: 4rem" alt="">
            </router-link>
          </div>
          <div class="col-12 col-md-10 py-2">
            <ul class="nav justify-content-center justify-content-md-end">
              <li class="nav-item">
                <router-link to="/" class="nav-link link-active">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/products" class="nav-link link-active">商品一覽</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/articles" class="nav-link link-active">最新消息</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link link-active">關於我們</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/faq" class="nav-link link-active">常見問題</router-link>
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
.footer{
  z-index: 100;
}
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
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>