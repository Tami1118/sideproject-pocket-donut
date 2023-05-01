import '@sweetalert2/theme-dark/dark.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
})

const Alert = Swal.mixin({
  toast: false,
  icon: 'error',
  iconColor: '#be0e3d',
  confirmButtonColor: '#be0e3d',
})

export {
  Toast,
  Alert,
  Swal
}