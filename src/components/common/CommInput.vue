/**
* 파일명 : CommInput.vue
* 설명 : input 의 대한 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023.06.14
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <div>
    <label :class="['label',labelColorClass]">{{ input_label }} <span v-show="required" class="required">*</span></label>
    <input  v-bind="$attrs"
           ref="input"
           :class="[
      'input',
      sizeClass,
      colorClass,
      { outlined: outlined, disabled: disabled },
      { 'limits': limit <= valueLimit(inputValue) }
    ]"
           v-on="limit ? { input: limitInput } : {}"
           v-model="inputValue"/>
  </div>
</template>

<script>
export default {
  props: {
    input_label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg", "xlg","login","address"].includes(value),
    },
    color: {
      type: String,
      default: "primary",
      validator: (value) =>
          ["primary", "secondary", "success", "warning", "danger"].includes(
              value
          ),
    },
    label_color: {
      type: String,
      default: "black",
      validator: (value) =>
          ["black", "white"].includes(
              value
          ),
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: [Number,Boolean],
      default: 1000,
    },

  },
  computed: {
    sizeClass() {
      return `input-${this.size}`;
    },
    colorClass() {
      return `button-${this.color}`;
    },
    labelColorClass() {
      return `label_${this.label_color}`;
    },
  },
  // 이외에 필요한 props 설정

  // 컴포넌트 내부 로직 및 메서드 작성
  data() {
    return {
      inputValue: ''
    };
  },
  mounted() {

    // 부모 컴포넌트에서 전달된 초기값 설정
    this.inputValue = this.value;
  },
  watch: {
    inputValue() {
      // 입력 값이 변경될 때마다 부모 컴포넌트에 변경된 값을 알림
      this.$emit('input', this.inputValue);

    },
    value(newValue) {
      // 부모 컴포넌트에서 전달된 값이 변경되면 입력 값에 반영
      this.inputValue = newValue;
    }
  },
  methods: {
    // 최대 글자수 넘으면 자동으로 짜르기
    limitInput(event) {
      if (event.target.value.length > this.limit) {
        event.target.value = event.target.value.slice(0, this.limit);
      }

    },
    // 최대 글자수 넘기면 input 에 포커스 및 알럿 띄어준다
    valueLimit(event){
     if(event === undefined){
       return null
     }else {
      const data = event.toString()
       console.log(data.length)
       if(data.length >= this.limit){
         alert(`[${this.input_label}] 의 최대 글자수를 초과 하였습니다 \n최대 글자수 ${this.limit}자`)
          // this.$refs.input.scrollIntoView({ behavior:'auto', block: 'center' })
         return Number(data.length)
       }
     }
    }
  }

};
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

div {
  width: 100%;
  box-sizing: border-box;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
input {
  font-family: 'Noto Sans KR', sans-serif;
  display: block;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  padding: 0.47rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: $thin;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  &:focus{
    outline: none;
  }
  &:active{
    outline: none;
  }
  &:read-only {
    background-color: #eee;
    outline: none;
  }

}

.label_white{
  color:$white;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
.input-login{
  border: none;
  border-radius: 1.25rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.required {
  color: #e83f3f;
}
.limits{
  border-color:red !important;
}
</style>
