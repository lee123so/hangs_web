<template>
  <div id="faq" class="faq_wrap" ref="section">
    <div class="container">
      <h2>자주 묻는 질문을 정리해봤어요!</h2>
      <div class="tab_menu">
        <ul>
          <li :class="{ active: activeTab === '전체' }" @click="changeTab('전체')">전체</li>
          <li :class="{ active: activeTab === '회원관련' }" @click="changeTab('회원관련')">회원관련</li>
          <li :class="{ active: activeTab === '스탬프' }" @click="changeTab('스탬프')">스탬프</li>
          <li :class="{ active: activeTab === '쿠폰' }" @click="changeTab('쿠폰')">쿠폰</li>
          <li :class="{ active: activeTab === '기타' }" @click="changeTab('기타')">기타</li>
        </ul>
      </div>
      <div class="faq_content" v-for="(faq, index) in filteredFaqs" :key="index" :class="{ active: faq.isOpen }"
           @click="faq.isOpen">
        <div class="question" @click="toggleFAQ(index)">
          <div class="left">
            <p>Q</p>
            <span>{{ faq.question }}</span>
          </div>
          <div class="right">
            <p>{{ faq.category }}</p>
            <font-awesome-icon :class="{ 'faq_icon': true, 'faq_icon_open': faq.isOpen }"
                               :icon="['fas', 'caret-down']"/>
          </div>
        </div>
        <transition name="v" mode="out-in">
          <div class="answer" v-if="faq.isOpen">
            <p>A</p>
            <span v-html="formatAnswer(faq.answer)"></span>
          </div>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue';

