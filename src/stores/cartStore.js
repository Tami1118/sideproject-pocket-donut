const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import { Toast, Alert } from '@/mixins/swal'
import axios from 'axios'

export default defineStore('cart', {
  state: () => {
    return {
      cart: [],
      total: '',
      final_total: '',
      cartNum: '',
      loadingItem: '',
      qty: 1,
    }
  },
  actions: {
    // 取得購物車資料
    getCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios.get(url)
        .then(res => {
          console.log('取得購物車列表', res)
          this.cartNum = res.data.data.carts.reduce((pre, item) => pre + item.qty, 0)
          this.cart = res.data.data
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
        })
        .catch(err => {
          console.log('取得購物車列表失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },

    // 新增購物車
    addToCart(product_id, qty = 1) {
      this.loadingItem = product_id
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`
      const data = {
        data: {
          product_id,
          qty
        }
      }
      axios.post(url, data)
        .then(res => {
          console.log('加入購物車', res)
          this.getCart()
          this.loadingItem = ''
          Toast.fire({
            icon: 'success',
            title: '成功加入購物車'
          })
        })
        .catch(err => {
          console.log('加入購物車失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },

    // 編輯購物車
    updataCart(item) {
      this.loadingItem = item.id
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      axios.put(url, { data })
        .then(res => {
          console.log('更新數量', res)
          this.getCart()
          this.loadingItem = ''
          Toast.fire({
            icon: 'success',
            title: '成功修改數量'
          })
        })
        .catch(err => {
          console.log('更新數量失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },

    // 刪除購物車單一品項
    removeCartItem(id) {
      this.loadingItem = id
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`
      axios.delete(url)
        .then(res => {
          console.log('刪除單一產品', res)
          this.getCart()
          this.loadingItem = ''
          Toast.fire({
            icon: 'success',
            title: '成功刪除商品'
          })
        })
        .catch(err => {
          console.log('刪除單一產品失敗', err)
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },

    // 刪除全部購物車
    deleteAllCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`
      if (this.cartNum !== 0) {
        axios.delete(url)
          .then(res => {
            console.log('購物車已清空', res)
            this.getCart()
            Toast.fire({
              icon: 'success',
              title: '已刪除全部購物車'
            })
          })
          .catch(err => {
            console.log('購物車清空失敗', err)
            Alert.fire({
              title: err.response.data.message,
            })
          })
      } else {
        Alert.fire({
          title: '購物車尚無任何產品',
        })
      }
    },

    // 複製優惠券
    copyCoupon() {
      this.couponCode = 'pocket'
    },
  },
})