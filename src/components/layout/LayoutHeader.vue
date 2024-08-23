/**
* 파일명 : LayoutHeader.vue
* 설명 : header 의 대한 레이아웃 재사용 컴포넌트
* 작성자 : 최원웅
* 작성일 : ?
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <a>
          <img src="/src/assets/images/index_logo.svg">
        </a>
      </div>
      <nav class="nav">
        <ul class="nav_menu" :class="{ open: navMenuOpen }">
          <li class="nav_item" :class="{ active: selectedItem === 0 }" @click="selectNavItem(0)">
            <a href="#introduction">행스소개</a>
          </li>
          <li class="nav_item" :class="{ active: selectedItem === 1 }" @click="selectNavItem(1)">
            <a href="#method">이용방법</a>
          </li>
          <li class="nav_item" :class="{ active: selectedItem === 2 }" @click="selectNavItem(2)">
            <a href="#payment">요금안내</a>
          </li>
          <li class="nav_item" :class="{ active: selectedItem === 3 }" @click="selectNavItem(3)">
            <a href="#notice">공지사항</a>
          </li>
          <li class="nav_item" :class="{ active: selectedItem === 4 }" @click="selectNavItem(4)">
            <a href="#faq">자주묻는질문</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="hamburger" @click="toggleNavbarMenu">
      <a>
        <font-awesome-icon :icon="['fas', 'bars']" />
      </a>
    </div>
  </header>
</template>

<script>
import {ref, onMounted, watch, onBeforeUnmount} from 'vue';

export default {
  setup() {
    const navbarMenu = ref(null);
    const navbarToggleBtn = ref(null);
    const navMenuOpen = ref(false);
    const toggleNavbarMenu = () => {
      navMenuOpen.value = !navMenuOpen.value;
    };


    const selectedItem = ref(0);
    const selectNavItem = (index) => {
      navMenuOpen.value = !navMenuOpen.value;

      // 선택된 네비게이션 메뉴에 active 클래스 추가
      selectedItem.value = index;

      // 네비게이션 메뉴 클릭 시 해당 섹션으로 스크롤 이동
      const sectionIds = ['#introduction', '#method', '#payment', '#notice', '#faq'];
      const targetSection = document.querySelector(sectionIds[index]);
      if (targetSection) {
        const viewportWidth = window.innerWidth;
        let offset = 20; // 기본적으로 100px 위로 이동

        if (viewportWidth <= 1200) {
          offset = 30; // 화면 크기가 1200px 이하일 때 200px 위로 이동
        } else if (viewportWidth <= 768) {
          offset = 100;
        }
        const targetOffsetTop = targetSection.getBoundingClientRect().top + window.scrollY - offset;
        const currentScrollTop = window.scrollY;
        const startTime = performance.now();
        const duration = 800; // 애니메이션 지속 시간 (밀리초)

        const animateScroll = (timestamp) => {
          const progress = timestamp - startTime;
          const easeInOutCubic = t => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
          const scrollTo = currentScrollTop + easeInOutCubic(Math.min(progress / duration, 1)) * (targetOffsetTop - currentScrollTop - offset);

          window.scrollTo({
            top: scrollTo,
            behavior: 'auto',
          });

          if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
          }
        };

        window.requestAnimationFrame(animateScroll);
      }
    };



// 컴포넌트가 해제될 때 스크롤 이벤트 리스너 제거


    // 화면 크기가 변경될 때 토글 메뉴 닫기
    watch(
      () => window.innerWidth,
      (newWidth) => {
        if (newWidth <= 768) {  // 수정된 부분: newWidth >= 768
          navMenuOpen.value = false;
        }
      },
      { immediate: true }
    );

    return {
      navbarMenu,
      navbarToggleBtn,
      navMenuOpen,
      toggleNavbarMenu,
      selectedItem,
      selectNavItem,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 5.625rem;
  background: $white;
  box-shadow: 0 1px 15px 0 rgba(0,0,0,0.1);
  box-sizing: border-box;
  z-index: 999;


  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 15rem;
    box-sizing: border-box;

    .logo {
      cursor: pointer;
    }

    .nav {

      ul {
        display: flex;
        flex-direction: row;

        .nav_item {
          position: relative;
          margin-left: 2.5rem;
          color: $black;

          a {
            text-decoration: none;
            outline: none;
            color: $black;
          }
        }
      }
    }
  }
  .hamburger {
    display: none;
  }
}

// 미디어쿼리 1200px
@media screen and (max-width: 1200px) {
  .header {
    height: 70px;

    .container {

      padding: 0 5rem;

      .logo {


        a {

          img {
            width: 7.5rem;
          }
        }
      }

      .nav {

        ul {


          li {
            margin-left: 1.5rem;

            a {
              font-size: 0.875rem;
            }
          }
        }
      }
    }
  }
}

// 미디어쿼리 768px
@media screen and (max-width: 768px) {
  .header {
    height: auto;

    .container {
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem 3rem;

      .logo {

        a {

          img {
            width: 7.5rem;
          }
        }
      }

      .nav {
        width: 100%;
        display: flex;
        flex-direction: column;

        .nav_menu {
          display: none;
        }

        .nav_menu.open {
          display: block;
          margin-top: 20px;

          .nav_item {
            text-align: center;
            margin: 10px 0;
            padding: 14px 0;
            cursor: pointer;

            &:hover {
              background-color: $pink;
              border-radius: 20px;
            }


            a {
              font-size: 16px;

              &:hover:after {
                content: none;
              }
            }
          }
        }
      }
    }
  }
  .hamburger {
    display: block !important;
    position: absolute;
    top: 20px;
    right: 30px;

    a {
      font-size: 1.4rem;
      cursor: pointer;
    }
  }
}

// 미디어쿼리 480px
@media screen and (max-width: 480px) {
  .header {

    .container {
      padding: 16px 24px;

      .logo {

        a {

          img {
            width: 100px;
          }
        }
      }

      .nav {

        .nav_menu {
          margin-top: 10px;

          .nav_item {
            margin: 4px 0;
            padding: 8px 0;

            a {
              font-size: 14px;

            }
          }
        }
      }
    }
  }
  .hamburger {
    right: 22px;


    a {
      font-size: 16px;

    }
  }
}

</style>
