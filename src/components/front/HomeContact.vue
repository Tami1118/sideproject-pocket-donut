<template>
  <section class="section home-contact">
    <div class="container py-5 px-5">
      <div class="section-title">
        <small class="d-block text-primary fw-bold">04</small>
        <h2 class="section-main-title mb-4">
          <div class="fs-1 fw-bold">Contact</div>
          <div class="fs-6 ms-3">聯絡我們</div>
        </h2>
      </div>
      <div class="section-content">
        <div class="row row-cols-md-2 gy-5">
          <div class="col-12 col-lg-5 flex-y-center">
            <div class="home-contact-info">
              <div class="d-flex align-items-center">
                <span class="badge bg-white text-primary rounded-pill me-2"> 店面地址 </span>
                <div>新北市板橋區中山路二段</div>
              </div>
              <div class="d-flex align-items-center my-2">
                <span class="badge bg-white text-primary rounded-pill me-2"> 聯絡電話 </span>
                <div>(02)2987-654-321</div>
              </div>
              <div class="d-flex align-items-center">
                <span class="badge bg-white text-primary rounded-pill me-2"> 營業時間 </span>
                <div>每週一至週日 09:30-21:30</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-7">
            <iframe
              class="home-contact-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.4605126985643!2d121.47670267950669!3d25.01844128405811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a83a6b4795fd%3A0x8ad9ab22333e21c3!2zMjIw5paw5YyX5biC5p2_5qmL5Y2A5Lit5bGx6Lev5LqM5q61!5e0!3m2!1szh-TW!2stw!4v1679562907101!5m2!1szh-TW!2stw"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.home-contact {
  background-color: #fff5f5;
}
.home-contact-map {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 1rem;
}
</style>