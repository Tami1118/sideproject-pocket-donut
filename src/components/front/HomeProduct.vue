<template>
  <section class="section home-products">
    <div class="container py-5 px-5">
      <div class="section-title">
        <small class="d-block text-primary fw-bold">02</small>
        <h2 class="section-main-title mb-4">
          <div class="fs-1 fw-bold">New Products</div>
          <div class="fs-6 ms-3">最新商品</div>
        </h2>
      </div>
      <div class="section-content">
        <div class="row row-cols-md-2 row-cols-lg-3 gy-5">
          <div class="col-12">
            <div class="product-item-pic">
              <img
                class="product-item-img"
                src="https://i.pinimg.com/564x/ff/9c/31/ff9c31ecae43d9781bbbd8099e55c1dc.jpg"
                alt=""
              />
            </div>
            <div class="product-item-content mt-3">
              <div class="badge rounded-pill bg-primary mb-1">甜甜圈</div>
              <div class="product-item-title fw-bold fs-4">
                五穀甜甜圈
                <span class="product-item-price text-primary fs-5 fw-bold float-end">NT$ 50</span>
              </div>
              <div class="product-item-info">
                <div class="product-item-descript">香濃酥脆的五穀衝擊你的味蕾</div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="product-item-pic">
              <img
                class="product-item-img"
                src="https://i.pinimg.com/564x/ff/9c/31/ff9c31ecae43d9781bbbd8099e55c1dc.jpg"
                alt=""
              />
            </div>
            <div class="product-item-content mt-3">
              <div class="badge rounded-pill bg-primary mb-1">甜甜圈</div>
              <div class="product-item-title fw-bold fs-4">
                五穀甜甜圈
                <span class="product-item-price text-primary fs-5 fw-bold float-end">NT$ 50</span>
              </div>
              <div class="product-item-info">
                <div class="product-item-descript">香濃酥脆的五穀衝擊你的味蕾</div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="product-item-pic">
              <img
                class="product-item-img"
                src="https://i.pinimg.com/564x/ff/9c/31/ff9c31ecae43d9781bbbd8099e55c1dc.jpg"
                alt=""
              />
            </div>
            <div class="product-item-content mt-3">
              <div class="badge rounded-pill bg-primary mb-1">甜甜圈</div>
              <div class="product-item-title fw-bold fs-4">
                五穀甜甜圈
                <span class="product-item-price text-primary fs-5 fw-bold float-end">NT$ 50</span>
              </div>
              <div class="product-item-info">
                <div class="product-item-descript">香濃酥脆的五穀衝擊你的味蕾</div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <router-link
            to="/products"
            class="btn btn-outline-white rounded-pill text-primary border-primary fw-bold"
            >More...</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.home-products {
  background-color: #fff5f5;
}
.product-item-img {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 4rem;
  object-fit: cover;
}
</style>