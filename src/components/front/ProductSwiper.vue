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
      <div class="card h-100 shadow-sm">
        <RouterLink :to="`/product/${product.id}`" class="text-decoration-none text-dark">
          <div class="card_img">
            <img
              :src="product.imageUrl"
              class="card-img-top"
              style="width: 100%; aspect-ratio: 1/1; object-fit: cover"
              :alt="product.title"
            />
          </div>
          <div class="card-body">
            <div class="badge bg-primary text-white rounded-pill">
              {{ product.category }}
            </div>
            <h3 class="my-2 fs-3 fw-bold">{{ product.title }}</h3>
            <div class="fw-bold text-primary d-flex align-items-end">
              <div class="fs-4">NT$ {{ product.price }} /</div>
              <small class="fs-5"> {{ product.unit }}</small>
            </div>
          </div>
        </RouterLink>
        <div class="card-footer bg-white pt-0">
          <button
            type="button"
            class="btn btn-primary rounded-4 w-100 text-nowrap fs-5 mb-2"
            @click="addToCart(product.id, qty)">
            <i class="bi bi-cart-plus-fill me-2"></i>
            加入購物車
          </button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
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
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import productStore from '@/stores/productStore'
import cartStore from '@/stores/cartStore'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  data() {
    return {
      modules: [Keyboard, Navigation, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    RouterLink
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
    ...mapActions(cartStore, ['addToCart'])
  },
  computed: {
    ...mapState(productStore, ['products']),
    ...mapState(cartStore, ['qty'])
  },
  
}
</script>