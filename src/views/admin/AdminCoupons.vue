<template>
  <div class="text-primary fw-bold fs-5">優惠券管理 Coupons List</div>
  <coupon-list></coupon-list>
</template>

<script>
import CouponList from '../../components/admin/CouponList.vue'

export default {
  components: {
    CouponList
  }
}
</script>