<template>
  <main class="products">
    <div class="container">
      <div class="row">
        <!-- 產品分類 -->
        <div class="col-12 col-lg-3">
          <section class="section product_category"></section>
        </div>

        <!-- 產品列表 -->
        <div class="col-12 col-lg-9">
          <section class="section products_list">
            <div class="row row-cols-lg-2 row-cols-xl-3 mt-4 gy-4">
              <div class="col-12" v-for="product in products" :key="product.id">
                <div class="card h-100 shadow-sm">
                  <router-link
                    :to="`/product/${product.id}`"
                    class="text-decoration-none text-dark"
                  >
                    <div class="card_img">
                      <img
                        :src="product.imageUrl"
                        class="card-img-top"
                        style="width: 100%; aspect-ratio: 1/1; object-fit: cover"
                        :alt="product.title"
                      />
                    </div>
                    <div class="px-4 pt-3">
                      <div class="badge bg-primary text-white rounded-pill">
                        {{ product.category }}
                      </div>
                      <div class="my-1 fs-3 fw-bold">{{ product.title }}</div>
                      <div class="fw-bold text-primary d-flex align-items-end">
                        <div class="fs-4">NT$ {{ product.price }} /</div>
                        <small class="fs-5"> {{ product.unit }}</small>
                      </div>
                    </div>
                  </router-link>
                  <div class="card-foot px-4 pt-3 pb-4 d-flex">
                    <select id="productNum" class="form-select text-center" v-model="qty">
                      <option :value="i" v-for="i in 20" :key="`${i}123`">{{ i }}</option>
                    </select>
                    <button
                      type="button"
                      class="btn btn-primary ms-2 px-3 text-nowrap rounded-4"
                      @click="addToCart(product.id, qty)"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <PaginationView :pages="pagination" :get-list="getProducts"></PaginationView>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import PaginationView from '../PaginationView.vue'
import cartStore from '../../stores/cartStore'


export default {
  data() {
    return {
      products: [],
      pagination: {},
      qty: 1
    }
  },
  components: {
    RouterLink,
    PaginationView
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/?page=${pagination}`
      this.$http.get(url).then((res) => {
        console.log('產品列表:', res)
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    },
    ...mapActions(cartStore, ['addToCart'])
  }
}
</script>