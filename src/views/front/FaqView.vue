<template>
  <bannerPages :view="viewTitle"></bannerPages>

  <section class="section section-faq">
    <div class="container py-4">
      <h4 class="text-primary fw-bold">
        <span class="material-symbols-outlined text-primary"> not_listed_location </span>
        商品常見問題
      </h4>
      <div class="card fqa-card p-4 border-0">
        <div class="accordion accordion-flush" id="user-fqa">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fqa-one"
                aria-expanded="false"
                aria-controls="fqa-one"
              >
                Q 01. 請問素食者可以食用嗎？
              </button>
            </h2>
            <div
              id="fqa-one"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#user-fqa"
            >
              <div class="accordion-body">
                Pocket Donut 甜甜圈系列為蛋奶素，若您為蛋奶素者或全素者，不建議您食用。
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fqa-two"
                aria-expanded="false"
                aria-controls="fqa-two"
              >
                Q 02. 甜甜圈保存方式？
              </button>
            </h2>
            <div
              id="fqa-two"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#user-fqa"
            >
              <div class="accordion-body">
                甜甜圈為當天新鮮製作、為能品嚐最新鮮美味的商品，請儘早食用完畢。若放置隔夜食用，口感會有所差異，內含饀料商品，請在購買後24小時內食用完畢。
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fqa-three"
                aria-expanded="false"
                aria-controls="fqa-three"
              >
                Q 03. 包裝盒的個數如何計算？
              </button>
            </h2>
            <div
              id="fqa-three"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#user-fqa"
            >
              <div class="accordion-body">
                為了保持甜甜圈的美觀及完整性，1-4 個甜甜圈將用紙袋包裝，5-7 個則是以小紙盒裝，8-10
                則是以大紙盒來包裝。
                <br />
                若您有特殊需求，可在服務人員為您包裝前告知，Mister Donut將盡力滿足您的需求！
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fqa-four"
                aria-expanded="false"
                aria-controls="fqa-four"
              >
                Q 04. 可以使用什麼支付方式呢？
              </button>
            </h2>
            <div
              id="fqa-four"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#user-fqa"
            >
              <div class="accordion-body">
                為了保持甜甜圈的美觀及完整性，1-4 個甜甜圈將用紙袋包裝，5-7 個則是以小紙盒裝，8-10
                則是以大紙盒來包裝。
                <br />
                若您有特殊需求，可在服務人員為您包裝前告知，Mister Donut將盡力滿足您的需求！
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button
                class="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fqa-five"
                aria-expanded="false"
                aria-controls="fqa-five"
              >
                Q 05. 預點單筆訂單有數量限制嗎？
              </button>
            </h2>
            <div
              id="fqa-five"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#user-fqa"
            >
              <div class="accordion-body">
                每筆訂單無訂購限制，訂單送出後無法取消或更改，請務必確認定內容正確再結帳。
                <br />
                若您臨時無法取餐，可委由他人代取，請提供您該筆訂單明細截圖(含取餐編號)給取餐人，以利代取。
                為確保點餐品質，若遲到超過取餐時間兩小時尚未取餐，系統自動視為訂單完成，怒不提供產品及退款，也無法提供延後取餐。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-faq {
  min-height: 100vh;
  background-color: #fef8f8;
}
.fqa-card {
  border-radius: 2rem;
}
.accordion-body {
  text-align: justify;
}
</style>

<script>
import bannerPages from '../../components/front/BannerPages.vue'

export default {
  data(){
    return {
      viewTitle: {
        title_tw: '常見問題',
        title_en: 'fqa'
      },
    }
  },
  components: {
    bannerPages
  }

}
</script>