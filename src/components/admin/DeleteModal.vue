<template>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">確定刪除 {{tempItem.id? '':'全部'}} ?</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          刪除後的{{type}}將無法復原，確定要刪除
          <span v-if="tempItem.id">{{type}}編號 <strong class="text-primary fw-bold">{{tempItem.id}}</strong></span>
          <span v-else class="text-primary fw-bold">全部</span>
          {{type}}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" v-if="tempItem.id" @click="deleteItem">
            刪除
          </button>
          <button type="button" class="btn btn-primary" v-else @click="deleteAll">
            刪除全部
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['type','tempItem', 'deleteItem', 'deleteAll'],
}
</script>