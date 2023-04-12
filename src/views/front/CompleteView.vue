<template>
  <main>
    <div class="container my-5">

      <!-- 購物車時間軸 -->
      <div class="cart_step mb-4">
        <ol class="step_group" style="padding-left: 0">
          <li class="step_item active">
            <div class="step_num">1</div>
            <div class="step_text">確認購物車</div>
          </li>
          <li class="step_item active">
            <div class="step_num">2</div>
            <div class="step_text">填寫資料</div>
          </li>
          <li class="step_item active">
            <div class="step_num">3</div>
            <div class="step_text">完成訂單</div>
          </li>
        </ol>
      </div>

      <!-- 訂單成立資訊 -->
      <div class="complete_info mb-4" style="width: 100%">
        <div class="border rounded-4 p-4">
          <div class="card-header py-4 text-center">
            <h1 class="fs-4">訂單已成立！</h1>
            <p>我們將盡快為您準備餐點，請於預定時間到店取貨唷~</p>
            <RouterLink to="/products" class="btn btn-primary">繼續購物</RouterLink>
          </div>

          <table class="table table-borderless">
            <tr>
              <td width="40%" class="text-end">訂單編號</td>
              <td width="60%">2304070001</td>
            </tr>
            <tr>
              <td class="text-end">付款方式</td>
              <td>信用卡</td>
            </tr>
            <tr>
              <td class="text-end">付款狀態</td>
              <td class="text-success fw-bold">已付款</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 訂單資訊及聯絡人資訊 -->
      <div class="complete_order border rounded-4">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="order_info p-4">
              <h1 class="fs-3 mb-4">訂單資訊</h1>

              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td width="30%" class="d-md-none">
                      <img
                        src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvbnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60"
                        class="w-100"
                        style="height: 4rem; object-fit: cover; border-radius: 10px"
                        alt=""
                      />
                    </td>
                    <td width="30%">雙層巧克力</td>
                    <td width="10%" class="text-end">1</td>
                    <td width="20%" class="text-end">50</td>
                  </tr>
                  <tr>
                    <td width="30%" class="d-md-none">
                      <img
                        src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvbnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60"
                        class="w-100"
                        style="height: 4rem; object-fit: cover; border-radius: 10px"
                        alt=""
                      />
                    </td>
                    <td width="30%">雙層巧克力</td>
                    <td width="10%" class="text-end">1</td>
                    <td width="20%" class="text-end">50</td>
                  </tr>
                </tbody>
                <tfoot class="border-top">
                  <tr>
                    <td>商品金額</td>
                    <td colspan="3" class="text-end">100</td>
                  </tr>
                  <tr>
                    <td>優惠折扣</td>
                    <td colspan="3" class="text-end">- 20</td>
                  </tr>
                  <tr class="border-top">
                    <td>訂單總額</td>
                    <td colspan="3" class="text-end text-primary fw-bold">NT$ 80</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div class="col-12 col-md-7">
            <div class="person_info p-4">
              <h1 class="fs-3 mb-4">收件人資訊</h1>
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td width="30%">收件人姓名</td>
                    <td width="70%">Tami</td>
                  </tr>
                  <tr>
                    <td width="30%">收件人信箱</td>
                    <td width="70%">123@gmail.com</td>
                  </tr>
                  <tr>
                    <td width="30%">收件人電話</td>
                    <td width="70%">0987654321</td>
                  </tr>
                  <tr>
                    <td width="30%">收件人地址</td>
                    <td width="70%">新北市板橋區文化路一段</td>
                  </tr>
                  <tr>
                    <td width="30%">備註</td>
                    <td width="70%">預計09:00取貨</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>