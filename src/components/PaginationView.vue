<template>
  <div class="my-3 flex-xy-center">
    <nav aria-label="Products's Pagination">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a class="page-link" @click.prevent="getProducts(pages.current_page - 1)">上一頁</a>
        </li>

        <li
          class="page-item"
          :class="{ active: pages.current_page === page }"
          v-for="page in pages.total_pages"
          :key="page + 123"
        >
          <a class="page-link" @click.prevent="getProducts(page)">{{ page }}</a>
        </li>

        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a class="page-link" @click.prevent="getProducts(pages.current_page + 1)">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages', 'getProducts']
}
</script>