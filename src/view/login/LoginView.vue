<template>
  <div class="login_container">
    <div @keydown.enter="loginHandler" class="login_wrap">
      <div class="login_back">
        <div class="human">
          <img src="/src/assets/images/login_background_4.svg" alt="">
        </div>
        <div class="bubble">
        </div>

      </div>
      <div  class="login_box">
        <h1><img src="/src/assets/images/login_logo.png" alt=""></h1>
        <h2>Good to See you</h2>
        <div class="sign_in">

          <CommInput ref="focus" v-model="super_admin_id" :size="'login'" :limit="30" :label_color="'white'"
                     placeholder="id" :input_label="'아이디'"></CommInput>
          <CommInput v-model="password" type="password" :limit="30" :size="'login'" :label_color="'white'"
                     placeholder="password"
                     :input_label="'비밀번호'"></CommInput>
<!--          <input  type="text">-->
        </div>
        <CommButton  @click="loginHandler" size="login">로그인</CommButton>
      </div>

    </div>

  </div>


</template>

<script>
import CommInput from "@/components/common/CommInput.vue";
import CommButton from "@/components/common/CommButton.vue";
import Statics from "@/services/service";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

export default {
  components: {
    CommButton,
    CommInput
  },
  setup() {
    const focus = ref()
    const store = useStore();
    const router = useRouter();
    const super_admin_id = ref("");
    const password = ref("");

    const loginHandler = async () => {
      if(!super_admin_id.value) return alert('아이디를 입력 해주세요')
      if(!password.value) return alert('비밀번호를 입력 해주세요')
      try {
        const login_data = {
          super_admin_id: Statics.encrypt(super_admin_id.value),
          password:  Statics.encrypt(password.value)
          // password: password.value
        }
        await store.dispatch('LOGIN', login_data);
      } catch(error) {
         if(error.status){
           alert('비밀번호가 맞지 않습니다.')
         }
      } finally {
      }

    }
  onMounted(()=>{
    const input_focus = focus.value.$el

    input_focus.querySelector('.input').focus()
    input_focus.querySelector('.input').scrollIntoView({ behavior:'auto', block: 'center' })
  })
    return {
      super_admin_id,
      password,
      focus,
      loginHandler
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/globalStyle.scss';

.login_container {
  background: url("@/assets/images/login_background_6.svg") center center/cover;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  width: 100%;
  height: 100vh;
  //background-color: #fff;
  > .login_wrap {
    z-index: 10;
    background-color: transparent;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 8rem;
    justify-content: center;

    > .login_box {
      width: 39.125rem;
      //height: 350px;
      padding: 2.26rem;
      background: inherit;
      border-radius: 2px;
      position: relative;
      background-color: #3D516F;
      overflow: hidden;

    }
  }
}

.login_wrap {
  .login_box {
    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: #fff;
      font-size: 2.625rem;
      font-weight: $thin;
    }

    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.875rem;
    }
  }

  .sign_in {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    padding: {
      top: 6rem;
      bottom: 6rem;
    };
  }
}

body {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFD2C3;
  text-align: center;
  color: white;
  box-sizing: border-box;
  padding: 1rem;
}

h1 {
  position: relative;
  z-index: 10
}

a {
  color: #FFE37B;
  text-decoration: none;
}






@media screen and (max-width: 1200px) {
  .login_container {
    .login_wrap{
      display: block;
      .login_box{
        width: 100%;
      }
    }
.login_back{
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 294px;
    height: 291px;
  }
}
  }
}

@media screen and (max-width: 768px) {
  .login_wrap .sign_in{
    padding: 3rem 0;
  }
}
</style>
