<template>
  <main class="product_main">
    <!-- 產品詳細資訊 -->
    <section class="section section_product">
      <div class="container py-5">
        <!-- 產品圖片 -->
        <div class="row row-cols-md-2">
          <div class="col-12">
            <img
              :src="product.imageUrl"
              :alt="product.title"
              style="width: 100%; aspect-ratio: 5/6; object-fit: cover"
              class="product_pic rounded-5" />
          </div>
          <!-- 產品詳細資訊 -->
          <div class="col-12 d-flex flex-column mt-4 mt-md-0">
            <div class="product_info">
              <div class="badge bg-primary rounded-pill">{{ product.category }}</div>
              <div class="my-3 text-primary fs-2 fw-bold">{{ product.title }}</div>
              <div class="fs-5">
                <div class="product_info_item">
                  <div class="fw-bold">產品介紹</div>
                  {{ product.descript }}
                </div>
                <div class="product_info_item mt-3">
                  <div class="fw-bold">內容物</div>
                  {{ product.content }}
                </div>
              </div>
            </div>
            <div class="mt-auto pt-5 text-primary text-end fw-bold">
              <span class="fs-3">NT$ {{ product.price }}</span>
              <small> / {{ product.unit }}</small>
            </div>

            <div class="mt-3 d-flex">
              <!-- 有時間調整 -->
              <!-- <button type="button" class="rounded-start border-0 px-2">
                  <span class="material-symbols-outlined text-secondary"> add </span>
                </button>
                <input type="text" value="1" class="form-control rounded-0 text-center" />
                <button type="button" class="rounded-end border-0 px-2">
                  <span class="material-symbols-outlined text-secondary"> remove </span>
                </button> -->
              <select id="productNum" class="form-select text-center" v-model="qty">
                <option for="productNum" :value="i" v-for="i in 20" :key="`${i}productNum`">
                  {{ i }}
                </option>
              </select>
              <button
                type="button"
                @click="addToCart(product.id, qty)"
                class="ms-3 px-5 text-nowrap text-white bg-primary border-0 rounded-5"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--商品資訊-->
    <section class="section section_product_detail bg-light">
      <div class="container py-5">
        <div class="section_title">
          <span class="section_title_zh">商品資訊</span>
          <span class="section_title_en">Product Infomation</span>
        </div>
        <div class="section_content">
          <ProductDesInfo></ProductDesInfo>
        </div>
      </div>
    </section>

    <!--商品推薦-->
    <section class="section section_recommond">
      <div class="container py-5">
        <div class="section_title">
          <span class="section_title_zh">產品推薦</span>
          <span class="section_title_en">Products Recommond</span>
        </div>
        <div class="section_content">
          <ProductSwiper></ProductSwiper>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { mapActions } from 'pinia'
import ProductDesInfo from '../../components/front/ProductDesInfo.vue'
import ProductSwiper from '../../components/front/ProductSwiper.vue'
import cartStore from '../../stores/cartStore'


export default {
  data() {
    return {
      product: {},
      qty: 1
    }
  },
  components: {
    ProductDesInfo,
    ProductSwiper
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      // console.log(this.$route) // this.$route取得路由資訊
      // 解構取得 this.$route.params.id
      const { id } = this.$route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`
      this.$http.get(url).then((res) => {
        console.log('單一商品', res)
        this.product = res.data.product
      })
    },
    ...mapActions(cartStore, ['addToCart']),
  }
}
</script>