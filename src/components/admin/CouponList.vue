<template>
  <!-- sortBy -->
  <div class="admin_sortby">
    <div class="col-3 ms-auto">
      <div class="flex-xy-center mt-3">
        <select class="form-select" aria-label="News Range">
          <option selected>排序</option>
          <option value="new">最新優惠</option>
          <option value="old">到期日</option>
        </select>
      </div>
    </div>
  </div>

  <!-- list -->
  <div class="admin_list">
    <div class="col-12 my-3">
      <div class="p-4 bg-white rounded-3 shadow-sm">
        <div class="border-bottom rounded-0 bg-transparent px-3">
          <div class="row">
            <div class="col-3 py-2">標題</div>
            <div class="col-2 py-2">折扣</div>
            <div class="col-2 py-2">到期日</div>
            <div class="col-2 py-2 text-end">狀態</div>
            <div class="col-3 py-2"></div>
          </div>
        </div>

        <div class="admin_item_list rounded-2 px-3" v-for="item in coupons" :key="item.id">
          <div class="row align-items-center">
            <div class="col-3 py-2">{{ item.title }}</div>
            <div class="col-2 py-2">{{ item.percent }}</div>
            <div class="col-2 py-2">{{ formattedDate(item.due_date) }}</div>
            <div class="col-2 py-2 text-end">
              <div v-if="item.is_enabled" class="text-primary fw-bold">已啟用</div>
              <div v-else>隱藏</div>
            </div>
            <div class="col-3 py-2">
              <div class="col-3 btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary bg-white"
                  @click="openModal('edit', item)"
                >
                  <span class="material-symbols-outlined text-primary">edit</span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-light bg-white"
                  @click="openModal('delete', item)"
                >
                  <span class="material-symbols-outlined text-light">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <PaginationViewVue :pages="pagination" :get-list="getCoupons"></PaginationViewVue>

    <!-- CouponModal -->
    <!-- Button trigger modal -->
    <button type="button" class="admin_btn_updata" @click="openModal('create')">
      <span class="material-symbols-outlined fs-1"> add </span>
    </button>

    <!-- Modal -->
    <!-- title, percent, due_date, code必填 -->
    <div
      class="modal fade"
      id="couponModal"
      ref="couponModal"
      tabindex="-1"
      aria-labelledby="couponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModal">
              {{ isNew ? '新增優惠券' : '編輯優惠券' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <VForm v-slot="{ errors }">
              <div class="row">
                <!-- 是否啟用、標題、折扣、折扣代碼、折扣條件、開始日期、截止日期 -->
                <div class="col-12">
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsCode">
                      折扣代碼 <span class="text-danger">*</span>
                    </label>
                    <VField
                      type="text"
                      class="form-control"
                      id="couponsCode"
                      name="折扣代碼"
                      :class="{ 'is-invalid': errors['折扣代碼'] }"
                      placeholder="請輸入折扣代碼"
                      rules="required"
                      v-model="tempCoupon.code"
                    >
                    </VField>
                    <ErrorMessage name="折扣代碼" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsTitle">
                      優惠名稱 <span class="text-danger">*</span>
                    </label>
                    <VField
                      type="text"
                      class="form-control"
                      id="couponsTitle"
                      name="優惠名稱"
                      :class="{ 'is-invalid': errors['優惠名稱'] }"
                      placeholder="請輸入優惠名稱"
                      rules="required"
                      v-model="tempCoupon.title"
                    ></VField>
                    <ErrorMessage name="優惠名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsDate">
                      到期日 <span class="text-danger">*</span>
                    </label>
                    <VField
                      type="date"
                      class="form-control"
                      id="couponsDate"
                      name="到期日"
                      :class="{ 'is-invalid': errors['到期日'] }"
                      rules="required"
                      v-model="due_date"
                    ></VField>
                    <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsPercent">
                      折扣百分比 <span class="text-danger">*</span>
                    </label>
                    <VField
                      type="number"
                      class="form-control"
                      id="couponsPercent"
                      name="折扣百分比"
                      :class="{ 'is-invalid': errors['折扣百分比'] }"
                      placeholder="請輸入折扣百分比"
                      rules="required"
                      v-model.number="tempCoupon.percent"
                    ></VField>
                    <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <hr />
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsRule">折扣條件</label>
                    <input
                      class="form-control"
                      id="couponsRule"
                      type="text"
                      v-model="tempCoupon.rule"
                    />
                  </div>
                  <div class="modal-item mb-3">
                    <label class="form-label" for="couponsNum">數量</label>
                    <input
                      class="form-control"
                      id="couponsNum"
                      type="number"
                      v-model.number="tempCoupon.num"
                    />
                  </div>
                  <div class="modal-item mb-3">
                    <input
                      class="form-check-input"
                      id="coupons"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-label ms-2" for="coupons"> 是否啟用 </label>
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
    </div>

    <!-- delCouponModal -->
    <div
      class="modal fade"
      id="delCouponModal"
      ref="delCouponModal"
      tabindex="-1"
      aria-labelledby="delCouponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="delCouponModal">確定要刪除？</h5>
          </div>
          <div class="modal-body">
            刪除後的優惠券無法復原，確定要刪除
            <span class="text-primary fw-bold">{{ tempCoupon.title }}</span
            >？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="removeCoupon(tempCoupon)">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationViewVue from '../PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'
import Toast from '@/mixins/toast.js'

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},

      modal: null,
      delModal: null,

      isNew: false,
      due_date: ''
    }
  },
  components: {
    PaginationViewVue
  },
  mounted() {
    this.getCoupons()
    this.modal = new Modal(this.$refs.couponModal)
    this.delModal = new Modal(this.$refs.delCouponModal)
  },
  methods: {
    // 取得優惠券列表
    getCoupons(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons/?page=${pagination}`
      this.$http.get(url).then((res) => {
        console.log('優惠券列表', res)
        const { coupons, pagination } = res.data
        this.coupons = coupons
        this.pagination = pagination
      })
    },

    // 開啟優惠券modal/delModal
    openModal(status, item) {
      if (status === 'create') {
        this.isNew = true
        this.openShow()
        this.tempCoupon = {
          is_enabled: 0
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.openShow()
        this.tempCoupon = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        this.delShow()
        this.tempCoupon = JSON.parse(JSON.stringify(item))
      }
    },

    // 新增/編輯優惠券
    updataCoupon() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      let method = 'post'
      let message = '新增'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
        method = 'put'
        message = '更新'
      }

      this.$http[method](url, { data: this.tempCoupon })
        .then((res) => {
          console.log(res)
          this.getCoupons()
          this.openHide()
          Toast.fire({
            icon: 'success',
            title: `成功${message}優惠券`
          })
        })
        .catch((err) => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: `請確認資料是否完整`
          })
        })
    },

    // 移除優惠券
    removeCoupon(coupon) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${coupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('刪除優惠券', res)
          this.getCoupons()
          this.delHide()
          Toast.fire({
            icon: 'success',
            title: `成功移除優惠券`
          })
        })
        .catch((err) => {
          console.log('刪除失敗', err)
          Toast.fire({
            icon: 'error',
            title: `刪除失敗`
          })
        })
    },

    // 調整日期格式
    formattedDate(times) {
      const date = new Date(times * 1000)
      const year = date.getFullYear().toString().substring(4, 2)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return Number(`${year}${month}${day}`)
    },

    // 開啟關閉
    openShow() {
      console.log('開啟modal')
      this.modal.show()
    },
    openHide() {
      console.log('關閉modal')
      this.modal.hide()
    },
    delShow() {
      console.log('開啟delModal')
      this.delModal.show()
    },
    delHide() {
      console.log('關閉delModal')
      this.delModal.hide()
    }
  },
  watch: {
    // 時間格式 YYY-MM-DD
    coupon() {
      this.tempCoupon = this.coupon
      // toISOString為標準格式字符串; split字串按照T字符串分割
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T')
      ;[this.due_date] = dateAndTime
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  }
}
</script>