export default {
  setup() {
    const section = ref(null);
    const faqs = ref([
      {
          question: '입점은 어떻게 하나요? ',
          answer: '입점신청은 “행스 사장님앱”에서 신청하실 수 있습니다.\n' +
            '회원가입 후 바로 보이는 서비스신청 메뉴에서 원하시는 서비스구간을 선택하시면 가입하신 연락처로 당사 영업시간 내에 연락을 드립니다.',
          category: '기타',
          isOpen: false
        },
        {
        question: '스탬프는 어떻게 찍나요?',
        answer: '앱 내 “행스찍기” 메뉴를 클릭 한 후 매장에 비치된 받침대에 핸드폰을 올려 놓으면 스탬프 발급 버튼이 활성화 됩니다.\n' +
          '활성화 된 버튼 위에 도장을 찍으시면 스탬프가 발급됩니다.\n' +
          '받침대에 올리기 전 발급할 개수도 추가 선택 가능합니다.\n',
        category: '스탬프',
        isOpen: false
      },
      {
        question: '내가 받은 쿠폰은 어디서 확인하나요?',
        answer: '앱 내 “행스쿠폰” 메뉴를 클릭하시면 발급 받은 쿠폰을 확인하실 수 있습니다.\n' +
          '사용하고자 하는 쿠폰 우측의 화살표 클릭 후 매장에 제시하시면 쿠폰을 사용하실 수 있습니다.',
        category: '쿠폰',
        isOpen: false
      },
      {
        question: '스탬프를 양도할 수 있나요?',
        answer: '스탬프는 양도할 수 없습니다.\n' +
          '단, 매장 재량으로 기존의 스탬프를 회수하여 다른 핸드폰에 추가로 스탬핑을 하는 것으로 대체할 수는 있습니다.',
        category: '스탬프',
        isOpen: false
      },
      {
        question: '핸드폰 변경 시 기존 데이터의 백업이 가능한가요?',
        answer: '행복스탬프는 최초 1회 소셜계정 연동 로그인을 진행 후 기존 데이터가 보관되어 핸드폰 변경 시에도 기존 데이터가 지속 됩니다.\n' +
          '단, 계정이 바뀐 경우에는 기존 데이터를 가져올 수 없습니다.',
        category: '회원관련',
        isOpen: false
      },
      {
        question: '실수로 스탬프를 두 번 찍었는데 삭제가 가능한가요?',
        answer: '네, 가능합니다.\n' +
          '스탬프카드 뒷면의 스탬프 중 첫번째 스탬프를 클릭하시면 스탬프 회수 화면으로 이동됩니다.\n\n' +
          '그 후 받침대에 핸드폰을 올려놓고 활성화된 버튼 위에 도장을 찍으시면 회수가 가능합니다.\n' +
          '받침대에 올리기 전 회수할 개수도 추가 선택 가능합니다.',
        category: '스탬프',
        isOpen: false
      },
      {
        question: '스탬프를 회수해야 하는데 실수로 쿠폰을 발급받았어요, 어떻게 해야하나요?',
        answer: '한번 쿠폰을 발급받으면 그 전 스탬프는 회수 할 수 없습니다.\n' +
          '단, 발급받은 쿠폰 이후의 스탬프는 회수 할 수 있습니다.',
        category: '쿠폰',
        isOpen: false
      },
      {
        question: '행복스탬프 도장을 추가로 구매하고 싶어요, 가능한가요?',
        answer: '네, 가능합니다.\n' +
          '추가 구매는 받침대와 도장을 개별적으로 구매하실 수 있습니다.\n' +
          '자세한 사항은 고객센터로 문의주세요.',
        category: '기타',
        isOpen: false
      },
      {
        question: '서비스 탈퇴는 어떻게 하나요?',
        answer: '더보기 > 마이페이지 > 이메일 옆 설정 버튼 > 회원탈퇴 순으로 진행하시면 됩니다.\n' +
          '탈퇴된 계정의 모든 데이터는 복구가 되지 않으므로 신중하게 선택해주세요.',
        category: '회원관련',
        isOpen: false
      }

    ]);

    const activeTab = ref('전체');

    const changeTab = (tab) => {
      activeTab.value = tab;
    };

    const toggleFAQ = (index) => {
      filteredFaqs.value.forEach((faq, i) => {
        if (i === index) {
          faq.isOpen = !faq.isOpen; // 클릭된 메뉴의 상태를 토글
        } else {
          faq.isOpen = false; // 다른 메뉴는 모두 닫음
        }
      });
    };

    const filteredFaqs = computed(() => {
      if (activeTab.value === '전체') {
        return faqs.value;
      } else {
        return faqs.value.filter(faq => faq.category === activeTab.value);
      }
    });

    function formatAnswer(answer) {
      return answer.replace(/\n/g, '<br>');
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
      activeTab,
      changeTab,
      filteredFaqs,
      toggleFAQ,
      formatAnswer,
      section
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/globalStyle.scss";

.v-enter-active {
  transition: opacity 1s ease;
}
.v-leave-active {
  transition: opacity 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.faq_wrap {
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

    .tab_menu {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1.875rem;
      margin-bottom: 5rem;

      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 45.938rem;


        li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18%;
          height: 2.875rem;
          color: #99999a;
          border: 0.063rem solid #99999a;
          border-radius: 0.313rem;
          cursor: pointer;

          &.active {
            color: $white;
            background-color: $navy;
          }
        }
      }
    }

    .faq_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .question {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px 20px;
        border-bottom: 0.063rem solid #707070;
        box-sizing: border-box;
        cursor: pointer;

        .left {
          display: flex;
          align-items: center;
          justify-content: space-between;

          p {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 3.125rem;
            height: 3.125rem;
            font-size: 1.5rem;
            font-weight: $regular;
            color: $white;
            background-color: $navy;
            border-radius: 50%;
          }

          span {
            font-size: 1.063rem;
            font-weight: $regular;
            padding: 0 1.25rem;
            line-height: 36px;
          }
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: space-between;

          p {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5.25rem;
            height: 2rem;
            margin-right: 1rem;
            border: 0.063rem solid $navy;
            border-radius: 1.063rem;
          }

          .faq_icon {
            font-size: 1.5rem;
            transition: all 0.5s ease;
          }

          .faq_icon_open {
            transform: rotate(-180deg);
            transition: all 0.5s ease;
          }
        }
      }

      .answer {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px 130px 20px 30px;
        line-height: 2rem;
        background-color: $background_gray;
        box-sizing: border-box;


        p {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 3.125rem;
          height: 3.125rem;
          font-size: 1.5rem;
          font-weight: $regular;
          color: $navy;
          background-color: $white;
          border: 1px solid $navy;
          border-radius: 50%;
        }

        span {
          width: 100%;
          line-height: 30px;
          margin-left: 1.25rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .faq_wrap {

    .container {
      padding: 80px;

      h2 {
        font-size: 22px;
      }

      .tab_menu {
        margin-bottom: 60px;

        ul {
          width: auto;
          gap: 16px;

          li {
            width: 100px;
            height: 38px;

            &.active {
            }
          }
        }
      }

      .faq_content {

        .question {
          width: 100%;
          height: auto;
          padding: 10px 16px;

          .left {

            p {
              min-width: 45px;
              height: 45px;
              font-size: 20px;
            }

            span {
              font-size: 17px;
              line-height: 28px;
            }
          }

          .right {

            p {
              font-size: 15px;
              width: 70px;
              height: 30px;
            }

            .faq_icon {
              font-size: 20px;
            }

            .faq_icon_open {
            }
          }
        }

        .answer {
          padding: 20px 120px 20px 20px;
          line-height: 28px;
          background-color: $background_gray;
          box-sizing: border-box;


          p {
            min-width: 45px;
            height: 45px;
            font-size: 20px;
          }

          span {
            margin-left: 18px;
            line-height: 26px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .faq_wrap {

    .container {
      padding: 48px;

      h2 {
        font-size: 18px;
      }

      .tab_menu {
        margin-bottom: 40px;

        ul {
          width: auto;
          gap: 8px;

          li {
            width: 70px;
            height: 30px;
            font-size: 14px;

            &.active {
            }
          }
        }
      }

      .faq_content {

        .question {
          width: 100%;
          height: auto;
          padding: 10px 16px;

          .left {

            p {
              min-width: 32px;
              height: 32px;
              font-size: 16px;
            }

            span {
              font-size: 16px;
              padding: 0 16px;
            }
          }

          .right {

            p {
              font-size: 13px;
              width: 60px;
              height: 24px;
            }

            .faq_icon {
              font-size: 16px;
            }

            .faq_icon_open {
            }
          }
        }

        .answer {
          padding: 10px 60px 10px 16px;
          line-height: 24px;


          p {
            min-width: 32px;
            height: 32px;
            font-size: 16px;
          }

          span {
            font-size: 15px;
            margin-left: 18px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .faq_wrap {

    .container {
      padding: 48px 24px;

      h2 {
        font-size: 18px;
      }

      .tab_menu {
        margin-bottom: 40px;

        ul {
          flex-wrap: wrap;
          width: 80%;
          gap: 4px;

          li {
            flex-basis: 30%;
            height: 30px;
            font-size: 14px;

            &.active {

            }
          }
        }
      }

      .faq_content {

        .question {

          .left {

            p {
              min-width: 30px;
              height: 30px;
              font-size: 14px;
            }

            span {
              font-size: 14px;
              padding: 0 10px;
              line-height: 18px;
              letter-spacing: -1px;
            }
          }

          .right {

            p {
              display: none;
            }

            .faq_icon {
            }

            .faq_icon_open {
            }
          }
        }

        .answer {
          padding: 10px 10px 10px 16px;
          line-height: 24px;


          p {
            min-width: 30px;
            height: 30px;
            font-size: 14px;
          }

          span {
            font-size: 12px;
            margin-left: 10px;
            letter-spacing: -1px;
            line-height: 18px;
            word-break: keep-all;
          }
        }
      }
    }
  }
}
</style>
