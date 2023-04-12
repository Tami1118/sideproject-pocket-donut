<template>
  <div>
    <!-- products:price(hight to low/low to hight),create_at(old/new) -->
    <!-- orders:create_at(old/new) / filter:paid, non paid -->
    <!-- coupons:create_at(old/new) / filter:ing, pass -->
    <!-- news:create_at(old/new) / filter: tag -->
    <button type="button" v-if="isHight" @click="priceToLow">
      <span>Hight to Low</span>
    </button>
    <button type="button" v-else @click="priceToHight">
      <span>價格由低至高</span>
    </button>
  </div>    
</template>

<script>
export default {
  data(){
    return {
      isHight: false,
    }
  },
  methods: {
    // categoryNum(){
    // },
    priceToHight(){
      this.isHight = false
    },
    priceToLow(){
      this.isHight = true
    }
  }
}
</script>