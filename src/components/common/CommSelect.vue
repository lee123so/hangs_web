/**
* 파일명 : CommSelect.vue
* 설명 : select box 의 대한 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <div>
    <label>{{select_label}} <span v-show="required" class="required">*</span></label>
    <select v-bind="$attrs"
           :class="[
      'select',
      sizeClass,
      colorClass,
      { outlined: outlined, disabled: disabled },
    ]"
            @change="handleSelectChange"
            v-model="inputValue"
            :value="value"
            :disabled="disabled"
    >
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    select_label:{
      type: String,
      default:''
    },

    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg", "xlg"].includes(value),
    },
    color: {
      type: String,
      default: "primary",
      validator: (value) =>
          ["primary", "secondary", "success", "warning", "danger"].includes(
              value
          ),
    },
    required: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number,String],
    },
    options: {
      type: Array,
    }

  },

  computed: {
    sizeClass() {
      return `button-${this.size}`;
    },
    colorClass() {
      return `button-${this.color}`;
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
  methods:{
    handleSelectChange(event) {
      this.selectedValue = event.target.value;
      this.$emit('update:value', this.selectedValue); // 선택된 값을 부모 컴포넌트에 Emit
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

div{
  width: 100%;
  box-sizing: border-box;
}
select{
  //display: block;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  box-sizing: border-box;
  padding: 0.47rem 0.75rem !important;
  font-size: .8125rem;
  font-weight: $thin;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  //-webkit-appearance: none;
  //-moz-appearance: none;
  //appearance: none;
  height: 36px;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  &:disabled{
    background-color: #eee;
    border: 1px solid #ced4da;
    outline: none;
    color: #495057;
    opacity: 1;
  }
}
label{
  display: block;
  margin-bottom: 0.5rem;
}
.disabled{
  cursor: no-drop;
}
.required {
  color: #e83f3f;
}
</style>
