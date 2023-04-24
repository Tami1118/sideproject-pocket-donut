<template>
  <div class="text-primary fw-bold fs-5">產品列表 Products List</div>
  <div class="container">
    <div class="row my-3">
      <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
        <table class="table table-borderless" style="table-layout: fixed; width: 100%">
          <thead>
            <tr class="text-align">
              <th width="15%">類別</th>
              <th width="25%">產品名稱</th>
              <th width="10%" class="text-end">原價</th>
              <th width="10%" class="text-end">售價</th>
              <th width="20%" class="text-center">狀態</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-align admin_item_list" v-for="product in products" :key="product.id">
              <td class="text_over_hidden">{{ product.category }}</td>
              <td class="text_over_hidden">{{ product.title }}</td>
              <td class="text_over_hidden text-end">{{ product.origin_price }}</td>
              <td class="text_over_hidden text-end">{{ product.price }}</td>
              <td class="text_over_hidden text-center">
                <div v-if="product.is_enabled" class="text-success">已啟用</div>
                <div v-else>未啟用</div>
              </td>
              <td class="text_over_hidden">
                <div class="col-3 btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary bg-white"
                    @click="openModal('edit', product)"
                  >
                    <i class="bi bi-pencil-square text-primary"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light bg-white"
                    @click="openModal('delete', product)"
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
    <!-- <PaginationView :pages="pagination" :get-list="getProducts"></PaginationView> -->
  </div>

  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create')">
    <i class="bi bi-plus-lg fs-1"></i>
  </button>

  <!-- ProductModal -->
  <div
    class="modal fade"
    id="productModal"
    ref="productModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <ProductModal
      :product="tempProduct"
      :is-new="isNew"
      @update-product="updateProduct"
      :reset="reset"
    />
  </div>

  <!-- deletetModal -->
  <div
    class="modal fade"
    id="deleteProductModal"
    ref="deleteProductModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <DeleteModal :type="type" :temp-item="tempProduct" :delete-item="deleteProduct" />
  </div>
</template>


<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import ProductModal from '@/components/admin/ProductModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'

export default {
  data() {
    return {
      type: '產品',
      products: [],
      paginaion: {},
      tempProduct: {},
      modal: '',
      deleteModal: '',
      isNew: false,
    }
  },
  components: {
    ProductModal,
    DeleteModal
  },
  mounted() {
    this.getProducts()
    this.modal = new Modal(this.$refs.productModal)
    this.deleteModal = new Modal(this.$refs.deleteProductModal)
  },
  methods: {
    // 取得產品列表
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('取得產品列表', res)
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch((err) => {
          console.log('產品列表取得失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 開啟 modal
    openModal(status, product) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: false // 預設
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.modal.show()
        this.tempProduct = JSON.parse(JSON.stringify(product))
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempProduct = JSON.parse(JSON.stringify(product))
      }
    },
    // 新增/更新產品
    updateProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let http = 'post'
      let message = '成功新增產品'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        http = 'put'
        message = '成功更新產品'
      }

      this.$http[http](url, { data: this.tempProduct })
        .then((res) => {
          console.log(message, res)
          this.getProducts()
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: `${message}產品成功`
          })
        })
        .catch((err) => {
          console.log('更新產品失敗', err)
          Alert.fire({
            title: '請再試一次',
            text: err.response.data.message
          })
        })
    },
    // 刪除單一產品
    deleteProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除單一產品', res)
          this.getProducts()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          console.log('刪除產品失敗', err)
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 重置
    reset() {
      this.tempProduct = ''
    }
  }
}
</script>