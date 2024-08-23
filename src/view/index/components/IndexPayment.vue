<template>
  <div id="payment" class="payment_wrap" ref="section">
    <div class="container">
      <h2>제공 서비스와 이용 요금이 궁금하신가요?</h2>
      <div class="contents">
        <ul>
          <li>
            <div class="contents_header">
              <p>기본상품</p>
              <font-awesome-icon class="icon basic" :icon="['fas', 'seedling']" />
            </div>
            <div class="contents_top">
              <div class="contents_title">
                <h3>BASIC</h3>
                <p>3개월 기본형</p>
              </div>
              <div class="contents_sub">
                <p>합리적인 비용으로<br>행복스탬프를 시작하고 싶은 고객</p>
              </div>
              <div class="contents_detail_hidden">
                <p class="period">
                  <span>3개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price">
                  <span class="true">60,000원</span>
                </p>
              </div>
            </div>
            <div class="contents_bottom">
              <div class="contents_detail">
                <p class="period">
                  <span>3개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price">60,000원</p>
              </div>
              <div class="contents_list">
                <ul>
                  <li>
                    <p>대시보드 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>위치찾기 서비스 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>근처가게 노출 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>카드디자인 템플릿</p>
                    <span>6개</span>
                  </li>
                  <li>
                    <p>받침대&스탬프</p>
                    <span>30,000원</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <div class="contents_header">
              <p>추천상품</p>
              <font-awesome-icon class="icon standard" :icon="['fas', 'crown']" />
            </div>
            <div class="contents_top">
              <div class="contents_title">
                <h3>STANDARD</h3>
                <p>6개월 추천형</p>
              </div>
              <div class="contents_sub">
                <p>할인율 적용으로 부담을 낮춰<br>행복스탬프를 이용하고 싶은 고객</p>
              </div>
              <div class="contents_detail_hidden">
                <p class="period">
                  <span>6개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price">
                  <span class="false">120,000원</span>
                  <span class="true">110,000원</span>
                </p>
              </div>
            </div>
            <div class="contents_bottom">
              <div class="contents_detail">
                <p class="period">
                  <span>6개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price_false">120,000원</p>
                <p class="price">110,000원</p>
              </div>
              <div class="contents_list">
                <ul>
                  <li>
                    <p>대시보드 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>위치찾기 서비스 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>근처가게 노출 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>카드디자인 템플릿</p>
                    <span>6개</span>
                  </li>
                  <li>
                    <p>받침대&스탬프</p>
                    <span>30,000원</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <div class="contents_header">
              <p>인기상품</p>
              <font-awesome-icon class="icon premium" :icon="['fas', 'thumbs-up']" />
            </div>
            <div class="contents_top">
              <div class="contents_title">
                <h3>PREMIUM</h3>
                <p>12개월 장기형</p>
              </div>
              <div class="contents_sub">
                <p>보다 높은 할인율과 장기적인 <br>스탬프 이용자를 유치하고 싶은 고객</p>
              </div>
              <div class="contents_detail_hidden">
                <p class="period">
                  <span>12개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price">
                  <span class="false">240,000원</span>
                  <span class="true">200,000원</span>
                </p>
              </div>
            </div>
            <div class="contents_bottom">
              <div class="contents_detail">
                <p class="period">
                  <span>12개월 기준</span>
                  <span>(Vat별도)</span>
                </p>
                <p class="price_false">240,000원</p>
                <p class="price">200,000원</p>
              </div>
              <div class="contents_list">
                <ul>
                  <li>
                    <p>대시보드 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>위치찾기 서비스 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>근처가게 노출 제공</p>
                    <font-awesome-icon class="check_icon" :icon="['fas', 'circle-check']" />
                  </li>
                  <li>
                    <p>카드디자인 템플릿</p>
                    <span>6개</span>
                  </li>
                  <li>
                    <p>받침대&스탬프</p>
                    <span>30,000원</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const section = ref(null);


    onMounted(() => {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, // 파트가 화면의 50% 이상 보일 때 진입으로 간주
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          const { target, isIntersecting } = entry;

          if (isIntersecting) {
            const h2Element = target.querySelector("h2");
            h2Element.style.opacity = 1;
            h2Element.style.transform = "translateY(0)";
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      observer.observe(section.value);

    });


    return {
      section
    };
  },
};

