<template>
<!-- title, percent, due_date, code必填 -->
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          {{ isNew ? '新增優惠券' : '編輯優惠券' }}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <VForm v-slot="{ errors }">
          <div class="row">
            <!-- 是否啟用、標題、折扣、折扣代碼、折扣條件、開始日期、截止日期 -->
            <div class="col-12">
              <div class="modal_item">
                <label class="form-label" for="couponsCode">
                  折扣代碼 <span class="text-danger">*</span>
                </label>
                <VField
                  type="text"
                  class="form-control"
                  id="couponCode"
                  name="折扣代碼"
                  :class="{ 'is-invalid': errors['折扣代碼'] }"
                  placeholder="請輸入折扣代碼"
                  rules="required"
                  v-model="tempCoupon.code"
                >
                </VField>
                <ErrorMessage name="折扣代碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="modal_item">
                <label class="form-label" for="couponTitle">
                  優惠名稱 <span class="text-danger">*</span>
                </label>
                <VField
                  type="text"
                  class="form-control"
                  id="couponTitle"
                  name="優惠名稱"
                  :class="{ 'is-invalid': errors['優惠名稱'] }"
                  placeholder="請輸入優惠名稱"
                  rules="required"
                  v-model="tempCoupon.title"
                ></VField>
                <ErrorMessage name="優惠名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="modal_item">
                <label class="form-label" for="couponDate">
                  到期日 <span class="text-danger">*</span>
                </label>
                <VField
                  type="date"
                  class="form-control"
                  id="couponDate"
                  name="到期日"
                  :class="{ 'is-invalid': errors['到期日'] }"
                  rules="required"
                  v-model="due_date"
                ></VField>
                <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="modal_item">
                <label class="form-label" for="couponPercent">
                  折扣百分比 <span class="text-danger">*</span>
                </label>
                <VField
                  type="number"
                  class="form-control"
                  id="couponPercent"
                  name="折扣百分比"
                  :class="{ 'is-invalid': errors['折扣百分比'] }"
                  placeholder="請輸入折扣百分比"
                  rules="required"
                  v-model.number="tempCoupon.percent"
                ></VField>
                <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
              </div>
              <hr />
              <div class="modal_item">
                <label class="form-label" for="couponRule">折扣條件</label>
                <input class="form-control" id="couponRule" type="text" v-model="tempCoupon.rule" />
              </div>
              <div class="modal_item">
                <label class="form-label" for="couponNum">數量</label>
                <input
                  class="form-control"
                  id="couponNum"
                  type="number"
                  v-model.number="tempCoupon.num"
                />
              </div>
              <div class="modal_item">
                <input
                  class="form-check-input"
                  id="coupon"
                  type="checkbox"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-label ms-2" for="couponEnabled"> 是否啟用 </label>
              </div>
            </div>
          </div>
        </VForm>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" @click="updataCoupon">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isNew', 'tempItem'],
  data() {
    return {
      tempCoupon: {},
      couponModal
    }
  }
}
</script>
