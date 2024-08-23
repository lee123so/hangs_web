<template>
  <div class="admin_inner">
    <div class="history_title">회원관리 > 회원정보</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :value="member_data.admin_users_id" readonly :input_label="'고유번호'" type="number"/>
          <CommInput :value="member_data.admin_name" v-model="member_data.admin_name" :limit="config.name"
                     :input_label="'이름'"/>
          <CommInput :value="member_data.admin_phone" v-model="member_data.admin_phone" :limit="config.phone"
                     :input_label="'연락처'"/>
          <CommInput :value="member_data.admin_email" :limit="config.email" :input_label="'이메일'" readonly/>
          <CommInput v-model="password" :limit="config.password" placeholder="비밀번호는 8자 이상, 20자 미만 대,소,특수문자 포함"
                     :input_label="'비밀번호'" type="password"/>
          <CommInputValidError v-show="!passwordValid" type="password"></CommInputValidError>
          <CommInput v-model="password_config" :limit="config.password" placeholder="비밀번호는 8자 이상, 20자 미만 대,소,특수문자 포함"
                     type="password" :input_label="'비밀번호 확인'"/>
          <CommInputValidError v-show="!passwordConfigValid" type="password_config"></CommInputValidError>
        </div>
        <div class="form_wrap">
          <CommInput :value="member_data.shop_name" v-model="member_data.shop_name" :limit="config.shop_name"
                     :input_label="'매장명'"/>
          <CommInput :value="member_data.shop_phone" v-model="member_data.shop_phone" :limit="config.phone"
                     :input_label="'매장연락처'"/>
          <div class="button_box">
            <CommInput :value="member_data.shop_address" v-model="member_data.shop_address" :limit="config.address"
                       :input_label="'매장주소 '"
                       readonly/>
            <CommButton size="address">주소검색</CommButton>
          </div>
          <CommInput :value="member_data.shop_address_detail" :limit="config.address_detail"
                     v-model="member_data.shop_address_detail"
                     placeholder="상세주소"/>
          <div class="add_button_box">
            <CommButton @click="updateSubmitHandler" size="search">수정</CommButton>
            <CommButton @click="router.go(-1)" :color="'danger'" size="search">취소</CommButton>
            <CommButton :color="'danger'" @click="memberDeleteHandler" size="search">탈퇴</CommButton>
<!--            <CommButton :color="'danger'" @click=" async ()=>{await Storage().remove('/12')}" size="sm">아니오</CommButton>-->
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import {computed, inject, onMounted, ref, watch} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import Statics from "@/services/service";
import CommInputValidError from "@/components/common/CommInputValidError.vue";
import {isPasswordConfigValid, isPasswordValid} from "@/utils/validation";
import {formatPhoneNumber, removeNonNumericAndHyphen} from "@/utils/filters";
import {Storage} from "aws-amplify";

export default {
  components: {
    CommButton,
    CommInputValidError,
    CommTable,
    CommInput
  },
  setup() {
    const config = inject('config')
    const password = ref("")
    const password_config = ref("")
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
    const member_data = ref({})
    const id = ref()

    // 핸드폰 번호 감시 Replace 로 하이픈 추가
    watch(() => member_data.value.admin_phone, (newVal, oldVal) => {
      member_data.value.admin_phone = formatPhoneNumber(newVal);
    });

    // 매장번호 감시 replace 로 숫자와 하이픈만 가능
    watch(() => member_data.value.shop_phone, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        member_data.value.shop_phone = removeNonNumericAndHyphen(newVal);
      }
    });

    // password validation
    const passwordValid = computed(() => isPasswordValid(password.value))

    // password config validation
    const passwordConfigValid = computed(() => isPasswordConfigValid(password.value, password_config.value))

    // 회원 정보 불러오기
    const fetchData = async () => {
      id.value = route.params.id
      member_data.value = await store.dispatch('memberStore/MEMBER_DETAIL_LIST', id.value)
    }

    //회원 탈퇴 핸들러
    const memberDeleteHandler = async () => {
      if (confirm(`탈퇴된 회원의 정보는 복구할 수 없습니다. \n사용자를 탈퇴 처리 하시겠습니까? `)) {
        const payload = {
           admin_user_id: id.value
        }
        await store.dispatch('memberStore/MEMBER_DEL', payload)
       const result =  await Storage.list(`${member_data.value.shop_id}`,);
        console.log(result)
        result.results.map( async (items)=> await Storage.remove(items.key))
        console.log('dd')
          // await Storage.remove(item.key);
      } else {
        return null
      }
    }

    //회원정보 수정 핸들러
    const updateSubmitHandler = (event) => {
      event.preventDefault()
      if (confirm(`회원 정보를 수정 하시겠습니까?`)) {
        const payload = {
          admin_user_id: Statics.encrypt(id.value),
          admin_email: Statics.encrypt(member_data.value.admin_email),
          admin_name: Statics.encrypt(member_data.value.admin_name),
          admin_phone: Statics.encrypt(member_data.value.admin_phone),
          password: Statics.encrypt(password.value),
          shop_name: Statics.encrypt(member_data.value.shop_name),
          shop_phone: Statics.encrypt(member_data.value.shop_phone),
          shop_address: Statics.encrypt(member_data.value.shop_address),
          shop_address_detail: Statics.encrypt(member_data.value.shop_address_detail),
        }

        store.dispatch('memberStore/MEMBER_UDT', payload)
      } else {
        return null;
      }
    }

    onMounted(fetchData)
    return {
      passwordConfigValid,
      passwordValid,
      password,
      password_config,
      router,
      config,
      member_data,
      columns,
      tableHeaderLabels,
      memberDeleteHandler,
      updateSubmitHandler
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

form {
  padding: 2rem;
}

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
  form {
    padding: 0
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
