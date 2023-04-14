<template>
  <main>
    <div class="container my-5">
      <!-- 購物車時間軸 -->
      <CartTimeLine :step="step"></CartTimeLine>

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
import { mapActions, mapState } from 'pinia'
import orderStore from '../../stores/orderStore'
import CartTimeLine from '../../components/front/CartTimeLine.vue'

export default {
  data(){
    return {
      step: 4,
    }
  },
  components: {
    CartTimeLine
  },
  mounted(){
    this.getOrder()
  },
  methods: {
    ...mapActions(orderStore, ['getOrder'])
  },
  computed: {
    ...mapState(orderStore, ['order','products','user'])
  }
}
</script>