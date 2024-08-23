/**
* 파일명 : LayoutNavibar.vue
* 설명 : modal 의 대한 레이아웃 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023/06/14
* 버전 :
* 기타사항 : 사용중인 컴포넌트는 따로 없습니다.
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <div class="modal_background">
    <div class="modal">
      <p class="title">
        <slot name="title"></slot>
      </p>
      <div class="button">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";
.modal_background{
  width: 20rem;
  height: 20rem;
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color:rgba($black,0.5);
  .modal{
    background-color:$white;
    padding: 2rem;
    border-radius: 1rem;
  }
  .title{
    margin: 1rem;
    text-align: center;
  }
  .button{
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
}
</style>
