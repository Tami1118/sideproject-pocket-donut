<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="articleModalLabel">{{ isNew ? '新增優惠券' : '編輯優惠券' }}</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <VForm v-slot="{ errors }">
            <div class="row">
              <div class="col mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="couponIsEnabled" v-model="tempCoupon.is_enabled" :check="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-lebel" for="couponIsEnabled">{{tempCoupon.is_enabled? '已啟用':'未啟用'}}</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label" for="couponTitle">優惠名稱</label>
                  <span class="text-danger"> *</span>
                  <VField type="text" id="couponTitle" class="form-control" placeholder="請輸入優惠名稱" name="優惠名稱" :class="{ 'is-invalid': errors['優惠名稱'] }" rules="required" v-model="tempCoupon.title" />
                  <ErrorMessage name="優惠名稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="couponCode">折扣代碼</label>
                  <span class="text-danger"> *</span>
                  <VField type="text" id="couponCode" class="form-control" placeholder="請輸入折扣代碼" name="折扣代碼" :class="{ 'is-invalid': errors['折扣代碼'] }" rules="required" v-model="tempCoupon.code" />
                  <ErrorMessage name="折扣代碼" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="couponDueDate">到期日</label>
                  <span class="text-danger"> *</span>
                  <VField type="date" :min="today" id="couponDueDate" class="form-control" name="到期日" :class="{ 'is-invalid': errors['到期日'] }" rules="required" v-model="due_date" />
                  <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="couponPercent">折扣百分比</label>
                  <span class="text-danger"> *</span>
                  <VField type="number" min="0" max="100" id="couponPercent" class="form-control" placeholder="請輸入折扣百分比" name="折扣百分比" :class="{ 'is-invalid': errors['折扣百分比'] }" :rules="{ required: true, between: [0, 100] }" v-model.number="tempCoupon.percent" />
                  <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
                </div>
                <hr />
                <div class="mb-3">
                  <label class="form-label" for="couponRule">折扣條件</label>
                  <input type="text" id="couponRule" class="form-control" v-model="tempCoupon.rule" />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="couponNum">數量</label>
                  <input type="number" id="couponNum" class="form-control" v-model.number="tempCoupon.num" />
                </div>
              </div>
            </div>
          </VForm>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" @click="$emit('update-coupon', updateCoupon)" class="btn btn-primary">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['coupon', 'isNew'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      today: ''
    }
  },
  mounted() {
    ;[this.today] = new Date().toISOString().split('T')
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon
      ;[this.due_date] = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
