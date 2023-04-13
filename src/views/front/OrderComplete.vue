<template>
  <main>
    <div class="container my-5">
      <!-- 購物車時間軸 -->
      <CartTimeLine></CartTimeLine>

      <!-- 訂單成立資訊 -->
      <div class="complete_info mb-4" style="width: 100%">
        <div class="border rounded-4 p-4">
          <div class="card-header py-4 text-center">
            <h1 class="fs-4">訂單已成立！</h1>
            <p>我們將盡快為您準備餐點，請於預定時間到店取貨唷~</p>
            <RouterLink to="/" class="btn btn-primary me-2">回首頁</RouterLink>
            <RouterLink to="/products" class="btn btn-primary">繼續購物</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import CartTimeLine from '../../components/front/CartTimeLine.vue'

export default {
  data(){
    return {
      orderId: ''
    }
  },
  components: {
    CartTimeLine
  },
  mounted(){
    this.getOrderId()
  },
  methods: {
    getOrderId(){
      const {orderId} = this.$route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/order/${orderId}`
      this.$http.get(url)
        .then(res => {
          console.log('訂單成立頁面',res)
        })
    }
  }
}
</script>