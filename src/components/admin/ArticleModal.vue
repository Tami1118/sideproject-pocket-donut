<template>
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="articleModalLabel">{{ isNew ? '新增文章' : '編輯文章' }}</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <VForm v-slot="{ errors }">
            <div class="row">
              <div class="col mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="articleIsPublic" v-model="tempArticle.isPublic" :checked="tempArticle.isPublic" />
                  <label class="form-check-label" for="articleIsPublic">{{ tempArticle.isPublic ? '公開文章' : '隱藏文章' }}</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label for="articleTitle" class="form-label">標題</label>
                  <span class="text-primary"> *</span>
                  <VField type="text" id="articleTitle" class="form-control" placeholder="請輸入文章標題" name="標題" :class="{ 'is-invalid': errors['標題'] }" rulers="required" v-model="tempArticle.title" />
                  <ErrorMessage name="標題" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="articleAuthor" class="form-label">作者</label>
                  <span class="text-primary"> *</span>
                  <VField type="text" id="articleAuthor" class="form-control" placeholder="請輸入作者名稱" name="作者" :class="{ 'is-invalid': errors['作者'] }" rulers="required" v-model="tempArticle.author" />
                  <ErrorMessage name="作者" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="articleCreateAt" class="form-label">創建日期</label>
                  <span class="text-primary"> *</span>
                  <VField type="date" id="articleCreateAt" class="form-control" :min="today" name="創建日期" :class="{ 'is-invalid': errors['創建日期'] }" rulers="required" v-model="create_at" />
                  <ErrorMessage name="創建日期" class="invalid-feedback" />
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div class="mb-3">
                  <label for="articleContent" class="form-label">文章內容</label>
                  <span class="text-primary">*</span>
                  <ckeditor id="articleContent" :editor="editor" :config="editorConfig" v-model="tempArticle.content" />
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label for="articleImageUrl" class="form-label">文章圖片</label>
                  <input type="text" id="articleImageUrl" class="form-control" v-model="tempArticle.imageUrl" />
                  <img v-if="tempArticle.imageUrl" :src="tempArticle.imageUrl" :alt="tempArticle.title" class="img-fluid rounded mt-2" style="width: 100%; height: 20rem; object-fit: cover" />
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div class="mb-3">
                  <label for="articleTag" class="form-label">標籤</label>
                  <div class="row gy-2" v-if="tempArticle.tag?.length">
                    <div class="col-4" v-for="(item, key) in tempArticle.tag" :key="key">
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="tempArticle.tag[key]" />
                        <button type="button" class="btn btn-outline-secondary" @click="tempArticle.tag.splice(key, 1)"><i class="bi bi-x"></i></button>
                      </div>
                    </div>
                    <div class="col-auto" v-if="tempArticle.tag[tempArticle.tag?.length - 1]">
                      <button type="button" class="btn btn-outline-primary" @click="tempArticle.tag.push('')">新增標籤</button>
                    </div>
                  </div>
                  <div v-else>
                    <button type="button" class="btn btn-outline-primary" @click="createTag">新增標籤</button>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="articleDescription" class="form-label">文章簡介</label>
                  <textarea id="articleDescription" class="form-control" rows="8" placeholder="請輸入文章簡介" v-model="tempArticle.description" />
                </div>
              </div>
            </div>
          </VForm>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="$emit('update-article', updateArticle)">
          {{ isNew ? '新增' : '更新' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ClassEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  props: ['article', 'isNew'],
  data() {
    return {
      editor: ClassEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'Undo', 'Redo'],
        placeholder: '請輸入文章'
      },
      tempArticle: {},
      create_at: '',
      today: ''
    }
  },
  mounted() {
    ;[this.today] = new Date().toISOString().split('T')
  },
  watch: {
    article() {
      this.tempArticle = this.article
      ;[this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T')
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    createTag() {
      this.tempArticle.tag = []
      this.tempArticle.tag.push('')
    }
  }
}
</script>