<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">
          {{ isNew ? '新增產品' : '編輯產品' }}
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    <label for="productOriginPrice">原價 <span class="text-danger">*</span></label>
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
        <button type="button" class="btn btn-primary" @click="$emit('update-product',updateProduct)">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'isNew', 'reset'],
  data(){
    return {
      tempProduct: {}
    }
  },
  watch: {
    product(){
      this.tempProduct = this.product
    }
  }
}
</script>