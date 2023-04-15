<template>
  <main style="min-height: 70vh">
    <div class="container my-5">
      <OrderTimeLine :step="step" />

      <!-- 訂單資訊 -->
      <div class="row">
        <div class="col-md-6 p-4">
          <section class="section section_order_list">
            <h1 class="fs-3 mb-3">訂單資訊</h1>
            <div class="border py-3 px-4 rounded-4">
              <OrderInfo />
              <div class="text-center mt-4">
                <button type="button" class="btn btn-primary" @click="orderPay">確認付款</button>
              </div>
            </div>
          </section>
        </div>
        <div class="col-md-6 p-4">
          <section class="section section_order_list">
            <h1 class="fs-3 mb-3">訂單明細</h1>
            <div class="border py-3 px-4 rounded-4">
              <OrderList />
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import OrderTimeLine from '@/components/front/OrderTimeLine.vue'
import OrderList from '@/components/front/OrderList.vue'
import OrderInfo from '@/components/front/OrderInfo.vue'
import Toast from '@/mixins/toast.js'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  data() {
    return {
      step: 2
    }
  },
  components: {
    OrderTimeLine,
    OrderList,
    OrderInfo
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
          Toast.fire({
            icon: 'success',
            title: '付款成功'
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: '付款失敗，請再試一次',
            iconColor: '#be0e3d',
            confirmButtonColor: '#be0e3d'
          })
        })
    }
  }
}
</script>