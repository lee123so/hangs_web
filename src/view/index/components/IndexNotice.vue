<template>
  <div id="notice" class="notice_wrap" ref="section">
    <div class="container">
      <h2>행복스탬프 소식을 알려드려요!</h2>
      <div class="content">
        <swiper
          :slidesPerView="4"
          :spaceBetween="10"
          v-bind="option"
          :breakpoints="{
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@0.50': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@0.75': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '@1.50': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }"
          :modules="modules"
          class="mySwiper"
        >

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper_items">
            <div class="category">
              <p class="new">new</p>
              <span>이벤트</span>
            </div>
            <div class="notice_title">
              <p>행스 앱 출시 기념 이벤트!</p>
            </div>
            <div class="notice_text">
              <p>행복스탬프 앱 출시 기념 이벤트를 진행합니다.<br>해당 공지사항을 인스타그램에 공유해주세요!</p>
            </div>
            <div class="notice_date">
              <p>2023.06.01</p>
            </div>
          </swiper-slide>

        </swiper>
        <div class="notice_pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
// import required modules
import {Pagination} from 'swiper';
import { onMounted, ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const section = ref(null);
    const option = {
      pagination: {
        el: ".notice_pagination",
        clickable: true,

        // renderBullet: function (index, className) {
        //   return '<div class="' + className + '"><span>' + (index + 1) + "</span><div class=progress><span class=time></span><span class=bg></span></div></div>";
        // },
      },
    }
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
      modules: [Pagination],
      section,
      option
    };


  },
};
</script>

<style  lang="scss">
@import "@/assets/globalStyle.scss";
.notice_pagination{
  width: 100%;
  display: flex;
  margin: 10px 0;
  justify-content: center;
  .swiper-pagination-bullet{
    width: 30%;
    height: 5px;
    border-radius: 0;
    background-color: #555E75;
    transition: all 0.3s;
  }
  .swiper-pagination-bullet-active{
    //width: 100% !important;
  }
}
.notice_wrap {
  width: 100%;
  color: $black;
  background-color: $background_gray;

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

    .content {
      margin-top: 5rem;

      .mySwiper {
        display: flex;
        align-items: center;
        justify-content: space-between;


        .swiper_items {
          width: 20.625rem;
          padding: 1.875rem 1.25rem;
          border: 0.063rem solid $navy;
          border-radius: 0.625rem;
          background-color: $white;
          box-sizing: border-box;


          .category {
            display: flex;
            align-items: center;

            .new {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 3rem;
              height: 1.5rem;
              color: $white;
              background-color: $navy;
              border-radius: 1.563rem;
            }

            span {
              font-size: 0.875rem;
              font-weight: $regular;
              margin-left: 0.625rem;
            }
          }

          .notice_title {
            margin-top: 1.438rem;

            p {
              font-size: 1.188rem;
              font-weight: $regular;
            }
          }

          .notice_text {
            margin-top: 1.875rem;

            p {
              font-size: 0.938rem;
              font-weight: $thin;
              line-height: 1.5rem;

            }
          }

          .notice_date {
            margin-top: 1.25rem;

            p {
              font-size: 0.938rem;
              color: #999999;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .notice_wrap {

    .container {
      padding: 80px 80px;

      h2 {
        font-size: 22px;
      }

      .content {
        margin-top: 60px;

        .mySwiper {
          display: flex;
          align-items: center;
          justify-content: space-between;


          .swiper_items {

            .category {

              .new {
                width: 42px;
                font-size: 14px;
              }

              span {

                font-weight: $regular;
                margin-left: 8px;
              }
            }

            .notice_title {
              margin-top: 16px;

              p {
                font-size: 18px;
              }
            }

            .notice_text {
              margin-top: 20px;

              p {
                font-size: 0.938rem;
                font-weight: $thin;
                line-height: 20px;

              }
            }

            .notice_date {

              p {
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .notice_wrap {

    .container {
      padding: 48px;

      h2 {
        font-size: 18px;
      }

      .content {
        margin-top: 40px;

        .mySwiper {

          .swiper_items {
            padding: 24px 12px;

            .category {

              .new {

              }

              span {
              }
            }

            .notice_title {


              p {
                font-size: 16px;

              }
            }

            .notice_text {


              p {
                font-size: 14px;

              }
            }

            .notice_date {

              p {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}

</style>
