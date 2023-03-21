<template>
  <div class="page-background">
    <div class="container">
      <div class="pt-3">
        <div class="flex-y-center">
          <div class="text-primary fw-bold fs-5">圖片上傳 Image Upload</div>
        </div>

        <div class="col-12 bg-white rounded-3 my-3 shadow-sm">
          <div class="py-3 px-2">
            <div class="row">
              <div class="col-12 col-md-4 d-flex flex-column">
                <input
                  type="file"
                  class="form-control mt-2"
                  id="file"
                  placeholder="請上傳圖片檔案"
                  @change="upload"
                />
                <div class="d-flex my-3">
                  <input type="text" :value="hexImage" class="form-control" id="copy-image" />
                </div>
                <div class="btn-group ms-auto">
                  <button type="button" class="btn btn-outline-primary px-3" @click="copyContent">
                    <span class="material-symbols-outlined text-primary"> content_paste </span> 複製
                  </button>
                  <button type="button" class="btn btn-outline-primary px-3" @click="inputReset">
                    <span class="material-symbols-outlined text-primary"> delete </span> 刪除
                  </button>
                </div>
              </div>
              <div class="col-12 col-md-8">
                <img :src="hexImage" alt="" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      hexImage: ''
    }
  },
  methods: {
    upload() {
      // 查看資料屬性
      const fileInput = document.querySelector('#file')
      // console.dir(fileInput);

      // 取得file第一筆資料
      const file = fileInput.files[0]
      // console.log(file);

      // JS物件，產生表單格式
      const formData = new FormData()
      formData.append('file-to-upload', file) // file-to-upload為api訂定欄位，將file的資料進行推送

      // 請求上傳
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`
      this.$http
        .post(url, formData)
        .then((res) => {
          // console.log('圖片',res);
          this.hexImage = res.data.imageUrl
        })
        .catch((err) => {
          alert(err.response)
        })
    },

    // 複製按鈕
    copyContent() {
      navigator.clipboard.writeText(document.querySelector('#copy-image').value)
    },
    // 重置按鈕
    inputReset() {
      document.querySelector('#file').value = ''
      document.querySelector('#copy-image').value = ''
    }
  }
}
</script>