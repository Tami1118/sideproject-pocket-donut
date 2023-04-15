<template>
  <table class="table table-borderless">
    <tbody>
      <tr>
        <td class="text-end">商品金額</td>
        <td class="text-end">$ {{ Math.round(total) }}</td>
      </tr>
      <tr>
        <td class="text-end">優惠折扣</td>
        <td class="text-end">- $ {{ Math.round(total) - Math.round(final_total) }}</td>
      </tr>
    </tbody>
    <tfoot class="border-top">
      <tr class="fw-bold text-end"  style="font-size: 1.2rem">
        <td>訂單總額</td>
        <td class="text-end text-primary">NT$ {{ Math.round(final_total) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapState } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'cartNum'])
  }
}
</script>