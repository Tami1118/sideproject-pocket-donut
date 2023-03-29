import '@sweetalert2/theme-dark/dark.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})