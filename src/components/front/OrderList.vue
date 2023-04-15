<template>
  <table class="table table-borderless">
    <thead>
      <tr class="fw-bold">
        <th width="30%">商品名稱</th>
        <th width="30%"></th>
        <th width="20%" class="text-center">數量</th>
        <th width="20%" class="text-end">小計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in order.products" :key="item.id" class="align-middle border-top">
        <td>
          <img
            class="item_image rounded-4 w-100"
            :src="item.product.imageUrl"
            :alt="item.product.title"
            style="height: 160px; object-fit: cover"
          />
        </td>
        <td>{{ item.product.title }}</td>
        <td class="text-center">{{ item.qty }}</td>
        <td class="text-end fw-bold text-primary">$ {{ Math.round(item.final_total) }}</td>
      </tr>
    </tbody>
    <tfoot class="border-top">
      <tr class="text-end">
        <td colspan="2">付款總額</td>
        <td colspan="2" class="fw-bold fs-5 text-primary">NT$ {{ Math.round(order.total) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import orderStore from '@/stores/orderStore'

export default {
  mounted() {
    this.getOrder()
  },
  methods: {
    ...mapActions(orderStore, ['getOrders', 'getOrder'])
  },
  computed: {
    ...mapState(orderStore, ['order', 'products'])
  }
}
</script>