<template>
  <main>
    <div class="about">
      <div class="about_banner">
        <div class="container py-4">
          <div class="page_banner">
            <img
              src="https://plus.unsplash.com/premium_photo-1676757202363-30c86ba53343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              style="width: 100%; height: 12rem; object-fit: cover; border-radius: 2rem"
              alt=""
            />
            <div class="page_title d-flex flex-column">
              <div class="page_title_zh pt-4">關於我們</div>
              <div class="page_title_en fs-6">About</div>
            </div>
          </div>

          <div class="about_info">
            <div class="about_info_item" style="width:100%">
              <div class="item_image" style="width:100%">
                <img style="width:50%" src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvbnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60" alt="">
              </div>
              <div class="item_text">
                美味的秘密
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.about_info{
  height: 100vh;
}
</style>

<script>
// const { VITE_URL,VITE_PATH } = import.meta.env

export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
