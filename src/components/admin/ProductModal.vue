<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="post-product border-0 flex-xy-center"
      data-bs-toggle="modal"
      data-bs-target="#updataModal"
      @click="openModal('create', tempProduct)"
    >
      <span class="material-symbols-outlined fs-1"> add </span>
    </button>

    <!-- Modal -->
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
            <h5 class="modal-title text-white" id="updataDetail">編輯產品</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-md-3">
                <div class="main-image mt-2">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="item-imageUrl" />
                    <label for="item-imageUrl">產品圖片</label>
                  </div>
                  <img src="" alt="" class="img-fuild" />
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
              <div class="col-12 col-md-9">
                <div class="row my-2">
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" id="item-title" class="form-control" />
                      <label for="item-title">產品名稱</label>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" id="item-category" class="form-control" />
                      <label for="item-category">類型</label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-floating">
                      <input type="text" id="item-unit" class="form-control" />
                      <label for="item-unit">單位</label>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="form-floating">
                      <input type="number" id="item-category" class="form-control" />
                      <label for="item-category">售價</label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-floating">
                      <input type="number" id="item-unit" class="form-control" />
                      <label for="item-unit">原價</label>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row my-2">
                  <div class="col">
                    <div class="form-floating">
                      <textarea id="item-descript" class="form-control"></textarea>
                      <label for="item-descript">產品介紹</label>
                    </div>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="form-floating">
                      <textarea type="text" id="item-content" class="form-control"></textarea>
                      <label for="item-content">產品內容</label>
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
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempProduct','openModal'],
  data(){
    return {
      temp: {},
      productModal: '',
    }
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
  },
  methods: {
    open(){
      this.productModal.show();
    },
    hide(){
      this.productModal.hide();
    },
    getProduct(){

    }
  }
}
</script>