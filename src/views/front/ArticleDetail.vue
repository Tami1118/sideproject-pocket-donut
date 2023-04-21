<template>
  <main style="min-height: 70vh">
    <div class="container">
      <!-- 待轉為元件 -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb py-2" style="font-weight: 500">
          <li class="breadcrumb-item">
            <RouterLink class="router_link text-primary" to="/">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink class="router_link text-primary" to="/articles">最新消息</RouterLink>
          </li>
          <li class="breadcrumb-item active">{{ article.title }}</li>
        </ol>
      </nav>

      <div class="row justify-content-between">
        <div class="col-12 col-md-8">
          <section class="section section_detail">
            <div class="badge bg-primary mb-2" style="font-weight: 400">活動消息</div>

            <h1>{{ article.title }}</h1>
            <div class="article_info d-flex text-light" style="font-size: 0.8rem">
              <div class="me-3 fw-bold mb-2" style="font-size: 0.9rem">
                <i class="bi bi-calendar-check"></i> 2023/03/20
                <!-- {{ article.create_at }} -->
              </div>
            </div>
            <div class="w-100 my-3">
              <img
                :src="article.imageUrl"
                class="w-100 rounded-4"
                style="height: 500px; object-fit: cover"
                alt=""
              />
            </div>
            <div v-html="article.description" style="text-align: justify"></div>
          </section>
          <div class="row my-3 py-4 border-top">
            <div class="col-6" v-if="currentArticle - 1 >= 0">
              <RouterLink
                :to="`/article/${articles[currentArticle - 1].id}`"
                class="text-start text-primary text-decoration-none"
              >
                <div class="badge bg-primary mb-1">上一篇</div>
                <br />
                {{ articles[currentArticle - 1].title }}
              </RouterLink>
            </div>
            <div class="col-6 text-end ms-auto" v-if="currentArticle + 1 < articles.length">
              <RouterLink
                :to="`/article/${articles[currentArticle + 1].id}`"
                class="text-end text-primary text-decoration-none"
              >
                <div class="badge bg-primary mb-1">下一篇</div>
                <br />
                {{ articles[currentArticle + 1].title }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="fs-4 fw-bold">最新文章</div>
          <template v-for="(article, key) in articles" :key="article.id">
            <div v-if="key < 3" class="my-1">
              <RouterLink :to="`/article/${article.id}`" class="router_link text-primary">
                {{ article.title }}
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { RouterLink } from 'vue-router'
import { Alert } from '@/mixins/swal'
import { mapActions, mapState } from 'pinia'
import articleStore from '@/stores/articleStore'

export default {
  data() {
    return {
      article: {},
      currentArticle: 0,
      isLoading: false
    }
  },
  compontents: {
    RouterLink
  },
  mounted() {
    this.getArticles()
    this.getArticle()
  },
  methods: {
    ...mapActions(articleStore, ['getArticles']),
    getArticle() {
      const { id } = this.$route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article
          this.currentArticle = this.articles.filter((item) => item.id === id)[0]?.num - 1
        })
        .catch((err) => {
          Alert.fire({
            title: err.response.data.message
          })
        })
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          this.getArticle()
        }
      }
    }
  },
  computed: {
    ...mapState(articleStore, ['articles'])
  }
}
</script>