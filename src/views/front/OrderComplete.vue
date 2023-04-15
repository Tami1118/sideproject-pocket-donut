<template>
  <main>
    <div class="container my-5">
      <!-- 購物車時間軸 -->
      <OrderTimeLine :step="step" />

      <!-- 訂單成立 -->
      <div class="w-100 my-5 p-5">
        <div class="text-center">
          <h1 class="fs-3">訂單已成立！</h1>
          <p>我們將盡快為您準備餐點，請於預定時間到店取貨唷~</p>
          <RouterLink to="/" class="btn btn-primary me-2">回首頁</RouterLink>
          <RouterLink to="/products" class="btn btn-primary">繼續購物</RouterLink>
        </div>
      </div>

      <!-- 訂單資訊 -->
      <div class="row">
        <div class="col-md-6 p-4">
          <section class="section section_order_list">
            <h1 class="fs-3 mb-3">訂單資訊</h1>
            <div class="border py-3 px-4 rounded-4">
              <OrderInfo />
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
import OrderTimeLine from '@/components/front/OrderTimeLine.vue'
import OrderList from '@/components/front/OrderList.vue'
import OrderInfo from '@/components/front/OrderInfo.vue'

export default {
  data() {
    return {
      step: 3
    }
  },
  components: {
    OrderTimeLine,
    OrderList,
    OrderInfo
  }
}
</script>