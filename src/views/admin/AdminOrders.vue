<template>
  <div class="text-primary fw-bold fs-5">訂單列表 Orders List</div>
  <div class="text-end" v-if="orders.length > 0">
    <button type="button" class="btn btn-primary" @click="openModal('deleteAll', order)">刪除全部訂單</button>
  </div>
  <div class="row my-3">
    <div class="col-12 p-4 bg-white rounded-4 shadow-sm">
      <table class="table table-borderless" style="table-layout: fixed; width: 100%">
        <thead class="fw-bold">
          <tr>
            <th width="10%" class="text-truncate">取貨門市</th>
            <th width="10%" class="text-truncate">訂單日期</th>
            <th width="20%" class="text-truncate">訂單編號</th>
            <th width="20%" class="text-truncate">取件人 / 信箱</th>
            <th width="10%" class="text-truncate text-center">付款狀態</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody class="border-top border-bottom">
          <tr class="admin_item_list" v-for="order in orders" :key="order.id">
            <td class="text-truncate">{{ order.user.address }}</td>
            <td class="text-truncate">{{ $format.dateFormat(order.create_at) }}</td>
            <td class="text-truncate">{{ order.id }}</td>
            <td class="text-truncate">{{ order.user.name }} / {{ order.user.email }}</td>
            <td class="text-truncate text-center">
              <div v-if="order.is_paid" class="text-success fw-bold">已付款</div>
              <div v-else>未付款</div>
            </td>
            <td class="text-truncate">
              <div class="col-3 btn-group">
                <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', order)">
                  <i class="bi bi-pencil-square text-primary"></i>
                </button>
                <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', order)">
                  <i class="bi bi-trash3 text-light"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationView :pages="pagination" @get-list="getOrders"></PaginationView>

  <div class="modal fade" ref="orderModal" id="orderModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <OrderModal :order="tempOrder" @update-order="updateOrder" />
  </div>

  <div class="modal fade" ref="deleteOrderModal" id="deleteOrderModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <DeleteModal :type="type" :temp-item="tempOrder" :delete-item="deleteOrder" :delete-all="deleteAllOrders" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import OrderModal from '@/components/admin/OrderModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      type: '訂單',
      orders: [],
      pagination: {},
      currentPage: 1,
      tempOrder: {},
      modal: '',
      deleteModal: ''
    }
  },
  components: {
    OrderModal,
    DeleteModal,
    PaginationView
  },
  mounted() {
    this.getOrders()
    this.modal = new Modal(this.$refs.orderModal)
    this.deleteModal = new Modal(this.$refs.deleteOrderModal)
    document.title = 'Pocket Donut | 訂單管理'
  },
  methods: {
    getOrders(pagination = 1) {
      this.currentPage = pagination
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          const { orders, pagination } = res.data
          this.orders = orders
          this.pagination = pagination
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

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

    updateOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .put(url, { data: this.tempOrder })
        .then((res) => {
          this.getOrders(this.currentPage)
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    deleteOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getOrders(this.currentPage)
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: `${res.data.message}編號${this.tempOrder.id}訂單`
          })
        })
        .catch((err) => {
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    deleteAllOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`
      this.$http
        .delete(url)
        .then((res) => {
          this.getOrders()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.messagge
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