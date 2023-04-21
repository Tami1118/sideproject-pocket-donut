<template>
  <section class="section home-about bg-white">
    <div class="container py-5 px-5">
      <div class="section-title">
        <small class="d-block text-primary fw-bold">01</small>
        <h2 class="section-main-title mb-4">
          <div class="fs-1 fw-bold">Who we are?</div>
          <div class="fs-6 ms-3">關於我們</div>
        </h2>
      </div>
      <div class="section-content">
        <div class="row mb-5">
          <div class="col-12 col-md-6 mb-4">
            <img
              class="about-image"
              src="https://images.unsplash.com/photo-1609873539821-3b46e00a0313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6 flex-x-center flex-column">
            <div class="about-item-title fw-bold fs-2 text-primary">Pocket Donut</div>
            <div class="about-item-content">
              <strong>Pocket Donut</strong>
              甜甜圈採用最優質的材料、及嚴謹的手工製作流程，讓每個顧客都可以品嘗到新鮮、美味的口感。甜甜圈口感鬆軟，甜度適中，既可以當作甜點享用，也可以隨手帶走，非常方便。此外，我們的甜甜圈有多種口味，包括原味、巧克力、草莓等等，滿足多樣顧客口味的需求。
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12 col-md-6 mb-4 order-md-1">
            <img
              class="about-image"
              src="https://images.unsplash.com/photo-1609873539027-d4ad052cb6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6 flex-x-center flex-column">
            <div class="about-item-title fw-bold fs-2 text-primary">簡單幸福滋味</div>
            <div class="about-item-content">
              <strong>Pocket Donut</strong>
              的甜甜圈不僅美味、價格實惠，每個人都可以輕鬆品嚐到這份美味。我們致力於提供最好的服務和最優質的產品，讓每一位顧客都能感受到 <strong>Pocket Donut</strong> 對甜甜圈的熱愛與堅持。
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
// .section {
//   border-radius: 5rem 5rem 0 0;
//   margin-top: -5rem;
// }
.section-content{
  padding-bottom: 4rem;
}
.section-main-title {
  display: flex;
  align-items: center;
}
.about-item-content {
  text-align: justify;
}
.about-image {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 4rem;
}
</style>