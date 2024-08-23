<template>
  <div class="admin_inner">
    <div class="history_title">문의사항관리 > 상세정보</div>
    <form @submit="handleSubmit" >
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :value="inquiry_data.admin_email" v-model="inquiry_data.admin_email" readonly :input_label="'아이디'"  />
          <CommInput :value="inquiry_data.title" v-model="inquiry_data.title" readonly :input_label="'제목'"  />
          <CommTextarea :value="inquiry_data.question" v-model="inquiry_data.question" readonly :textarea_label="'문의내용'"  />
          <CommTextarea :value="inquiry_data.answer" v-model="inquiry_data.answer" :limit="config.content"  :textarea_label="'답변'" required />
          <div class="button_box">
            <CommButton :disabled="!checkItem" type="submit" size="lg" >답변</CommButton>
            <CommButton @click="router.go(-1)" color="danger" size="lg">취소</CommButton>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!--  <CommModal>-->
  <!--    <template #title>-->
  <!--      정말로 삭제 하시겠습니까?-->
  <!--    </template>-->
  <!--    <template #button>-->
  <!--      <CommButton  size="sm">네</CommButton>-->
  <!--      <CommButton :color="'danger'" size="sm">아니오</CommButton>-->
  <!--    </template>-->

  <!--  </CommModal>-->
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import CommModal from "@/components/common/CommModal.vue";
import CommSelect from "@/components/common/CommSelect.vue";
import CommTextarea from "@/components/common/CommTextarea.vue";
import {computed, inject, onMounted, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {router} from "@/router/router";
export default {
  methods: {
    router() {
      return router
    }
  },
  components:{
    CommButton,
    CommTable,
    CommInput,
    CommModal,
    CommTextarea,
    CommSelect
  },
  setup() {
    const config = inject('config')
    const tableHeaderLabels = [
      "번호",
      "아이디",
      "이름",
      "연락처",
      "매장명",
      "매장연락처",
      "매장주소",
      "서비스이용",
    ]
    const columns = [
      "user_type",
      "user_id",
      "name",
      "phone",
      "address",
      "donation_detail",
      "user_comment",
      "created_at",

    ]
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const inquiry_data = ref({
    })
    const id = ref()
    const fetchData = async () => {
      id.value = route.params.id
      inquiry_data.value = await store.dispatch('inquiryStore/INQUIRY_DETAIL_LIST', id.value)
    }
    const checkItem = computed(() => {
      const check = [
        inquiry_data.value.answer,
      ]

      return check.every((item) => item !== "")

    })
    const handleSubmit = (event) =>{
      event.preventDefault()
      if (confirm("[문의사항]을 수정 하시겠습니까?")) {
        const payload = {
          inquiry_id: id.value,
          answer: inquiry_data.value.answer,
          admin_user_id:inquiry_data.value.admin_user_id,
          status_yn:1
        }
        store.dispatch('inquiryStore/INQUIRY_UPDATE',payload)
      }else {
        return null
      }
      console.log('제출')
    }
    onMounted(fetchData)
    return {checkItem,config,router,inquiry_data,columns,tableHeaderLabels,handleSubmit}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";
.form_container{
  margin-bottom: 2rem;
  padding: 4rem 0;
  border-bottom: 1px solid #f3f3f3;
}
.history_title{
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
.form_wrap{
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 30rem;
  justify-content: center;
}
.button_box{
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
@media screen and (max-width:1200px) {

}

@media screen and (max-width:768px) {
  .button_box{
    width: 100%;
  }

  .form_container{
    display: flex;
    gap: 1.3rem;
  }
}
@media screen and (max-width:480px) {
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }
  .history_title{
    font-size: 0.8rem;
  }
  .form_container{
    display: block;

  }
}

</style>
