<template>
  <main>
    <section class="section section_cart_check">
      <div class="container my-5" style="min-height: 70vh">
        <!-- 判斷購物車是否有商品 -->
        <template v-if="cart.carts && cartNum > 0">
          <!-- 購物車時間軸 -->
          <CartTimeLine></CartTimeLine>

          <!-- 確認購物車及訂單總額(購物車列表改元件) -->
          <div class="cart_check">
            <div class="row">
              <div class="col-md-8 py-3">
                <div class="cart_list">
                  <h1 class="fs-3">確認購物車</h1>
                  <div
                    class="cart_item p-3 my-3 border rounded-4"
                    v-for="item in cart.carts"
                    :key="item.id"
                  >
                    <div class="row">
                      <div class="col-4">
                        <img
                          class="item_image rounded-4 w-100"
                          :src="item.product.imageUrl"
                          :alt="item.product.title"
                          style="height: 160px; object-fit: cover"
                        />
                      </div>
                      <div class="col-8 d-flex align-items-center justify-content-between">
                        <div class="fw-bold">
                          <div class="fs-4">{{ item.product.title }}</div>
                          <div class="fs-5 text-primary">
                            NT$ {{ item.product.price * item.qty }}
                          </div>
                        </div>

                        <div class="item_num">
                          <div class="w-100 d-flex">
                            <select
                              class="form-select rounded-start me-1"
                              v-model="item.qty"
                              @change="updataCart(item)"
                              :disabled="item.id === loadingItem"
                            >
                              <option :value="i" v-for="i in 20" :key="i + 123">{{ i }}</option>
                            </select>
                            <button
                              type="button"
                              class="btn bg-white"
                              @click="removeCartItem(item.id)"
                            >
                              <span class="material-symbols-outlined text-light"> delete </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <router-link to="/products" class="btn btn-outline-primary">
                    繼續選購
                  </router-link>
                </div>
              </div>

              <div class="col-md-4">
                <div class="order-count py-3">
                  <!-- 訂單總額 -->
                  <div class="card_total">
                    <h2 class="fs-3">訂單總額</h2>
                    <div class="my-3">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td colspan="2" class="text-end">
                              共計
                              <span class="text-primary fw-bold fs-5">{{ cartNum }}</span> 件商品
                            </td>
                          </tr>
                          <tr>
                            <td>商品金額</td>
                            <td class="text-end">$ {{ total }}</td>
                          </tr>
                          <tr>
                            <td>優惠折扣</td>
                            <td class="text-end">-$ {{ total - final_total }}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>訂單總額</td>
                            <td class="text-end fs-5 fw-bold text-primary">
                              NT$ {{ final_total }}
                            </td>
                          </tr>
                        </tfoot>
                      </table>

                      <form class="d-flex flex-column">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="已套用優惠券"
                          v-if="total !== final_total"
                          v-model="couponCode"
                          disabled
                        />
                        <input
                          type="text"
                          class="form-control"
                          placeholder="請輸入優惠碼"
                          v-else
                          v-model="couponCode"
                        />
                        <button
                          type="button"
                          class="btn btn-outline-primary text-nowrap mt-2 ms-auto"
                          @click="useCoupon"
                        >
                          套用優惠碼
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-3 d-flex mb-3">
            <RouterLink
              to="/form"
              type="button"
              class="btn btn-primary ms-auto"
              style="width: 6rem"
              >下一步</RouterLink
            >
          </div>
        </template>

        <div class="section section_cart_none" v-else>
          <div class="cart_none text-center py-5 fs-5 fw-bold">
            <p>購物車空空如也，快去選購吧！</p>
            <RouterLink to="/products" class="btn btn-outline-primary">前往購物</RouterLink>
          </div>
          <div class="product_swiper">
            <ProductSwiper></ProductSwiper>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import CartTimeLine from '../../components/front/CartTimeLine.vue'
import ProductSwiper from '../../components/front/ProductSwiper.vue'

export default {
  components: {
    RouterLink,
    ProductSwiper,
    CartTimeLine
  },
  mounted() {
    this.getCart()
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'removeCartItem', 'updataCart', 'useCoupon'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'loadingItem', 'couponCode', 'cartNum'])
  }
}
</script>