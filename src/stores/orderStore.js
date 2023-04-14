const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import axios from 'axios'
// import Toast from '@/mixins/toast.js'

export default defineStore('order', {
  state: () => {
    return {
      orders: [],
      order: {},
      products: [],
      user: {},
    }
  },
  actions: {
    // 取得所有訂單資料
    getOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/orders`
      axios.get(url)
        .then(res => {
          console.log('全部訂單',res)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 取得單一訂單
    getOrder() {
      const route = useRoute()
      console.log(route.params)
      const { orderId } = route.params
      const url = `${VITE_URL}/api/${VITE_PATH}/order/${orderId}`
      axios.get(url)
        .then(res => {
          console.log('單一訂單',res)
          this.order = res.data.order
          this.products = res.data.order.products
          this.user = res.data.order.user
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
})