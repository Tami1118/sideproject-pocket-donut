<template>
  <div class="text-primary fw-bold fs-5">最新消息 News List</div>
  <NewsList></NewsList>
  
</template>

<script>
import NewsList from '../../components/admin/NewsList.vue'

export default {
  components: {
    NewsList
  }
}
</script>