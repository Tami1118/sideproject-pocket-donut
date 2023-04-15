<template>
  <table class="table">
    <thead>
      <tr class="fw-bold">
        <th width="8%" class="text-end"></th>
        <th width="30%">商品名稱</th>
        <th width="22%"></th>
        <th width="20%" class="text-center">數量</th>
        <th width="20%" class="text-end">小計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cart.carts" :key="item.id" class="align-middle">
        <td>
          <button type="button" class="bg-white border-0" @click="removeCartItem(item.id)">
            <i class="bi bi-trash3 text-light fs-5"></i>
          </button>
        </td>
        <td>
          <img
            class="item_image rounded-4 w-100"
            :src="item.product.imageUrl"
            :alt="item.product.title"
            style="height: 160px; object-fit: cover"
          />
        </td>
        <td>{{ item.product.title }}</td>
        <td>
          <select
            class="form-select me-1 text-center"
            v-model="item.qty"
            @change="updataCart(item)"
            :disabled="item.id === loadingItem"
            >
              <option :value="i" v-for="i in 20" :key="i + 123">{{ i }}</option>
          </select>
        </td>
        <td class="text-end fw-bold text-primary">$ {{ item.product.price * item.qty }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5" class="text-end">共計
          <span class="text-primary fw-bold">{{ Math.round(cartNum) }}</span> 件商品
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  props: ['step'],
  methods: {
    ...mapActions(cartStore, ['removeCartItem', 'updataCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'cartNum', 'loadingItem'])
  }
}
</script>