<template>
  <div class="container">
    <div class="admin_product_list">
      <div class="row my-3">
        <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
          <table class="table">
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
              <tr class="text-align" v-for="product in products" :key="product.id">
                <td>{{ product.category }}</td>
                <td>{{ product.title }}</td>
                <td class="text-end">{{ product.origin_price }}</td>
                <td class="text-end">{{ product.price }}</td>
                <td class="text-center">
                  <div v-if="product.is_enable" class="text-success">已啟用</div>
                  <div v-else>未啟用</div>
                </td>
                <td>
                  <div class="col-3 btn-group">
                    <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', item)">
                      <i class="bi bi-pencil-square text-primary"></i>
                    </button>
                    <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', item)">
                      <i class="bi bi-trash3 text-light"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <PaginationView :pages="pagination" :get-list="getProducts"></PaginationView>
    </div>

    <!-- Add Product -->
    <button type="button" class="admin_btn_updata" @click="openModal('create')">
      <i class="bi bi-plus-lg fs-1"></i>
    </button>

    <!-- ProductModal -->
    <!-- <div
        class="modal fade"
        id="productModal"
        ref="productModal"
        tabindex="-1"
        aria-labelledby="productModal"
        aria-hidden="true"
      >
        <ProductModal :is-new="isNew" />
      </div> -->

    <!-- deletetModal -->
    <!-- <div
        class="modal fade"
        id="deleteModal"
        ref="deleteModal"
        tabindex="-1"
        aria-labelledby="delProductModal"
        aria-hidden="true"
      >
        <DeleteModal :temp-item="tempProduct" :remove-item="removeProduct" />
      </div> -->
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
// import ProductModal from '@/components/admin/ProductModal.vue'
// import DeleteModal from '@/components/admin/DeleteModal.vue'
import PaginationView from '../PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},

      // productModal: null,
      deleteModal: null,

      isNew: false
    }
  },
  components: {
    // ProductModal,
    // DeleteModal,
    PaginationView
  },
  mounted() {
    this.getProducts()
    // this.modal = new Modal(this.$refs.productModal)
    this.deleteModal = new Modal(this.$refs.deleteModal)
  },
  methods: {
    // 取得產品列表
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('產品管理列表', res)
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 開啟 modal
    openModal(status, item) {
      if (status === 'create') {
        this.isNew = true
        this.productModal.show()
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: false
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.productModal.show()
        this.tempProduct = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempProduct = JSON.parse(JSON.stringify(item))
      }
    },

    // 新增/更新產品
    updataProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let method = 'post'
      let message = '新增'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
        message = '更新'
      }

      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          console.log('成功更新產品', res)
          this.getProducts()
          this.openHide()
          Toast.fire({
            icon: 'success',
            title: `${message}產品成功`
          })
        })
        .catch((err) => {
          console.log('更新產品失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 刪除單一產品
    removeProduct(product) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${product.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除', res)
          this.getProducts()
          this.delHide()
          Toast.fire({
            icon: 'success',
            title: '成功移除產品'
          })
        })
        .catch((err) => {
          console.log('刪除失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    // 重置
    reset() {
      this.tempProduct = ''
    },

  }
}
</script>