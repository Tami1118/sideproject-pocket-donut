<template>
  <div class="row">
    <!-- 排序 -->
    <div class="col-3 ms-auto">
      <div class="flex-xy-center mt-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>排序</option>
          <option value="new">最新產品</option>
          <option value="old">最舊產品</option>
          <option value="reduce">售價高至低</option>
          <option value="pluse">售價低至高</option>
        </select>
      </div>
    </div>

    <!-- 產品列表 -->
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

        <div class="product-list-card rounded-2 px-3" v-for="item in products" :key="item.id">
          <div class="row align-items-center">
            <div class="col-2 py-3">
              {{ item.category }}
            </div>
            <div class="col-3 py-3 word-hidden">
              {{ item.title }}
            </div>
            <div class="col-1 py-3 text-end">{{ item.origin_price }}</div>
            <div class="col-1 py-3 text-end">{{ item.price }}</div>
            <div class="col-2 py-3 flex-x-center">
              <div v-if="item.is_enabled" class="text-primary fw-bold">已啟用</div>
              <div v-else>隱藏</div>
              <!-- <div class="form-check form-switch flex-xy-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="is_enabled"
                  :checked="item.is_enabled"
                />
              </div> -->
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
                <span class="material-symbols-outlined text-light" @click="deleteItem(item.id)">
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationView :pages="pagination" :get-products="getProducts"></PaginationView>
  </div>

  <!-- productModal -->
  <button
    type="button"
    class="post-product border-0 flex-xy-center"
    data-bs-toggle="modal"
    data-bs-target="#productModal"
    @click="openModal('create', item)"
  >
    <span class="material-symbols-outlined fs-1"> add </span>
  </button>

  <div
    class="modal fade"
    id="productModal"
    ref="productModal"
    tabindex="-1"
    aria-labelledby="updataDetail"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="updataDetail">
            <div v-if="isNew">新增產品</div>
            <div v-else>編輯產品</div>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="main-image mt-2">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="item-imageUrl"
                    v-model="tempProduct.imageUrl"
                  />
                  <label for="item-imageUrl">產品圖片</label>
                </div>
                <img :src="tempProduct.imageUrl" alt="" class="img-fluid" />
              </div>

              <div class="more-images">
                <div class="form-floating">
                  <input type="text" class="form-control" id="item-imagesUrl" />
                  <label for="item-imagesUrl">多圖設置</label>
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
                  <div class="form-floating">
                    <input
                      type="text"
                      id="item-title"
                      class="form-control"
                      v-model="tempProduct.title"
                    />
                    <label for="item-title">產品名稱</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="item-category"
                      class="form-control"
                      v-model="tempProduct.category"
                    />
                    <label for="item-category">類型</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="item-unit"
                      class="form-control"
                      v-model="tempProduct.unit"
                    />
                    <label for="item-unit">單位</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="number"
                      id="item-price"
                      class="form-control"
                      v-model="tempProduct.price"
                    />
                    <label for="item-price">售價</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="number"
                      id="item-origin-price"
                      class="form-control"
                      v-model="tempProduct.origin_price"
                    />
                    <label for="item-origin-price">原價</label>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <textarea
                      id="item-descript"
                      class="form-control"
                      v-model="tempProduct.descript"
                      style="height: 100px"
                    ></textarea>
                    <label for="item-descript">產品介紹</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <textarea
                      type="text"
                      id="item-content"
                      class="form-control"
                      v-model="tempProduct.content"
                      style="height: 100px"
                    ></textarea>
                    <label for="item-content">產品內容</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempProduct.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" v-if="isNew" @click="updataProduct">
            新增
          </button>
          <button type="button" class="btn btn-primary" v-else @click="updataProduct">更新</button>
        </div>
      </div>
    </div>
  </div>

  <!-- delProductModal -->
</template>

<style lang="scss">
.product-list-card:nth-child(odd) {
  background-color: #ebf3fc;
}
.post-product {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-image: linear-gradient(to right bottom, #d6426a 30%, #be0e3d 70%);
  height: 4rem;
  width: 4rem;
  border-radius: 50px;
  box-shadow: 3px 3px 20px #be0e3d6e;
}
</style>

<script>
import PaginationView from '../../components/PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'
const { VITE_URL, VITE_PATH } = import.meta.env


export default {
  components: {
    PaginationView
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      isNew: false,
      // productModalEl: ''
    }
  },
  mounted() {
    this.getProducts();
    this.productModalEl = new Modal(this.$refs.productModal);
  },
  methods: {
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('產品列表', res)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.message)
        })
    },
    openModal(status, item) {
      if (status === 'create') {
        console.log('create', item);
        this.isNew = true;
        this.productModalEl.show();
        this.tempProduct = {
          imagesUrl: []
        };
      } else if (status === 'edit') {
        console.log('edit', item);
        this.isNew = false;
        this.productModalEl.show();
        this.tempProduct = JSON.parse(JSON.stringify(item));
      } else if (status === 'delete') {
        console.log('delete', item);
        this.tempProduct = JSON.parse(JSON.stringify(item));
      }
    },
    updataProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      let method = 'post';

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }

      this.$http[method](url, { data: this.tempProduct }).then((res) => {
        console.log(res)
        this.getProducts()
        this.productModalEl.hide()
      })
    },
    deleteItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`
      this.$http.delete(url).then((res) => {
        console.log('成功刪除', res)
        this.getProducts()
      })
    },
    reset() {
      this.tempProduct = ''
    }
  }
}
</script>