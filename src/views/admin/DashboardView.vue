<template>
  <dashboard-navbar></dashboard-navbar>
  <div class="page-background">
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env;
import { RouterView } from 'vue-router';
import DashboardNavbar from '../../components/admin/DashboardNavbar.vue';

export default {
  components: {
    RouterView,
    DashboardNavbar
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    checkAdmin(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common['Authorization'] = token;
      const url = `${VITE_URL}/api/user/check`;
      this.$http.post(url)
        .then(() => {
          console.log('身份驗證成功');
        })
        .catch(() => {
          alert('權限不足，請重新登入');
          this.$router.push('/login');
        })
    }
  }
}
</script>