<template>
  <div class="container">
    <div class="admin_article_list">
      <div class="row my-3">
        <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
          <table class="table table-borderless">
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
                <td>{{ article.create_at }}</td>
                <td>{{ article.title }}</td>
                <td>{{ article.author }}</td>
                <td class="text-center">
                  <div v-if="article.isPublic" class="text-success">已啟用</div>
                  <div v-else>隱藏</div>
                </td>
                <td>
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
      <PaginationView :pages="pagination" :get-list="getArticles"></PaginationView>
    </div>
  </div>

  <!-- Modal -->
  <!-- Button trigger modal -->
  <button type="button" class="admin_btn_updata" @click="openModal('create', tempArticle)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>

  <!-- articleModal -->
  <div class="modal fade" ref="articleModal" id="articleModal" tabindex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
    <ArticleModal :isNew="isNew" :article="tempArticle" :updateArticle="updateArticle" />
  </div>

  <!-- deleteModal -->
  <div class="modal fade" ref="deleteArticleModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <DeleteArticle :tempArticle="tempArticle" :deleteArticle="deleteArticle" />
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import Modal from 'bootstrap/js/dist/modal'
import { Toast, Alert } from '@/mixins/swal.js'
import ArticleModal from '@/components/admin/ArticleModal.vue'
import DeleteArticle from '@/components/admin/DeleteArticle.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},

      modal: '',
      deleteModal: '',

      isNew: false
    }
  },
  components: {
    DeleteArticle,
    ArticleModal,
    PaginationView
  },
  mounted() {
    this.getArticles()
    this.modal = new Modal(this.$refs.articleModal)
    this.deleteModal = new Modal(this.$refs.deleteArticleModal)
  },
  methods: {
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

    openModal(status, article) {
      if (status === 'create') {
        this.isNew = true
        this.modal.show()
        this.tempArticle = {
          isPublic: false
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
            title: err.response.data.message
          })
        })
    },

    deleteArticle() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
      this.$http
        .delete(url)
        .then((res) => {
          console.log('成功刪除文章', res)
          this.getArticles()
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: '成功刪除文章'
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