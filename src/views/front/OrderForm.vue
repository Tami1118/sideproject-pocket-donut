<template>
  <main>
    <section class="section section_check">
      <template v-if="cart.catrs || cartNum > 0">
        <div class="container my-5">
          <!-- 購物車時間軸 -->
          <CartTimeLine :step="step"></CartTimeLine>

          <!-- 訂單資訊及收件人資訊 -->
          <div class="order_check mb-4">
            <div class="row">
              <div class="col-12 col-md-5">
                <div class="order_content p-4">
                  <h1 class="fs-3 mb-4">訂單資訊</h1>
                  <table class="table table-borderless">
                    <thead>
                      <tr class="fw-bold">
                        <th width="50%">商品名稱</th>
                        <th width="25%" class="text-end">數量</th>
                        <th width="25%" class="text-end">小計</th>
                      </tr>
                    </thead>
                    <tbody class="border-top">
                      <tr v-for="item in cart.carts" :key="item.id">
                        <td>{{ item.product.title }}</td>
                        <td class="text-end">{{ item.qty }}</td>
                        <td class="text-end">{{ item.product.price * item.qty }}</td>
                      </tr>
                    </tbody>
                    <tfoot class="border-top">
                      <tr>
                        <td colspan="4" class="text-end">共計 {{ cartNum }} 件商品</td>
                      </tr>
                      <tr>
                        <td>商品金額</td>
                        <td colspan="2" class="text-end">{{ total }}</td>
                      </tr>
                      <tr>
                        <td>優惠折扣</td>
                        <td colspan="2" class="text-end">- {{ total - final_total }}</td>
                      </tr>
                      <tr class="border-top">
                        <td>訂單總額</td>
                        <td colspan="2" class="text-end text-primary fw-bold fs-4">
                          NT$ {{ final_total }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div class="col-12 col-md-7">
                <div class="order_form p-4 bg_gray rounded-4">
                  <h1 class="fs-3 mb-4">收件人資訊</h1>
                  <!-- <OrderFormList></OrderFormList> -->
                  <!-- <VForm v-slot="{ errors }" @submit="createOrder">
                    <div class="form_item">
                      <label for="orderName" class="form-label">
                        收件人姓名
                        <span class="text-danger">*</span>
                      </label>
                      <VField
                        type="text"
                        id="orderName"
                        placeholder="請輸入姓名"
                        class="form-control"
                        name="姓名"
                        :class="{ 'is-invalid': errors['姓名'] }"
                        rules="required"
                        v-model="data.user.name"
                      ></VField>
                      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="form_item mt-3">
                      <label for="orderEmail" class="form-label">
                        收件人信箱
                        <span class="text-danger">*</span>
                      </label>
                      <VField
                        type="email"
                        id="orderEmail"
                        placeholder="請輸入有效信箱"
                        class="form-control"
                        name="信箱"
                        :class="{ 'is-invalid': errors['信箱'] }"
                        rules="required|email"
                        v-model="data.user.email"
                      ></VField>
                      <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="form_item mt-3">
                      <label for="orderTel" class="form-label">
                        收件人電話
                        <span class="text-danger">*</span>
                      </label>
                      <VField
                        type="tel"
                        id="orderTel"
                        placeholder="請輸入手機號碼"
                        class="form-control"
                        name="手機號碼"
                        :class="{ 'is-invalid': errors['手機號碼'] }"
                        rules="required"
                        v-model="data.user.tel"
                      ></VField>
                      <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
                    </div>

                    <div class="form_item mt-3">
                      <label for="orderAddress" class="form-label">
                        收件人地址
                        <span class="text-danger">*</span>
                      </label>
                      <VField
                        type="text"
                        id="orderAddress"
                        placeholder="請輸入地址"
                        class="form-control"
                        name="地址"
                        :class="{ 'is-invalid': errors['地址'] }"
                        rules="required"
                        v-model="data.user.address"
                      ></VField>
                      <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                    </div>
                    <div class="form_item mt-3">
                      <label for="orderMessage" class="form-label">備註</label>
                      <textarea
                        id="orderMessage"
                        class="form-control"
                        name="message"
                        rows="5"
                        v-model="data.message"
                      ></textarea>
                    </div>

                    <div class="p-3 d-flex justify-content-between mt-3">
                      <RouterLink
                        to="/cart"
                        type="button"
                        class="btn btn-light text-white"
                        style="width: 6rem"
                      >
                        上一步
                      </RouterLink>
                      <button type="submit" class="btn btn-primary" style="width: 6rem">
                        下一步
                      </button>
                    </div>
                  </VForm> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
// import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
// import OrderFormList from '../../components/front/form/OrderFormList.vue'
import cartStore from '@/stores/cartStore'
import CartTimeLine from '../../components/front/CartTimeLine.vue'
import Toast from '@/mixins/toast.js'

export default {
  data() {
    return {
      step: 2,
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    // RouterLink,
    CartTimeLine,
    // OrderFormList
  },
  mounted() {
    this.getCart()
  },
  methods: {
    createOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/order`
      this.$http
        .post(url, { data: this.data })
        .then((res) => {
          console.log('成功新增訂單', res)
          this.$router.push(`/payment/${res.data.orderId}`)
        })
        .catch((res) => {
          console.log(res)
          Toast.fire({
            icon: 'error',
            title: '請確認格式是否填寫正確'
          })
        })
    },
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'cartNum']),
  }
}
</script>