<template>
  <div class="text-primary fw-bold fs-5">最新消息 News List</div>
  <AdminNews></AdminNews>
  
</template>

<script>
import AdminNews from '../../components/admin/NewsList.vue'

export default {
  components: {
    AdminNews
  }
}
</script>