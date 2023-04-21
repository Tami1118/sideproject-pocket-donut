<template>
  <div class="text-primary fw-bold fs-5">最新消息 News List</div>
  <ArticlesList></ArticlesList>
  
</template>

<script>
import ArticlesList from '@/components/admin/ArticlesList.vue'

export default {
  components: {
    ArticlesList
  }
}
</script>