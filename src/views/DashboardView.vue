<template>
  <admin-navbar></admin-navbar>
  <div class="page-background">
    <div class="container mt-4" v-if="this.status === true">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env
import { RouterView } from 'vue-router'
import AdminNavbar from '../components/admin/AdminNavbar.vue'

export default {
  components: {
    RouterView,
    AdminNavbar
  },
  data() {
    return {
      status: false
    }
  },
  mounted() {
    this.checkAdmin()
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common['Authorization'] = token
      const url = `${VITE_URL}/api/user/check`
      this.$http
        .post(url)
        .then(res => {
          if(!res.data.success){
            // res.data.success不為 true, 回到login頁面
            this.$router.push('/login');
          }else{
            this.status = true;
          }
        })
    }
  }
}
</script>