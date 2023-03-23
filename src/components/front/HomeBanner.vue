<template>
  <div>
    <div class="banner-home position-relative">
      <img
        class="banner-img"
        src="https://images.unsplash.com/photo-1631143070457-c1aecc92abbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        alt=""
      />
      <div class="banner-text absolute-xy-center flex-xy-center">
        <div class="banner-slogan text-white text-center">
          <div class="banner-logo mb-4">
            <img
              style="width: 8rem"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/ziyi/1679370005750.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Kps%2FNPZOKfdIxvuMiPh3WhmT%2BVvr7px9lmoWlyzghI3mgEEnh4lqBKOVhTzKBhXw1bKznqZl4Ueu5byKdbLuxoYgYxPKrMMwS8NKKkZA643klvFOvNNaUTowuz2%2BZvoOLcVt3upWgYG1WzehC4ttT8jRC8fxLXjSkXqxXraWd%2Blx7nmspvwek4nja8ldQA986M8VmUebx%2FL7EfJHzHVZH5ZT2CWM304vZaClAiKrcccwz0dWSUUsfbzm2YRDJz03nv94UQkGjV7NhCyclodkIWzPHvlIIhRi9Q%2FqmLUxMALaAZd6YEPfhNDCW1mH3rJlndGEtMdjMyngFDI7ZvnaNA%3D%3D"
              alt=""
            />
          </div>
          <div>
            <h1 class="fs-2">凡事求個圓、滿足幸福味蕾</h1>
            <p>Pocket donut 堅持食材、健康、美味</p>
          </div>
          <router-link to="/products" class="btn btn-outline-white text-white border-white mt-4"
            >購物去</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.banner-home {
  height: 100vh;
  z-index: -1;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.absolute-xy-center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000006c;
}
</style>
