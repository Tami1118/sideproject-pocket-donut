<template>
  <div class="my-3">
    <table class="table">
      <tbody>
        <tr>
          <td colspan="2" class="text-end">
            共計
            <span class="text-primary fw-bold fs-5">{{ cartNum }}</span> 件商品
          </td>
        </tr>
        <tr>
          <td>商品金額</td>
          <td class="text-end">{{ total }}</td>
        </tr>
        <tr>
          <td>優惠折扣</td>
          <td class="text-end">-{{ total - final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="fw-bold" style="font-size: 1.2rem">
          <td>訂單總額</td>
          <td class="text-end text-primary">NT$ {{ (final_total).toFixed(0) }}</td>
        </tr>
      </tfoot>
    </table>
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
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart', 'total', 'final_total', 'cartNum'])
  }
}
</script>