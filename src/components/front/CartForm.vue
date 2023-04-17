<template>
  <div class="d-flex flex-column h-100">
    <VForm ref="form" v-slot="{ errors }" @submit="createOrder">
      <div class="form_item mt-3">
        <label class="form-label" for="name">
          姓名
          <span class="text-danger">*</span>
        </label>
        <VField
          class="form-control"
          type="text"
          id="name"
          placeholder="請輸入姓名"
          name="姓名"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          v-model="data.user.name"
        />
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form_item mt-3">
        <label class="form-label" for="email">
          Eamil
          <span class="text-danger">*</span>
        </label>
        <VField
          class="form-control"
          type="email"
          id="email"
          placeholder="請輸入信箱"
          name="信箱"
          :class="{ 'is-invalid': errors['信箱'] }"
          rules="required|email"
          v-model="data.user.email"
        />
        <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form_item mt-3">
        <label class="form-label" for="tel">
          聯絡手機
          <span class="text-danger">*</span>
        </label>
        <VField
          class="form-control"
          type="tel"
          id="tel"
          placeholder="請輸入電話"
          name="電話"
          :class="{ 'is-invalid': errors['電話'] }"
          :rules="isPhone"
          v-model="data.user.tel"
        />
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form_item mt-3">
        <label class="form-label" for="address">
          取件分店
          <span class="text-danger">*</span>
        </label>
        <VField
          as="select"
          class="form-select"
          id="address"
          placeholder="請輸入地址"
          name="地址"
          :class="{ 'is-invalid': errors['地址'] }"
          rules="required"
          v-model="data.user.address"
        >
          <option selected>請選擇</option>
          <option value="台北店">台北店</option>
          <option value="桃園店">桃園店</option>
          <option value="台中店">台中店</option>
          <option value="台南店">台南店</option>
          <option value="高雄店">高雄店</option>
        </VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="form_item mt-3">
        <label class="form-label" for="message">備註</label>
        <textarea
          class="form-control"
          name="message"
          id="message"
          rows="5"
          placeholder="備註"
          v-model="data.message"
        ></textarea>
      </div>
    </VForm>

    <div class="mt-1"><span class="text-danger">*</span> 為必填項目</div>

    <div class="mt-4 d-flex justify-content-between">
      <button type="button" class="btn btn-light text-nowrap" @click="userReset">重置</button>
      <button type="button" class="btn btn-primary text-nowrap" @click="createOrder">
        下一步，確認付款
      </button>
    </div>
  </div>

  <!-- <VField
    class="form-control"
    :as="as"
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :name="name"
    :class="{ 'is-invalid': errors[name] }"
    :rules="rules"
    :v-model="model"
  />
  <ErrorMessage :name="field.name" class="invalid-feedback"></ErrorMessage> -->
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
import { mapState, mapActions } from 'pinia'
import { Toast, Alert } from '@/mixins/swal'
import cartStore from '@/stores/cartStore'

export default {
  data() {
    return {
      // fields,
      data: {
        user: {
          name: 'Taim',
          email: 'tami@gmail.com',
          tel: '0987654321',
          address: '請選擇'
        },
        message: ''
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    createOrder() {
      if (this.data.user.address !== '請選擇') {
        const url = `${VITE_URL}/api/${VITE_PATH}/order`
        this.$http
          .post(url, { data: this.data })
          .then((res) => {
            console.log('成功新增訂單', res)
            this.$refs.form.resetForm()
            this.getCart()
            this.$router.push(`/payment/${res.data.orderId}`)
            Toast.fire({
              icon: 'success',
              title: '成功新增訂單'
            })
          })
          .catch((err) => {
            console.log(err)
            Alert.fire({
              title: '收件人資訊有誤',
              text: '* 為必填項目，請確認資料格式是否正確'
            })
          })
      } else {
        Alert.fire({
          title: '請選擇取件門市'
        })
      }
    },
    userReset() {
      this.$refs.form.resetForm()
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確手機號碼格式 ex: 0912345678'
    }
  },
  computed: {
    ...mapState(cartStore, ['cartNum'])
  }
}

// const fields = [
//   {
//     as: 'input',
//     type: 'text',
//     id: 'name',
//     placeholder: '請輸入姓名',
//     label: '取貨人姓名',
//     name: '姓名',
//     rules: 'required',
//     model: 'data.user.name'
//   },
//   {
//     as: 'input',
//     type: 'email',
//     id: 'email',
//     placeholder: '請輸入信箱',
//     label: '取貨人信箱',
//     name: '信箱',
//     rules: 'required||email',
//     model: 'data.user.email'
//   },
//   {
//     as: 'input',
//     type: 'tel',
//     id: 'tel',
//     placeholder: '請輸入手機號碼',
//     label: '取貨人電話',
//     name: '電話',
//     rules: 'required',
//     model: 'data.user.tel'
//   },
//   {
//     as: 'input',
//     type: 'text',
//     id: 'address',
//     placeholder: '請輸入地址',
//     label: '取貨人地址',
//     name: '地址',
//     rules: 'required',
//     model: 'data.user.address'
//   }
// ]
</script>