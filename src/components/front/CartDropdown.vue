<template>
  <div class="btn-group">
    <!-- <button
      type="button"
      class="btn btn-secondary dropdown-toggle"
      data-bs-display="static"
      aria-expanded="false"
    >
      Left-aligned but right aligned when large screen
    </button> -->
    <div class="dropdown-menu dropdown-menu-lg-end" ref="dropdown">
      
    </div>
  </div>
</template>

<script>
import Dropdown from 'bootstrap/js/dist/droupdown'
export default {
  data(){
    return {
      dropdown: ''
    }
  },
  mounted(){
    this.dropdown = new Dropdown(this.$refs.dropdown)
  },
  methods: {

  }
}
</script>