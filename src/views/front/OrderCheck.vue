<template>
  <main class="main main_order">
    <div class="container my-5" style="min-height: 70vh">
      <!-- 購物車內有商品 -->
      <template v-if="cart.carts && cartNum > 0">
        <!-- 購物車時間軸 -->
        <section class="section section_time-line">
          <CartTimeLine></CartTimeLine>
        </section>

        <div class="row">
          <!-- 確認購物車 -->
          <div class="col-md-8 py-3">
            <section class="section section_order_list">
              <h1 class="fs-3">確認購物車</h1>
              <CartList></CartList>
              <div class="text-center">
                <router-link to="/products" class="btn btn-outline-primary"> 繼續選購 </router-link>
              </div>
            </section>
          </div>

          <!-- 訂單總額 -->
          <div class="col-md-4 py-3">
            <section class="section section_order_count">
              <h2 class="fs-3">訂單總額</h2>
              <CartCount></CartCount>
              <!-- 優惠券 -->
              <div class="d-flex align-items-center mb-2">
                <span>
                  歡慶 Pocket Donut 滿週年，輸入代碼 <span class="text-success fw-bold">pocket</span> 即可享八折優惠
                  <button type="button" class="btn btn-sm btn-success ms-1" @click="copyCoupon">
                    複製
                  </button>
                </span>
              </div>
              <form class="row g-0">
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control w-100"
                    style="border-radius: 8px 0 0 8px"
                    :value="couponCode"
                    :placeholder="total !== final_total ? '已套用優惠碼' : '請輸入優惠碼'"
                    :disabled="total !== final_total"
                  />
                </div>
                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-outline-primary text-nowrap w-100"
                    style="border-radius: 0 8px 8px 0"
                    @click="useCoupon"
                    :disabled="total !== final_total"
                  >
                    套用優惠碼
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <div class="py-3 d-flex mb-3">
          <RouterLink to="/form" type="button" class="btn btn-primary ms-auto" style="width: 6rem"
            >下一步</RouterLink
          >
        </div>
      </template>

      <!-- 購物車內沒有商品 -->
      <template v-else>
        <section class="text-center py-5 fs-5 fw-bold">
          <p>購物車空空如也，快去選購吧！</p>
          <RouterLink to="/products" class="btn btn-outline-primary">前往購物</RouterLink>
        </section>
        <section class="product_swiper">
          <ProductSwiper></ProductSwiper>
        </section>
      </template>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import CartTimeLine from '../../components/front/CartTimeLine.vue'
import CartList from '../../components/front/CartList.vue'
import CartCount from '../../components/front/CartCount.vue'
import ProductSwiper from '../../components/front/ProductSwiper.vue'

export default {
  components: {
    RouterLink,
    ProductSwiper,
    CartList,
    CartCount,
    CartTimeLine
  },
  mounted() {
    this.getCart()
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'useCoupon', 'copyCoupon'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'cartNum', 'couponCode'])
  }
}
</script>