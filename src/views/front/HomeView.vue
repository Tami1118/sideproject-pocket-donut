<template>
  <div>
    <HomeBanner></HomeBanner>
    <HomeAbout></HomeAbout>
    <HomeProduct></HomeProduct>
    <HomeNews></HomeNews>
    <!-- 關於我們 -->
    <!-- 最新消息 -->
    <!-- 聯絡我們 -->
  </div>
</template>

<script>
import HomeBanner from '../../components/front/HomeBanner.vue'
import HomeAbout from '../../components/front/HomeAbout.vue'
import HomeProduct from '../../components/front/HomeProduct.vue'
import HomeNews from '../../components/front/HomeNews.vue'

export default {
  components: {
    HomeBanner,
    HomeAbout,
    HomeProduct,
    HomeNews
  }
}
</script>