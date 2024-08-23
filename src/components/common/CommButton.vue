/**
* 파일명 : CommButton.vue
* 설명 : button 의 대한 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <button
      :class="[
      'button',
      sizeClass,
      colorClass,
      { outlined: outlined, disabled: disabled },
    ]"
      style="font-weight: bold;"
      :disabled="disabled"
      type="button"
  >
    <span></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg", "xlg","search","login","pagination",'address'].includes(value),
    },
    color: {
      type: String,
      default: "primary",
      validator: (value) =>
          ["primary", "secondary", "success", "warning", "danger"].includes(
              value
          ),
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeClass() {
      return `button-${this.size}`;
    },
    colorClass() {
      return `button-${this.color}`;
    },
  },
};
</script>

<style scoped>
.button {
  box-sizing: border-box;
  /*width: 120px;*/
  /*height: 40px;*/
  border: none;
  background-color: #2f4961;
  border-radius: 0 10px 0 10px;
  font-size: 14px;
  font-weight: $regular !important;
  overflow: hidden;
  text-transform: uppercase;
  outline: none;
  position: relative;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.button span {
  position: absolute;
  z-index: 1;
}

/*.button:after {*/
/*  content: "";*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  z-index: 0;*/
/*  height: 490%;*/
/*  width: 200%;*/
/*  background: rgba(255, 255, 255, 0.2);*/
/*  -webkit-transition: all 0.5s ease-in-out;*/
/*  transition: all 0.5s ease-in-out;*/
/*  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);*/
/*  transform: translateX(-120%) translateY(-25%) rotate(45deg);*/
/*}*/

.button:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}

.button-sm {
  width: 5rem;
  height: 1.6rem;
  font-size: 0.775rem;
  font-weight: $regular !important;
  border-radius: 5px;
}

.button-lg {
  width: 120px !important;
  height: 40px !important;
  font-size: 0.8rem !important;
  padding: 0rem 10px !important;
}
.button-address {
  width: 140px!important;
  height: 40px !important;
  font-size: 0.8rem !important;
  /*padding: 0rem 10px !important;*/
  /*margin: 1.2rem;*/
}
.button-login {
  width: 100%!important;
  height: 3rem!important;
  background-color: #FFAF94 !important;
  border-radius: 1.25rem !important;
  font-size: 0.8rem !important;
  /*padding: 0rem 10px !important;*/
  /*margin: 1.2rem;*/
}
.button-xlg {
  width: 160px !important;
  height: 60px !important;
  font-size: 1rem !important;
  padding: 0rem 2rem !important;
}
.button-search {
  width: 100% ;
  height: 40px;
  font-size: 0.8rem ;
  padding: 0 1rem ;
  margin-bottom: 0;
}
.button-pagination{
  border: solid 1px #d7d7d7;
  border-radius: 0.2rem;
  color: #7d7d7d;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  padding: 0.5rem 0.9rem;
  box-shadow: none;
}
.button-primary {
  background-color: #546c88;
  color: #fff;
}

.button-secondary {
  background-color: #bfbfbf;
  color: #fff;
}

.button-success {
  background-color: #20c997;
  color: #fff;
}

.button-warning {
  background-color: #ffc107;
  color: #212529;
}

.button-danger {
  background-color: #c16a64;
  color: #fff;
}

.button.outlined {
  background-color: transparent;
  border: 1px solid currentColor;
  color: currentColor;
}

.button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
</style>
