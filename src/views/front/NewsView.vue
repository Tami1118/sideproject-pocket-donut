<template>
  <div class="user_news">
    <div class="container py-4">
      <div class="page_banner">
        <img
          src="https://plus.unsplash.com/premium_photo-1676757202363-30c86ba53343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          style="width: 100%; height: 12rem; object-fit: cover; border-radius: 2rem"
          alt=""
        />
        <div class="page_title d-flex flex-column">
          <div class="page_title_zh pt-4">最新消息</div>
          <div class="page_title_en fs-6">Hot News</div>
        </div>
      </div>

      <section class="section section_new my-3">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
          <template v-for="item in news" :key="item.id">
            <RouterLink :to="`/new/${item.id}`" class="col router_link">
              <div class="card">
                <img :src="item.imageUrl" alt="" class="new_image card-img-top"/>
                <div class="card-body">
                  <h3 class="fs-3">
                    {{ item.title }}
                  </h3>
                  <div class="new_date">
                    {{ item.create_at }}
                  </div>
                  <div class="new_description">
                    {{ item.description }}
                  </div>
                </div>
              </div>
            </RouterLink>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.page_banner {
  position: relative;
}
.page_title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000035;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  color: #fff;
}
.new_image{
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      news: []
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    getNews() {
      const url = `${VITE_URL}/api/${VITE_PATH}/articles`
      this.$http.get(url).then((res) => {
        console.log('消息列表', res)
        this.news = res.data.articles
      })
    }
  }
}
</script>