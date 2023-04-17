<template>
  <div>
    <div class="fs-5 fw-bold border-bottom mb-1">訂單資訊</div>
    <table class="w-100">
      <tbody>
        <tr>
          <td width="40%" class="py-2">訂單編號</td>
          <td width="60%">{{ order.id }}</td>
        </tr>
        <tr>
          <td class="py-2">訂單時間</td>
          <td>{{ order.create_at }}</td>
        </tr>
        <tr class="fw-bold">
          <td class="py-2">付款總額</td>
          <td>NT ${{ Math.round(order.total) }}</td>
        </tr>
        <tr class="fw-bold">
          <td class="py-2">付款狀態</td>
          <td v-if="order.is_paid" class="text-success">已付款</td>
          <td v-else class="text-primary">未付款</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4">
    <div class="fs-5 fw-bold border-bottom mb-1">訂購人資訊</div>
    <table class="w-100">
      <tbody>
        <tr>
          <td width="40%" class="py-2">姓名</td>
          <td width="60%">{{ user.name }}</td>
        </tr>
        <tr>
          <td class="py-2">信箱</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td class="py-2">聯絡手機</td>
          <td>{{ user.tel }}</td>
        </tr>
        <tr>
          <td class="py-2">取件分店</td>
          <td>{{ user.address }}</td>
        </tr>
        <tr>
          <td class="py-2">備註</td>
          <td>{{ order.message }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import orderStore from '@/stores/orderStore'

export default {
  computed: {
    ...mapState(orderStore, ['order', 'user'])
  }
}
</script>