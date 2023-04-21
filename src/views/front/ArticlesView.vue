<template>
  <main style="min-height: 80vh">
    <div class="container my-5">
      <section class="section section_new">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <!-- 待轉為元件 -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb py-2" style="font-weight: 500">
                <li class="breadcrumb-item">
                  <RouterLink class="router_link text-primary" to="/">首頁</RouterLink>
                </li>
                <li class="breadcrumb-item">
                  <RouterLink class="router_link text-primary" to="/articles">最新消息</RouterLink>
                </li>
              </ol>
            </nav>


            <template v-for="item in articles" :key="item.id">
              <RouterLink :to="`/article/${item.id}`" class="border-bottom router_link">
                <div class="row g-0 mb-3 pb-3 border-bottom">
                  <div class="col-4">
                    <img
                      :src="item.imageUrl"
                      :alt="item.title"
                      class="overflow-hidden rounded-3"
                      style="width: 100%; height: 220px; object-fit: cover"
                    />
                  </div>
                  <div class="col-8 px-3 py-4 d-flex flex-column">
                    <h3 class="card-title fs-4 mb-2">{{ item.title }}</h3>
                    <p class="card_text" v-html="item.description"></p>
                    <div class="mt-auto">
                      <!-- {{ item.create_at }} -->2023/04/15
                    </div>
                  </div>
                </div>
              </RouterLink>
            </template>
            <Pagination :pages="pagination" :get-list="getArticles" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<style lang="scss">
.card_text {
  text-align: justify;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
<script>
import { mapActions, mapState } from 'pinia'
import articleStore from '@/stores/articleStore'
import Pagination from '@/components/PaginationView.vue'

export default {
  components: {
    Pagination
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    ...mapActions(articleStore, ['getArticles'])
  },
  computed: {
    ...mapState(articleStore, ['articles', 'pagination'])
  }
}
</script>