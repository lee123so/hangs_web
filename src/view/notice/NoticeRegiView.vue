<template>
  <div class="admin_inner">
    <div class="history_title">공지사항관리 > 공지사항목록 > 상세정보</div>
    <form @submit="handleSubmit">
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :input_label="'제목'" v-model="notice_title" :limit="config.title" :placeholder="`제목은 최대 ${config.title}자 이내로 작성 해주세요`" required
                     />
          <CommTextarea :textarea_label="'내용'" v-model="notice_content" :limit="config.content"
                        :placeholder="`내용은 최대 ${config.content}자 이하로 작성 해주세요`" required/>
          <div class="button_box">
            <CommButton type="submit" :disabled="!checkItem" size="search">등록</CommButton>
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
import CommTextarea from "@/components/common/CommTextarea.vue";
import {computed, inject, onMounted, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import Statics from "@/services/service";
import {useStore} from "vuex";

export default {
  components: {
    CommButton,
    CommTable,
    CommInput,
    CommModal,
    CommTextarea
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
    const notice_title = ref("")
    const notice_content = ref("")
    const super_user_id = ref("")
    const store = useStore()
    const checkItem = computed(() => {
      const check = [
        notice_title,
        notice_content,
      ]

      return check.every((item) => item.value !== "")

    })
    const getId = async () => {
      super_user_id.value = await Statics.getValueOfCookie('user_id')
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      if (confirm("[공지사항]을 등록 하시겠습니까?")) {
        const payload = {
          super_admin_user_id: super_user_id.value,
          title: notice_title.value,
          content: notice_content.value
        }
        store.dispatch('noticeStore/NOTICE_REG', payload)
        console.log('제출')
      }else {
        return null
      }
    }
    onMounted(getId)
    return {config,checkItem,notice_title, notice_content, columns, tableHeaderLabels, handleSubmit}
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
  width: 50%
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
