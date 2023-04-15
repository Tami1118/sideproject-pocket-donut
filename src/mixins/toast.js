import '@sweetalert2/theme-dark/dark.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

// mixin 可將多個選項合併，並應用於多個地方使用
export default Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
})