<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="articleModalLabel">{{ isNew ? '新增文章':'編輯文章'}}</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <VForm v-slot="{ errors }">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <span class="text-primary">*</span>
                  <VField
                    type="text"
                    id="title"
                    class="form-control"
                    placeholder="請輸入文章標題"
                    v-model="tempArticle.title"
                    name="標題"
                    :class="{ 'is-invalid': errors['標題'] }"
                    rulers="required"
                  />
                  <ErrorMessage name="標題" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">作者</label>
                  <span class="text-primary">*</span>
                  <VField
                    type="text"
                    id="author"
                    class="form-control"
                    placeholder="請輸入作者名稱"
                    v-model="tempArticle.author"
                    name="作者"
                    :class="{ 'is-invalid': errors['作者'] }"
                    rulers="required"
                  />
                  <ErrorMessage name="作者" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="createAt" class="form-label">創建日期</label>
                  <span class="text-primary">*</span>
                  <VField
                    type="date"
                    id="createAt"
                    class="form-control"
                    v-model.number="tempArticle.create_at"
                    name="創建日期"
                    :class="{ 'is-invalid': errors['創建日期'] }"
                    rulers="required"
                  />
                  <ErrorMessage name="創建日期" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    class="form-checkbox-input"
                    v-model="tempArticle.isPublic"
                  />
                  <label for="isPublic" class="form-label">是否啟用</label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label for="description" class="form-label">文章簡介</label>
                  <input
                    type="text"
                    id="description"
                    class="form-control"
                    placeholder="請輸入文章簡介"
                    v-model="tempArticle.description"
                  />
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">文章內容</label>
                  <span class="text-primary">*</span>
                  <VField
                    id="content"
                    class="form-control"
                    placeholder="請輸入文章內容"
                    cols="30"
                    rows="10"
                    v-model="tempArticle.content"
                    name="文章內容"
                    :class="{ 'is-invalid': errors['文章內容'] }"
                    rulers="required"
                  ></VField>
                  <ErrorMessage name="文章內容" class="invalid-feedback" />
                </div>
              </div>
            </div>
            <div class="row">
              <!-- tag, imageUrl -->
            </div>
          </VForm>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="$emit('update-article',updateArticle)">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['article', 'isNew'],
  data(){
    return {
      tempArticle: {}
    }
  },
  watch:{
    article(){
      this.tempArticle = this.article
    }
  }
}
</script>