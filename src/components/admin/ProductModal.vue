<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">{{ isNew ? '新增產品' : '編輯產品' }}</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <VForm v-slot="{ errors }">
          <div class="row">
            <div class="col mb-3">
              <div class="form-check form-switch">
                <input class="form-check-input" id="productIsEnabled" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" :check="tempProduct.is_enabled">
                <label class="form-check-label" for="productIsEnabled">{{tempProduct.is_enabled? '已啟用':'未啟用'}}</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="mb-3">
                <label for="productImageUrl">產品圖片</label>
                <input type="text" class="form-control" id="productImageUrl" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結" />
                <img :src="tempProduct.imageUrl" :alt="tempProduct.title" class="img-fluid rounded" />
              </div>
              <div class="mb-3">
                <label for="productImagesUrl">多圖設置</label>
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <template v-for="(item, key) in tempProduct.imagesUrl" :key="item + 123">
                    <input type="text" class="form-control mt-1" id="productImagesUrl" v-model="tempProduct.imagesUrl[key]" placeholder="請輸入圖片連結" />
                    <img :src="tempProduct.imagesUrl[key]" alt="" class="img-fluid rounded" />
                  </template>
                  <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                    <button type="button" class="btn btn-outline-primary w-100" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                  </div>
                  <div v-else>
                    <button type="button" class="btn btn-outline-secondary w-100" @click="tempProduct.imagesUrl.pop()">刪除圖片</button>
                  </div>
                </div>
                <div v-else>
                  <button type="button" class="btn btn-outline-primary w-100" @click="createImage()">新增圖片</button>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="mb-3">
                <label for="productTitle">產品名稱<span class="text-danger"> *</span></label>
                <VField type="text" class="form-control" id="productTitle" placeholder="請輸入產品名稱" name="產品名稱" :class="{ 'is-invalid': errors['產品名稱'] }" rules="required" v-model="tempProduct.title" />
                <ErrorMessage name="產品名稱" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col">
                    <label for="productCategory">類型<span class="text-danger"> *</span></label>
                    <VField as="select" class="form-select" id="productCategory" name="類型" :class="{ 'is-invalid': errors['類型'] }" rules="required" v-model="tempProduct.category">
                      <option selected>請選擇</option>
                      <option value="甜甜圈">甜甜圈</option>
                      <option value="飲品">飲品</option>
                    </VField>
                    <ErrorMessage name="類型" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="productUnit">單位<span class="text-danger"> *</span></label>
                    <VField as="select" class="form-select" id="productUnit" name="單位" :class="{ 'is-invalid': errors['單位'] }" rules="required" v-model="tempProduct.unit">
                      <option selected>請選擇</option>
                      <option value="個">個</option>
                      <option value="杯">杯</option>
                    </VField>
                    <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col">
                    <label for="productPrice">售價<span class="text-danger"> *</span></label>
                    <VField type="number" class="form-control" id="productPrice" placeholder="請輸入產品售價" name="產品售價" :class="{ 'is-invalid': errors['產品售價'] }" rules="required" v-model.number="tempProduct.price" />
                    <ErrorMessage name="產品售價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col">
                    <label for="productOriginPrice">原價<span class="text-danger"> *</span></label>
                    <VField type="number" class="form-control" id="productOriginPrice" placeholder="請輸入產品原價" name="產品原價" :class="{ 'is-invalid': errors['產品原價'] }" rules="required" v-model.number="tempProduct.origin_price" />
                    <ErrorMessage name="產品原價" class="invalid-feedback"></ErrorMessage>
                  </div>
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="productDescript">產品介紹</label>
                <textarea id="productDescript" class="form-control" placeholder="請輸入產品介紹" v-model="tempProduct.descript" style="height: 100px" />
              </div>
              <div class="mb-3">
                <label for="item-content">產品內容</label>
                <textarea id="item-content" class="form-control" placeholder="請輸入產品內容" v-model="tempProduct.content" style="height: 100px" />
              </div>
            </div>
          </div>
        </VForm>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="$emit('update-product', updateProduct)">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'isNew'],
  data() {
    return {
      tempProduct: {}
    }
  },
  watch: {
    product() {
      this.tempProduct = this.product
    }
  },
  methods: {
    createImage() {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    }
  }
}
</script>