<template>
  <user-navbar></user-navbar>
  <router-view style="padding-top: 96px"></router-view>
  <user-footer></user-footer>
</template>

<script>
import { RouterView } from 'vue-router'
import UserNavbar from '../components/front/UserNavbar.vue'
import UserFooter from '../components/front/UserFooter.vue'

export default {
  components: {
    RouterView,
    UserNavbar,
    UserFooter
  }
}
</script>