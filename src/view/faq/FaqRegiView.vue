<template>
  <div class="admin_inner">
    <div class="history_title">FAQ 관리 > FAQ 등록</div>
    <form @submit="handleSubmit">
      <div class="form_container">
        <div class="form_wrap">
          <CommSelect v-model="faq_category"  :select_label="'카테고리'" :options="options.category_options" required/>

          <CommInput v-model="faq_question" :input_label="'질문'" :limit="config.title" :placeholder="`제목은 최대 ${config.title}자 이내로 작성 해주세요`" required/>
          <CommTextarea v-model="faq_answer" :textarea_label="'답변'" :limit="config.content" :placeholder="`내용은 최대 ${config.content}자 이하로 작성 해주세요`" required/>
          <div class="button_box">
            <CommButton :disabled="!checkItem" type="submit" size="lg">등록</CommButton>
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
import Statics from "@/services/service";
import {router} from "@/router/router";
import {useRouter} from "vue-router";
export default {
  methods: {
    router() {
      return router
    }
  },
  components: {
    CommButton,
    CommTable,
    CommInput,
    CommModal,
    CommTextarea,
    CommSelect
  },
  setup() {
    const config = inject('config')
    const options = inject('options')
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
    onMounted(async ()=>{
      super_user_id.value = await Statics.getValueOfCookie('user_id')
    })
    const router = useRouter()
    const store = useStore()
    const faq_question = ref("")
    const faq_answer = ref("")
    const faq_category = ref("")
    const super_user_id = ref("")
    const checkItem = computed(() => {
      const check = [
        faq_question,
        faq_answer,
        faq_category
      ]

      return check.every((item) => item.value !== "")

    })
    const handleSubmit = (event) => {
      event.preventDefault()
      if (confirm("[FAQ]를 등록 하시겠습니까?")) {
        const payload = {
          question: faq_question.value,
          answer: faq_answer.value,
          category: faq_category.value,
          super_admin_user_id: super_user_id.value
        }
        console.log(payload)
        store.dispatch('faqStore/FAQ_REG', payload)

        console.log('제출')
      }else {
        return null
      }
    }
    return {
      config,
      columns,
      faq_question,
      faq_answer,
      options,
      tableHeaderLabels,
      handleSubmit,
      checkItem,
      faq_category,
      router,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

.form_container {
  margin-bottom: 2rem;
  padding: 4rem 0;
  border-bottom: 1px solid #f3f3f3;
}


.history_title {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.form_wrap {
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 30rem;
  justify-content: center;
}

.button_box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 768px) {
  .button_box {
    width: 100%;
  }

  .form_container {
    display: flex;
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
