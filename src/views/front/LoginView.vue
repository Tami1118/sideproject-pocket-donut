<template>
  <UserNavbar></UserNavbar>

  <div class="login-page" style="height: 100vh; padding-top: 96px; width: 100%">
    <div class="row h-100">
      <div class="col d-none d-md-block h-100 p-0 position-relative">
        <img
          class="login-image"
          src="https://i.pinimg.com/originals/c9/c2/7a/c9c27a60fb9600d0a45cb892f5dbbdf4.jpg"
          alt="donuts"
        />
        <div
          class="login-image-text position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-end align-items-center pe-5"
        >
          <div class="login-slogan d-flex flex-column text-end">
            <div class="text-white fs-1 fw-bold">Pocket donut</div>
            <div class="text-white fs-6 mt-2">Small but Sweet your life.</div>
          </div>
        </div>
      </div>

      <div class="col h-100 d-flex flex-column align-items-center pt-5">
        <div class="login-form card border-0 p-5 my-3 rounded-5">
        <div class="login-logo text-center">
          <img
            src="../../assets/images/pocket donut_logo(r).png"
            style="height: 6rem"
            alt="Pocket donut logo"
          />
        </div>
          <div class="card-title mt-5 text-center">
            <div class="fs-5 text-secondary fw-semibold">後台登入系統</div>
            <div class="fs-6 text-secondary mt-2">Dashboard</div>
          </div>
          <form class="form my-3">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                placeholder="Enter your email."
                id="username"
                v-model="user.username"
              />
              <label for="username">Email</label>
            </div>
            <div class="form-floating mt-3">
              <input
                type="password"
                class="form-control"
                placeholder="Enter your password"
                id="password"
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>
          </form>
          <button type="button" class="btn btn-primary btn-lg rounded-5 text-white" @click="login">
            Login
          </button>
        </div>
        <small class="login-copy text-center"> Copyright &copy; 2023 Pocket Dount</small>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  background-color: #fff7f7;
}
.login-image{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.login-image-text {
  background-color: #2a2933a9;
}
.login-form {
  width: 350px;
  box-shadow: 5px 5px 15px #d2d2d240;
}
.login-copy {
  color: var(--bs-toast-header-color);
  font-size: 14px;
}
</style>

<script>
const { VITE_URL } = import.meta.env
import UserNavbar from '../../components/front/UserNavbar.vue'

export default {
  components: {
    UserNavbar
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const url = `${VITE_URL}/admin/signin`
      this.$http
        .post(url, this.user)
        .then((res) => {
          console.log('登入成功', res)
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${expired}`

          // 轉跳頁面
          this.$router.push('/admin');
        })
        .catch(() => {
          alert('登入失敗，請重新登入');
          
          // 確認表單清空的函式
          this.user = '';
        })
    }
  }
}
</script>