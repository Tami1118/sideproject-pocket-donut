<template>
  <div class="text-primary fw-bold fs-5">產品列表 Products List</div>
  <AdminProductsList></AdminProductsList>
</template>


<script>
import AdminProductsList from '../../components/admin/ProductsList.vue'

export default {
  components: {
    AdminProductsList,
  },
}
</script>