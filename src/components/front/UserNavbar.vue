<template>
  <header class="header position-fixed w-100 bg-primary shadow-sm" style="z-index: 100">
    <div class="container">
      <nav class="navbar navbar-expand-md py-3 d-flex">
        <div class="navbar-logo">
          <RouterLink to="/" class="navbar-logo">
            <img src="https://storage.googleapis.com/vue-course-api.appspot.com/ziyi/1679370005750.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Kps%2FNPZOKfdIxvuMiPh3WhmT%2BVvr7px9lmoWlyzghI3mgEEnh4lqBKOVhTzKBhXw1bKznqZl4Ueu5byKdbLuxoYgYxPKrMMwS8NKKkZA643klvFOvNNaUTowuz2%2BZvoOLcVt3upWgYG1WzehC4ttT8jRC8fxLXjSkXqxXraWd%2Blx7nmspvwek4nja8ldQA986M8VmUebx%2FL7EfJHzHVZH5ZT2CWM304vZaClAiKrcccwz0dWSUUsfbzm2YRDJz03nv94UQkGjV7NhCyclodkIWzPHvlIIhRi9Q%2FqmLUxMALaAZd6YEPfhNDCW1mH3rJlndGEtMdjMyngFDI7ZvnaNA%3D%3D"
            style="height: 4rem" alt="">
          </RouterLink>
        </div>

        <!-- mobile -->
        <div class="mobile d-flex d-md-none">
          <div class="navbar-button">
            <!-- mobile button cart -->
            <button class="border-0 bg-transparent position-relative" @click="toCart">
              <span
                class="badge text-primary bg-white rounded-pill position-absolute top-0 start-100 translate-middle"
                >{{ cartNum }}</span
              >
              <i class="bi bi-cart3 text-white fs-1"></i>
            </button>
            <!-- mobile button menu -->
            <button
              class="ms-2 border-0 bg-transparent"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="bi bi-list text-white fs-1"></i>
            </button>
          </div>
        </div>

        <!-- collapse -->
        <div class="collapse navbar-collapse d-md-flex justify-content-md-center" id="navbarText">
          <div class="d-flex justify-content-center text-center">
            <ul class="navbar-nav mb-md-0">
              <li class="nav-item mx-1">
                <RouterLink to="/" class="nav-link link-active">
                  <div>首頁</div>
                  <div class="mt-1" style="font-size: 0.8rem">Home</div>
                </RouterLink>
              </li>
              <li class="nav-item mx-1">
                <RouterLink to="/products" class="nav-link link-active">
                  <div>商品一覽</div>
                  <div class="mt-1" style="font-size: 0.8rem">Product</div>
                </RouterLink>
              </li>
              <li class="nav-item mx-1">
                <RouterLink to="/articles" class="nav-link link-active">
                  <div>最新消息</div>
                  <div class="mt-1" style="font-size: 0.8rem">Hot News</div>
                </RouterLink>
              </li>
              <li class="nav-item mx-1">
                <RouterLink to="/about" class="nav-link link-active">
                  <div>關於我們</div>
                  <div class="mt-1" style="font-size: 0.8rem">About</div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- PC -->
        <div class="pc d-none d-md-flex">
          <button class="border-0 bg-transparent position-relative" @click="toCart">
            <span
              class="badge bg-white text-primary rounded-pill position-absolute top-0 start-100 translate-middle"
              >{{ cartNum }}</span
            >
            <i class="bi bi-cart3 text-white fs-3"></i>
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
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  components: {
    RouterLink
  },
  mounted() {
    this.getCart()
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    toCart(){
      this.$router.push('/cart')
    },
  },
  computed: {
    ...mapState(cartStore, ['cartNum'])
  }
}
</script>