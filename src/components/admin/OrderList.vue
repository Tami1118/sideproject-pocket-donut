<template>
  <div class="admin_list">
    <div class="col-12 my-3">
      <div class="p-4 bg-white rounded-3 shadow-sm">
        <div class="border-bottom rounded-0 bg-transparent px-3">
          <div class="row">
            <div class="col-2 py-2">訂單日期</div>
            <div class="col-2 py-2">訂單編號</div>
            <div class="col-3 py-2">信箱</div>
            <div class="col-2 py-2">狀態</div>
            <div class="col-3 py-2"></div>
          </div>
        </div>

        <div class="admin_item_list rounded-2 px-3" v-for="item in orders" :key="item.id">
          <div class="row align-items-center">
            <div class="col-2 py-3">{{ item.create_at }}</div>
            <div class="col-2 py-3 word-hidden">{{ item.id }}</div>
            <div class="col-3 py-3 word-hidden">{{ item.user.email }}</div>
            <div class="col-2 py-3">
              <div v-if="item.is_paid" class="text-success fw-bold">已付款</div>
              <div v-else>未付款</div>
            </div>
            <div class="col-3 btn-group">
              <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', item)">
                <i class="bi bi-pencil-square text-primary"></i>
              </button>
              <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', item)">
                <i class="bi bi-trash3 text-light"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <PaginationView :pages="pagination" :get-list="getOrders"></PaginationView>

  <!-- OrderModal -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="orderModal"
    ref="orderModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單編號：{{ tempOrder.id }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg_gray p-4">
          <div class="bg-white p-4 rounded-5">
            <h4>訂購人資料</h4>
            <table class="table">
              <tbody v-if="tempOrder.user">
                <tr>
                  <td style="width: 100px">姓名</td>
                  <td>{{ tempOrder.user.name }}</td>
                </tr>
                <tr>
                  <td>信箱</td>
                  <td>{{ tempOrder.user.email }}</td>
                </tr>
                <tr>
                  <td>電話</td>
                  <td>{{ tempOrder.user.tel }}</td>
                </tr>
                <tr>
                  <td>地址</td>
                  <td>{{ tempOrder.user.tel }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white p-4 rounded-5 mt-4">
            <h4>訂單明細</h4>
            <table class="table">
              <tbody v-if="tempOrder">
                <tr>
                  <td style="width: 100px">訂單編號</td>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <td style="width: 100px">下單時間</td>
                  <td>{{ tempOrder.create_at }}</td>
                </tr>
                <tr>
                  <td style="width: 100px">消費金額</td>
                  <td>{{ tempOrder.total }}</td>
                </tr>
                <tr>
                  <td style="width: 100px">付款狀態</td>
                  <td>
                    <div v-if="tempOrder.is_paid" class="text-success">已付款</div>
                    <div v-else class="text-danger fw-bold">未付款</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white p-4 rounded-5 mt-4">
            <h4>購買品項</h4>
            <table class="table">
              <thead>
                <tr>
                  <th width="">品名</th>
                  <th width="">類別</th>
                  <th width="" class="text-end">數量</th>
                  <th width="" class="text-end">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tempOrder.products" :key="item.id" class="align-middle">
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.product.category }}</td>
                  <td class="text-end">{{ item.qty }}</td>
                  <td class="text-end">{{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary">更新付款資訊</button>
        </div>
      </div>
    </div>
  </div>

  <!-- delOrderModal -->

</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationView from '../PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'
import { Toast } from '@/mixins/swal'

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},

      modal: null,
      delModal: null
    }
  },
  components: {
    PaginationView
  },
  mounted() {
    this.getOrders()
    this.modal = new Modal(this.$refs.orderModal)
    // this.delModal = new Modal(this.$refs.)
  },
  methods: {
    // 取得訂單列表
    getOrders(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/?page="${pagination}"`
      this.$http
        .get(url)
        .then((res) => {
          console.log('訂單列表', res)
          const { orders, pagination } = res.data
          this.orders = orders
          this.pagination = pagination
        })
        .catch(() => {
          Toast.fire({
            title: '無法取得資料',
            icon: 'error'
          })
        })
    },

    // 開啟 modal
    openModal(status, item) {
      if (status === 'edit') {
        this.modalShow()
        this.tempOrder = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        this.delShow()
        this.tempOrder = JSON.parse(JSON.stringify(item))
      }
    },

    // 更新訂單
    updataOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .put(url, { data: this.tempOrder })
        .then((res) => {
          console.log('成功更新訂單', res)
          this.getOrders()
          this.modalHide()
          Toast.fire({
            icon: 'success',
            title: '成功更新訂單'
          })
        })
        .catch((err) => {
          console.log('更新訂單失敗', err)
          Toast.fire({
            icon: 'error',
            title: '請確認資料是否完整'
          })
        })
    },

    // 刪除單一訂單
    removeOrder(order) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除單一訂單', res)
          this.getOrders()
          this.delHide()
          Toast.fire({
            icon: 'success',
            title: '成功刪除訂單'
          })
        })
        .catch((err) => {
          console.log('刪除失敗', err)
          Toast.fire({
            icon: 'error',
            title: '刪除失敗'
          })
        })
    },

    // 開啟/關閉modal
    modalShow() {
      console.log('開啟modal')
      this.modal.show()
    },
    modalHide() {
      console.log('關閉modal')
      this.delModal.hide()
    },
    delShow() {
      console.log('開啟delModal')
      this.modal.show()
    },
    delHide() {
      console.log('關閉delModal')
      this.delModal.hide()
    }
  }
}
</script>