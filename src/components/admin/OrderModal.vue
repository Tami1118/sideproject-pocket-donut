<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="exampleModalLabel">訂單編輯</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="user_info">
              <p class="fs-5">訂購人資料</p>
              <form class="form">
                <div class="user_info_item">
                  <label for="orderName" class="form-label">姓名</label>
                  <input
                    id="orderName"
                    class="form-control"
                    type="text"
                    :value="tempOrder.user?.name"
                  />
                </div>
                <div class="user_info_item">
                  <label for="orderTel" class="form-label">聯絡電話</label>
                  <input
                    id="orderTel"
                    class="form-control"
                    type="text"
                    :value="tempOrder.user?.tel"
                  />
                </div>
                <div class="user_info_item">
                  <label for="orderEmail" class="form-label">信箱</label>
                  <input
                    id="orderEmail"
                    class="form-control"
                    type="email"
                    :value="tempOrder.user?.email"
                  />
                </div>
                <div class="user_info_item">
                  <label for="orderShop" class="form-label">取件門市</label>
                  <input
                    id="orderShop"
                    class="form-control"
                    type="text"
                    :value="tempOrder.user?.address"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="col-12 col-md-7">
            <div class="order_info mt-3">
              <p class="fs-5">訂單資料</p>
              <table class="table">
                <tr>
                  <td class="py-2">訂購編號</td>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <td class="py-2">訂購日期</td>
                  <td>{{ tempOrder.create_at }}</td>
                </tr>
                <tr>
                  <td class="py-2">付款總額</td>
                  <td>{{ tempOrder.total }}</td>
                </tr>
                <tr>
                  <td>付款狀態</td>
                  <td>
                    <select name="" id="" class="form-select" v-model="tempOrder.is_paid">
                      <option :value="false">未付款</option>
                      <option :value="true">已付款</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="py-2">付款日期</td>
                  <td>{{ tempOrder.paid_date }}</td>
                </tr>
              </table>
            </div>
            <div class="order_products_info">
              <p class="fs-5">訂單明細</p>
              <table class="table table-borderless">
                <thead>
                  <tr class="border-bottom">
                    <th></th>
                    <th width="">產品名稱</th>
                    <th width="">數量</th>
                    <th width="">單價</th>
                    <th width="">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="admin_item_list"
                    v-for="product in tempOrder.products"
                    :key="product.id"
                  >
                    <td>
                      <img
                        :src="product.product.imageUrl"
                        class="rounded-3"
                        style="width: 4rem; height: 4rem; object-fit: cover"
                        :alt="product.product.title"
                      />
                    </td>
                    <td>{{ product.product.title }}</td>
                    <td>{{ product.product.num }}</td>
                    <td>{{ product.product.price }}</td>
                    <td>{{ product.product.num * product.product.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        <button type="button" class="btn btn-primary" @click="$emit('update-order', updateOrder)">
          更新
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      tempOrder: {}
    }
  },
  watch: {
    order() {
      this.tempOrder = this.order
    }
  }
}
</script>