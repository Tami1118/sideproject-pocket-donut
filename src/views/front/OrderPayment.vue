<template>
  <main style="min-height: 70vh">
    <section class="section section_payment">
      <div class="container my-5">
        <CartTimeLine :step="step"></CartTimeLine>

        <!-- 訂單資訊及聯絡人資訊 -->
        <div class="complete_order border rounded-4">
          <div class="row">
            <div class="col-12 col-md-5">
              <div class="order_info p-4">
                <h1 class="fs-3 mb-4">訂單資訊</h1>
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th width="60%" colspan="2">商品名稱</th>
                      <th width="20%" class="text-end">數量</th>
                      <th width="20%" class="text-end">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in order.products" :key="product.id">
                      <td width="30%" class="d-md-none">
                        <img
                          :src="product.product.imageUrl"
                          :alt="product.product.title"
                          class="w-100"
                          style="height: 4rem; object-fit: cover; border-radius: 10px"
                        />
                      </td>
                      <td>{{ product.product.title }}</td>
                      <td class="text-end">{{ product.qty }}</td>
                      <td class="text-end">{{ product.qty * product.product.price }}</td>
                    </tr>
                  </tbody>
                  <tfoot class="border-top">
                    <tr class="border-top text-primary fw-bold">
                      <td>付款金額</td>
                      <td colspan="3" class="text-end fs-5">NT$ {{ order.total }}</td>
                    </tr>
                    <tr>
                      <td class="text-primary fw-bold">請選擇付款方式</td>
                      <td colspan="3" class="ps-5">
                        <select class="form-select text-end">
                          <option selected>請選擇</option>
                          <option value="1">信用卡</option>
                          <option value="2">Line Pay</option>
                          <option value="3">銀行轉帳</option>
                        </select>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div class="col-12 col-md-7">
              <div class="person_info p-4">
                <h1 class="fs-3 mb-4">收件人資訊</h1>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td width="30%">取件人姓名</td>
                      <td width="70%">{{ user.name }}</td>
                    </tr>
                    <tr>
                      <td width="30%">取件人信箱</td>
                      <td width="70%">{{ user.email }}</td>
                    </tr>
                    <tr>
                      <td width="30%">取件人電話</td>
                      <td width="70%">{{ user.tel }}</td>
                    </tr>
                    <tr>
                      <td width="30%">取貨門市</td>
                      <td width="70%">{{ user.address }}</td>
                    </tr>
                    <tr>
                      <td width="30%">備註</td>
                      <td width="70%">{{ user.message }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button type="button" class="btn btn-primary" @click="orderPay">確認付款</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { mapActions, mapState } from 'pinia'
import orderStore from '../../stores/orderStore'
import CartTimeLine from '../../components/front/CartTimeLine.vue'

export default {
  data() {
    return {
      step: 3
    }
  },
  components: {
    CartTimeLine
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    orderPay() {
      const { orderId } = this.$route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${orderId}`
      console.log('確認付款', url)
      this.$http
        .post(url)
        .then((res) => {
          console.log('確認付款', res)
          this.$router.push(`/complete/${orderId}`)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions(orderStore, ['getOrders', 'getOrder'])
  },
  computed: {
    ...mapState(orderStore, ['order', 'products', 'user'])
  }
}
</script>