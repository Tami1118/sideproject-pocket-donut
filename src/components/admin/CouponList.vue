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
                      @click="openModal('edit', item)"
                    >
                      <i class="bi bi-pencil-square text-primary"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-light bg-white"
                      @click="openModal('delete', item)"
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

  <!-- CouponModal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create')">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>
  <!-- <div
    class="modal fade"
    id="couponModal"
    ref="couponModal"
    tabindex="-1"
    aria-labelledby="couponModal"
    aria-hidden="true"
  ></div> -->

  <!-- deleteModal -->
  <!-- 包在子元件 -->
  <DeleteModal ref="deleteModal" :coupon="tempCoupon" @removeCoupon="removeCoupon" />
  
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationView from '../PaginationView.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'
// import Modal from 'bootstrap/js/dist/modal'
import { Toast, Alert } from '@/mixins/swal'

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: ''
      },
      pagination: {},

      // modal: null,
      // deleteModal: null,

      isNew: false,
      due_date: ''
    }
  },
  components: {
    DeleteModal,
    PaginationView
  },
  mounted() {
    this.getCoupons()
    // this.modal = new Modal(this.$refs.couponModal)
    // this.deleteModal = new Modal(this.$refs.deleteModal)
  },
  methods: {
    // 取得優惠券列表
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
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 開啟優惠券modal/deleteModal
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
        this.$refs.deleteModal.deleteCouponModal.show()
        this.tempCoupon = {...item}
        // this.tempCoupon = JSON.parse(JSON.stringify(item))
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
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 刪除單一優惠券
    removeCoupon(coupon) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${coupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('刪除優惠券', res)
          this.getCoupons()
          this.$refs.deleteModal.deleteCouponModal.hide();
          Toast.fire({
            icon: 'success',
            title: `成功移除優惠券`
          })
        })
        .catch((err) => {
          console.log('刪除失敗', err)
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

    // 開啟關閉
    // openShow() {
    //   console.log('開啟modal')
    //   this.modal.show()
    // },
    // openHide() {
    //   console.log('關閉modal')
    //   this.modal.hide()
    // },
    // delShow() {
    //   console.log('開啟deleteModal')
    //   this.deleteModal.show()
    // },
    // delHide() {
    //   console.log('關閉deleteModal')
    //   this.deleteModal.hide()
    // }
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