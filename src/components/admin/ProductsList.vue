<template>
  <!-- SortBy -->
  <div class="admin_sortby">
    <div class="col-3 ms-auto">
      <div class="flex-xy-center mt-3">
        <select class="form-select" aria-label="Products Range">
          <option selected>排序</option>
          <option value="new">最新產品</option>
          <option value="old">最舊產品</option>
          <option value="reduce">售價高至低</option>
          <option value="pluse">售價低至高</option>
        </select>
      </div>
    </div>
  </div>

  <!-- List -->
  <div class="admin_list">
    <div class="col-12 my-3">
      <div class="p-4 bg-white rounded-3 shadow-sm">
        <div class="border-bottom rounded-0 bg-transparent px-3">
          <div class="row">
            <div class="col-2 py-2">類別</div>
            <div class="col-3 py-2">產品名稱</div>
            <div class="col-1 py-2 text-end text-nowrap">原價</div>
            <div class="col-1 py-2 text-end text-nowrap">售價</div>
            <div class="col-2 py-2 text-center">狀態</div>
            <div class="col-3 py-2"></div>
          </div>
        </div>

        <div class="admin_item_list rounded-2 px-3" v-for="item in products" :key="item.id">
          <div class="row align-items-center">
            <div class="col-2 py-3">{{ item.category }}</div>
            <div class="col-3 py-3 word-hidden">{{ item.title }}</div>
            <div class="col-1 py-3 text-end">{{ item.origin_price }}</div>
            <div class="col-1 py-3 text-end">{{ item.price }}</div>
            <div class="col-2 py-3 flex-x-center">
              <div v-if="item.is_enabled" class="text-primary fw-bold">已啟用</div>
              <div v-else>隱藏</div>
            </div>
            <div class="col-3 btn-group">
              <button type="button" class="btn btn-outline-primary bg-white">
                <span
                  class="material-symbols-outlined text-primary"
                  @click="openModal('edit', item)"
                >
                  edit
                </span>
              </button>
              <button type="button" class="btn btn-outline-light bg-white">
                <span
                  class="material-symbols-outlined text-light"
                  @click="openModal('delete', item)"
                >
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Pagination -->
  <PaginationView :pages="pagination" :get-list="getProducts"></PaginationView>

  <!-- ProductModal -->
  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create')">
    <span class="material-symbols-outlined fs-1"> add </span>
  </button>

  <!-- Modal -->
  <!-- title, category, unit, price, origin_price必填 -->
  <div
    class="modal fade"
    id="productModal"
    ref="productModal"
    tabindex="-1"
    aria-labelledby="productModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isNew ? '新增產品' : '編輯產品' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <VForm v-slot="{ errors }">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="main-image mt-2">
                  <div class="modal_item">
                    <label for="item-imageUrl">產品圖片</label>
                    <input
                      type="text"
                      class="form-control"
                      id="item-imageUrl"
                      v-model="tempProduct.imageUrl"
                    />
                  </div>
                  <img :src="tempProduct.imageUrl" alt="" class="img-fluid" />
                </div>

                <div class="more-images">
                  <div class="modal_item">
                    <label for="item-imagesUrl">多圖設置</label>
                    <input type="text" class="form-control" id="item-imagesUrl" />
                  </div>
                </div>
                <img src="" alt="" class="img-fuild" />

                <div class="images-button">
                  <button type="button" class="btn btn-outline-primary">刪除圖片</button>
                  <button type="button" class="btn btn-outline-primary">新增圖片</button>
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div class="row my-2">
                  <div class="col">
                    <div class="modal_item">
                      <label for="productTitle">產品名稱 <span class="text-danger">*</span></label>
                      <VField
                        type="text"
                        class="form-control"
                        id="productTitle"
                        name="產品名稱"
                        :class="{ 'is-invalid': errors['產品名稱'] }"
                        placeholder="請輸入產品名稱"
                        rules="required"
                        v-model="tempProduct.title"
                      ></VField>
                      <ErrorMessage name="產品名稱" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="modal_item">
                      <label for="productCategory">類型 <span class="text-danger">*</span></label>
                      <VField
                        type="text"
                        class="form-control"
                        id="productCategory"
                        name="類型"
                        :class="{ 'is-invalid': errors['類型'] }"
                        placeholder="請輸入產品類型"
                        rules="required"
                        v-model="tempProduct.category"
                      ></VField>
                      <ErrorMessage name="類型" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col">
                    <div class="modal_item">
                      <label for="productUnit">單位 <span class="text-danger">*</span></label>
                      <VField
                        type="text"
                        class="form-control"
                        id="productUnit"
                        name="單位"
                        :class="{ 'is-invalid': errors['單位'] }"
                        placeholder="請輸入單位"
                        rules="required"
                        v-model="tempProduct.unit"
                      ></VField>
                      <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="modal_item">
                      <label for="productPrice">售價 <span class="text-danger">*</span></label>
                      <VField
                        type="number"
                        class="form-control"
                        id="productPrice"
                        name="產品售價"
                        :class="{ 'is-invalid': errors['產品售價'] }"
                        placeholder="請輸入產品售價"
                        rules="required"
                        v-model.number="tempProduct.price"
                      ></VField>
                      <ErrorMessage name="產品售價" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                  <div class="col">
                    <div class="modal_item">
                      <label for="productOriginPrice"
                        >原價 <span class="text-danger">*</span></label
                      >
                      <VField
                        type="number"
                        class="form-control"
                        id="productOriginPrice"
                        name="產品原價"
                        :class="{ 'is-invalid': errors['產品原價'] }"
                        placeholder="請輸入產品原價"
                        rules="required"
                        v-model.number="tempProduct.origin_price"
                      ></VField>
                      <ErrorMessage name="產品原價" class="invalid-feedback"></ErrorMessage>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row my-2">
                  <div class="col">
                    <div class="modal_item">
                      <label for="productDescript">產品介紹</label>
                      <textarea
                        id="productDescript"
                        class="form-control"
                        v-model="tempProduct.descript"
                        style="height: 100px"
                        placeholder="請輸入產品介紹"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="modal_item">
                      <label for="item-content">產品內容</label>
                      <textarea
                        type="text"
                        id="item-content"
                        class="form-control"
                        v-model="tempProduct.content"
                        style="height: 100px"
                        placeholder="請輸入產品內容"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="form-check">
                      <input
                        id="productIsEnabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="tempProduct.is_enabled"
                      />
                      <label class="form-check-label" for="productIsEnabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" @click="updataProduct">
            {{ isNew ? '新增' : '更新' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- delProductModal -->
  <div
    class="modal fade"
    id="delProductModal"
    ref="delProductModal"
    tabindex="-1"
    aria-labelledby="delProductModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">確定要刪除？</h5>
        </div>
        <div class="modal-body">
          刪除後的產品無法復原，確定要刪除
          <span class="text-primary fw-bold">{{ tempProduct.title }}</span
          >產品？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="removeProduct(tempProduct)">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationView from '../PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'
import Toast from '@/mixins/toast.js'

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},

      modal: null,
      delModal: null,

      isNew: false
    }
  },
  components: {
    PaginationView
  },
  mounted() {
    this.getProducts()
    this.modal = new Modal(this.$refs.productModal)
    this.delModal = new Modal(this.$refs.delProductModal)
  },
  methods: {
    // 取得產品列表
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('產品列表', res)
          const { products, pagination } = res.data
          this.products = products
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
      if (status === 'create') {
        this.isNew = true
        this.openShow()
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: false
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.openShow()
        this.tempProduct = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        this.delShow()
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
          Toast.fire({
            icon: 'error',
            title: '請確認資料是否完整'
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
          Toast.fire({
            icon: 'error',
            title: '刪除失敗'
          })
        })
    },

    // 重置
    reset() {
      this.tempProduct = ''
    },

    // 開啟/關閉 modal
    openShow() {
      console.log('開啟modal')
      this.modal.show()
    },
    openHide() {
      console.log('關閉modal')
      this.modal.hide()
    },
    delShow() {
      console.log('開啟delModal')
      this.delModal.show()
    },
    delHide() {
      console.log('關閉delModal')
      this.delModal.hide()
    }
  }
}
</script>