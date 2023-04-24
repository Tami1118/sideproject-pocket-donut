<template>
  <div class="text-primary fw-bold fs-5">最新消息 News List</div>
  <div class="container">
    <div class="row my-3">
      <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
        <table class="table table-borderless" style="table-layout: fixed; width: 100%">
          <thead class="botder-bottom">
            <tr class="text-align">
              <th width="10%">時間</th>
              <th width="20%">標題</th>
              <th width="10%">作者</th>
              <th width="20%" class="text-center">狀態</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-align admin_item_list" v-for="article in articles" :key="article.id">
              <td class="text_over_hidden">{{ article.create_at }}</td>
              <td class="text_over_hidden">{{ article.title }}</td>
              <td class="text_over_hidden">{{ article.author }}</td>
              <td class="text-center">
                <div v-if="article.isPublic" class="text-success">已啟用</div>
                <div v-else>隱藏</div>
              </td>
              <td class="text_over_hidden">
                <div class="col-3 btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary bg-white"
                    @click="openModal('edit', article)"
                  >
                    <i class="bi bi-pencil-square text-primary"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light bg-white"
                    @click="openModal('delete', article)"
                  >
                    <i class="bi bi-trash3 text-light"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <PaginationView :pages="pagination" :get-list="getArticles"></PaginationView> -->
  </div>

  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create', tempArticle)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>

  <!-- articleModal -->
  <div
    class="modal fade"
    ref="articleModal"
    id="articleModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
  >
    <ArticleModal :article="tempArticle" :is-new="isNew" @update-article="updateArticle" />
  </div>

  <!-- deleteModal -->
  <div
    class="modal fade"
    ref="deleteArticleModal"
    id="deleteArticleModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <DeleteModal :type="type" :temp-item="tempArticle" :delete-item="deleteArticle" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import ArticleModal from '@/components/admin/ArticleModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'

export default {
  data() {
    return {
      type: '文章',
      articles: [],
      pagination: {},
      tempArticle: {},
      modal: '',
      deleteModal: '',
      isNew: false
    }
  },
  components: {
    ArticleModal,
    DeleteModal
  },
  mounted() {
    this.getArticles()
    this.modal = new Modal(this.$refs.articleModal)
    this.deleteModal = new Modal(this.$refs.deleteArticleModal)
  },
  methods: {
    // 取得文章列表
    getArticles(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          console.log('取得文章列表', res)
          const { articles, pagination } = res.data
          this.articles = articles
          this.pagination = pagination
        })
        .catch((err) => {
          console.log('文章列表取得失敗', err)
          Alert.fire({
            title: err.response.data.message
          })
        })
    },
    // 開啟 modal
    openModal(status, article) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempArticle = {
          isPublic: false // 預設
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.modal.show()
        this.tempArticle = JSON.parse(JSON.stringify(article))
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempArticle = JSON.parse(JSON.stringify(article))
      }
    },
    // 新增/更新文章
    updateArticle() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      let http = 'post'
      let message = '成功新增文章'
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
        http = 'put'
        message = '成功更新文章'
      }
      this.$http[http](url, { data: this.tempArticle })
        .then((res) => {
          console.log(message, res)
          this.getArticles()
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: message
          })
        })
        .catch((err) => {
          console.log(message, err)
          Alert.fire({
            title: '請再試一次',
            text: err.response.data.message
          })
        })
    },
    // 刪除單一文章
    deleteArticle() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除單一文章', res)
          this.getArticles()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          console.log('刪除文章失敗', err)
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    }
  }
}
</script>