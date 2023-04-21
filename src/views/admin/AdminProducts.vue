<template>
  <main class="admin_product">
    <div class="text-primary fw-bold fs-5">產品列表 Products List</div>
    <ProductsList></ProductsList>
  </main>
</template>


<script>
import ProductsList from '@/components/admin/ProductsList.vue'

export default {
  components: {
    ProductsList,
  },
}
</script>