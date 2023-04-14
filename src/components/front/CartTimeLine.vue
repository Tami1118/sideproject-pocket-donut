<template>
  <div class="step_group mb-4">
    <div class="container" style="max-width: 800px">
      <ol class="row">
        <li class="col step_item active">
          <div class="step_num">1</div>
          <div class="step_text">確認訂單</div>
        </li>
        <li class="col step_item" :class="step >= 2 ? 'active':''">
          <div class="step_num">2</div>
          <div class="step_text">填寫資料</div>
        </li>
        <li class="col step_item" :class="step >= 3 ? 'active':''">
          <div class="step_num">3</div>
          <div class="step_text">確認付款</div>
        </li>
        <li class="col step_item" :class="step >= 4  ? 'active': ''">
          <div class="step_num">4</div>
          <div class="step_text">完成訂單</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss">
ol {
  padding: 0;
}
.step_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 0.5rem;
  border-bottom: 0.3rem solid var(--gray);

  .step_num {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--gray);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    font-weight: none;
  }
  .step_text {
    color: var(--gray);
    text-align: center;
  }
}
.step_group {
  .active {
    border-bottom: 0.3rem solid var(--primary);

    .step_num {
      background-color: var(--primary);
      font-weight: 600;
    }
    .step_text {
      color: var(--primary);
      font-weight: 600;
    }
  }
}
</style>

<script>
export default {
  props: ['step'],
}
</script>