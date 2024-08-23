<template>
  <div id="printArea">

      <div class="qr_wrap">

      <CommQrCom :qr_value="service_data" :width="300" :height="300"/>
      <CommQrCom :width="300" :height="300"/>
      </div>
      <div class="qr_wrap">
        <CommQrCom :width="200" :height="200"/>
        <CommQrCom :width="200" :height="200"/>
        <CommQrCom :width="200" :height="200"/>
      </div>
      <div class="qr_wrap">
        <CommQrCom :width="150" :height="100"/>
        <CommQrCom :width="150" :height="100"/>
        <CommQrCom :width="150" :height="100"/>
        <CommQrCom :width="150" :height="100"/>
      </div>
    <div class="qr_wrap">
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
    </div>
      <div class="qr_wrap">
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>
      <CommQrCom :width="80" :height="80"/>


    </div>
  </div>
  <CommButton :size="'search'" @click="printPage">프린트</CommButton>

</template>

<script>
import printJS from 'print-js'

import {computed,onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import CommButton from "@/components/common/CommButton.vue";
import CommQrCom from "@/components/common/CommQrCom.vue";
export default {
  components: {
    CommButton,
    CommQrCom
  },
  setup() {
    const id = ref()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const service_data = ref({})
    onMounted (async () => {
      id.value = route.params.id
     await store.dispatch('serviceStore/SERVICE_DETAIL_LIST', id.value)
      window.addEventListener('beforeunload', handleBeforeUnload);
    })
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    });
    function printPage(id){
      window.print();
    }
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';

      const confirmationMessage = '새로고침을 누르시면 모든 정보가 초기화 됩니다. 새로고침 하시겠습니까?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    console.log(service_data.value)
    return {service_data,printPage, printJS}
  }
}
</script>

<style lang="scss" >
.qr_wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;

}

@media print {
  #printArea{
    padding: 10px;
  }
  //프린트 출력시 비노출 영역 추가하기
  .header, .navbar{display:none !important}
  .inner_wrap{
    width: 100% !important;
    margin: 0 !important;
    padding-top: 3rem;
    transition: all 0.3s !important;
    background-color: #fff !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .qr_wrap {
    display: flex;
    flex-wrap: wrap;
    //gap: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;

  }
  @page {
    size: A4; /* A4 용지 크기로 설정 */
    margin: 10px; /* 여백 제거 */
  }
  button{display: none}
}
</style>
