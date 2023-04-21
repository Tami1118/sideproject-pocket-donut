<template>
  <main style="min-height: 80vh">
    <div class="container my-5">
      <section class="section section-faq">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <!-- 麵包屑 -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb py-2" style="font-weight: 500">
                <li class="breadcrumb-item">
                  <RouterLink class="router_link text-primary" to="/">首頁</RouterLink>
                </li>
                <li class="breadcrumb-item">
                  <RouterLink class="router_link text-primary" to="/faq">常見問題</RouterLink>
                </li>
              </ol>
            </nav>

            <!-- 常見問題 -->
            <h4 class="fw-bold text-primary">
              <i class="bi bi-patch-question-fill"></i>
              常見問題
            </h4>

            <div class="accordion my-3" id="faq">
              <template v-for="faq in faqs" :key="faq.id">
                <div class="accordion-item">
                  <h2 class="accordion-header" :id="faq.id">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      :data-bs-target="`#${faq.target}`"
                      :aria-controls="faq.target"
                    >
                      {{ faq.title }}
                    </button>
                  </h2>
                  <div
                    class="accordion-collapse collapse"
                    :id="faq.target"
                    :aria-labelledby="faq.id"
                    data-bs-parent="#faq"
                  >
                    <div
                      class="accordion-body"
                      v-html="faq.content"
                      style="text-align: justify"
                    ></div>
                  </div>
                </div>
              </template>
            </div>

          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      faqs
    }
  }
}

const faqs = [
  {
    id: 'fqa-1',
    target: 'fqa-one',
    title: '請問素食者可以食用嗎？',
    content:
      '<p>Pocket Donut 甜甜圈系列為 <span class="text-primary fw-bold">蛋奶素</span>，若您為蛋奶素者或全素者，不建議您食用。</p>'
  },
  {
    id: 'fqa-2',
    target: 'fqa-two',
    title: '甜甜圈保存方式？',
    content:
      '<p>甜甜圈為當天新鮮製作、為能品嚐最新鮮美味的商品，請儘早食用完畢。若放置隔夜食用，口感會有所差異，內含饀料商品，請在 <span class="text-primary fw-bold">購買後24小時內食用完畢</span>。</p>'
  },
  {
    id: 'fqa-3',
    target: 'fqa-three',
    title: '包裝盒的個數如何計算？',
    content:
      '<p>為了保持甜甜圈的美觀及完整性，1-4 個甜甜圈將用紙袋包裝，5-7 個則是以小紙盒裝，8-10則是以大紙盒來包裝。</p><p class="mt-1">若您有特殊需求，可在服務人員為您包裝前告知，Mister Donut將盡力滿足您的需求！</p>'
  },
  {
    id: 'fqa-4',
    target: 'fqa-four',
    title: '預點單筆訂單有數量限制嗎？',
    content:
      '<p>每筆訂單無訂購限制，訂單送出後無法取消或更改，請務必確認定內容正確再結帳。</p><p class="mt-1">若您臨時無法取餐，可委由他人代取，請提供您該筆訂單明細截圖(含取餐編號)給取餐人，以利代取。為確保點餐品質，若遲到超過取餐時間兩小時尚未取餐，系統自動視為訂單完成，怒不提供產品及退款，也無法提供延後取餐。</p>'
  },
  {
    id: 'fqa-5',
    target: 'fqa-five',
    title: '付款方式有哪些？',
    content:
      `<div><span class="text-primary fw-bold">線上預點</span> 可選擇付款方式如下：
        <ul class="ps-3">
          <li>1. 到店付款</li>
          <li>2. 信用卡</li>
        </ul>
      </div>
      <div><span class="text-primary fw-bold">店內購物</span> 可選擇付款方式如下：
        <ul class="ps-3">
          <li>1. 現金</li>
          <li>2. 信用卡</li>
          <li>3. Line Pay</li>
        </ul>
      </div>`
  },
]
</script>