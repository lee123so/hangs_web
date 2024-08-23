<template>
  <div id="introduction" class="introduction_wrap" ref="section">
    <div class="container" >
      <h2>행복스탬프의 장점은 무엇인가요?</h2>
      <div class="content" >
        <div class="left">
          <ul>
            <li v-for="tab in tabs" :key="tab.name" @click="setActiveTab(tab.name)">
              <p :class="{ active: activeTab === tab.name }">{{ tab.name }}</p>
              <img class="arrow_right" src="/src/assets/images/arrow_right.png" v-if="activeTab === tab.name">
            </li>
          </ul>
        </div>
        <div class="center">
          <div class="background">
            <img :src="getCenterImageSrc(activeTab)">
          </div>
        </div>
        <div class="right">
          <div class="card">
            <h3>{{ activeTabIndex.toString().padStart(2, '0') }}</h3>
            <p>{{ getCenterTabText(activeTab) }}</p>
            <span>{{ getCenterTabDescription1(activeTab) }}</span>
            <span>{{ getCenterTabDescription2(activeTab) }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_card">
          <h3>{{ activeTabIndex.toString().padStart(2, '0') }}</h3>
          <p>{{ getCenterTabText(activeTab) }}</p>
          <span>{{ getCenterTabDescription1(activeTab) }}</span>
          <span>{{ getCenterTabDescription2(activeTab) }}</span>
        </div>
      </div>
    </div>
    <div @click="redirectToAppStore" class="download_btn">
      <img src="/src/assets/images/download_btn.png">
    </div>
  </div>
</template>

<script>
import {ref, reactive, computed, onMounted, watch, onUnmounted} from 'vue';
import banner1 from '@/assets/images/content_01.png'
import banner2 from '@/assets/images/content_02.png'
import banner3 from '@/assets/images/content_03.png'
import banner4 from '@/assets/images/content_04.png'
export default {
  setup() {
    const isFirstLoad = ref(true); // 첫 로딩 여부를 저장하는 변수
    const section = ref(null); // 감지할 섹션 요소의 ref
    let isScrollEventActive = true;
    const activeTab = ref('재밌어요');
    const activeTabObject = computed(() => {
      return tabs.find((tab) => tab.name === activeTab.value);
    });
    const activeTabIndex = computed(() => {
      return activeTabObject.value ? activeTabObject.value.index : '';
    });
    const value = ref(import('@/assets/images/content_02.png').then(img => { console.log(img.default);return img.default}))
    console.log(value.value)
    const tabs = reactive([
      {
        name: '재밌어요',
        imageSrc:banner1 ,
        text: '아날로그의 감성을 재현',
        description1: '종이스탬프의 감성을 그대로 핸드폰에 담았어요!',
        description2: '재미있게 도장을 쿵쿵! 혜택이 쿵쿵!',
      },
      {
        name: '간단해요',
        imageSrc: banner2,
        text: '간단한 사용방법',
        description1: '직관적인 화면과 간편한 사용방법으로',
        description2: '빠르고 즐겁게 스탬프를 모아보세요!',
      },
      {
        name: '편리해요',
        imageSrc: banner3 ,
        text: '편리한 쿠폰 관리',
        description1: '지갑을 가득 채웠던 스탬프카드는 그만!',
        description2: '더 이상 지갑 속을 헤맬 걱정이 없어요!',
      },
      {
        name: '저렴해요',
        imageSrc: banner4 ,
        text: '합리적인 가격',
        description1: '고객님은 무료!',
        description2: `사장님은 월 2만원 이하의 가격으로 단골 고객을 만들어보세요!`,
      },
    ]);

    function setActiveTab(tab) {
      activeTab.value = tab;

      // 이미지 요소에 애니메이션 클래스 추가
      const imageElement = document.querySelector('.center .background img');
      imageElement.classList.add('image-fall-in');

      // 애니메이션 종료 후 클래스 제거
      setTimeout(() => {
        imageElement.classList.remove('image-fall-in');
      }, 500);
    }

    const isActiveTab = computed(() => {
      return (tab) => tab === activeTab.value;
    });

    function getCenterImageSrc(tab) {
      const selectedTab = tabs.find((t) => t.name === tab);
      return selectedTab ? selectedTab.imageSrc : '';
    }

    function getCenterTabText(tab) {
      const selectedTab = tabs.find((t) => t.name === tab);
      return selectedTab ? selectedTab.text : '';
    }

    function getCenterTabDescription1(tab) {
      const selectedTab = tabs.find((t) => t.name === tab);
      return selectedTab ? selectedTab.description1 : '';
    }
    function getCenterTabDescription2(tab) {
      const selectedTab = tabs.find((t) => t.name === tab);
      return selectedTab ? selectedTab.description2 : '';
    }


    tabs.forEach((tab, index) => {
      tab.index = index + 1; // 인덱스 값을 1부터 시작하도록 설정
    });

      const handleScroll = () => {
        if (!isScrollEventActive) return;

        const rect = section.value.getBoundingClientRect(); // 섹션 요소의 위치 정보를 가져옵니다.

        // 첫 로딩 시에는 감지하지 않도록 처리합니다.
        if (isFirstLoad.value) {
          isFirstLoad.value = false;
          return;
        }

        // 스크롤을 내려야 섹션이 일정 비율 이상 보이는 경우에만 이벤트를 처리합니다.
        if (rect.top <= window.innerHeight * 0.7) {
          const h2Element = document.querySelector("h2");
          h2Element.style.opacity = '1';
          h2Element.style.transform = "translateY(0)";
          isScrollEventActive = false;
        }
      };
    function redirectToAppStore() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/android/.test(userAgent)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=your_app_id';
      }

      // iOS에서는 앱스토어 열기
      if (/iphone|ipad|ipod/.test(userAgent)) {
        window.location.href = 'https://itunes.apple.com/app/your_app_id';
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // section ref의 변경을 감지하여 새로운 값이 할당될 때마다 handleScroll을 호출합니다.
    watch(section, () => {
      handleScroll();
    });


    return {
      activeTab,
      tabs,
      setActiveTab,
      isActiveTab,
      getCenterImageSrc,
      getCenterTabText,
      getCenterTabDescription1,
      getCenterTabDescription2,
      activeTabIndex,
      redirectToAppStore,
      section
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/globalStyle.scss";

.introduction_wrap {
  position: relative;
  width: 100%;

  .download_btn {
    position: absolute;
    top: -90px;
    right: 10%;
    z-index: 1;
    cursor: pointer;
    img {
      width: 120px;
      height: 120px;
    }
  }

  .container {

    padding: 120px 200px;

    h2 {
      font-size: 26px;
      font-weight: $medium;
      text-align: center;
      color: $black;
      opacity: 0;
      transform: translateY(-80px);
      transition: opacity 1s ease, transform 1s ease;
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 80px;

      .left {
        display: flex;
        align-items: center;
        width: 33.333%;

        ul {
          display: flex;
          flex-direction: column;

          li {
            display: flex;
            margin-bottom: 35px;

            p {
              position: relative;
              display: inline-block;
              font-size: 20px;
              font-width: $bold;
              color: $gray;
              cursor: pointer;

              &:after {
                content: "";
                position: absolute;
                width: 310px;
                height: 1px;
                top: 35px;
                left: 0;
                background-color: #CCCCCC;
                cursor: default;
                transition: all 0.5s Linear;
              }

              &.active {
                color: #555E75;

                &:after {
                  content: "";
                  position: absolute;
                  width: 550px;
                  height: 1px;
                  top: 35px;
                  left: 0;
                  background-color: #575E73;
                }
              }
            }

            .arrow_right {
              width: 18px;
              height: 18px;
              margin-left: 20px;
            }
          }
        }
      }
      .center {
        width: 460px;
        z-index: 1;

        .background {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding-top: 100%;
          background-color: $navy;
          border-radius: 50%;
          overflow: hidden;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            object-fit: cover;
          }

          .image-fall-in {
            animation: imageFallIn 0.5s linear;
          }

          @keyframes imageFallIn {
            0% {
              top: 0;
              opacity: 0;
            }
            100% {
              top: 50%;
              opacity: 1;
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: end;
        width: 33.333%;

        .card {
          display: flex;
          flex-direction: column;
          width: 80%;
          padding: 30px;
          box-sizing: border-box;
          background-color: #eee;
          border-radius: 0 20px 0 20px;

          h3 {
            font-size: 40px;
            font-weight: $medium;
            color: #ccc;
          }
          p {
            font-size: 20px;
            font-weight: $medium;
            color: $black;
            margin: 20px 0 20px 0;
          }
          span {
            font-size: 16px;
            line-height: 1.4;
          }
        }
      }
    }
    .bottom {
      display: none;
    }
  }
}

@media screen and (max-width: 1200px) {
  .introduction_wrap {

    .download_btn {
      top: -80px;
      img {
        width: 100px;
        height: 100px;
      }
    }

    .container {
      padding: 80px 80px;

      h2 {
        font-size: 22px;

      }
      .content {
        margin-top: 60px;

        .left {


          ul {


            li {
              margin-bottom: 35px;


              p {
                font-size: 16px;


                &:after {
                  width: 180px;
                  top: 28px;
                }

                &.active {


                  &:after {
                    width: 350px;
                    top: 28px;
                  }
                }
              }

              .arrow_right {

              }
            }
          }
        }
        .center {
          width: 380px;

          .background {


            .image-fall-in {

            }
          }
        }
        .right {


          .card {
            padding: 24px;


            h3 {
              font-size: 30px;

            }
            p {
              font-size: 18px;
              margin: 20px 0;

            }
            span {
              font-size: 14px;

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .introduction_wrap {

    .download_btn {
      top: -70px;
      img {
        width: 80px;
        height: 80px;
      }
    }

    .container {
      padding: 48px 48px;

      h2 {
        font-size: 18px;

      }
      .content {
        margin-top: 40px;

        .left {


          ul {


            li {
              margin-bottom: 28px;



              p {



                &:after {
                }

                &.active {


                  &:after {
                    width: 380px;
                  }
                }
              }

              .arrow_right {

              }
            }
          }
        }
        .center {
          width: 300px;

          .background {


            .image-fall-in {

            }
          }
        }
        .right {
          display: none;

          .card {


            h3 {

            }
            p {

            }
            span {

            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        .bottom_card {
          width: 100%;
          padding: 20px;
          background-color: $background_gray;
          border-radius: 0 20px 0 20px;

          h3 {
            display: inline-block;
            font-size: 26px;
            font-weight: $medium;
            color: #ccc;

          }
          p {
            display: inline-block;
            font-size: 18px;
            font-weight: $medium;
            color: $black;
            margin-left: 20px
          }
          span {
            display: block;
            font-size: 12px;
            margin-top: 16px;
          }

          span:last-child {
            display: block;
            font-size: 12px;
            margin-top: 8px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .introduction_wrap {
    .download_btn {
      top: -70px;
      img {
        width: 70px;
        height: 70px;
      }
    }

    .container {
      padding: 48px 24px;

      h2 {
        font-size: 18px;

      }
      .content {
        margin-top: 40px;

        .left {


          ul {


            li {
              margin-bottom: 20px;


              p {
                font-size: 14px;

                &:after {
                  width: 80px;
                  top: 22px;
                }

                &.active {


                  &:after {
                    width: 240px;
                    top: 22px;
                  }
                }
              }

              .arrow_right {
                width: 14px;
                height: 14px;
                margin-left: 8px;

              }
            }
          }
        }
        .center {
          width: 200px;

          .background {


            .image-fall-in {

            }
          }
        }
        .right {
          display: none;

          .card {


            h3 {

            }
            p {

            }
            span {

            }
          }
        }
      }
      .bottom {


        .bottom_card {


          h3 {
            font-size: 18px;
            font-weight: $regular;
          }
          p {
            font-size: 16px;
            font-weight: $regular;
          }
          span {
            display: block;
            font-size: 13px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
