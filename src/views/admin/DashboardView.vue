<template>
  <dashboard-navbar></dashboard-navbar>
  <router-view style="padding-top: 96px"></router-view>
</template>

<script>
const { VITE_URL } = import.meta.env
import { RouterView } from 'vue-router'
import DashboardNavbar from '../../components/admin/DashboardNavbar.vue'

export default {
  components: {
    RouterView,
    DashboardNavbar
  },
  mounted() {
    this.setCookie();
    this.checkAdmin()
  },
  methods: {
    setCookie() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common['Authorization'] = token
    },
    checkAdmin(){
      const url = `${VITE_URL}/api/user/check`;
      this.$http.post(url)
        .then(() => {
          console.log('身份驗證成功')
        })
        .catch(err => {
          alert(err.response.data.message)
          this.$router.push('/login');
        })
    }
  }
}
</script>