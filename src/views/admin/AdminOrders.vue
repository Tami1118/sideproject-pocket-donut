<template>
  <div class="text-primary fw-bold fs-5">訂單列表 Orders List</div>
  <div class="container">
    <div class="d-flex" v-if="orders.length > 0">
      <button type="button" class="btn btn-primary ms-auto" @click="openModal('deleteAll', order)">
        刪除全部訂單
      </button>
    </div>
    <div class="row my-3">
      <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
        <table class="table table-borderless" style="table-layout: fixed; width: 100%">
          <thead class="border-bottom">
            <tr class="text-align">
              <th width="10%" class="text_over_hidden">取貨門市</th>
              <th width="20%" class="text_over_hidden">訂單日期</th>
              <th width="20%" class="text_over_hidden">訂單編號</th>
              <th width="20%" class="text_over_hidden">信箱</th>
              <th width="10%" class="text_over_hidden text-center">付款狀態</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-align admin_item_list" v-for="order in orders" :key="order.id">
              <td class="text_over_hidden">{{ order.user?.address }}</td>
              <td class="text_over_hidden">{{ order.create_at }}</td>
              <td class="text_over_hidden">{{ order.id }}</td>
              <td class="text_over_hidden">{{ order.user.email }}</td>
              <td class="text_over_hidden">
                <div v-if="order.is_paid" class="text-success fw-bold">已付款</div>
                <div v-else>未付款</div>
              </td>
              <td class="text_over_hidden">
                <div class="col-3 btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary bg-white"
                    @click="openModal('edit', order)"
                  >
                    <i class="bi bi-pencil-square text-primary"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light bg-white"
                    @click="openModal('delete', order)"
                  >
                    <i class="bi bi-trash3 text-light"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <PaginationView :pages="pagination" :get-list="getOrders"></PaginationView> -->
    </div>
  </div>

  <!-- orderModal -->
  <div
    class="modal fade"
    ref="orderModal"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <OrderModal :order="tempOrder" @update-order="updateOrder" />
  </div>

  <!-- deleteOrderModal -->
  <div
    class="modal fade"
    ref="deleteOrderModal"
    id="deleteOrderModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <DeleteModal
      :type="type"
      :temp-item="tempOrder"
      :delete-item="deleteOrder"
      :delete-all="deleteAllOrders"
    />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import OrderModal from '@/components/admin/OrderModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'

export default {
  data() {
    return {
      type: '訂單',
      orders: [],
      pagination: {},
      tempOrder: {},
      modal: '',
      deleteModal: ''
    }
  },
  components: {
    OrderModal,
    DeleteModal
  },
  mounted() {
    this.getOrders()
    this.modal = new Modal(this.$refs.orderModal)
    this.deleteModal = new Modal(this.$refs.deleteOrderModal)
  },
  methods: {
    // 取得訂單列表
    getOrders(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('取得訂單列表', res)
          const { orders, pagination } = res.data
          this.orders = orders
          this.pagination = pagination
        })
        .catch((err) => {
          console.log(err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 開啟 modal
    openModal(status, order) {
      if (status === 'edit') {
        this.modal.show()
        this.tempOrder = JSON.parse(JSON.stringify(order))
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempOrder = JSON.parse(JSON.stringify(order))
      } else if (status === 'deleteAll') {
        this.deleteModal.show()
        this.tempOrder = {}
      }
    },
    // 更新訂單
    updateOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .put(url, { data: this.tempOrder })
        .then((res) => {
          console.log('成功更新訂單', res)
          this.getOrders()
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          console.log('更新訂單失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 刪除單一訂單
    deleteOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除單一訂單', res)
          this.getOrders()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: `${res.data.message}編號${this.tempOrder.id}訂單`
          })
        })
        .catch((err) => {
          console.log('刪除單一訂單失敗', err)
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 刪除全部訂單
    deleteAllOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除全部訂單', res)
          this.getOrders()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.messagge
          })
        })
        .catch((err) => {
          console.log('刪除全部訂單失敗', err)
          this.deleteModal.hide()
          Alert.fire({
            title: '刪除失敗，請再試一次'
          })
        })
    }
  }
}
</script>