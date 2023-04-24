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
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label" for="code">折扣代碼</label>
                  <span class="text-danger"> *</span>
                  <VField
                    type="text"
                    id="code"
                    class="form-control"
                    placeholder="請輸入折扣代碼"
                    v-model="tempCoupon.code"
                    name="折扣代碼"
                    :class="{ 'is-invalid': errors['折扣代碼'] }"
                    rules="required"
                  >
                  </VField>
                  <ErrorMessage name="折扣代碼" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="title">優惠名稱</label>
                  <span class="text-danger"> *</span>
                  <VField
                    type="text"
                    id="title"
                    class="form-control"
                    placeholder="請輸入優惠名稱"
                    v-model="tempCoupon.title"
                    name="優惠名稱"
                    :class="{ 'is-invalid': errors['優惠名稱'] }"
                    rules="required"
                  ></VField>
                  <ErrorMessage name="優惠名稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="dueDate">到期日</label>
                  <span class="text-danger"> *</span>
                  <VField
                    type="date"
                    id="dueDate"
                    class="form-control"
                    name="到期日"
                    :class="{ 'is-invalid': errors['到期日'] }"
                    rules="required"
                    v-model="due_date"
                  ></VField>
                  <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="percent">折扣百分比</label>
                  <span class="text-danger"> *</span>
                  <VField
                    type="number"
                    id="percent"
                    class="form-control"
                    placeholder="請輸入折扣百分比"
                    v-model.number="tempCoupon.percent"
                    name="折扣百分比"
                    :class="{ 'is-invalid': errors['折扣百分比'] }"
                    rules="required"
                  ></VField>
                  <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
                </div>
                <hr />
                <div class="mb-3">
                  <label class="form-label" for="rule">折扣條件</label>
                  <input
                    type="text"
                    id="rule"
                    class="form-control"
                    v-model="tempCoupon.rule"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="num">數量</label>
                  <input
                    class="form-control"
                    id="num"
                    type="number"
                    v-model.number="tempCoupon.num"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="checkbox"
                    id="isEnabled"
                    class="form-check-input"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-label ms-2" for="isEnabled">是否啟用</label>
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
    }
  },
  watch: {
    // 時間格式 YYY-MM-DD
    coupon() {
      this.tempCoupon = this.coupon
      // toISOString為標準格式字符串; split字串按照T字符串分割
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
      .toISOString()
      .split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>
