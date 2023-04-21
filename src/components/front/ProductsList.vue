<template>
  <div class="col-12" v-for="product in products" :key="product.id">
    <div class="card h-100 shadow-sm">
      <RouterLink :to="`/product/${product.id}`" class="text-decoration-none text-dark">
        <div class="card_img">
          <img
            :src="product.imageUrl"
            class="card-img-top"
            style="width: 100%; aspect-ratio: 1/1; object-fit: cover"
            :alt="product.title"
          />
        </div>
        <div class="card-body">
          <div class="badge bg-primary text-white rounded-pill">
            {{ product.category }}
          </div>
          <h3 class="my-2 fs-3 fw-bold">{{ product.title }}</h3>
          <div class="fw-bold text-primary d-flex align-items-end">
            <div class="fs-4">NT$ {{ product.price }} /</div>
            <small class="fs-5"> {{ product.unit }}</small>
          </div>
        </div>
      </RouterLink>
      <div class="card-footer bg-white pt-0">
        <button
          type="button"
          class="btn btn-primary rounded-4 w-100 text-nowrap fs-5 mb-2"
          @click="addToCart(product.id, qty)">
          <i class="bi bi-cart-plus-fill me-2"></i>
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import productStore from '@/stores/productStore'
import cartStore from '@/stores/cartStore'

export default {
  components: {
    RouterLink
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(productStore, ['getProducts'])
  },
  computed: {
    ...mapState(cartStore, ['qty']),
    ...mapState(productStore, ['products'])
  },
}
</script>