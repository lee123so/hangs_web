/**
* 파일명 : CommonService
* 설명 : // 설명이 길어도 상관 없으니 최대한 자세하게 적어야 합니다.
* 작성자 : 안주현  // 최초 작성자
* 작성자 : 이희수  // 마지막 수정자
* 작성일 : 2023.04.17
* 수정일 : 2023.04.17
* 버전 : 1.0
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/

<template>
  <body>
    <div id="smooth-wrapper" ref="main">
      <div id="smooth-content">
        <LayoutHeader></LayoutHeader>
        <IndexBanner></IndexBanner>
        <IndexIntroduction></IndexIntroduction>
        <IndexMethod></IndexMethod>
        <IndexPayment></IndexPayment>
        <IndexNotice></IndexNotice>
        <IndexFaq></IndexFaq>
        <LayoutFooter></LayoutFooter>
      </div>
    </div>
<!--<DashBoardView></DashBoardView>-->
  </body>
</template>

<script>

import LayoutHeader from "@/components/layout/LayoutHeader.vue";
import IndexBanner from "@/view/index/components/IndexBanner.vue";
import IndexIntroduction from "@/view/index/components/IndexIntroduction.vue";
import IndexMethod from "@/view/index/components/IndexMethod.vue";
import IndexPayment from "@/view/index/components/IndexPayment.vue";
import IndexNotice from "@/view/index/components/IndexNotice.vue";
import IndexFaq from "@/view/index/components/IndexFaq.vue";
import LayoutFooter from "@/components/layout/LayoutFooter.vue";
// import Modal from "@/"
import IndexCard from "@/view/index/components/IndexCard.vue";
import DashBoardView from "@/view/dashboard/DashBoardView.vue";
import {onMounted, onUnmounted ,ref} from "vue";

export default {
  components:{
    DashBoardView,
    LayoutHeader,
    IndexBanner,
    IndexIntroduction,
    IndexMethod,
    IndexPayment,
    IndexNotice,
    IndexFaq,
    LayoutFooter
  },
  setup() {
    const main = ref();
    let smoother;
    let ctx;
    const burger = ref()
    const container = ref()
    const basic = {
      name:'basic',
      product:'기본상품',
      title:'BASIC',
      sub_title:'3개월 기본형',
      sales:'',
      standard:'3개월 기준',
      pay:'60,000원',
      content:`합리적인 비용으로\n행복스탬프를 시작하고 싶은 고객`
    }
    const standard = {
      name:'standard',
      product:'추천상품',
      title:'STANDARD',
      sub_title:'6개월 추천형',
      sales:'120,000원',
      standard:'6개월 기준',
      pay:'110,000원',
      content:`할인율 적용으로 부담을 낮춰\n행복스탬프를 이용하고 싶은 고객`
    }
    const premium = {
      name:'premium',
      product:'인기상품',
      title:'PREMIUM',
      sub_title:'12개월 장기형',
      sales:'240,000원',
      standard:'12개월 기준',
      pay:'200,000원',
      content:`보다 높은 할인율과\n장기적인 스탬프 이용자를 유치하고 싶은 고객`
    }
    const addClass = () => {
      burger.value = 'hidden';
      container.value = 'active'
    };
    onMounted(() => {
      // ctx = gsap.context(() => {
      //   // create the smooth scroller FIRST!
      //   smoother = ScrollSmoother.create({
      //     smooth: 2, // seconds it takes to "catch up" to native scroll position
      //     effects: false,
      //     smoothTouch:0.1// look for data-speed and data-lag attributes on elements and animate accordingly
      //   });
      // }, main.value);
    });
    onUnmounted(() => {
      ctx.revert();
    });

    return {main,
      addClass,
      burger,
      container,
      basic,
      standard,
      premium

    };
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";


nav {
  width: 100%;
  height: 100vh;
  background-color: #1d1d1d;
}

.burger {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}

:root {
  --dark:#1d1d1d;
  --grey-dark:#414141;
  --light:#fff;
  --mid:#ededed;
  --grey:#989898;
  --gray:#989898;
  --green:#28a92b;
  --green-dark:#4e9815;
  --green-light:#6fb936;
  --blue:#2c7ad2;
  --purple:#8d3dae;
  --red:#c82736;
  --orange:#e77614;
  accent-color: var(--green);
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  overscroll-behavior: none;
  margin: 0;
  padding: 0;
  cursor: default;
  letter-spacing: -0.2px;
}

#smooth-content {
  //overflow: visible;
  width: 100%;

  //background-color: #4d9916;
  /* set a height because the contents are position: absolute, thus natively there's no height */
  //height: 4000px;
}

button {
  position: relative;
}

.box {
  width: 200px;
  height: 100px;

  //background-color: #1d1d1d;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  line-height: 100px;
  font-size: 50px;
  text-align: center;
  will-change: transform;

  &.active {
    background-color: red;
  }
}

.box-a {
  top: 200px;

  //background-color: #8d3dae;
}

.box-b {
  top: 600px;
}

.box-c {
  top: 1400px;

  //background-color: #e26c16;
}

.line {
  visibility: hidden;
  width: 2px;
  height: 4000px;
  position: absolute;
  left: 400px;
  top: 0px;
  background-color: #777;
}

header .name {
  color: white;
}

.container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.title {
  text-align: center;
  color: white;
  font-weight: $thin;
  font-size: 40px;
}

.end {
  position: absolute;

  /*   bottom: 0; */
  top: 2400px;
  transform: translateY(-100%);
  font-size: 30px;
  color: white;
  background-color: #4d9916;
}

/* button:not('.box') { breaking for some reason in codepen? */

button {
  display: inline-block;
  outline: none;
  border: none;
  padding: 8px 14px;
  background: var(--light);
  background-image: linear-gradient(to bottom, hsl(0deg 0% 100%), hsl(0deg 0% 94%));
  -webkit-box-shadow: 0px 1px 0px #414141;
  -moz-box-shadow: 0px 1px 0px #414141;
  box-shadow: 0px 1px 0px #414141;
  color: var(--dark);
  text-decoration: none;
  -webkit-border-radius: 4;
  -moz-border-radius: 4;
  border-radius: 4px;
  padding: 12px 25px;
  font-family: 'Signika Negative', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  line-height: 18px;
}

.light button {
  color: var(--light);
  background-image: linear-gradient(to bottom, #575757, #414141);
}

.line {
  background-color: #4d9916;
}

button:hover {
  background: var(--green-light);
  background-image: linear-gradient(to bottom, #57a818, #4d9916);
  -webkit-box-shadow: 0px 1px 0px fefefe;
  -moz-box-shadow: 0px 1px 0px fefefe;
  box-shadow: 0px 1px 0px fefefe;
  color: #ffffff;
  text-decoration: none;
}

</style>
