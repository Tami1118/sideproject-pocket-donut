<template>
  <div class="page-background">
    <div class="container">
      <div class="row">
        <div class="col-12 mt-3">
          <div class="flex-y-center">
            <div class="text-primary fw-bold fs-5">產品列表 Products List</div>
            <!-- 排序依據 -->
            <div class="ms-3 flex-y-center ms-auto">
              <div class="text-nowrap me-2">排序:</div>
              <select class="form-select" aria-label="Default select example">
                <option selected>請選擇</option>
                <option value="new">最新產品</option>
                <option value="old">最舊產品</option>
                <option value="reduce">售價高至低</option>
                <option value="pluse">售價低至高</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 bg-white rounded-3 my-3 shadow-sm">
          <div class="py-3 px-2">
            <div class="border-bottom rounded-0 px-3 my-2 bg-transparent">
              <div class="row">
                <div class="col-3 py-2">產品名稱</div>
                <div class="col-2 py-2 text-end">原價</div>
                <div class="col-2 py-2 text-end">售價</div>
                <div class="col-2 py-2 text-center">狀態</div>
                <div class="col-3 py-2"></div>
              </div>
            </div>
            <div
              class="product-list-card card border-0 rounded-2 px-3 my-2"
              v-for="item in products"
              :key="item.id"
            >
              <div class="row align-items-center">
                <div class="col-3 py-3 lh-base">{{ item.title }}</div>
                <div class="col-2 py-3 text-end">{{ item.origin_price }}</div>
                <div class="col-2 py-3 text-end">{{ item.price }}</div>
                <div class="col-2 py-3 flex-x-center">
                  <div class="form-check form-switch flex-xy-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="is_enabled"
                      :checked="item.is_enabled"
                    />
                  </div>
                </div>
                <div class="col-3 btn-group">
                  <button type="button" class="btn btn-outline-primary bg-white">
                    <span class="material-symbols-outlined text-primary"> edit </span>
                  </button>
                  <button type="button" class="btn btn-outline-light bg-white">
                    <span class="material-symbols-outlined text-light"> delete </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 產品列表(圖) -->
        <!-- <div class="col-12 col-lg-2">
          <div class="mb-3">Category</div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="row">
                  <div class="col">
                    <img src="" alt="" />
                  </div>
                  <div class="col">甜甜圈</div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- 產品列表 -->
        <!-- <div class="col-12 col-lg-10"> -->
        <!-- <div class="col-12 col-lg-12">
          <div class="mb-3">Product List</div>
          <div class="admin-products-list">
            <div class="row row-cols-sm-2 row-cols-lg-3">
              <div class="col mb-3">
                <button class="card h-100 w-100 item-center item-add item-shadow">
                  <span class="material-symbols-outlined text-light" style="font-size: 7rem">
                    add
                  </span>
                  <div class="text-light" style="font-size: 1.5rem">新增產品</div>
                </button>
              </div>

              <div class="col-12 mb-3" v-for="item in products" :key="item.id">
                <div class="card h-100 border-0 item-shadow">
                  <img :src="item.imageUrl" class="admin-item-img" :alt="item.title" />
                  <div class="card-body d-flex">
                    <div class="item-info d-flex flex-column justify-content-center">
                      <div class="item-title fw-bold fs-5 mb-2">
                        {{ item.title }}
                      </div>
                      <div class="item-price">
                        <span class="fs-5 fw-bold text-primary">NT ${{ item.price }}</span>
                        <del class="fw-light ms-2">NT ${{ item.origin_price }}</del>
                      </div>
                    </div>
                    <button class="item-detail border-0 bg-transparent ms-auto item-center">
                      <span
                        class="item-detail-intro material-symbols-outlined item-center"
                        style="height: 48px; width: 48px; border-radius: 50px"
                      >
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#updataModal"
      >
        更新產品
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="updataModal"
        tabindex="-1"
        aria-labelledby="updataDetail"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark">
              <h5 class="modal-title text-white" id="updataDetail">編輯產品</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- image -->
                <div class="col-12 col-md-3">
                  <!-- 主要圖片 -->
                  <div class="main-image">
                    <input type="text" class="form-control" />
                    <img src="" alt="" class="img-fuild" />
                  </div>
                  <div class="more-images">
                    <input type="text" class="form-control" />
                    <img src="" alt="" class="img-fuild" />
                    <button type="button" class="btn btn-outline-primary">新增圖片</button>
                    <button type="button" class="btn btn-outline-primary">刪除圖片</button>
                  </div>
                </div>
                <!-- info -->
                <div class="col-12 col-md-9">
                  <div class="row my-2">
                    <div class="col">
                      <div class="form-floating">
                        <input type="text" id="item-title" class="form-control">
                        <label for="item-title">產品名稱</label>
                      </div>
                    </div>
                  </div>
                  <div class="row my-2">
                    <div class="col">
                      <div class="form-floating">
                        <input type="text" id="item-category" class="form-control">
                        <label for="item-category">類型</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input type="text" id="item-unit" class="form-control">
                        <label for="item-unit">單位</label>
                      </div>
                    </div>
                  </div>
                  <div class="row my-2">
                    <div class="col">
                      <div class="form-floating">
                        <input type="number" id="item-category" class="form-control">
                        <label for="item-category">售價</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating">
                        <input type="number" id="item-unit" class="form-control">
                        <label for="item-unit">原價</label>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="row my-2">
                    <div class="col">
                      <div class="form-floating">
                        <input type="text" id="item-category" class="form-control">
                        <label for="item-category">售價</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary">儲存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.product-list-card:nth-child(odd) {
  background-color: #ebf3fc;
}
.item-add {
  border: 4px dashed #bdc9d6;
  min-height: 16rem;
}
.item-shadow {
  box-shadow: 1px 1px 20px #e6e6e6;
}
.admin-item-img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}
.card {
  border-radius: 15px;
}
.item-badge {
  background-color: #ffe7ed;
}
.item-detail-intro {
  background-image: linear-gradient(to right bottom, #d6426a 30%, #be0e3d 70%);
  box-shadow: 4px 4px 20px #bc0a3954;
}
</style>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getAdminProducts()
  },
  methods: {
    getAdminProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products`
      console.log(url)
      this.$http
        .get(url)
        .then((res) => {
          console.log('產品列表', res)
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    }
  }
}
</script>