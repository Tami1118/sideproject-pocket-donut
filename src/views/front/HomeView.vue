<template>
  <div>
    <HomeBanner></HomeBanner>
    <HomeAbout></HomeAbout>
    <HomeProduct></HomeProduct>
    <HomeNews></HomeNews>
    <HomeContact></HomeContact>
  </div>
</template>

<script>
import HomeBanner from '../../components/front/HomeBanner.vue'
import HomeAbout from '../../components/front/HomeAbout.vue'
import HomeProduct from '../../components/front/HomeProduct.vue'
import HomeNews from '../../components/front/HomeNews.vue'
import HomeContact from '../../components/front/HomeContact.vue'

export default {
  components: {
    HomeBanner,
    HomeAbout,
    HomeProduct,
    HomeNews,
    HomeContact
  }
}
</script>