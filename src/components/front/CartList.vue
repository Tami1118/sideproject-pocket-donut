<template>
  <div class="cart_item p-3 my-3 border rounded-4" v-for="item in cart.carts" :key="item.id">
    <div class="row">
      <div class="col-4">
        <img
          class="item_image rounded-4 w-100"
          :src="item.product.imageUrl"
          :alt="item.product.title"
          style="height: 160px; object-fit: cover"
        />
      </div>
      <div class="col-8 d-flex align-items-center justify-content-between">
        <div class="fw-bold">
          <div class="fs-4">{{ item.product.title }}</div>
          <div class="fs-5 text-primary">NT$ {{ item.product.price * item.qty }}</div>
        </div>

        <div class="product_num">
          <div class="w-100 d-flex">
            <select
              class="form-select rounded-start me-1"
              v-model="item.qty"
              @change="updataCart(item)"
              :disabled="item.id === loadingItem"
            >
              <option :value="i" v-for="i in 20" :key="i + 123">{{ i }}</option>
            </select>
            <button type="button" class="btn bg-white" @click="removeCartItem(item.id)">
              <span class="material-symbols-outlined text-light"> delete </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  mounted() {
    this.getCart()
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'removeCartItem', 'updataCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'loadingItem'])
  }
}
</script>