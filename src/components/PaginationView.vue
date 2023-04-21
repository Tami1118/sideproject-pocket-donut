<template>
  <nav aria-label="Pagination">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a class="page-link" @click.prevent="getList(pages.current_page - 1)">上一頁</a>
      </li>

      <li
        class="page-item"
        :class="{ active: pages.current_page === page }"
        v-for="page in pages.total_pages"
        :key="page + 123"
      >
        <a class="page-link" @click.prevent="getList(page)">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" @click.prevent="getList(pages.current_page + 1)">下一頁</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages', 'getList']
}
</script>