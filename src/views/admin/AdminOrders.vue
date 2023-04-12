<template>
  <div class="text-primary fw-bold fs-5">訂單列表 Orders List</div>
  <OrdersList></OrdersList>
</template>

<script>
import OrdersList from '../../components/admin/OrderList.vue'

export default {
  components: {
    OrdersList,
  }
}
</script>