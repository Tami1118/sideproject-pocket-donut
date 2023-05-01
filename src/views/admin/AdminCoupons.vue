<template>
  <div class="text-primary fw-bold fs-5">優惠券管理 Coupons List</div>
  <div class="row my-3">
    <div class="col-12 p-4 bg-white rounded-4 shadow-sm">
      <table class="table table-borderless" style="table-layout: fixed">
        <thead class="fw-bold">
          <tr>
            <th width="20%" class="text-truncate">截止時間</th>
            <th width="25%" class="text-truncate">優惠名稱</th>
            <th width="10%" class="text-truncate">代碼</th>
            <th width="10%" class="text-truncate text-end">折扣</th>
            <th width="15%" class="text-truncate text-center">狀態</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody class="border-top border-bottom">
          <tr class="admin_item_list" v-for="coupon in coupons" :key="coupon.id">
            <td class="text-truncate">{{ $format.dateFormat(coupon.due_date) }}</td>
            <td class="text-truncate">{{ coupon.title }}</td>
            <td class="text-truncate">{{ coupon.code }}</td>
            <td class="text-end">{{ coupon.percent }}%</td>
            <td class="text-truncate text-center">
              <div v-if="coupon.is_enabled" class="text-success">已啟用</div>
              <div v-else>未啟用</div>
            </td>
            <td class="text-truncate">
              <div class="col-3 btn-group">
                <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', coupon)">
                  <i class="bi bi-pencil-square text-primary"></i>
                </button>
                <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', coupon)">
                  <i class="bi bi-trash3 text-light"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationView :pages="pagination" @get-list="getCoupons"></PaginationView>

  <button type="button" class="admin_btn_updata" @click="openModal('create', tempCoupon)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>

  <div class="modal fade" ref="couponModal" id="couponModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <CouponModal :coupon="tempCoupon" :isNew="isNew" @update-coupon="updateCoupon" />
  </div>

  <div class="modal fade" ref="deleteCouponModal" id="deleteCouponModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <DeleteModal :type="type" :temp-item="tempCoupon" :delete-item="deleteCoupon" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import CouponModal from '@/components/admin/CouponModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      type: '優惠券',
      coupons: [],
      pagination: {},
      currentPage: 1,
      tempCoupon: {},
      modal: '',
      deleteModal: '',
      isNew: false,
      due_date: ''
    }
  },
  components: {
    CouponModal,
    DeleteModal,
    PaginationView
  },
  mounted() {
    this.getCoupons()
    this.modal = new Modal(this.$refs.couponModal)
    this.deleteModal = new Modal(this.$refs.deleteCouponModal)
    document.title = 'Pocket Donut | 優惠券管理'
  },
  methods: {
    getCoupons(pagination = 1) {
      this.currentPage = pagination
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          const { coupons, pagination } = res.data
          this.coupons = coupons
          this.pagination = pagination
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    openModal(status, coupon) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
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

    updateCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      const urlId = this.isNew ? '':`/${this.tempCoupon.id}`
      const http = this.isNew ? 'post':'put'
      const message = this.isNew ? '新增':'更新'

      this.$http[http](`${url}${urlId}`, { data: this.tempCoupon })
        .then(() => {
          this.getCoupons(this.currentPage)
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: `成功${message}優惠券`
          })
        })
        .catch((err) => {
          Alert.fire({
            title: '請再試一次',
            text: err.response.data.message
          })
        })
    },

    deleteCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCoupons(this.currentPage)
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    }
  }
}
</script>