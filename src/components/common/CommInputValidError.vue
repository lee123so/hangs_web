/**
* 파일명 : CommInputValidError.vue
* 설명 : error message 의 대한 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <div class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default:''
    }
  },
  computed: {
    errorMessage() {
      switch (this.type) {
        case 'email':
          return '유효한 이메일 주소를 입력해주세요. ex) hangs@hangs.com';
        case 'id':
          return '아이디는 5글자 이상 20자 미만으로 작성 해주세요.';
        case 'password':
          return '비밀번호는 8자 이상, 20자 미만 대,소,특수문자 포함';
        case 'password_config':
          return '패스워드가 같지 않습니다.';
        case 'name':
          return '이름은 11자 미만으로 작성 해주세요.';
        case 'phone':
          return '핸드폰 형식에 맞게 작성 해주세요.';
        case 'store_phone':
          return '형식에 맞게 작성 해주세요. ex) xx-xxxx-xxxx, xxx-xxx-xxxx  ';
        case 'store_name':
          return '매장명은 20자 미만으로 작성 해주세요.';
        default:
          return '';
      }
    }
  }
};
</script>

<style>
.error-message {
  color: #be1e1e;
  font-size: 0.8rem;
  transition: 0.3s;
}

</style>
