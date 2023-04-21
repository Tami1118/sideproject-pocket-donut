<template>
  <main style="min-height: 80vh">
    <!-- <div class="about_banner">
      <img style="width: 100%; height: 100%; object-fit: cover" src="https://images.unsplash.com/photo-1618426703575-8dd308969a29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGRvbnV0fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1200&q=60" alt="">
      <div class="box_banner">關於</div>
    </div> -->

    <!-- breadcrumb -->

    <div class="container my-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb py-2" style="font-weight: 500">
          <li class="breadcrumb-item">
            <RouterLink class="router_link text-primary" to="/">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink class="router_link text-primary" to="/about">關於我們</RouterLink>
          </li>
        </ol>
      </nav>

      <section class="section section_about">
        <h2>About</h2>
        <div class="row justify-content-center">
          <div class="col-12 pt-5 p-4 text-center col-md-7">
            <h2 class="text-primary fs-3 fw-bold mb-4">追求美味創造的驚喜</h2>
            <p style="font-size: 1.1rem">
              成立於 2023 年的甜甜圈品牌<br />
              源自於一群熱愛和甜品及美食創新的追求<br />
              作為新興的甜品品牌 <span class="text-primary fw-bold">Pocket Donut</span><br />
              致力於將最優質的材料和最美味的風味<br />
              注入到每一個甜甜圈中<br />
              讓顧客在每一口中感受到不同的驚喜和快樂
            </p>
          </div>
        </div>

        <div class="row justify-content-between g-4">
          <div class="col-12 col-md-4">
            <div style="height: 400px">
              <img
                src="https://images.unsplash.com/photo-1608019526927-c4ea27a542a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29va2luZyUyMGVnZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                class="w-100 rounded-5"
                style="height: 100%; object-fit: cover"
                alt=""
              />
            </div>
            <div class="mt-3" style="text-align: justify">
              <h3 class="text-primary text-center fs-3 fw-bold mb-3">口袋裡的美味</h3>
              <p class="">
                Pocket Donut
                的名字來源於甜甜圈的形狀和方便攜帶的特點。他們的甜甜圈大小適中，可以輕鬆放入口袋中，讓人們隨時隨地都能品嘗到美味的甜甜圈
              </p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div style="height: 400px">
              <img
                src="https://images.unsplash.com/photo-1609873539821-3b46e00a0313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                class="w-100 rounded-5"
                style="height: 100%; object-fit: cover"
                alt=""
              />
            </div>
            <div class="mt-3" style="text-align: justify">
              <h3 class="text-primary text-center fs-3 fw-bold mb-3">手作嚴選把關</h3>
              <p class="">
                甜甜圈採用最優質的材料、及嚴謹的手工製作流程，讓每個顧客都可以品嘗到新鮮、美味的口感。甜甜圈口感鬆軟，甜度適中
              </p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div style="height: 400px">
              <img
                src="https://images.unsplash.com/photo-1609873539027-d4ad052cb6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
                class="w-100 rounded-5"
                style="height: 100%; object-fit: cover"
                alt=""
              />
            </div>
            <div class="mt-3" style="text-align: justify">
              <h3 class="text-primary text-center fs-3 fw-bold mb-3">每一口都是幸福滋味</h3>
              <p class="">
                每個人都可以輕鬆品嚐到這份美味並致力提供最好的服務和優質的產品，讓每一位顧客都能感受到
                <strong>Pocket Donut</strong> 對甜甜圈的熱愛與堅持
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="section section_store">
        <h2>門市據點</h2>
        <template v-if="storesInfo.length">
          <div class="store_group">
            <div class="store_item my-3" v-for="store in storesInfo" :key="store.title">
              <div class="row">
                <div class="col-12 col-sm-6" style="height: 200px">
                  <div v-html="store.map" style="height: 100%"></div>
                </div>
                <div class="col-12 col-sm-6 p-3 d-flex flex-column justify-content-center">
                  <h3 class="fs-4">{{ store.title }}</h3>
                  <ul class="nav flex-column">
                    <li class="mb-1 d-md-flex nav-item">
                      <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                      {{ store.address }}
                    </li>
                    <li class="mb-1 d-md-flex nav-item">
                      <i class="bi bi-envelope-fill text-primary me-2"></i>
                      <a :href="`mailto: ${store.email}`" class="text-dark text-decoration-none">{{
                        store.email
                      }}</a>
                    </li>
                    <li class="mb-1 d-md-flex nav-item">
                      <i class="bi bi-telephone-fill text-primary me-2"></i>
                      <a :href="`tel: ${store.tel}`" class="text-dark text-decoration-none">{{
                        store.tel
                      }}</a>
                    </li>
                    <li class="mb-1 d-md-flex nav-item">
                      <i class="bi bi-clock-fill text-primary me-2"></i>
                      {{ store.time }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
.store_image {
  border: 0;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      storesInfo
    }
  }
}

const storesInfo = [
  {
    title: '台北總店',
    tel: '02-8765-4321',
    email: 'pocket_01@gmail.com',
    address: '台北市中山區中山路二段',
    time: '每週一至週日 09:30-21:30',
    map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.290801814085!2d121.5227773!3d25.058131000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a94f94468bad%3A0x48a01b9542949d54!2zMTA0OTHlj7DljJfluILkuK3lsbHljYDkuK3lsbHljJfot6_kuozmrrU!5e0!3m2!1szh-TW!2stw!4v1681894120537!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    class="store_image"></iframe>`
  },
  {
    title: '新北店',
    tel: '02-2345-6789',
    email: 'pocket_02@gmail.com',
    address: '新北市板橋區中山路二段',
    time: '每週一至週日 09:30-21:30',
    map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.4605126985643!2d121.47670267950669!3d25.01844128405811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a83a6b4795fd%3A0x8ad9ab22333e21c3!2zMjIw5paw5YyX5biC5p2_5qmL5Y2A5Lit5bGx6Lev5LqM5q61!5e0!3m2!1szh-TW!2stw!4v1679562907101!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    class="store_image"></iframe>`
  },
  {
    title: '台中店',
    tel: '04-8765-4321',
    email: 'pocket_03@gmail.com',
    address: '台中市臺灣大道一段',
    time: '每週一至週日 09:30-21:30',
    map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.833942159753!2d120.67954749999997!3d24.142469199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d6d36a9420d%3A0xf92c50bf0a784062!2z5Y-w5Lit5biC6Ie654Gj5aSn6YGT5LiA5q61!5e0!3m2!1szh-TW!2stw!4v1681894244615!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    class="store_image"></iframe>`
  },
  {
    title: '台南店',
    tel: '06-2345-6789',
    email: 'pocket_04@gmail.com',
    address: '台南市中西區西門路二段',
    time: '每週一至週日 09:30-21:30',
    map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.7797412817818!2d120.19940749999998!3d22.995125600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e766388355737%3A0x2f52704fef561ca6!2zNzAw5Y-w5Y2X5biC5Lit6KW_5Y2A6KW_6ZaA6Lev5LqM5q61!5e0!3m2!1szh-TW!2stw!4v1681894337510!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    class="store_image"></iframe>`
  },
  {
    title: '高雄店',
    tel: '07-8765-4321',
    email: 'pocket_05@gmail.com',
    address: '高雄市中正四路',
    time: '每週一至週日 09:30-21:30',
    map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.6730158043883!2d120.29366199999998!3d22.628682499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0463316ff345%3A0x282033edd7eff3b4!2z6auY6ZuE5biC5Lit5q2j5Zub6Lev!5e0!3m2!1szh-TW!2stw!4v1681894402146!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    class="store_image"></iframe>`
  }
]
</script>
