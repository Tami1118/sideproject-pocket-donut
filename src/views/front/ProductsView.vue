<template>
  <main style="min-height: 80vh">
    <div class="container my-5">
      <div class="row">
        <!-- 產品類別 -->
        <div class="col-12 col-lg-3"></div>

        <!-- 產品列表 -->
        <div class="col-12 col-lg-9">
          <section class="section products_list">
            <div class="row row-cols-sm-2 row-cols-lg-3 mt-4 gy-4">
              <ProductsList />
            </div>
            <div class="mt-4">
              <Pagination :pages="pagination" :get-list="getProducts"></Pagination>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/stores/productStore'
import ProductsList from '@/components/front/ProductsList.vue'
import Pagination from '@/components/PaginationView.vue'

export default {
  components: {
    ProductsList,
    Pagination
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
  },
  computed: {
    ...mapState(productStore, ['pagination'])
  }
}
</script>