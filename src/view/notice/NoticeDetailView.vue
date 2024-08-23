<template>
  <div class="admin_inner">
    <div class="history_title">공지사항 관리 > 공지사항 목록 > 상세정보</div>
    <form @submit="handleSubmit">
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :value="notice_data.title" :limit="50" v-model="notice_data.title" :input_label="'제목'"/>
          <CommTextarea :value="notice_data.contents" :limit="500" v-model="notice_data.contents" :textarea_label="'내용'"/>
          <div class="button_box">
            <CommButton type="submit" :disabled="!checkItem" @click="noticeUpdateHandler" size="lg">수정</CommButton>
            <CommButton type="submit" @click="router.go(-1)" color="secondary" size="lg">취소</CommButton>
            <CommButton type="submit" @click="noticeDeleteHandler" color="danger" size="lg">삭제</CommButton>
          </div>
        </div>
      </div>
    </form>
  </div>

<!--    <CommModal>-->
<!--      <template #title>-->
<!--        정말로 삭제 하시겠습니까?-->
<!--      </template>-->
<!--      <template #button>-->
<!--        <CommButton  size="sm">네</CommButton>-->
<!--        <CommButton :color="'danger'" size="sm">아니오</CommButton>-->
<!--      </template>-->

<!--    </CommModal>-->
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import CommModal from "@/components/common/CommModal.vue";
import CommTextarea from "@/components/common/CommTextarea.vue";
import {computed, onMounted, reactive, ref,defineAsyncComponent} from "vue";
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
  components: {
    CommButton,
    CommTable,
    CommInput,
    CommModal,
    CommTextarea,
  },
  setup() {
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
    const notice_data = ref({
    })

    const id = ref()

    const checkItem = computed(() => {
      const check = [notice_data]
      return check.every((item) => item.value !== "")
    })
    const category = (e) => {
      return String(e)
    }
    const fetchData = async () => {
      id.value = route.params.id
      notice_data.value = await store.dispatch('noticeStore/NOTICE_DETAIL_LIST', id.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log('제출')
    }
    const noticeDeleteHandler = () => {
      if (confirm("[공지사항]을 삭제 하시겠습니까?")) {
        const payload = {
          notice_id: id.value
        }
        store.dispatch('noticeStore/NOTICE_DEL', payload)
      }else {
        return null
      }
    }
    const noticeUpdateHandler = () => {
      if (confirm("[공지사항]을 수정 하시겠습니까?")) {
        const payload = {
          notice_id: notice_data.value.id,
          title: notice_data.value.title,
          content: notice_data.value.contents,
        }
        store.dispatch('noticeStore/NOTICE_UPDATE', payload)
      }else {
        return null
      }
    }
    onMounted(fetchData)
    return {
      router,
      category,
      checkItem,
      columns,
      tableHeaderLabels,
      notice_data,
      handleSubmit,
      noticeDeleteHandler,
      noticeUpdateHandler
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
  .history_title {
    font-size: 0.8rem;
  }
  .form_container {
    display: block;

  }
}

</style>
