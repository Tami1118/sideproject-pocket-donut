<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="exampleModalLabel">確定要刪除？</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">刪除後無法復原，確定要刪除 <span class="text-primary fw-bold">{{ tempArticle.title }}</span> 優惠券？</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="deleteArticle">刪除</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tempArticle', 'deleteArticle']
}
</script>