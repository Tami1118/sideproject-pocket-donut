<template>
  <div class="banner-pages position-relative">
    <img class="w-100" style="height: 15rem; object-fit: cover" src="https://images.unsplash.com/photo-1527904324834-3bda86da6771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1704&q=80" alt="">
    <div class="banner-title position-absolute d-flex top-0 bottom-0 start-0 end-0 m-auto justify-content-center align-items-center">
      <div class="text-white fs-3 text-center" v-for="name in view" :key="name + 123">
        <div class="fs-3">{{ name.title_tw }}</div>
        <div class="fs-5 mt-2">{{ name.title_en }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .banner-title{
    background-color: #03010d89;
  }
</style>

<script>
export default {
  props: ['view']
}
</script>