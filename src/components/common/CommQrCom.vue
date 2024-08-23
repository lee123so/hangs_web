<template>
<div class="qr_border">
    <QRCodeVue3
        :width="width"
        :height="height"
        :value="qr_data"
        :key="qr_data"
        :qrOptions="{ typeNumber: '4', mode: 'Byte', errorCorrectionLevel: 'M' }"
        :imageOptions="{ hideBackgroundDots: true, imageSize: 0.6, margin: 0 }"
        :image="QrImage"
        :dotsOptions="{
            type: 'square',
            color: '#000',
          }"
        :backgroundOptions="{ color: '#ffffff' }"
        :cornersSquareOptions="{ type: 'square', color: '#000' }"
        :cornersDotOptions="{ type: undefined, color: '#000' }"
        myclass="my-qur"
        imgclass="img-qr"
    />
</div>

</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import QrImage from '@/assets/images/qr_logo.png'
export default {
  components: {
    QRCodeVue3
  },
  props:{
    width:{
      type:Number
    },
    height:{
      type:Number
    },
  },
   setup(){
    const store = useStore()
    const qr_data = computed(()=> store.getters["serviceStore/GE_QR"] )
    const print = ref()

    return{
      qr_data,
      print,
      QrImage
    }
  }
}
</script>
<style lang="scss" >
.my-button{
  background-color: transparent;
}

@media print {
  .qr_border{
    padding: 5px;
    border: 1px solid #000;
  }

}
</style>
