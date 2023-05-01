<template>
  <div class="text-primary fw-bold fs-5">產品列表 Products List</div>
  <div class="row my-3">
    <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
      <table class="table table-borderless" style="table-layout: fixed; width: 100%">
        <thead class="fw-bold">
          <tr>
            <th width="15%" class="text-truncate">類別</th>
            <th width="30%" class="text-truncate">產品名稱</th>
            <th width="10%" class="text-truncate text-end">原價</th>
            <th width="10%" class="text-truncate text-end">售價</th>
            <th width="15%" class="text-truncate text-center">狀態</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody class="border-top border-bottom">
          <tr class="text-align admin_item_list" v-for="product in products" :key="product.id">
            <td class="text-truncate">{{ product.category }}</td>
            <td class="text-truncate">{{ product.title }}</td>
            <td class="text-end">{{ $format.priceFormat(product.origin_price) }}</td>
            <td class="text-end">{{ $format.priceFormat(product.price) }}</td>
            <td class="text-truncate text-center">
              <div v-if="product.is_enabled" class="text-success">已啟用</div>
              <div v-else>未啟用</div>
            </td>
            <td class="text-truncate">
              <div class="col-3 btn-group">
                <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', product)">
                  <i class="bi bi-pencil-square text-primary"></i>
                </button>
                <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', product)">
                  <i class="bi bi-trash3 text-light"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationView :pages="pagination" @get-list="getProducts"></PaginationView>

  <button type="button" class="admin_btn_updata" @click="openModal('create')">
    <i class="bi bi-plus-lg fs-1"></i>
  </button>

  <div class="modal fade" id="productModal" ref="productModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <ProductModal :product="tempProduct" :is-new="isNew" @update-product="updateProduct" />
  </div>

  <div class="modal fade" id="deleteProductModal" ref="deleteProductModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <DeleteModal :type="type" :temp-item="tempProduct" :delete-item="deleteProduct" />
  </div>
</template>


<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import ProductModal from '@/components/admin/ProductModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      type: '產品',
      products: [],
      pagination: {},
      currentPage: 1,
      tempProduct: {},
      modal: '',
      deleteModal: '',
      isNew: false
    }
  },
  components: {
    ProductModal,
    DeleteModal,
    PaginationView
  },
  mounted() {
    this.getProducts()
    this.modal = new Modal(this.$refs.productModal)
    this.deleteModal = new Modal(this.$refs.deleteProductModal)
    document.title = 'Pocket Donut | 產品管理'
  },
  methods: {
    getProducts(pagination = 1) {
      this.currentPage = pagination
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
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

    openModal(status, product) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempProduct = {
          category: '請選擇',
          unit: '請選擇',
          imagesUrl: [],
          is_enabled: 0
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

    updateProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      const urlId = this.isNew ? '' : `/${this.tempProduct.id}`
      const http = this.isNew ? 'post' : 'put'
      const message = this.isNew ? '新增' : '更新'

      if (this.tempProduct.category !== '請選擇' && this.tempProduct.unit !== '請選擇') {
        this.$http[http](`${url}${urlId}`, { data: this.tempProduct })
          .then(() => {
            this.getProducts(this.currentPage)
            this.modal.hide()
            Toast.fire({
              icon: 'success',
              title: `成功${message}「${this.tempProduct.title}」產品`
            })
          })
          .catch((err) => {
            Alert.fire({
              title: '請再試一次',
              text: err.response.data.message
            })
          })
      } else {
        Alert.fire({
          title: '請選擇產品類型及單位'
        })
      }
    },
    
    deleteProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getProducts(this.currentPage)
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
    },
  }
}
</script>