<template>
  <dashboard-navbar></dashboard-navbar>
  <router-view></router-view>
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
        .then(res => {
          console.log('身份驗證成功');
          if(!res.data.success){
            this.$router.push('/login');
            alert('權限不足，請重新登入');
          }
        })
    }
  }
}
</script>