</script>

<style scoped lang="scss">
@import "@/assets/globalStyle.scss";


.payment_wrap {
  color: $black;

  .container {
    padding: 7.5rem 15rem;

    h2 {
      font-size: 1.625rem;
      font-weight: $medium;
      text-align: center;
      opacity: 0;
      transform: translateY(-80px);
      transition: opacity 1s ease, transform 1s ease;
    }
  }

  .contents {
    margin-top: 5rem;

    > ul {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > li {
        width: 30%;
        height: 100%;
        border: 0.063rem solid #dddddd;
        border-radius: 0.625rem;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.1);
          transition: all 0.3s ease;
        }

        &:nth-child(2) {
          border: 0.063rem solid #526188;

          .contents_header {
            background-color: #526188;

            .icon.standard {
              color: #ffffff;
            }

            p {
              color: #ffffff;
            }
          }

          .contents_top {

            .contents_title {


            }
          }
        }

        &:nth-child(3) {
          border: 0.063rem solid #555E75;

          .contents_header {
            background-color: #555E75;

            .icon.premium {
              color: #ffffff;
            }

            p {
              color: #ffffff;
            }
          }

          .contents_top {

            .contents_title {


            }
          }
        }

        .contents_header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          background-color: #dddddd;
          border-radius: 0.5rem 0.5rem 0 0;

          p {
            font-size: 0.938rem;
            font-weight: $regular;
          }

          .icon {
            position: absolute;
            right: 20px;
            font-size: 1.5rem;
            color: #ffffff;
          }
        }

        .contents_top {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 30%;
          padding: 20px 30px;
          box-sizing: border-box;

          .contents_title {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            margin-bottom: 0.563rem;

            h3 {
              font-size: 28px;
              font-weight: $bold;
              margin-right: 0.563rem;
            }

            p {


            }
          }

          .contents_sub {

            p {
              color: #999999;
              line-height: 1.625rem;

            }
          }

          .contents_detail_hidden {
            display: none;
          }

          &:after {
            content: "";
            position: absolute;
            width: 80%;
            height: 0.063rem;
            bottom: 0;
            background-color: $light_gray;
          }
        }

        .contents_bottom {
          padding: 20px 30px;

          .contents_detail {
            position: relative;

            .period {
              display: flex;
              align-items: center;
              justify-content: space-between;

              span:first-child {
                font-size: 0.875rem;
                font-weight: $medium;
                color: $dark_gray;
                line-height: 1.875rem;
              }

              span:last-child {
                font-size: 12px;
              }

            }

            .price_false {
              display: inline-block;
              font-size: 20px;
              margin-right: 8px;
              text-decoration: line-through;
            }

            .price {
              display: inline-block;
              font-size: 28px;
              font-weight: $medium;

            }
          }

          .contents_list {
            width: 100%;
            height: 100%;
            padding: 1.25rem;
            margin-top: 1.25rem;
            background-color: #f5f5f5;
            border-radius: 0.313rem;
            box-sizing: border-box;

            ul {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              height: 100%;
              gap: 20px;


              li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                p {
                  font-size: 0.938rem;
                }

                .check_icon {
                }

                span {
                  font-weight: $medium;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1630px) {
  .payment_wrap {
    .container {
      h2 {
      }
    }
    .contents {
      > ul {
        > li {
          width: 31%;

          &:hover {
          }

          &:nth-child(2) {
            .contents_header {
              .icon.standard {
              }
              p {
              }
            }
            .contents_top {
              .contents_title {
              }
            }
          }

          &:nth-child(3) {
            .contents_header {
              .icon.premium {
              }

              p {
              }
            }
            .contents_top {
              .contents_title {
              }
            }
          }
          .contents_header {
            p {
            }
            .icon {
              font-size: 18px;
            }
          }

          .contents_top {
            .contents_title {
              flex-direction: column;
              align-items: start;

              h3 {
              }

              p {
                margin-top: 4px;
              }
            }
            .contents_sub {
              p {
              }
            }
            .contents_detail_hidden {
            }
            &:after {
            }
          }
          .contents_bottom {

            .contents_detail {
              .period {
              }
              .price_false {
              }
              .price {
              }
              span {
              }
            }
            .contents_list {
              ul {
                li {
                  p {
                  }
                  .check_icon {
                  }
                  span {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}


@media screen and (max-width: 1460px) {
  .payment_wrap {
    .contents {
      > ul {
        > li {
          width: 30%;
          height: 100%;

          &:hover {
          }
          &:nth-child(2) {
            .contents_header {
              p {
              }
            }
            .contents_top {
              .contents_title {
                .icon.standard {
                }
              }
            }
          }

          &:nth-child(3) {
            .contents_header {
              p {
              }
            }

            .contents_top {
              .contents_title {
                .icon.premium {
                }
              }
            }
          }
          .contents_header {
            height: 30px;
            p {
              font-size: 14px;
            }
          }
          .contents_top {
            height: 30%;
            padding: 20px;

            .contents_title {
              height: 100%;
              margin-bottom: 8px;

              h3 {
                font-size: 22px;
                font-weight: $medium;
                margin-right: 6px;
              }

              p {
                font-size: 14px;
              }

              .icon {
                font-size: 16px;
                color: #dddddd;
              }
            }

            .contents_sub {
              p {
                font-size: 14px;
                line-height: 20px;
              }
            }

            .contents_detail_hidden {
            }

            &:after {
            }
          }

          .contents_bottom {
            padding: 20px;

            .contents_detail {
              .period {
                font-weight: $regular;
                line-height: 1.5rem;
              }

              .price_false {
                font-size: 16px;
                margin-right: 6px;
              }
              .price {
                font-size: 20px;
                font-weight: $medium;
              }

              span {
                top: 4px;
              }
            }

            .contents_list {
              padding: 16px;
              margin-top: 1rem;

              ul {
                gap: 16px;

                li {
                  p {
                    font-size: 14px;
                  }

                  .check_icon {
                    font-size: 14px;
                  }

                  span {
                    font-size: 15px;
                    font-weight: $regular;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .payment_wrap {
    .container {
      padding: 80px 80px;

      h2 {
        font-size: 22px;
      }
    }

    .contents {
      margin-top: 60px;

      > ul {
        > li {
          width: 30%;
          height: 100%;

          &:nth-child(2),
          &:nth-child(3) {
            .contents_header {
              p {
              }
            }

            .contents_top {
              .contents_title {
                .icon.standard,
                .icon.premium {
                }
              }
            }
          }

          .contents_header {
            height: 30px;

            p {
              font-size: 14px;
            }
          }

          .contents_top {
            height: 30%;
            padding: 20px;

            .contents_title {
              height: 100%;
              margin-bottom: 8px;

              h3 {
                font-size: 22px;
                font-weight: $medium;
                margin-right: 6px;
              }

              p {
                font-size: 14px;
              }

              .icon {
                font-size: 16px;
                color: #dddddd;
              }
            }

            .contents_sub {
              p {
                font-size: 14px;
                line-height: 20px;
              }
            }

            .contents_detail_hidden {}

            &:after {
            }
          }

          .contents_bottom {
            padding: 20px;

            .contents_detail {
              .period {
                font-weight: $regular;
                line-height: 1.5rem;
              }

              .price_false {
                font-size: 16px;
                margin-right: 6px;
              }

              .price {
                font-size: 20px;
                font-weight: $medium;
              }

              span {
              }
            }

            .contents_list {
              padding: 16px;
              margin-top: 1rem;

              ul {
                gap: 16px;

                li {
                  p {
                    font-size: 14px;
                  }

                  .check_icon {
                    font-size: 14px;
                  }

                  span {
                    font-size: 15px;
                    font-weight: $regular;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .payment_wrap {

    .container{

      .contents {

        > ul {
          flex-direction: column;
          justify-content: center;
          gap: 30px;

          > li {
            position: relative;
            display: flex;
            flex-direction: row;
            width: 100%;

            .contents_header {
              position: static;
              width: 5%;
              height: auto;
              border-radius: 0.5rem 0 0 0.5rem;

              p {
                font-weight: $regular;
                writing-mode: vertical-rl;
                text-orientation: upright;
              }

              .icon {
                position: absolute;
                top: 10px;
                right: 30px;
                font-size: 1.5rem;
                color: $gray;

                &.standard {
                  color: #526188;
                }

                &.premium {
                  color: $navy;
                }
              }
            }

            .contents_top {
              position: relative;
              align-items: flex-start;
              justify-content: left;
              width: 45%;
              height: 100%;
              padding: 20px;

              .contents_title {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                height: 100%;
                margin-bottom: 0.563rem;


                h3 {
                  font-size: 28px;
                  font-weight: $bold;
                  margin-right: 0.563rem;
                }

                p {
                  margin-top: 6px;
                }
              }

              .contents_sub {
                position: relative;

                p {
                  color: #999999;
                  line-height: 20px;

                }
              }

              .contents_detail_hidden {
                position: relative;
                display: flex;
                flex-direction: column;
                margin-top: 30px;
                width: 100%;

                &:before {
                  content: "";
                  position: absolute;
                  width: 100%;
                  height: 0.063rem;
                  top: -14px;
                  background-color: $light_gray;
                }

                .period {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;

                  span:first-child {
                    font-size: 0.875rem;
                    font-weight: $medium;
                    color: $dark_gray;
                    line-height: 1.875rem;
                  }

                  span:last-child {
                    font-size: 11px;
                  }

                }

                .price {
                  display: flex;
                  flex-direction: row;
                  align-items: end;

                  .false {
                    display: inline;
                    font-size: 22px;
                    margin-right: 0.625rem;
                    text-decoration: line-through;
                    font-size: 16px;
                  }

                  .true {
                    display: flex;
                    font-size: 22px;
                    font-weight: $medium;
                  }
                }
                span {
                }
              }

              &:after {
                display: none;
              }
            }

            .contents_bottom {
              width: 50%;
              height: 100%;
              padding: 40px 20px 20px 20px;

              .contents_detail {
                display: none;
              }

              .contents_list {
                width: 100%;
                height: 100%;
                padding: 16px;
                margin: 0;
                background-color: #f5f5f5;
                border-radius: 0.313rem;
                box-sizing: border-box;

                ul {
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                  height: 100%;
                  gap: 20px;


                  li {

                    p {
                    }

                    .check_icon {
                    }

                    span {
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .payment_wrap {

    .container {
      padding: 48px 48px;

      h2 {
        font-size: 18px;
      }

      .contents {
        margin-top: 40px;

        > ul {

          > li {


            .contents_header {

              p {
                font-weight: $regular;
                writing-mode: vertical-rl;
                text-orientation: upright;
              }

              .icon {
                font-size: 20px;
              }
            }

            .contents_top {
              position: relative;
              align-items: flex-start;
              justify-content: left;
              width: 45%;
              height: 100%;
              padding: 20px;

              .contents_title {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                height: 100%;
                margin-bottom: 0.563rem;


                h3 {
                  font-size: 28px;
                  font-weight: $bold;
                  margin-right: 0.563rem;
                }

                p {
                  margin-top: 6px;
                }

                .icon {
                  position: absolute;
                  right: 0;
                  font-size: 1.5rem;
                  color: #dddddd;
                }
              }

              .contents_sub {
                position: relative;

                p {
                  color: #999999;
                  line-height: 1.625rem;

                }

                &:after {
                  display: none;
                }
              }

              .contents_detail_hidden {
                display: block;
                margin-top: 30px;

                .period {
                  font-size: 0.875rem;
                  font-weight: $medium;
                  color: $dark_gray;
                  line-height: 1.875rem;
                }

                .price {
                  display: flex;
                  flex-direction: row;
                  align-items: end;

                  .false {
                    margin-right: 4px;
                  }
                }
              }

              &:after {
                display: none;
              }
            }

            .contents_bottom {
              width: 50%;
              height: 100%;
              padding: 40px 20px 0 20px;

              .contents_detail {
                display: none;
              }

              .contents_list {
                width: 100%;
                height: 100%;
                padding: 16px;
                margin: 0;
                background-color: #f5f5f5;
                border-radius: 0.313rem;
                box-sizing: border-box;

                ul {
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                  height: 100%;
                  gap: 20px;


                  li {

                    p {
                    }

                    .check_icon {
                    }

                    span {
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 630px) {
  .payment_wrap {

    .container {

      h2 {
      }

      .contents {

        > ul {
          display: flex;
          align-items: center;

          > li {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80%;
            height: 100%;

            .contents_header {

              .icon {
                display: none;
              }
            }

            &:hover {
            }

            &:nth-child(2) {

              .contents_header {
                background-color: #526188;

                .icon {
                  display: none;
                }
              }

              .contents_top {

                .contents_title {

                  .icon.standard {
                  }
                }
              }
            }

            &:nth-child(3) {

              .contents_header {
                background-color: $navy;

                .icon {
                  display: none;
                }
              }

              .contents_top {

                .contents_title {

                  .icon.premium {
                  }
                }
              }
            }

            .contents_header {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 26px;
              background-color: #dddddd;
              border-radius: 0.5rem 0.5rem 0 0;

              p {
                font-size: 14px;
                font-weight: $regular;
                writing-mode: initial;
                text-orientation: initial;
              }
            }

            .contents_top {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 30%;
              padding: 20px;
              box-sizing: border-box;

              .contents_title {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 100%;
                margin-bottom: 0.563rem;

                h3 {
                  font-size: 20px;
                  font-weight: $bold;
                  margin-right: 0.563rem;
                }
                p {
                }
                .icon {
                  font-size: 20px;

                }
              }

              .contents_sub {
                width: 100%;

                p {
                  color: #999999;
                  line-height: 18px;

                }

                &:after {
                  content: "";
                  position: absolute;
                  width: 100%;
                  height: 1px;
                  background-color: $light_gray;
                }
              }

              .contents_detail_hidden {
                display: none;
              }
            }

            .contents_bottom {
              width: 100%;
              padding: 6px 20px 20px 20px;
              box-sizing: border-box;

              .contents_detail {
                display: block;


                .period {
                  font-size: 0.875rem;
                  font-weight: $regular;
                }

                .price_false {
                  display: inline-block;
                  font-size: 16px;
                  margin-right: 4px;
                  text-decoration: line-through;
                }

                .price {
                  display: inline-block;
                  font-size: 20px;
                  font-weight: $medium;

                }

                span {
                  display: inline-block;
                }
              }

              .contents_list {
                padding: 16px;
                margin-top: 1.25rem;


                ul {
                  gap: 14px;

                  li {

                    p {
                    }

                    .check_icon {
                    }

                    span {
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .payment_wrap {

    .container {
      padding: 48px 24px;

      h2 {
        font-size: 18px;
      }

      .contents {
        margin-top: 40px;

        > ul {
          display: flex;
          align-items: center;

          > li {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 90%;
            height: 100%;

            &:hover {
            }

            &:nth-child(2) {

              .contents_header {

                p {
                }

              }

              .contents_top {

                .contents_title {

                  .icon.standard {
                  }
                }
              }
            }

            &:nth-child(3) {

              .contents_header {

                p {
                }
              }

              .contents_top {

                .contents_title {

                  .icon.premium {
                  }
                }
              }
            }

            .contents_header {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 26px;
              background-color: #dddddd;
              border-radius: 0.5rem 0.5rem 0 0;

              p {
                font-size: 14px;
                font-weight: $regular;
                writing-mode: initial;
                text-orientation: initial;
              }
            }

            .contents_top {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 30%;
              padding: 20px;
              box-sizing: border-box;

              .contents_title {
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 100%;
                margin-bottom: 0.563rem;

                h3 {
                  font-size: 20px;
                  font-weight: $bold;
                  margin-right: 0.563rem;
                }
                p {
                }
              }

              .contents_sub {
                width: 100%;

                p {
                  color: #999999;
                  line-height: 18px;

                }

                &:after {
                  content: "";
                  position: absolute;
                  width: 100%;
                  height: 1px;
                  background-color: $light_gray;
                }
              }

              .contents_detail_hidden {
                display: none;
              }
            }

            .contents_bottom {
              width: 100%;
              padding: 6px 20px 20px 20px;
              box-sizing: border-box;

              .contents_detail {
                display: block;


                .period {
                  font-size: 0.875rem;
                  font-weight: $regular;
                }

                .price_false {
                  display: inline-block;
                  font-size: 16px;
                  margin-right: 4px;
                  text-decoration: line-through;
                }

                .price {
                  display: inline-block;
                  font-size: 20px;
                  font-weight: $medium;

                }

                span {
                  display: inline-block;
                }
              }

              .contents_list {
                padding: 16px;
                margin-top: 1.25rem;


                ul {
                  gap: 14px;

                  li {

                    p {
                    }

                    .check_icon {
                    }

                    span {
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>