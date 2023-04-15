<template>
  <main class="main main_order">
    <div class="container my-5" style="min-height: 70vh">
      <template v-if="cart.carts && cartNum > 0">
        <!-- 購物車時間軸 -->
        <section class="section section_time-line">
          <OrderTimeLine />
        </section>

        <div class="row">
          <div class="col-md-7 p-4">
            <section class="section section_cart_list">
              <!-- 確認購物車 -->
              <h1 class="fs-3 mb-3">確認購物車</h1>
              <CartList />
              <CartCount />
              <form class="row g-0">
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control w-100"
                    style="border-radius: 8px 0 0 8px"
                    v-model="couponCode"
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

          <!-- 取件人資訊 -->
          <div class="col-md-5 p-4 bg_gray rounded-4 h-100">
            <section class="section section_info">
              <h1 class="fs-3 mb-3">取件人資訊</h1>
              <CartForm />
            </section>
          </div>
        </div>
      </template>

      <!-- 購物車內沒有商品 -->
      <template v-else>
        <section class="text-center py-5 fs-5 fw-bold">
          <p>購物車空空如也，快去選購吧！</p>
          <RouterLink to="/products" class="btn btn-outline-primary">前往購物</RouterLink>
        </section>
        <section class="product_swiper">
          <ProductSwiper />
        </section>
      </template>
    </div>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import OrderTimeLine from '@/components/front/OrderTimeLine.vue'
import CartList from '@/components/front/CartList.vue'
import CartCount from '@/components/front/CartCount.vue'
import CartForm from '@/components/front/CartForm.vue'
import ProductSwiper from '@/components/front/ProductSwiper.vue'
import Toast from '@/mixins/toast.js'

export default {
  data() {
    return {
      step: 1,
      couponCode: 'pocket'
    }
  },
  components: {
    RouterLink,
    OrderTimeLine,
    CartList,
    CartCount,
    CartForm,
    ProductSwiper
  },
  mounted() {
    this.getCart()
  },
  methods: {
    // 使用優惠券
    useCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`
      this.$http.post(url, {
        data: {
          code: this.couponCode
        }
      })
        .then((res) => {
          console.log('已套用優惠券', res)
          Toast.fire({
            icon: 'success',
            title: res.data.data.message
          })
          this.couponCode = ''
          this.getCart()
        })
    },
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'cartNum'])
  }
}
</script>