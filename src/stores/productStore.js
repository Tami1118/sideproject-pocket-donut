const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import { Alert } from '@/mixins/swal'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineStore('product', {
  state: () => {
    return {
      products: [],
      product: {},
      pagination: {},
    }
  },
  actions: {
    getProducts(pagination = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/?page=${pagination}`
      axios.get(url)
        .then((res) => {
          console.log('產品列表:', res)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },
    getProduct() {
      // console.log(this.$route) // this.$route取得路由資訊
      // 解構取得 this.$route.params.id
      const route = useRoute()
      const { id } = route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`
      axios.get(url)
        .then((res) => {
          console.log('單一商品', res)
          this.product = res.data.product
        })
        .catch(err => {
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },
  }
})