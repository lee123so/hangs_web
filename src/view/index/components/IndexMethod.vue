<template>
  <div id="method" class="method_wrap" ref="section">
    <div class="container">
      <div class="title_container">
        <h2 class="title">앱 이용방법을 설명드릴게요!</h2>
        <div class="tab_menu">
          <ul>
            <li v-for="(tab, index) in tabs" :key="index">
              <button :class="{ active: activeTab === index }" @click="setActiveTab(index)">{{ tab }}</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_container">
        <template v-for="(content, index) in contents" :key="index">
          <h3 v-if="activeTab === index">{{ content.title }}</h3>
          <div class="content" v-if="activeTab === index">
            <ul>
              <template v-for="(step, stepIndex) in content.steps" :key="stepIndex">
                <li>
                  <div class="step">
                    <p>STEP 0{{ stepIndex + 1 | padZero }}</p>
                  </div>
                  <div class="text">
                    <p>{{ step }}</p>
                  </div>
                </li>
                <template v-if="stepIndex !== content.steps.length - 1">
                  <font-awesome-icon class="arrow_right" :icon="['fas', 'angle-right']" />
                </template>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";

export default {
  setup() {
    const isFirstLoad = ref(true); // 첫 로딩 여부를 저장하는 변수
    const section = ref(null); // 감지할 섹션 요소의 ref
    let isScrollEventActive = true;
    const activeTab = ref(0);
    const tabs = ['서비스 도입', '매장 운영자', '서비스 이용자'];
    const contents = [
      {
        title: '서비스를 도입하고 싶다면?',
        steps: [
          '구글스토어 or 앱스토어 실행',
          '[행스 사장님 앱]다운로드',
          '회원가입 후 "더보기" 메뉴 선택',
          '"서비스 신청" 게시판 이용',
        ],
      },
      {
        title: '매장을 운영하는 운영자라면?',
        steps: [
          '회원가입 및 로그인',
          '스탬프카드 등록과 매장정보 확인',
          'NFC와 QR코드로 스탬프 제공',
          '"대시보드"로 이용자 추이 확인',
        ],
      },
      {
        title: '행복스탬프를 이용하는 사용자라면?',
        steps: [
          '간편 로그인',
          '스탬프카드 선택',
          '매장 이용 및 스탬프 적립',
          '쿠폰 발급 및 사용',
        ],
      },
    ];

    function setActiveTab(index) {
      activeTab.value = index;
    }

    const padZero = (value) => {
      return value.toString().padStart(2, '0');
    };


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
        const h2Element = document.querySelector(".title");
        h2Element.style.opacity = '1';
        h2Element.style.transform = "translateY(0)";
        isScrollEventActive = false;
      }
    };

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
      contents,
      setActiveTab,
      padZero,
      section
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/globalStyle.scss";
.method_wrap {
  width: 100%;
  background-color: $background_gray;
  box-sizing: border-box;

  .container {
    padding: 7.5rem 15rem;

    .title_container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      h2 {
        font-size: 1.625rem;
        font-weight: $medium;
        text-align: center;
        opacity: 0;
        transform: translateY(-80px);
        transition: opacity 1s ease, transform 1s ease;

      }

      .tab_menu {

        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 28.125rem;
          margin-top: 1.875rem;
          gap: 0.938rem;

          li {
            button {
              font-size: 1rem;
              font-weight: $medium;
              width: 8.75rem;
              height: 2.875rem;
              color: #99999a;
              border-radius: 0.313rem;
              border: 0.063rem solid #99999a;
              cursor: pointer;

              &.active {
                color: $white;
                background-color: $navy;
              }
            }
          }
        }
      }
    }

    .content_container {
      h3 {
        font-size: 1.188rem;
        font-weight: $medium;
        margin-top: 3.75rem;

      }

      .content {

        ul {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.875rem;

          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 23%;
            padding: 30px 20px;
            border: 0.063rem solid $navy;
            border-radius: 0.625rem;
            box-sizing: border-box;
            gap: 0.625rem;

            .step {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 5.25rem;
              height: 1.875rem;
              background-color: #7385B2;
              border-radius: 1.25rem;

              p {
                font-size: 0.938rem;
                font-weight: $medium;
                color: $white;

              }
            }
            .text {

              p {
                font-size: 1.125rem;

              }
            }
          }
          .arrow_right {
            color: $gray
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .method_wrap {


    .container {
      padding: 80px 80px;

      .title_container {

        h2 {
          font-size: 22px;
        }

        .tab_menu {

          ul {
            width: auto;
            gap: 16px;

            li {

              button {
                font-size: 16px;
                font-weight: $regular;
                width: 120px;
                height: 38px;

                &.active {
                }
              }
            }
          }
        }
      }

      .content_container {
        h3 {
          font-size: 18px;
          font-weight: $regular;
          margin-top: 40px;
        }

        .content {

          ul {
            margin-top: 24px;

            li {
              width: 23%;
              padding: 20px 10px;

              .step {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 26px;

                p {
                  font-size: 12px;
                  font-weight: $regular;
                }
              }
              .text {

                p {
                  font-size: 14px;

                }
              }
            }
            .arrow_right {

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .method_wrap {


    .container {
      padding: 48px 48px;

      .title_container {

        h2 {
          font-size: 18px;
        }

        .tab_menu {

          ul {
            margin-top: 20px;
            gap: 10px;

            li {

              button {
                font-size: 14px;
                font-weight: $regular;
                width: 100px;
                height: 30px;

                &.active {
                }
              }
            }
          }
        }
      }

      .content_container {
        h3 {
          font-size: 16px;
          font-weight: $regular;
          margin-top: 40px;
        }

        .content {

          ul {
            flex-direction: column;
            margin-top: 24px;
            gap: 8px;

            li {
              flex-direction: row;
              align-items: center;
              justify-content: left;
              width: 100%;
              padding: 10px 30px;

              .step {
                width: 60px;
                height: 26px;

                p {
                  font-size: 12px;

                }
              }
              .text {

                p {
                  font-size: 14px;

                }
              }
            }
            .arrow_right {
              transform: rotate(90deg);
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .method_wrap {


    .container {
      padding: 48px 24px;

      .title_container {

        h2 {
        }

        .tab_menu {

          ul {
            gap: 6px;


            li {

              button {
                width: 100px;
                font-size: 12px;

                &.active {
                }
              }
            }
          }
        }
      }

      .content_container {
        h3 {
          margin-top: 20px;
        }

        .content {

          ul {
            flex-direction: column;
            margin-top: 24px;
            gap: 4px;

            li {
              padding: 8px 10px;

              .step {
                width: 60px;
                height: 26px;

                p {

                }
              }
              .text {

                p {

                }
              }
            }
            .arrow_right {
            }
          }
        }
      }
    }
  }
}

</style>
