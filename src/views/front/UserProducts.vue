<template>
  <div class="products">
    <BannerPages></BannerPages>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-3">
          <div class="product-category"></div>
        </div>
        <div class="col-12 col-md-9">
          <div class="product-list">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
              <template v-for="item in products" :key="item.id">
                <div class="col mb-3">
                  <div class="card border-0 shadow-lg">
                    <img
                      :src="item.imageUrl"
                      alt="item.title"
                      class="card-img-top"
                      style="height: 16rem; object-fit: cover"
                    />
                    <div class="card-body">
                      <div class="item-category">
                        <div class="badge rounded-pill bg-primary fw-normal">
                          {{ item.category }}
                        </div>
                      </div>
                      <div class="item-info my-3">
                        <div class="item-title mb-2 fs-4 fw-bold">
                          {{ item.title }}
                        </div>
                        <div class="item-price text-danger fw-bolder fs-5">
                          NT$ {{ item.price }}
                        </div>
                      </div>
                      <div class="w-100 d-flex">
                        <select class="form-select rounded-start">
                          <option :value="i" v-for="i in 20" :key="i + 123">{{ i }}</option>
                        </select>
                        <button type="button" class="btn bg-primary text-white px-4 ms-2">
                          <span class="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.material-symbols-outlined {
  z-index: -1;
}
</style>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import BannerPages from '../../components/front/BannerPages.vue'

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`
      this.$http.get(url).then((res) => {
        console.log('產品列表', res)
        this.products = res.data.products
      })
    }
  },
  components: {
    BannerPages
  }
}
</script>