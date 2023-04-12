const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import axios from 'axios'
import Toast from '@/mixins/toast'

export default defineStore('cart', {
  state: () => {
    return {
      cart: [],
      total: '',
      final_total: '',
      loadingItem: '',
      cartNum: '',
      couponCode: '',
    }
  },
  actions: {
    // 取得購物車資料
    getCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios.get(url)
        .then(res => {
          console.log('取得購物車列表:', res)
          this.cart = res.data.data
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          this.cartNum = res.data.data.carts.reduce((pre, cart) => pre + cart.qty, 0)
        })
        .catch(err => {
          console.log(err)
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
          this.loadingItem = ''
          this.getCart()
          Toast.fire({
            icon: 'success',
            title: '成功加入購物車'
          })
        })
        .catch(err => {
          console.log(err)
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
      axios.put(url, { data }).then(res => {
        console.log('更新數量:', res)
        this.loadingItem = ''
        this.getCart()
      })
    },

    // 刪除購物車單一品項
    removeCartItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`
      axios.delete(url).then(res => {
        console.log(res)
        this.getCart()
        Toast.fire({
          icon: 'success',
          title: '成功刪除'
        })
      })
    },

    // 刪除全部購物車
    deleteAllCart(){
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios.delete(url).then(res => {
        console.log('購物車已清空', res)
      })
    },

    // 優惠券使用
    useCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`
      axios.post(url, {
          data: {
            code: this.couponCode
          }
        })
        .then((res) => {
          console.log('已套用優惠券',res)
        })
    }
  }
})