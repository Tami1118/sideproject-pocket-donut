<template>
  <div
    class="modal fade"
    id="deleteModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="deleteModal"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">確定要刪除？</h5>
        </div>
        <div class="modal-body">
          刪除後將無法復原，確定要刪除
          <span class="text-primary fw-bold">{{ coupon.title }}</span>？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="$emit('removeCoupon')">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['coupon'],
  data(){
    return {
      deleteCouponModal: ''
    }
  },
  mounted(){
    this.deleteCouponModal = new Modal(this.$refs.modal)
  }
}
</script>