<template>
  <div class="text-primary fw-bold fs-5">優惠券管理 Coupons List</div>
  <div class="container">
    <div class="row my-3">
      <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
        <table class="table table-borderless" style="table-layout: fixed; width: 100%">
          <thead class="border-bottom">
            <tr class="text-align">
              <th width="25%">標題</th>
              <th width="10%">代碼</th>
              <th width="10%" class="text-end">折扣</th>
              <th width="15%">到期日</th>
              <th width="20%" class="text-center">狀態</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-align admin_item_list" v-for="coupon in coupons" :key="coupon.id">
              <td class="text_over_hidden">{{ coupon.title }}</td>
              <td class="text_over_hidden">{{ coupon.code }}</td>
              <td class="text_over_hidden text-end">{{ coupon.percent }}</td>
              <td class="text_over_hidden">{{ formattedDate(coupon.due_date) }}</td>
              <td class="text_over_hidden text-center">
                <div v-if="coupon.is_enabled" class="text-success">已啟用</div>
                <div v-else>未啟用</div>
              </td>
              <td class="text_over_hidden">
                <div class="col-3 btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary bg-white"
                    @click="openModal('edit', coupon)"
                  >
                    <i class="bi bi-pencil-square text-primary"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light bg-white"
                    @click="openModal('delete', coupon)"
                  >
                    <i class="bi bi-trash3 text-light"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <PaginationView :pages="pagination" :get-list="getCoupons"></PaginationView> -->
  </div>

  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create', tempCoupon)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>

  <!-- couponModal -->
  <div
    class="modal fade"
    ref="couponModal"
    id="couponModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <CouponModal :coupon="tempCoupon" :isNew="isNew" @update-coupon="updateCoupon" />
  </div>

  <!-- deleteModal -->
  <div
    class="modal fade"
    ref="deleteCouponModal"
    id="deleteCouponModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <DeleteModal :type="type" :temp-item="tempCoupon" :delete-item="deleteCoupon" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import CouponModal from '@/components/admin/CouponModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'

export default {
  data() {
    return {
      type: '優惠券',
      coupons: [],
      pagination: {},
      tempCoupon: {},
      modal: '',
      deleteModal: '',
      isNew: false,
      due_date: '',
    }
  },
  components: {
    CouponModal,
    DeleteModal
  },
  mounted() {
    this.getCoupons()
    this.modal = new Modal(this.$refs.couponModal)
    this.deleteModal = new Modal(this.$refs.deleteCouponModal)
  },
  methods: {
    // 取得優惠券列表
    getCoupons(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('取得優惠券列表', res)
          const { coupons, pagination } = res.data
          this.coupons = coupons
          this.pagination = pagination
        })
        .catch((err) => {
          console.log('優惠券列表取得失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 開啟 modal
    openModal(status, coupon) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000, // 取得目前時間戳記
          is_enabled: 0 // 預設
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.modal.show()
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
      }
    },
    // 新增/更新優惠券
    updateCoupon() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      let http = 'post'
      let message = '成功新增優惠券'
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
        http = 'put'
        message = '成功更新優惠券'
      }
      this.$http[http](url, { data: this.tempCoupon })
        .then((res) => {
          console.log(message, res)
          this.getCoupons()
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: message
          })
        })
        .catch((err) => {
          console.log(err)
          Alert.fire({
            title: '請再試一次',
            text: err.response.data.message
          })
        })
    },
    // 刪除單一優惠券
    deleteCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除單一優惠券', res)
          this.getCoupons()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          console.log('刪除優惠券失敗', err)
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    formattedDate(time) {
      const localDate = new Date(time * 1000)
      return localDate.toLocaleDateString()
    }
  }
}
</script>