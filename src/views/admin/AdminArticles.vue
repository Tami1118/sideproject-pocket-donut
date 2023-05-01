<template>
  <div class="text-primary fw-bold fs-5">最新消息 News List</div>
  <div class="row my-3">
    <div class="col-12 p-4 bg-white rounded-3 shadow-sm">
      <table class="table table-borderless" style="table-layout: fixed; width: 100%">
        <thead class="fw-bold">
          <tr>
            <th width="15%" class="text-truncate">時間</th>
            <th width="40%" class="text-truncate">標題</th>
            <th width="10%" class="text-truncate">作者</th>
            <th width="15%" class="text-truncate text-center">文章狀態</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody class="border-top border-bottom">
          <tr class="admin_item_list" v-for="article in sortArticles" :key="article.id">
            <td class="text-truncate">{{ $format.dateFormat(article.create_at) }}</td>
            <td class="text-truncate">{{ article.title }}</td>
            <td class="text-truncate">{{ article.author }}</td>
            <td class="text-center">
              <div v-if="article.isPublic" class="text-success">公開</div>
              <div v-else>隱藏</div>
            </td>
            <td class="text-truncate">
              <div class="col-3 btn-group">
                <button type="button" class="btn btn-outline-primary bg-white" @click="openModal('edit', article)">
                  <i class="bi bi-pencil-square text-primary"></i>
                </button>
                <button type="button" class="btn btn-outline-light bg-white" @click="openModal('delete', article)">
                  <i class="bi bi-trash3 text-light"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationView :pages="pagination" @get-list="getArticles"></PaginationView>

  <button type="button" class="admin_btn_updata" @click="openModal('create', tempArticle)">
    <i class="bi bi-plus-lg fs-2"></i>
  </button>

  <div class="modal fade" ref="articleModal" id="articleModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <ArticleModal :article="tempArticle" :is-new="isNew" @update-article="updateArticle" />
  </div>

  <div class="modal fade" ref="deleteArticleModal" id="deleteArticleModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <DeleteModal :type="type" :temp-item="tempArticle" :delete-item="deleteArticle" />
  </div>
</template>


<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { Toast, Alert } from '@/mixins/swal'
import Modal from 'bootstrap/js/dist/modal'
import ArticleModal from '@/components/admin/ArticleModal.vue'
import DeleteModal from '@/components/admin/DeleteModal.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  data() {
    return {
      type: '文章',
      articles: [],
      pagination: {},
      currentPage: 1,
      tempArticle: {
        tag: []
      },
      modal: '',
      deleteModal: '',
      isNew: false,
      sortArticles: []
    }
  },
  components: {
    ArticleModal,
    DeleteModal,
    PaginationView
  },
  mounted() {
    this.getArticles()
    this.modal = new Modal(this.$refs.articleModal)
    this.deleteModal = new Modal(this.$refs.deleteArticleModal)
    document.title = 'Pocket Donut | 文章管理'
  },
  methods: {
    getArticles(pagination = 1) {
      this.currentPage = pagination
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles/?page=${pagination}`
      this.$http
        .get(url)
        .then((res) => {
          const { articles, pagination } = res.data
          this.articles = articles
          this.pagination = pagination
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    },

    getArticle(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.tempArticle = res.data.article
        })
        .catch((err) => {
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
          tag: [],
          create_at: new Date().getTime() / 1000,
          isPublic: false
        }
      } else if (status === 'edit') {
        this.isNew = false
        this.modal.show()
        this.getArticle(article.id)
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempArticle = JSON.parse(JSON.stringify(article))
      }
    },

    updateArticle() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article`
      const urlId = this.isNew ? '' : `/${this.tempArticle.id}`
      const http = this.isNew ? 'post' : 'put'
      const message = this.isNew ? '新增' : '更新'

      this.$http[http](`${url}${urlId}`, { data: this.tempArticle })
        .then(() => {
          this.getArticles(this.currentPage)
          this.modal.hide()
          Toast.fire({
            icon: 'success',
            title: `成功${message}「${this.tempArticle.title}」優惠券`
          })
        })
        .catch((err) => {
          Alert.fire({
            title: '請再試一次',
            text: err.response.data.message
          })
        })
    },

    deleteArticle() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getArticles(this.currentPage)
          this.deleteModal.hide()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          this.deleteModal.hide()
          Alert.fire({
            title: err.response.data.message
          })
        })
    }
  },
  watch: {
    articles: {
      handler(newArticles) {
        this.sortArticles = newArticles.sort((a, b) => {
          return new Date(b.create_at) - new Date(a.create_at)
        })
      },
      immediate: true
    }
  }
}
</script>