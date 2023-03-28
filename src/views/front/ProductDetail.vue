<template>
  <div class="container" style="height: 200vh">
    <div class="py-3">
      <div class="card p-3 border-0">
        <div class="row">
          <div class="col-12 col-md-6">
            <img
              :src="product.imageUrl"
              style="height: 20rem; object-fit: cover"
              class="w-100"
              alt=""
            />
          </div>
          <div class="col-12 col-md-6 d-flex flex-column">
            <div class="product-info">
              <div class="badge bg-primary rounded-pill">{{ product.category }}</div>
              <div class="item-title fs-4 my-3 fw-bold">{{ product.title }}</div>
              <div class="item-content">{{ product.descript }}</div>
              <div class="item-content">{{ product.content }}</div>
              <div class="item-price">售價 NT$ {{ product.price }}</div>
            </div>

            <div class="item-num d-flex  mt-auto">
              <button type="button" class="rounded-start border-0 px-2">
                <span class="material-symbols-outlined text-secondary"> add </span>
              </button>
              <input type="text" value="1" class="form-control rounded-0" />
              <button type="button" class="rounded-end border-0 px-2">
                <span class="material-symbols-outlined text-secondary"> remove </span>
              </button>
              <button type="button" class="text-nowrap ms-3 bg-primary border-0 rounded-5 text-white px-4">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      product: {},
      id: '-NQJ5QkGlIF1leWXv3dD'
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${this.id}`
      this.$http.get(url).then((res) => {
        console.log('單一商品', res)
        this.product = res.data.product
      })
    }
  }
}
</script>