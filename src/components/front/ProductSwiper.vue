<template>
  <swiper
    data-aos="fade-up"
    :slidesPerView="1"
    :spaceBetween="10"
    :slidesPerGroup="1"
    :breakpoints="{
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      992: {
        slidesPerView: 3,
        slidesPerGroup: 3
      }
    }"
    :keyboard="{
      enabled: true
    }"
    :pagination="{
      clickable: true
    }"
    :navigation="true"
    :modules="modules"
    :loop="true"
    class="mySwiper"
  >
    <swiper-slide class="swiper_product pe-3" v-for="product in products" :key="product.id">
      <RouterLink :to="`/product/${product.id}`" class="text-decoration-none">
        <div class="item_card card">
          <!-- item_image -->
          <img class="item_image card-img-top" :src="product.imageUrl" :alt="product.title" />

          <div class="item_info p-4">
            <!-- item_category -->
            <div class="item_category">{{ product.category }}</div>

            <!-- item_intro -->
            <div class="item_intro my-3">
              <div class="item_title text-dark fs-3 fw-bold">{{ product.title }}</div>
              <div class="item_price">
                <span class="fw-bold fs-4"> NT$ {{ product.price }} </span>
                <span> / {{ product.unit }}</span>
              </div>
            </div>

            <!-- item_button -->
            <button type="button" class="item_button btn btn-primary btn-lg rounded-4 w-100">
              <span class="material-symbols-outlined"> add_shopping_cart </span>
              加入購物車
            </button>
          </div>
        </div>
      </RouterLink>
    </swiper-slide>
  </swiper>

  <div class="d-flex justify-content-center mt-4">
    <button type="button" class="section_button btn btn-outline-primary text-primary">
      查看更多商品
    </button>
  </div>
</template>

<style lang="scss">
.swiper {
  padding: 0 0 50px;
}
.swiper_product .item_card {
  box-shadow: 5px 5px 10px #00000015;
}
.swiper_product .item_category {
  display: inline;
  color: var(--primary);
  font-size: 0.3rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  background-color: var(--primary-light);
  border-radius: 1rem;
}
.swiper_product .item_image {
  height: 24rem;
  width: 100%;
  object-fit: cover;
}
.swiper-button-prev,
.swiper-button-next {
  display: flex;
  background-color: #fff;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50px;
}
.swiper-button-next {
  transform: translateX(-1rem);
}
.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 1.1rem;
  color: var(--primary);
}
.swiper-pagination-bullet {
  background: var(--primary);
}
.swiper-pagination-bullet-active {
  width: 1.2rem;
  border-radius: 4px;
  background: var(--primary);
}
</style>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard, Navigation, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  data() {
    return {
      products: [],
      modules: [Keyboard, Navigation, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    RouterLink
  },
  methods: {
    getProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products`
      this.$http.get(url).then((res) => {
        console.log('全部商品', res)
        this.products = res.data.products
      })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>