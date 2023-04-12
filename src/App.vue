<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { RouterView } from 'vue-router'

export default{
  components: {
    RouterView
  },
  mounted(){
    AOS.init({
      offset: 150,
      delay: 50,
      duration: 500,
    })
  }
}
</script>