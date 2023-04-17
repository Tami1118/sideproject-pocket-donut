const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { Alert } from '@/mixins/swal'
import axios from 'axios'

export default defineStore('order', {
  state: () => {
    return {
      orders: [],
      order: {},
      products: [],
      orderTotal: '',
      user: {},
      itemNum: '',
    }
  },
  actions: {
    // 取得所有訂單資料
    getOrders() {
      const url = `${VITE_URL}/api/${VITE_PATH}/orders`
      axios.get(url)
        .then(res => {
          console.log('全部訂單', res)
        })
        .catch(err => {
          console.log('全部訂單失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
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
          console.log('單一訂單', res)
          this.order = res.data.order
          this.products = res.data.order.products
          this.user = res.data.order.user
          // 待研究數量如何累加
          // this.itemNum = res.data.order.reduce((pre, item) => pre + item.qty, 0)
          // this.orderTotal = res.data.order.products.reduce((pre, item)=> pre + item.total, 0)
        })
        .catch(err => {
          console.log('單一訂單失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },
  }
})