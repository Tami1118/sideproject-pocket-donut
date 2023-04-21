<template>
  <div class="container">
    <div class="admin_coupon_list">
      <div class="row my-3">
        <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
          <table class="table table-borderless">
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
                <td>{{ coupon.title }}</td>
                <td>{{ coupon.code }}</td>
                <td class="text-end">{{ coupon.percent }}</td>
                <td>{{ coupon.due_date }}</td>
                <td class="text-center">
                  <div v-if="coupon.is_enabled" class="text-success">已啟用</div>
                  <div v-else>未啟用</div>
                </td>
                <td>
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
    </div>
    <PaginationView :pages="pagination" :get-list="getCoupons"></PaginationView>
  </div>

  <!-- Modal -->
  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create', tempCoupon)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>
  
  <!-- couponModal -->
  <div class="modal fade" ref="couponModal" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true">
    <CouponModal :isNew="isNew" :coupon="tempCoupon" :updateCoupon="updateCoupon" />
  </div>

  <!-- deleteModal -->
  <div class="modal fade" ref="deleteCouponModal" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
    <DeleteCoupon :tempCoupon="tempCoupon" :deleteCoupon="deleteCoupon" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import Modal from 'bootstrap/js/dist/modal'
import { Toast, Alert } from '@/mixins/swal'
import CouponModal from '@/components/admin/CouponModal.vue'
import DeleteCoupon from '@/components/admin/DeleteCoupon.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},

      modal: '',
      deleteModal: '',

      isNew: false,
      due_date: ''
    }
  },
  components: {
    CouponModal,
    DeleteCoupon,
    PaginationView
  },
  mounted() {
    this.getCoupons()
    this.modal = new Modal(this.$refs.couponModal)
    this.deleteModal = new Modal(this.$refs.deleteCouponModal)
  },
  methods: {
    getCoupons(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('優惠券列表', res)
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

    openModal(status, coupon) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempCoupon = {
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

    updataCoupon() {
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
          console.log(res)
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
            title: err.response.data.message
          })
        })
    },

    deleteCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除優惠券', res)
          this.getCoupons()
          this.deleteModal.hide();
          Toast.fire({
            icon: 'success',
            title: '成功刪除優惠券'
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

    // 調整日期格式
    formattedDate(times) {
      const date = new Date(times * 1000)
      const year = date.getFullYear().toString().substring(4, 2)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return Number(`${year}${month}${day}`)
    },
  },
}
</script>