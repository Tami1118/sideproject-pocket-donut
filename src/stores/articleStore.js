const { VITE_URL, VITE_PATH } = import.meta.env
import { defineStore } from 'pinia'
import { Alert } from '@/mixins/swal'
import axios from 'axios'

export default defineStore('article', {
  state: () => {
    return {
      articles: [],
      pagination: {},
      isLoading: false,
    }
  },
  actions: {
    getArticles(pagination = 1) {
      this.isLoading = true
      const url = `${VITE_URL}/api/${VITE_PATH}/articles/?page=${pagination}`
      axios.get(url)
      .then((res) => {
          this.isLoading = false
          console.log('消息列表:', res)
          this.articles = res.data.articles
          this.pagination = res.data.pagination
        })
        .catch(err => {
          Alert.fire({
            title: err.response.data.message,
          })
        })
    },
  }
})