<template>
  <div class="row">
    <!-- 排序 -->
    <div class="col-3 ms-auto">
      <div class="flex-xy-center mt-3">
        <select class="form-select" aria-label="News Range">
          <option selected>排序</option>
          <option value="new">最新消息</option>
          <option value="old">最舊消息</option>
        </select>
      </div>
    </div>

    <!-- 列表 -->
    <div class="col-12 my-3">
      <div class="p-4 bg-white rounded-3 shadow-sm">
        <div class="border-bottom rounded-0 bg-transparent px-3">
          <div class="row">
            <div class="col-2 py-2">時間</div>
            <div class="col-3 py-2">標題</div>
            <div class="col-2 py-2">作者</div>
            <div class="col-2 py-2 text-end">狀態</div>
            <div class="col-3 py-2"></div>
          </div>
        </div>

        <div class="admin-item-list rounded-2 px-3" v-for="item in news" :key="item.id">
          <div class="row align-items-center">
            <div class="col-2 py-3">{{ item.create_at }}</div>
            <div class="col-3 py-3">{{ item.title }}</div>
            <div class="col-2 py-3">{{ item.author }}</div>
            <div class="col-2 py-3 text-end">
              <div v-if="item.isPublic" class="text-primary fw-bold">已啟用</div>
              <div v-else>隱藏</div>
            </div>
            <div class="col-3 btn-group">
              <button type="button" class="btn btn-outline-primary bg-white">
                <span
                  class="material-symbols-outlined text-primary"
                  @click="openModal('edit', item)"
                  >edit</span
                >
              </button>
              <button
                type="button"
                class="btn btn-outline-light bg-white"
                data-bs-toggle="modal"
                data-bs-target="#delModal"
                @click="openModal('delete', item)"
              >
                <span class="material-symbols-outlined text-light">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationView :pages="pagination" :get-list="getNews"></PaginationView>
  </div>

  <!-- AddModal -->
  <button
    type="button"
    class="btn-updata btn-linear border-0 flex-xy-center"
    data-bs-toggle="modal"
    data-bs-target="#openUpdataModal"
    @click="openModal('create', item)"
  >
    <span class="material-symbols-outlined fs-1"> add </span>
  </button>

  <div
    class="modal fade"
    id="openUpdataModal"
    ref="openUpdataModal"
    tabindex="-1"
    aria-labelledby="Updata Modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="updataModal">
            <div v-if="isNew">新增消息</div>
            <div v-else>編輯消息</div>
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
            <div class="col-12 col-md-6">
              <div class="main-image mt-2">
                <div class="form-floating">
                  <img :src="tempNew.imageUrl" :alt="tempNew.title" class="img-fluid" />
                  <input
                    type="text"
                    class="form-control"
                    id="item-imageUrl"
                    v-model="tempNew.imageUrl"
                  />
                  <label for="item-imageUrl">圖片</label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="item-title"
                      class="form-control"
                      v-model="tempNew.title"
                    />
                    <label for="item-title">標題</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="text"
                      id="item-author"
                      class="form-control"
                      v-model="tempNew.author"
                    />
                    <label for="item-author">作者</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-floating">
                    <input
                      type="number"
                      id="item-create-at"
                      class="form-control"
                      v-model.number="tempNew.create_at"
                    />
                    <label for="item-create-at">建立時間</label>
                  </div>
                </div>
              </div>

              <hr />
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <textarea
                      id="item-description"
                      class="form-control"
                      v-model="tempNew.description"
                      style="height: 100px"
                    ></textarea>
                    <label for="item-description">消息簡述</label>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-floating">
                    <label for="item-content">產品內容</label>
                    <ckeditor
                      :editor="editor"
                      v-model="tempNew.content"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
              </div>
              <div class="row my-2">
                <div class="col">
                  <div class="form-check">
                    <input
                      id="item-isPublic"
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempNew.isPublic"
                    />
                    <label class="form-check-label" for="item-isPublic">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" v-if="isNew" @click="create">新增</button>
          <button type="button" class="btn btn-primary" v-else @click="updataNew">更新</button>
        </div>
      </div>
    </div>
  </div>

  <!-- DelModal -->
  <div
    class="modal fade"
    id="delModal"
    ref="delModal"
    tabindex="-1"
    aria-labelledby="deleteItemModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteItemModal">確定要刪除 {{ tempNew.title }} ?</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">刪除後不再復原，確定要刪除 {{ tempNew.title }} 品項？</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updataItem(tempNew.id)">
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Modal from 'bootstrap/js/dist/modal'

export default {
  data() {
    return {
      news: [],
      pagination: {},
      tempNew: {
        tag: [],
        content: '',
        isPublic: false
      },
      create_at: '',
      isNew: false,
      updataModal: null,
      delModal: null,

      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: '請輸入內容'
      }
    }
  },
  components: {
    PaginationView
  },
  mounted() {
    this.getNews()
    this.updataModal = new Modal(this.$refs.updataModal)
    this.delModal = new Modal(this.$refs.delModal)
  },
  methods: {
    getNews(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('消息列表', res)
          this.news = res.data.articles
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err.response.message)
        })
    },
    openModal(status, item) {
      if (status === 'create') {
        // console.log('create', item);
        this.isNew = true
        this.updataModal.show()
        this.tempNew = {}
      } else if (status === 'edit') {
        // console.log('edit', item);
        this.isNew = false
        this.updataModal.show()
        this.tempNew = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        // console.log('delete', item);
        this.delModal.show()
        this.tempNew = JSON.parse(JSON.stringify(item))
      }
    },
    create() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      this.$http
        .post(url, { data: this.tempNew })
        .then((res) => {
          console.log(res)
          this.getNews()
          this.updataModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updataNew() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      let method = 'post'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempNew.id}`
        method = 'put'
      }

      this.$http[method](url, { data: this.tempNew })
        .then(() => {
          console.log('成功')
          this.getNews()
          this.updataModal.hide()
        })
        .catch((err) => {
          console.log(err)
          this.updataModal.hide()
        })
    },
    updataItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除', res)
        })
        .catch((err) => {
          console.log('刪除失敗', err)
        })
    }
  }
}
</script>