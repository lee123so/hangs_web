<template>
  <div class="admin_inner">
    <div class="history_title">서비스관리 > 신청내역 > 신청승인</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :value="service_data.service_histories_id" :input_label="'고유번호'" readonly type="number"/>
          <CommInput :value="service_data.admin_name" :input_label="'이름'" readonly/>
          <CommInput :value="service_data.admin_phone" :input_label="'연락처'" readonly/>
          <CommInput :value="service_data.admin_email" :input_label="'이메일'" readonly/>
          <CommInput :value="service_data.shop_name" :input_label="'매장명'" readonly/>
          <CommInput :value="service_data.shop_phone" :input_label="'매장연락처'" readonly/>
        </div>
        <div class="form_wrap">
          <div class="button_box">
            <CommInput :value="service_data.shop_address" :input_label="'매장주소 '" readonly/>
            <CommButton disabled :size="'address'">주소검색</CommButton>
          </div>
          <CommInput :value="service_data.shop_address_detail" placeholder="상세주소" readonly/>
          <CommSelect :value="service_data.service_plan_id" :options="option.service_options" :select_label="'서비스종류'" disabled/>

          <CommInput :value="service_data.pay_amount" type="number"  :input_label="'결제금액'" readonly />
          <CommSelect :value="service_data.pay_method" :options="option.options" :select_label="'결제방법'" disabled/>
          <CommInput :value="service_data.service_start_at" :input_label="'승인일'" readonly/>
          <CommInput :value="service_data.service_expiry_at" :input_label="'종료일'" readonly/>
          <CommButton @click="toggleModalHandler" :size="'address'">스탬프카드 확인하기</CommButton>
          <CommButton @click="router.push(`/service/user/qrcode/${id}`)" :size="'address'">QR코드 프린트</CommButton>

        </div>

      </div>
      <div class="add_button_box">
        <CommButton @click="router.go(-1)" size="search">확인</CommButton>
        <CommButton @click="serviceCancelHandler" :color="'danger'" :size="'search'">이용 해지</CommButton>
      </div>
    </form>

  </div>
  <teleport to="#destination">
    <ServiceStamp :shop_id="shop_data.shop_id" :admin_id="id" v-show="is_modal">
      <CommButton @click="toggleModalHandler" size="lg">닫기</CommButton>
    </ServiceStamp>
  </teleport>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommSelect from "@/components/common/CommSelect.vue";
import CommTextarea from "@/components/common/CommTextarea.vue";
import ServiceStamp from "@/view/service/components/ServiceStamp.vue";
import CommInput from "@/components/common/CommInput.vue"
import {inject, onMounted, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {useRoute,useRouter} from "vue-router";
import service from "@/view/service/store/service";
import {options} from "@/utils/config";

export default {

  components: {
    CommButton,
    CommSelect,
    CommTable,
    CommInput,
    CommTextarea,
    ServiceStamp
  },
  setup() {
    const option = inject('options')
    const is_modal = ref(false)
    const tableHeaderLabels = [
      "제목",
      "내용",
      "등록일시",
    ]
    const columns = [
      "user_type",
      "user_id",
      "name",
    ]

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const id = ref()
    const service_data = ref({})
    const shop_data = ref({})
    const card_data = ref({})
    //사용자 데이터 불러오기
    const fetchData = async () => {
      id.value = route.params.id
      service_data.value = await store.dispatch('serviceStore/SERVICE_DETAIL_LIST', id.value)
    }

    // const fetchStampCard = async () => {
    //   const payload = {
    //     shop_id :shop_data.value.shop_id,
    //     admin_user_id: id.value
    //
    //   }
    //   id.value = route.params.id
    //   card_data.value = await store.dispatch('serviceStore/SERVICE_STAMP_DETAIL', payload)
    //   console.log(service_data.value)
    // }


    // 사용자 서비스 이용 해지 핸들러
    const serviceCancelHandler = () => {
      if (confirm("사용자의 서비스 이용 해지 하시겠습니까?")) {
        const payload = {
          service_histories_id: service_data.value.service_histories_id,
          admin_user_id:service_data.value.admin_user_id,
          service_use_yn: 0
        }
        store.dispatch('serviceStore/SERVICE_CANCEL', payload)
      }else {
        return null
      }
    }

    //
    const toggleModalHandler = () => {
      is_modal.value = !is_modal.value
    }
    onMounted(async () => {
      await fetchData()
    })
    return {id,router,option,service_data,shop_data, columns, tableHeaderLabels, is_modal, toggleModalHandler,serviceCancelHandler}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";



.form_container {
  //width: 50%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}


.history_title {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.form_wrap {
  @include form_submit
}

.add_button_box {
  margin-top: 20px;
  width: 20rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem 0;
  justify-content: space-between;
}

.button_box {

  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 768px) {
  form{
    padding: 0;
  }
  .form_wrap {
    flex-wrap: wrap;
    margin: 0;
  }
  .button_box {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  .add_button_box {
    width: 100%;
    padding: 0;
    flex-direction: column;
  }
  .form_container {
    flex-direction: column;
    gap: 1.3rem;
  }
}

@media screen and (max-width: 480px) {
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .form_container {
    display: block;

  }
}

</style>
