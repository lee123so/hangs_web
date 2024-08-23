<template>
  <div class="admin_inner">
    <div class="history_title">서비스관리 > 신청내역 > 신청승인</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :value="service_data.service_histories_id" :input_label="'고유번호'" readonly/>
          <CommInput :value="service_data.admin_name" :input_label="'이름'"  readonly/>
          <CommInput :value="service_data.admin_phone" :input_label="'연락처'" readonly />
          <CommInput :value="service_data.admin_email" :input_label="'이메일'" readonly />
          <CommInput :value="service_data.shop_name" :input_label="'매장명'" readonly />
          <CommInput :value="service_data.shop_phone" :input_label="'매장연락처'" readonly />
        </div>
        <div class="form_wrap">
          <div class="button_box">
            <CommInput :value="service_data.shop_address"  :input_label="'매장주소 '" readonly />
            <CommButton disabled size="address">주소검색</CommButton>
          </div>
          <CommInput :value="service_data.shop_address_detail" placeholder="상세주소" readonly />
          <CommTextarea :value="service_data.inquiry_contents" :textarea_label="'문의내용'" readonly />
          <CommSelect :value="service_data.service_plan_id" :options="option.service_options" :select_label="'서비스종류'" disabled />
          <div class="pay_box">
            <CommInput :value="service_data.pay_amount" :limit="config.pay" v-model="service_data.pay_amount" type="number" @input="convertCurrency" :input_label="'결제금액'" />
            <p>{{ formattedCurrency + '원'}}</p>
          </div>

          <CommSelect :value="service_data.pay_method" v-model="service_data.pay_method" :options="option.options"  :select_label="'결제방법'"/>
          <CommSelect :value="service_data.result_yn" :options="option.result_options" v-model="service_data.result_yn" :select_label="'완료 여부'"/>
        </div>

      </div>

      <div class="add_button_box">
        <CommButton @click="serviceApprovalHandler" :disabled="!checkItem" size="search">승인</CommButton>
        <CommButton @click="router.go(-1)" :color="'danger'" size="search">취소</CommButton>
        <CommButton @click="serviceUdtHandler" :disabled="!checkItem"  :size="'search'">정보등록/수정</CommButton>
      </div>
    </form>

  </div>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommSelect from "@/components/common/CommSelect.vue";
import CommTextarea from "@/components/common/CommTextarea.vue";
import CommInput from "@/components/common/CommInput.vue"
import {onMounted, reactive, ref, computed, inject} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {options} from "@/utils/config";
import {serviceUdt} from "@/api";
export default {
  components:{
    CommButton,
    CommSelect,
    CommTable,
    CommInput,
    CommTextarea
  },
  setup() {
    const config = inject('config')
    const option = inject('options')
    console.log(option.service_options)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const id = ref()
    const service_data = ref({})

    // 문의 처리 핸들러
    const serviceUdtHandler = () => {
      if (confirm("입력하신 정보로 등록 또는 수정 하시겠습니까?")) {
        const payload = {
          service_histories_id: service_data.value.service_histories_id,
          admin_user_id:service_data.value.admin_user_id,
          pay_amount:service_data.value.pay_amount,
          pay_method:service_data.value.pay_method,
          result_yn:service_data.value.result_yn,
          service_plan_id: service_data.value.service_plan_id
        }
        store.dispatch('serviceStore/SERVICE_UDT', payload)
      }else {
        return null
      }
    }

    // 한국 원화로 바꿔준다
    const formattedCurrency = computed(() => {
      const number = parseFloat(service_data.value.pay_amount);
      return !isNaN(number) ? new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number) : '';
    },);

    function convertCurrency() {
      // Nothing to do here, computed property handles the conversion
    }
    const checkItem = computed(() => {
      const check = [
        service_data.value.pay_amount,
        service_data.value.pay_method,
        service_data.value.result_yn,
      ]

      return check.every((item) => item !== null)

    })
    // 서비스 승인 핸들러
    const serviceApprovalHandler = async () => {
      if (confirm("요청한 서비스를 승인 하시겠습니까?")) {
        const updatePayload = {
          service_histories_id: service_data.value.service_histories_id,
          admin_user_id:service_data.value.admin_user_id,
          pay_amount:service_data.value.pay_amount,
          pay_method:service_data.value.pay_method,
          result_yn:service_data.value.result_yn,
          service_plan_id: service_data.value.service_plan_id
        }
        const {data} = await serviceUdt(updatePayload)
        console.log(data)
        const payload = {
          admin_user_id:service_data.value.admin_user_id,
          service_histories_id: service_data.value.service_histories_id,
          service_use_yn: 1,
          service_plan_id: service_data.value.service_plan_id
        }
        store.dispatch('serviceStore/SERVICE_APPROVAL', payload)
      }else {
        return null
      }
    }
    const fetchData = async () => {
      id.value = route.params.id
      service_data.value = await store.dispatch('serviceStore/SERVICE_DETAIL_LIST', id.value)
    }
onMounted(fetchData)
    return {checkItem,config,convertCurrency,formattedCurrency,serviceApprovalHandler,serviceUdtHandler,option,router,service_data,}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

.pay_box{
  width: 100%;
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p{
    padding-top: 1.5rem;
    width: 10rem;
    text-align: right;
  }
}
.form_container{
  //width: 50%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}

.history_title{
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
.form_wrap{
  @include form_submit;

}
.add_button_box{
  margin-top: 20px;
  width: 20rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 0;
  justify-content: space-between;
}
.button_box{

  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}
@media screen and (max-width:1200px) {

}

@media screen and (max-width:768px) {
  form{
    padding: 0;
  }
  .form_wrap{
    flex-wrap: wrap;
    margin: 0;
  }
  .pay_box{
    width: 100%;
    gap: 2rem;
    display: block;
    align-items: center;
    justify-content: space-between;
    p{
      width: 100%;
      text-align: right;
      padding: 1rem 0;

    }
  }
  .button_box{
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  .add_button_box{
    width: 100%;
    padding: 0;
    flex-direction: column;
  }
  .form_container{
    flex-direction: column;
    gap: 1.3rem;
  }
}
@media screen and (max-width:480px) {
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .form_container{
    display: block;

  }
}

</style>
