<!-- 파일명 : DashBoardView.vue-->
<!-- 설명 : 공통으로 사용되는 서비스 로직을 작성함-->
<!-- 최초작성자 : 이희수 -->
<!-- 수정자 : -->
<!-- 작성일 : 2023.04.17-->
<!--버전 : 1.0-->
<!-- 기타사항 :-->
<!-- Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.-->
<template>
  <div class="masonry-container">
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 20rem; "
      ><p class="dash_title">MEMBER <span>회원 현황</span></p>
        <DashBoardBarChart></DashBoardBarChart>
      </div>
    </div>
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 20rem; "
      >
        <DashBoardMap class="map_hover"></DashBoardMap>
        <div @click="router.push('/dashboard/map')" class="full_map">크게보기</div>
      </div>
    </div>
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 29.5rem;"
      ><p class="dash_title">COUPON <span>쿠폰 이용 현황</span></p>
        <DashBoardRadiaChart :coupons="coupons" class="border_bottom"></DashBoardRadiaChart>
        <div class="coupon_box">
          <div>
            <p>총 쿠폰 발급 수</p>
            <strong>{{ coupons.issued_y }}</strong>
          </div>
          <div>
            <p>총 쿠폰 사용완료 수</p>
            <strong>{{ coupons.used_y }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 20rem; "
      >
        <p class="dash_title">SALES <span>매출액</span></p>
        <ul class="sales_container">
          <li>
            <p>오늘</p>
            <Vue3autocounter :startAmount='0' :endAmount='Number(today_month_pay.today_paid)' :duration='2' prefix=''
                             suffix='원' separator=','
                             :autoinit='true'/>
          </li>
          <li>
            <p>이달</p>
            <Vue3autocounter :startAmount='0' :endAmount='Number(today_month_pay.month_paid)' :duration='2' prefix=''
                             suffix='원' separator=','
                             :autoinit='true'/>
          </li>
        </ul>
      </div>
    </div>
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 20rem; background-color: transparent; box-shadow: none; padding: 0"
      >
        <ul class="service_container">
          <li>
            <div class="service_icon"><i class="fa-regular fa-handshake"
                                         style="font-size: 1.5rem; color: #3D516FFF"></i></div>
            <span>TODAY`S 서비스 신청을 완료해주세요.</span>
            <DashBoardProgress :bgcolor="'#FFCD83'" :completed="service_app.today_service_cnt"
                               :total="service_app.today_service_result_n"/>
          </li>
          <li>
            <div class="service_icon"><i class="fa-regular fa-circle-question"
                                         style="font-size: 1.5rem;color: #3D516FFF"></i></div>
            <span>답변을 기다리는 문의사항이 있어요.</span>
            <DashBoardProgress :bgcolor="'#FFCD83'" :completed="service_inquiry.today_total_not_answer"
                               :total="service_inquiry.today_total_inquiries"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="masonry-item">
      <div
          class="pseudo-img"
          style="height: 10.75rem; padding: 0"
      >
        <div class="stamp_container">
          <p class="stamp_box">TODAY`S<span>스탬프 카드 발급</span></p>
          <strong class="stamp_counter">
            <Vue3autocounter :startAmount='0' :endAmount='stamp_counter' :duration='2' :autoinit='true'/>
            <em>회</em>
          </strong>
        </div>
      </div>
    </div>

  </div>
  <div class="table_wrap">
    <div class="table_box">
      <div class="table_card" v-for="month in month_paid">
        <p>{{ month.month }}월</p>
        <span>{{ month.sum }} 원</span>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardMap from "@/view/dashboard/components/DashBoardMap.vue";
import DashBoardRadiaChart from "@/view/dashboard/components/DashBoardRadiaChart.vue";
import DashBoardProgress from "@/view/dashboard/components/DashBoardProgress.vue";
import {onMounted, ref} from "vue";
import DashBoardBarChart from "@/view/dashboard/components/DashBoardBarChart.vue";
import Vue3autocounter from 'vue3-autocounter';
// import Statics from "@/services/service";
import store from "@/store";
import {router} from "@/router/router";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  methods: {
    router() {
      return router
    }
  },
  components: {
    DashBoardMap,
    DashBoardBarChart,
    DashBoardProgress,
    DashBoardRadiaChart,
    Vue3autocounter
  },
  setup() {
    onMounted(async () => {
      masonryLayout()
      coupons.value = await store.dispatch('dashboardStore/DASHBOARD_COUPON')
      admin_user_service.value = await store.dispatch('dashboardStore/DASHBOARD_SERVICE_ADMIN')
      stamp_counter.value = await store.dispatch('dashboardStore/DASHBOARD_STAMP_COUNTER')
      service_app.value = await store.dispatch('dashboardStore/DASHBOARD_SERVICE_APP')
      service_inquiry.value = await store.dispatch('dashboardStore/DASHBOARD_SERVICE_INQUIRY')
      today_month_pay.value = await store.dispatch('dashboardStore/DASHBOARD_TODAY_MONTH_PAID')
      await store.dispatch('dashboardStore/DASHBOARD_MONTH_PAID')
      month_paid.value = store.state.dashboardStore.month
      console.log(store.state.token)
      window.addEventListener("resize", masonryLayout);
    })

    const store = useStore()
    const router = useRouter()
    const coupons = ref({})
    const admin_user_service = ref({})
    const stamp_counter = ref(0)
    const service_app = ref(0)
    const service_inquiry = ref(0)
    const month_paid = ref(0)
    const today_month_pay = ref({})

    const masonryLayout = () => {
      const masonryContainerStyle = getComputedStyle(
          document.querySelector(".masonry-container")
      );
      const columnGap = parseInt(
          masonryContainerStyle.getPropertyValue("column-gap")
      );
      const autoRows = parseInt(
          masonryContainerStyle.getPropertyValue("grid-auto-rows")
      );
      document.querySelectorAll(".masonry-item").forEach((elt) => {
        elt.style.gridRowEnd = `span ${Math.ceil(
            elt.querySelector(".pseudo-img").scrollHeight / autoRows +
            columnGap / autoRows
        )}`;
      });
    }
    return {today_month_pay, month_paid, service_inquiry, service_app, stamp_counter, coupons, masonryLayout, router}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/globalStyle.scss';

body {
  font-size: 8px;
}

div {
  box-sizing: border-box;
  padding: 0;
}

.pseudo-img {
  position: relative;

}

.pseudo-img:hover .full_map {
  z-index: 10;
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
  bottom: 0;
}

.full_map {
  width: 100%;
  padding: 0.2rem;
  position: absolute;
  left: 0;
  bottom: 2rem;
  z-index: -1;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 0.3s, opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

@mixin wrap {
  padding: 2rem 0;
  //border-radius: 10px;
  //width: 100%;
  background-color: $white;
  box-shadow: 0 0.625rem 1.875rem 0 rgba(0, 0, 0, .05);;
}

.chart_radia {
  margin-top: 2.6rem;
  border-bottom: 1px solid $primary;

}

.border_bottom {
  margin: 1rem 0;
  border-bottom: 1px solid $primary;
}

.coupon_box {
  display: flex;
  margin-top: 0.4rem;
  justify-content: center;
  //border-top: 1px solid #3D516F;
  > :first-child {
    border: {
      right: 1px solid $primary;
    };
  }

  div {
    padding: 1rem 2rem 0 2rem;
    text-align: center;

    p {
      font-size: $font-size-1;
      font-weight: $thin;
      letter-spacing: -1px;
      margin-bottom: 1.25rem;
    }

    strong {
      font-weight: $thin;
      font-size: $font-size-2_5;
    }
  }
}

.dash_title {
  padding-top: 0.4rem;
  padding-left: 0.3rem;
  font-size: 1.5rem;
  color: $primary;

  span {
    color: #737373;
    font-size: $font-size-1;
    font-weight: $thin;
  }
}

.service_container {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.56rem;
  height: 100%;

  .service_icon {

    position: absolute;
    left: 1.5rem;
    top: 1rem;
  }

  span {
    font-size: $font-size-1;
    margin-bottom: 0.3rem;
    display: block;
    color: $primary;
  }

  li {
    position: relative;
    box-sizing: border-box;
    padding: 3rem;
    border-radius: 0.625rem;
    height: 100%;
    width: 100%;
    background-color: $white;
    box-shadow: 0 0.625rem 1.875rem 0 rgba(0, 0, 0, .05);
  }
}

.stamp_container {
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, #FFCD83 3.52%, #BB57F9 220.47%);
  //filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .stamp_box {
    letter-spacing: -1px;
    color: $primary;
    margin: 0.3rem 0;

    p {
      font-size: 1rem;
      font-weight: $thin;
    }

    span {
      margin-left: 0.5rem;
      font-size: $font-size-1;
    }
  }

  .stamp_counter {
    color: $primary;
    font-weight: $thin;

    em {
      font-size: $font-size-2;
      font-style: normal;
    }

    span {
      font-size: $font-size-3*2;
    }
  }
}

.sales_container {
  width: 100%;
  margin-top: 1.5rem;

  li {
    border-radius: 0.625rem 0.625rem 0 0;
    overflow: hidden;
    margin-bottom: 0.75rem;
    text-align: center;

    span {
      width: 100%;
      display: block;
      font-size: $font-size-1_25;
      color: $primary;
      padding: 1rem 0;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    p {
      padding: 0.5rem 0;
      font-size: $font-size-1_5;
      font-weight: $thin;
      color: $white;
      background-color: $primary;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

  }
}

.table_wrap {
  padding: 0 1rem 2rem 1rem;

  .table_box {
    margin: 2rem 0;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    //justify-content: space-between;
    justify-content: center;
    flex-wrap: wrap;
    box-shadow: 0 0.625rem 1.875rem 0 rgba(0, 0, 0, .05);

    .table_card {
      width: 15rem;
      flex-grow: 1;
      border: 1px solid #eee;
      text-align: center;

      p {
        padding: 1rem;
        color: $white;
        border-bottom: 1px solid #eee;
        background-color: $primary;
      }

      span {
        display: block;
        padding: 1rem;
      }
    }
  }

}

.masonry-container {
  --gap: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--gap);
  grid-auto-rows: 0.5rem;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

@media screen and (max-width: 1200px) {
  .masonry-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 900px) {

  .masonry-container {

    display: block;

    .pseudo-img {
      padding: 1rem 1rem;
    }
  }
  .service_container li {
    padding: 3.5rem 1.5rem;
  }
  .stamp_container .stamp_counter {
    color: $primary;

    font-weight: $thin;

    em {
      font-size: $font-size-1_5;
      font-style: normal;
    }

    span {
      font-size: $font-size-3;

    }
  }
  .masonry-item {
    margin-bottom: var(--gap);
  }
}

@media screen and (max-width: 400px) {
  .masonry-container {
    display: block;

    .pseudo-img {
      padding: 1rem 1rem;
    }
  }
  .service_container li {
    padding: 3.5rem 1.5rem;
  }
  .masonry-item {
    margin-bottom: var(--gap);
  }
}

/* ignore this */
.pseudo-img {
  padding: 1.3rem 2.75rem;
  box-shadow: 0 0.625rem 1.875rem 0 rgba(0, 0, 0, .05);
  border-radius: 0.625rem;
  font-size: $font-size-2;

}
</style>

