<template>
  <!-- SortBy -->
  <div class="admin_sortby">
    <div class="col-3 ms-auto">
      <div class="flex-xy-center mt-3">
        <select class="form-select" aria-label="News Range">
          <option selected>排序</option>
          <option value="new">最新消息</option>
          <option value="old">最舊消息</option>
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
              <button
                type="button"
                class="btn btn-outline-primary bg-white"
                @click="openModal('edit', item)"
              >
                <span class="material-symbols-outlined text-primary">edit </span>
              </button>
              <button
                type="button"
                class="btn btn-outline-light bg-white"
                @click="openModal('delete', item)"
              >
                <span class="material-symbols-outlined text-light">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PaginationView :pages="pagination" :get-list="getNews"></PaginationView>

  <!-- NewModal -->
  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create')">
    <span class="material-symbols-outlined fs-1"> add </span>
  </button>

  <!-- Modal -->
  <!-- 必填 -->
  <div
    class="modal fade"
    id="newModal"
    ref="newModal"
    tabindex="-1"
    aria-labelledby="NewModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isNew ? '新增貼文' : '編輯貼文' }}
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
              <div class="col-12 col-md-6">
                <div class="modal-pic-area">
                  <img
                    class="modal_pic_img"
                    :src="tempNew.imageUrl"
                    alt=""
                  />
                  <div class="modal_item">
                    <label for="newsImage" class="form-label">文章圖片</label>
                    <input type="text" id="newsImage" v-model="tempNew.imageUrl" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="modal_item">
                  <input
                    type="checkbox"
                    class="form-checkbox-input"
                    id="newsPublic"
                    v-model="tempNew.isPublic"
                  />
                  <label for="newsPublic" class="form-label mt-md-0">是否啟用</label>
                </div>
                <div class="modal_item mt-2">
                  <label for="newsTitle" class="form-label mt-md-0">
                    文章標題 <span class="text-danger">*</span>
                  </label>
                  <VField
                    type="text"
                    class="form-control"
                    id="newsTitle"
                    name="文章標題"
                    :class="{ 'is-invalid': errors['文章標題'] }"
                    placeholder="請輸入文章標題"
                    rules="required"
                    v-model="tempNew.title"
                  ></VField>
                  <ErrorMessage name="文章標題" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="modal_item mt-2">
                  <label for="newsAuthor" class="form-label">
                    作者 <span class="text-danger">*</span>
                  </label>
                  <VField
                    type="text"
                    class="form-control"
                    id="newsAuthor"
                    name="作者"
                    :class="{ 'is-invalid': errors['作者'] }"
                    placeholder=""
                    rules="required"
                    v-model="tempNew.author"
                  ></VField>
                  <ErrorMessage name="作者" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="modal_item mt-2">
                  <label for="newsCreateAt" class="form-label">
                    建立日期 <span class="text-danger">*</span>
                  </label>
                  <VField
                    type="number"
                    class="form-control"
                    id="newsCreateAt"
                    name="建立日期"
                    :class="{ 'is-invalid': errors['建立日期'] }"
                    placeholder="請輸入建立日期"
                    rules="required"
                    v-model.number="tempNew.create_at"
                  ></VField>
                  <ErrorMessage name="建立日期" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="modal_item">
                  <label for="newsTags" class="form-label">標籤</label>
                  <input type="text" class="form-control" id="newsTags" v-model="tempNew.tag" />
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-12">
                <div class="modal_item mt-2">
                  <label for="newsDescription" class="form-label">簡述內容</label>
                  <input
                    type="text"
                    class="form-control"
                    id="newDescription"
                    v-model="tempNew.description"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="modal_item mt-2">
                  <label for="newsContent" class="form-label mb-1">
                    文章內容 <span class="text-danger">*</span>
                  </label>
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    id="newsContent"
                    v-model="tempNew.content"
                  ></ckeditor>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updataNew">
            {{ isNew ? '新增' : '更新' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- delNewModal -->
  <div
    class="modal fade"
    id="delNewModal"
    ref="delNewModal"
    tabindex="-1"
    aria-labelledby="delNewModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">確定要刪除？</h5>
        </div>
        <div class="modal-body">
          刪除後的文章無法復原，確定要刪除
          <span class="text-primary fw-bold">{{ tempNew.title }}</span
          >？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="removeNew(tempNew)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationView from '../PaginationView.vue'
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Toast from '@/mixins/toast.js'

export default {
  data() {
    return {
      news: [],
      tempNew: {
        tag: []
      },
      pagination: {},

      modal: null,
      delModal: null,

      isNew: false,

      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: '請輸入文章內容'
      }
    }
  },
  components: {
    PaginationView
  },
  mounted() {
    this.getNews()
    this.modal = new Modal(this.$refs.newModal)
    this.delModal = new Modal(this.$refs.delNewModal)
  },
  methods: {
    // 取得文章列表
    getNews(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('消息列表', res)
          const { articles, pagination } = res.data;
          this.news = articles
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
        this.tempNew = {
          isPublic: false
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.openShow()
        this.tempNew = JSON.parse(JSON.stringify(item))
      } else if (status === 'delete') {
        this.delModal.show()
        this.tempNew = JSON.parse(JSON.stringify(item))
      }
    },

    // 新增/更新文章
    updataNew() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      let method = 'post'
      let message = '新增'

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempNew.id}`
        method = 'put'
        message = '更新'
      }

      this.$http[method](url, { data: this.tempNew })
        .then((res) => {
          console.log(res)
          this.getNews()
          this.openHide()
          Toast.fire({
            icon: 'success',
            title: `成功${message}文章`
          })
        })
        .catch((err) => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: '請確認資料是否完整'
          })
        })
    },

    // 刪除單一文章
    removeNew(tempNew) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${tempNew.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除', res)
          this.getNews()
          this.delHide()
          Toast.fire({
            icon: 'success',
            title: '成功刪除文章'
          })
        })
        .catch((err) => {
          console.log('刪除失敗', err)
          Toast.fire({
            icon: 'error',
            title: '文章刪除失敗'
          })
        })
    },

    // 開啟關閉
    openShow() {
      console.log('開啟modal')
      this.modal.show()
    },
    openHide() {
      console.log('關閉modal')
      this.modal.hide()
    },
    delShow() {
      console.log('開啟delmodal')
      this.delModal.show()
    },
    delHide() {
      console.log('關閉delmodal')
      this.delModal.hide()
    }
  }
}
</script>