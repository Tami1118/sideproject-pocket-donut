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

    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#newsModal"
      @click="openModal('create')"
    >
      建立文章
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="newsModal"
      ref="newsModal"
      tabindex="-1"
      aria-labelledby="updata modal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">
              <span>{{ isNew? '新增貼文':'編輯貼文' }}</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="modal-pic-area">
                    <img class="modal-pic-img" src="https://images.unsplash.com/photo-1679895359557-151b4558a6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" alt="">
                    <div class="modal-item">
                      <label for="newsImage" class="form-label">文章圖片</label>
                      <input type="text" id="newsImage" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="modal-item">
                    <input type="checkbox" class="form-checkbox-input" id="newsPublic" v-model="tempNew.isPublic">
                    <label for="newsPublic" class="form-label mt-md-0">是否啟用</label>
                  </div>
                  <div class="modal-item mt-2">
                    <label for="newsTitle" class="form-label mt-md-0">標題</label>
                    <input type="text" class="form-control" id="newsTitle" v-model="tempNew.title">
                  </div>
                  <div class="modal-item mt-2">
                    <label for="newsAuthor" class="form-label">作者</label>
                    <input type="text" class="form-control" id="newsAuthor" v-model="tempNew.author">
                  </div>
                  <div class="modal-item mt-2">
                    <label for="newsCreateAt" class="form-label">建立日期</label>
                    <input type="number" class="form-control" id="newsCreateAt" v-model.number="tempNew.create_at">
                  </div>
                  <div class="modal-item mt-2">
                    <label for="newsTags" class="form-label">標籤</label>
                    <input type="text" class="form-control" id="newsTags" v-model="tempNew.tag">
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-12">
                  <div class="modal-item mt-2">
                    <label for="newsDescription" class="form-label">簡述內容</label>
                    <input type="text" class="form-control" id="newDescription" v-model="tempNew.description">
                  </div>
                </div>
                <div class="col-12">
                  <div class="modal-item mt-2">
                    <label for="newsContent" class="form-label mb-1">產品內容</label>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      id="newsContent"
                      v-model="tempNew.content"
                    ></ckeditor>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <!-- data-bs-dismiss="modal" -->
            <button type="button" class="btn btn-secondary"  @click="hide">取消</button>
            <button type="button" class="btn btn-primary" @click="create">新增</button>
          </div>
        </div>
      </div>
    </div>

    <PaginationView :pages="pagination" :get-list="getNews"></PaginationView>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import PaginationView from '../PaginationView.vue'
// import bootstrap from "bootstrap/dist/js/bootstrap.js"
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data() {
    return {
      news: [],
      pagination: {},

      newsModalEl: null,
      isNew: false,

      tempNew: {
        tag: [],
      },
      // create_at: '',
      // isNew: false,

      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: '請輸入內容'
      }
    }
  },
  components: {
    PaginationView,
  },
  mounted() {
    this.getNews();
    this.newsModalEl = new Modal(this.$refs.newsModal);
    // this.delModal = new Modal(this.$refs.delModal)
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
        console.log('create', item);
        this.isNew = true;
        this.show();
        this.tempNew = {
          isPublic: false,
        }
      } else if (status === 'edit') {
        console.log('edit', item);
        this.isNew = false;
        this.show();
        this.tempNew = JSON.parse(JSON.stringify(item));
      } 
    //  else if (status === 'delete') {
    //     // console.log('delete', item);
    //     this.delModal.show()
    //     this.tempNew = JSON.parse(JSON.stringify(item))
      // }
    },
    create() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      this.$http
        .post(url, { data: this.tempNew })
        .then((res) => {
          console.log(res);
          this.getNews();
        })
        .catch((err) => {
          console.log(err)
          this.newsModalEl.hide();
        })
    },
    // updataNew() {
    //   let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
    //   let method = 'post'

    //   if (!this.isNew) {
    //     url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempNew.id}`
    //     method = 'put'
    //   }

    //   this.$http[method](url, { data: this.tempNew })
    //     .then(() => {
    //       console.log('成功')
    //       this.getNews()
    //       this.updataModal.hide()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.updataModal.hide()
    //     })
    // },
    // updataItem(id) {
    //   const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`
    //   this.$http
    //     .delete(url)
    //     .then((res) => {
    //       console.log('成功刪除', res)
    //     })
    //     .catch((err) => {
    //       console.log('刪除失敗', err)
    //     })
    // },
    show(){
      console.log('開啟modal');
      this.newsModalEl.show();
    },
    hide(){
      console.log('關閉modal');
      this.newsModalEl.hide();
    }
  }
}
</script>