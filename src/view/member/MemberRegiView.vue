/**
* 파일명 : MemberRegiView.vue
* 설명 : 회원등록의 관한 서비스 로직 (수정중)
* 작성자 : 이희수
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <div class="admin_inner">
    <div class="history_title">회원관리 > 회원목록 > 상세정보</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput v-model="user_name" :input_label="'이름'" :limit="config.name"
                     :placeholder="`이름은 ${config.name}자 미만으로 작성 해주세요.`" required/>
          <CommInputValidError v-show="!nameValid" type="name"></CommInputValidError>

          <CommInput :value="phone" v-model="phone" :limit="config.phone" :input_label="'연락처'" placeholder="'-'없이 적어주세요"
                     required/>
          <CommInputValidError v-show="!phoneValid" type="phone"></CommInputValidError>

          <CommInput v-model="email" :input_label="'이메일'" :limit="config.email" placeholder="ex) hangs@hang.com"
                     required/>
          <CommInputValidError v-show="!emailValid" type="email"></CommInputValidError>

          <CommInput v-model="password" type="password" :limit="config.password" :input_label="'비밀번호'"
                     placeholder="비밀번호는 8자 이상, 20자 미만 대,소,특수문자 포함" required/>
          <CommInputValidError v-show="!passwordValid" type="password"></CommInputValidError>

          <CommInput v-model="password_config" type="password" :limit="config.password" :input_label="'비밀번호 확인'"
                     placeholder="비밀번호는 8자 이상, 20자 미만 대,소,특수문자 포함" required/>
          <CommInputValidError v-show="!passwordConfigValid" type="password_config"></CommInputValidError>

        </div>
        <div class="form_wrap">


          <CommInput v-model="store_name" :input_label="'매장명'" :limit="config.shop_name"
                     :placeholder="`매장명은 ${config.shop_name}자 이내로 작성 해주세요`" required/>
          <CommInputValidError v-show="!storeNameValid" type="store_name"></CommInputValidError>
          <div class="phone_box_flex">
          <CommInput :value="store_phone1" v-model="store_phone1" :limit="config.phone" :input_label="'매장연락처'"
                      required/>
            <div class="tech">-</div>
            <CommInput :value="store_phone2" v-model="store_phone2" :limit="config.phone"
                    />
            <div class="tech">-</div>
            <CommInput :value="store_phone3" v-model="store_phone3" :limit="config.phone"
                      />
          </div>
<!--          <CommInputValidError v-show="!storePhoneValid" type="store_phone"></CommInputValidError>-->

          <div class="address_box">
            <div class="button_box">
              <CommInput :value="address" v-model="address" :limit="config.address" :input_label="'매장주소 '" readonly
                         required/>
              <CommButton @click="addressSearchHandler" size="address">주소검색</CommButton>
            </div>
            <div id="address_modal"></div>
            <CommInput :value="address_detail" :limit="config.address_detail" v-model="address_detail"
                       placeholder="상세주소"/>
          </div>
          <div class="add_button_box">
            <CommButton type="submit" :disabled="!checkItem" @click="regiSubmitHandler" size="search">등록</CommButton>
            <CommButton @click="router.go(-1)" :color="'danger'" size="search">취소</CommButton>
          </div>
        </div>
      </div>

      <!--      <CommModal>-->
      <!--        <template  #title>-->
      <!--          <div id="address_modal">assa</div>-->
      <!--        </template>-->

      <!--      </CommModal>-->
    </form>

  </div>
</template>

<script>

import CommTable from "@/components/common/CommTable.vue";
import CommModal from "@/components/common/CommModal.vue";
import CommInput from "@/components/common/CommInput.vue"
import sha256 from "js-sha256";
import CommButton from "@/components/common/CommButton.vue";
import CommInputValidError from "@/components/common/CommInputValidError.vue";
import {ref, computed, watch, inject} from "vue";
import {
  isEmailValid,
  isIdValid,
  isNameValid,
  isPasswordConfigValid,
  isPasswordValid,
  isPhoneValid,
  isStorePhoneValid,
  isStoreNameValid
} from "@/utils/validation";
import {formatPhoneNumber, formatStorePhoneNumber} from "@/utils/filters";
import {execDaumPostcode} from "@/utils/filters";
import Statics from "@/services/service";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    CommButton,
    CommTable,
    CommInput,
    CommModal,
    CommInputValidError
  },
  setup() {
    const config = inject('config')
    const user_name = ref("")
    const store_name = ref("")
    const password = ref("")
    const password_config = ref("")
    const phone = ref("")
    const store_phone1 = ref("")
    const store_phone2 = ref("")
    const store_phone3 = ref("")
    const email = ref("")
    const address = ref("")
    const address_detail = ref("")
    const store = useStore()
    const router = useRouter()

    //핸드폰 번호 감시 후 자동으로 하이픈 추가
    watch(phone, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        phone.value = formatPhoneNumber(newVal);
      }
    });
    // 회원 등록에 사용되는 벨리데이션
    const nameValid = computed(() => isNameValid(user_name.value))
    const storeNameValid = computed(() => isStoreNameValid(store_name.value))
    const passwordValid = computed(() => isPasswordValid(password.value))
    const passwordConfigValid = computed(() => isPasswordConfigValid(password.value, password_config.value))
    // const storePhoneValid = computed(() => isStorePhoneValid(store_phone.value))
    const emailValid = computed(() => isEmailValid(email.value))
    const phoneValid = computed(() => isPhoneValid(phone.value))

    // value 가 validation 에 맞는지 확인 true 면 버튼 활성화
    const checkItem = computed(() => {
      const check = [
        nameValid,
        passwordValid,
        passwordConfigValid,
        // storePhoneValid,
        emailValid,
        phoneValid
      ]

      return check.every((item) => item.value === true)

    })
    //form 제출
    const regiSubmitHandler = (event) => {
      event.preventDefault()
      const payload = {
        admin_email: Statics.encrypt(email.value),
        admin_name: Statics.encrypt(user_name.value),
        admin_phone: Statics.encrypt(phone.value),
        password: Statics.encrypt(password.value),
        shop_name: Statics.encrypt(store_name.value),
        shop_phone: Statics.encrypt(store_phone.value),
        shop_address: Statics.encrypt(address.value),
        shop_address_detail: Statics.encrypt(address_detail.value),
      }
      store.dispatch('memberStore/MEMBER_REGI', payload)
    }
    //주소검색
    const addressSearchHandler = async () => {
      const address_data = await execDaumPostcode()
      address.value = address_data.address
      address_detail.value = address_data.address_detail
    }
    return {
      address_detail,
      store_phone1,
      store_phone2,
      store_phone3,
      phoneValid,
      phone,
      email,
      emailValid,
      store_name,
      user_name,
      password,
      password_config,
      passwordValid,
      passwordConfigValid,
      storeNameValid,
      // storePhoneValid,
      nameValid,
      address,
      regiSubmitHandler,
      addressSearchHandler,
      checkItem,
      router,
      config
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";



#address_modal {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.address_box {
  width: 100%;
}

.form_container {
  //width: 50%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}
.phone_box_flex{
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
  //gap: 1rem;
  .tech{
    padding: 0.5rem;
  }
}


.history_title {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.form_wrap {
  @include form_submit
}

.add_button_box {

  width: 20rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  //padding: 1rem 0;
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
    display: block;
    gap: 1.3rem;
  }
}

@media screen and (max-width: 480px) {
  form {
    padding: 0;
  }
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .form_container {
    display: block;

  }
}

</style>
