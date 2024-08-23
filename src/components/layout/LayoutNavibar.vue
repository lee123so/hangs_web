/**
* 파일명 : LayoutNavibar.vue
* 설명 : navibar 의 대한 레이아웃 재사용 컴포넌트
* 작성자 : 최원웅
* 작성일 :
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <main class="main_wrap">
    <header class="header" :class="[{'full-width': !isDesktopScreen }, {'full-width': isFullWidth }]">
      <div class="left_content">
        <div class="toggle_wrap" @click="toggleNav">
          <font-awesome-icon :icon="['fas', 'bars']" class="toggle_btn"/>
        </div>
      </div>
      <div class="right_content" v-if="isNotebookScreen || isDesktopScreen">
<!--        <div class="hi_text">Super Admin</div>-->
        <div class="icon_wrap">
          <div @click="router.push('/inquiry')" class="icon_btn">
            <div class="icon">
              <font-awesome-icon :icon="['fas', 'file-circle-question']"/>
            </div>
            <div  class="text">새 문의</div>
            <div v-show="service_inquiry.today_total_inquiries !== 0"  class="badge">{{ service_inquiry.today_total_inquiries }}</div>
          </div>
          <div @click="router.push('/service')" class="icon_btn">
            <div class="icon">
              <FontAwesomeIcon icon="fa-solid fa-handshake-simple"/>
            </div>
            <div  class="text">서비스 신청</div>
            <div v-show="service_app.today_service_cnt !== 0" class="badge">{{ service_app.today_service_cnt }}</div>
          </div>
          <div @click="logoutHandler" class="icon_btn">
            <div class="icon">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']"/>
            </div>
            <div class="text">로그아웃</div>
          </div>
        </div>
        <div class="logo_small">
          <img src="/src/assets/images/logo_small.avif" alt="" class="logo_small_back">
          <img src="/src/assets/images/logo.avif" alt="" class="logo_small_img">
        </div>
      </div>
    </header>
    <nav class="navbar" :class="[{ 'hidden': isOpen || !isDesktopScreen }]">
      <div class="logo_container">
        <img src="/src/assets/images/profile_bg.png" alt="" class="logo_background_2">
        <a>
          <img src="/src/assets/images/logo.avif" alt="" class="logo_img">
        </a>
      </div>
      <div class="sidebar">
        <div class="right_content" v-if="!isNotebookScreen && !isDesktopScreen">
          <div class="hi_text">안녕하세요, 슈퍼 관리자님!</div>
          <div class="icon_wrap">
            <div @click="router.push('/inquiry')" class="icon_btn">
              <div class="icon">
                <font-awesome-icon :icon="['fas', 'file-circle-question']"/>
              </div>
              <div class="text">새문의</div>
              <div v-show="service_app.today_service_cnt !== 0" class="badge">{{ service_inquiry.today_total_inquiries }}</div>
            </div>
            <div @click="router.push('/service')" class="icon_btn">
              <div class="icon">
                <FontAwesomeIcon icon="fa-solid fa-handshake-simple"/>
              </div>
              <div class="text">서비스 신청</div>
              <div v-show="service_app.today_service_cnt !== 0" class="badge">{{ service_app.today_service_cnt }}</div>
            </div>
            <div @click="logoutHandler" class="icon_btn">
              <div class="icon">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']"/>
              </div>
              <div  class="text">로그아웃</div>
            </div>
          </div>
        </div>
        <ul>
          <li v-for="menu in menus" :key="menu.id" class="toggle_menu" :class="{ active: menu.isOpen }">
            <a @click="toggleMenu(menu)" :class="{ active: menu.isOpen }">
              <font-awesome-icon :icon="menu.icon" class="menu_icon"/>
              {{ menu.title }}
              <font-awesome-icon class="arrow_icon"
                                 :class="{ 'rotate-up': menu.isOpen, 'rotate-down': !menu.isOpen }"
                                 :icon="'chevron-down'"/>
            </a>
            <ul v-if="menu.submenus">
              <li v-for="submenu in menu.submenus" :key="submenu.id" class="toggle_submenu" :class="{ active: submenu.active }" >
                <router-link :to="submenu.path" @click="toggleSubmenu(submenu)">
                  {{ submenu.title }}

                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="end">

        </div>
      </div>
    </nav>
    <div class="inner_wrap" :class="[{ 'inner_open': isOpen && isDesktopScreen }, {'not': !isDesktopScreen}]">
      <router-view v-slot="{ Component }">
<!--        <keep-alive>-->
          <component :is="Component" />
<!--        </keep-alive>-->
      </router-view>
    </div>
  </main>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
export default {
  components: {
    FontAwesomeIcon,
  },

  setup() {
    const menus = ref([
      {
        id: 1,
        title: '대쉬보드',
        isOpen: false,
        icon: ['fas', 'chart-pie'],
        submenus: [
          { id: 16, title: '대쉬보드', active: false, path:'/dashboard' }
        ]
      },
      {
        id: 2,
        title: '회원관리',
        isOpen: false,
        icon: ['fas', 'users'],
        submenus: [
          {id: 3, title: '회원목록', active: false,path:'/member'},
        ]
      },
      {
        id: 5,
        title: '서비스관리',
        isOpen: false,
        icon: ['fas', 'handshake-simple'],
        submenus: [
          {id: 6, title: '신청내역', active: false,path:'/service'},
          {id: 7, title: '이용자내역', active: false,path:'/service/user'}
        ]
      },
      {
        id: 8,
        title: '공지사항관리',
        isOpen: false,
        icon: ['fas', 'bullhorn'],
        submenus: [
          {id: 9, title: '공지사항목록', active: false,path:'/notice'},
          {id: 10, title: '공지사항등록', active: false,path:'/notice/registration'}
        ]
      },
      {
        id: 11,
        title: 'FAQ관리',
        isOpen: false,
        icon: ['fas', 'file-circle-question'],
        submenus: [
          {id: 12, title: 'FAQ목록', active: false,path:'/faq'},
          {id: 13, title: 'FAQ등록', active: false,path:'/faq/registration'}
        ]
      },
      {
        id: 14,
        title: '문의사항관리',
        isOpen: false,
        icon: ['fas', 'person-circle-question'],
        submenus: [
          {id: 15, title: '문의사항', active: false,path:'/inquiry'}
        ]
      }
    ]);

    const isOpen = ref(false);
    const isDesktopScreen = ref(window.innerWidth >= 1200);
    const isNotebookScreen = ref(false);
    const isTabletScreen = ref(false);
    const isMobileScreen = ref(false);
    const isFullWidth = ref(false);
    const isNavHidden = ref(false);
    const service_app = ref({});
    const service_inquiry = ref({});
    const store = useStore();
    const router = useRouter()
    function toggleMenu(menu) {
      menu.isOpen = !menu.isOpen;
      closeOtherMenus(menu);
    }

    function toggleSubmenu(submenu) {
      const dashboardMenu = menus.value.find(menu => menu.id === 1);
      if (submenu.active || dashboardMenu.active) {
        return;
      }
      if(!isDesktopScreen.value){
      const header = document.querySelector('.header');
      const inner = document.querySelector('.inner_wrap');
      header.classList.toggle('full-width');
      inner.classList.toggle('full-width');
      const nav = document.querySelector('.navbar');
      nav.classList.toggle('hidden');
      }
      submenu.active = true;
      closeOtherSubmenus(submenu);
    }

    function closeOtherMenus(currentMenu) {
      menus.value.forEach(menu => {
        if (menu !== currentMenu) {
          menu.isOpen = false;
        }
      });
    }

    function closeOtherSubmenus(currentSubmenu) {
      menus.value.forEach(menu => {
        if (menu.submenus) {
          menu.submenus.forEach(submenu => {
            if (submenu !== currentSubmenu) {
              submenu.active = false;
            }
          });
        }
      });
    }

    //네비바 토글 버튼
    const toggleNav = () => {

      isOpen.value = !isOpen.value;
      isNavHidden.value = !isNavHidden.value;
      if (isDesktopScreen.value) {
        isFullWidth.value = isOpen.value;
      } else if (!isDesktopScreen.value) {
        const header = document.querySelector('.header');
        const inner = document.querySelector('.inner_wrap');
        header.classList.toggle('full-width');
        inner.classList.toggle('full-width');

        const nav = document.querySelector('.navbar');
        nav.classList.toggle('hidden');
      }
    };
    const desktop = () => {
      isDesktopScreen.value = window.innerWidth >= 1200;
    };
    const notebook = () => {
      isNotebookScreen.value = window.innerWidth > 768 && window.innerWidth <= 1199;
    };

    const tablet = () => {
      isTabletScreen.value = window.innerWidth > 768 && window.innerWidth <= 1199;
    };

    const mobile = () => {
      isMobileScreen.value = window.innerWidth > 768 && window.innerWidth <= 1199;
    };

    const logoutHandler = async () =>{
      console.log('d')
      if (confirm("정말로 로그아웃 하시겠습니까?")) {
        await store.dispatch('LOGOUT')
      }else {
        return null
      }
    }

    onMounted(async () => {
      window.addEventListener('resize', desktop);
      window.addEventListener('resize', notebook);
      window.addEventListener('resize', tablet);
      window.addEventListener('resize', mobile);
      service_app.value = await store.dispatch('dashboardStore/DASHBOARD_SERVICE_APP')
      service_inquiry.value = await store.dispatch('dashboardStore/DASHBOARD_SERVICE_INQUIRY')
      console.log(service_inquiry.value)
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', desktop);
      window.removeEventListener('resize', notebook);
      window.removeEventListener('resize', tablet);
      window.removeEventListener('resize', mobile);
    });

    return {
      menus,
      toggleMenu,
      toggleSubmenu,
      logoutHandler,
      closeOtherSubmenus,
      isOpen,
      toggleNav,
      isDesktopScreen,
      isNotebookScreen,
      isTabletScreen,
      isMobileScreen,
      isFullWidth,
      isNavHidden,
      service_app,
      service_inquiry,
      router
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/globalStyle.scss";

router-link, a{
  text-decoration: none;
}
.main_wrap {
  position: absolute;

  width: 100%;
  height: 100%;
  background-color: #eee;
  overflow-x: hidden;
}

.inner_wrap{
  padding: 2rem;
  margin:{
    left: 20rem;
    right: 1.3rem;
    top: 7rem;
  }

  transition: all 0.3s;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.625rem 1.875rem 0 rgba(0,0,0,.05);;
}
.inner_open{
  margin-left: 1.3rem;
}
.not{
  margin-left: 1.3rem;
}
.header {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 21.25rem);
  height: 5rem;
  top: 1.25rem;
  z-index: 1000;
  left: 20rem;
  padding: 0.8rem 1.875rem;
  background-color: #3D516F;
  border-radius: 0.625rem;
  box-sizing: border-box;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;

  .left_content {

    .toggle_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.125rem;
      height:3.125rem;
      background-color: #ededed;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: #bdbdbd;
      }

      .toggle_btn {
        width: 1.25rem;
        height: 1.875rem;
      }
    }
  }

  .right_content {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ededed;
    font-weight: $thin;

    .hi_text {
      position: relative;
      padding-right: 22px;
      letter-spacing: 1px;
      cursor: default;

      &:after {
        content: "";
        position: absolute;
        width: 1px;
        height: 1rem;
        top: -2px;
        right: -5px;
        background-color: #ededed;
      }
    }

    .icon_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 1.25rem;

      .icon_btn {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0.625rem;
        cursor: pointer;

        .icon {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .text {
          font-size: 12px;
        }

        .badge {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          top: -6px;
          right: 0;
          font-size: 12px;
          color: #ffffff;
          font-weight: $regular;
          background-color: #ff0000;
          border-radius: 50%;
        }
      }
    }

    .logo_small {
      position: relative;

      .logo_small_back {
      }

      .logo_small_img {
        position: absolute;
        width: 37px;
        height: 26px;
        top: 10px;
        right: 6px;
      }
    }
  }
}

.header.full-width{
  left: 20px;
  width: calc(100% - 40px);
  transition: all .5s ease;
}
.inner_wrap.full-width{
  margin:{
    //left: 20rem;
    right: 1.3rem;
    top: 7rem;
  }
}

.navbar {
  position: fixed;
  width: 300px;
  max-height: 100%;
  background-color: #3D516F;
  z-index: 100;
  transition: all 0.5s ease;

  .logo_container {
    position: relative;
    height: 250px;
    background-color: #3D516F;

    .logo_background_2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 118px;
      height: 118px;

    }

    .logo_img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 62px;
      height: 44px;
      cursor: pointer;
    }
  }

  .sidebar {
    width: 280px;
    height: 944px;
    margin: 0 auto;

    ul {
      cursor: pointer;

      .toggle_menu {
        position: relative;
        background-color: #3D516F;

        .menu_icon {
          position: absolute;
          padding-left: 30px;
          top: 13px;
          left: 10px;
          font-size: 20px;
        }

        &.active {

          ul {
            max-height: 200px;
            transition: all 2s ease;

            .toggle_submenu {
              display: flex;
              align-items: center;
              justify-content: left;

              &.active {
                background-color: #eeeeee;
                border-radius: 10px;

                a {
                  color: #4E5E75;

                  &:hover {
                    background-color: #eeeeee;
                  }

                  &:before {
                    background-color: #4E5E75;
                  }
                }
              }

              a {
                position: relative;

                &:before {
                  content: "";
                  position: absolute;
                  top: 18px;
                  left: 70px;
                  width: 8px;
                  height: 8px;
                  background-color: #cccccc;
                  border-radius: 50%;
                }
              }
            }
          }
        }

        a {
          display: flex;
          align-items: center;
          justify-content: left;
          height: 50px;
          padding-left: 100px;
          color: #cccccc;

          &.active {
            background-color: #085BD6;
            border-radius: 10px;

            &:hover {
              background-color: #085BD6;
              color: #cccccc;
              border-radius: 10px;
            }
          }

          &:hover {
            color: #ffffff;
            background-color: #4E5E75;
            border-radius: 10px;
          }

          .arrow_icon {
            position: absolute;
            right: 30px;
            transition: transform 0.6s ease-in-out;

            &.rotate-up {
              transform: translateY(-20%) rotate(-180deg);
            }

            &.rotate-down {
              transform: translateY(-20%) rotate(0deg);
            }
          }
        }

        ul {
          max-height: 0;
          overflow: hidden;

          .toggle_submenu {

            a {
              width: 100%;
              height: 50px;
              color: #cccccc;

              &:hover {
                color: #ffffff;
                background-color: #4E5E75;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }
  }
}

.navbar.hidden {
  transform: translateX(-100%);
  transition: all .5s ease;
}

// 미디어쿼리 1200px
@media screen and (max-width: 1200px) {
  .right_content {
    display: flex;
    //flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ededed;
    font-weight: $thin;

    .hi_text {
      position: relative;
      cursor: default;

      &:after {
        content: "";
        position: absolute;
        width: 100px;
        height: 1px;
        top: 28px;
        right: 18px;
        background-color: #ededed;
      }
    }

    .icon_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 20px;

      .icon_btn {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;
        cursor: pointer;

        .icon {
          font-size: 25px;
          margin-bottom: 5px;
        }

        .text {
          font-size: 12px;
        }

        .badge {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          top: -6px;
          right: 0;
          font-size: 12px;
          color: #ffffff;
          font-weight: $regular;
          background-color: #ff0000;
          border-radius: 50%;
        }
      }
    }

    .logo_small {
      position: relative;

      .logo_small_back {
      }

      .logo_small_img {
        position: absolute;
        width: 37px;
        height: 26px;
        top: 10px;
        right: 6px;
      }
    }
  }
}

// 미디어쿼리 768px
@media screen and (max-width: 768px) {
  .header {
    height: 50px;

    .left_content {

      .toggle_wrap {
        width: 30px;
        height: 30px;

        .toggle_btn {
          width: 15px;
          height: 20px;
        }
      }
    }
  }

  .navbar {
    .logo_container {

      position: relative;
      height: 150px;
      background-color: #3D516F;

      .logo_background_2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;

      }

      .logo_img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 62px;
        height: 44px;
        cursor: pointer;
      }
    }

    .right_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ededed;
      font-weight: $thin;

      .hi_text {
        position: relative;
        cursor: default;

        &:after {
          content: "";
          position: absolute;
          width: 100px;
          height: 1px;
          top: 28px;
          right: 18px;
          background-color: #ededed;
        }
      }

      .icon_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px 20px;

        .icon_btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 10px;
          cursor: pointer;

          .icon {
            font-size: 25px;
            margin-bottom: 5px;
          }

          .text {
            font-size: 12px;
          }

          .badge {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            top: -6px;
            right: 0;
            font-size: 12px;
            color: #ffffff;
            font-weight: $regular;
            background-color: #ff0000;
            border-radius: 50%;
          }
        }
      }

      .logo_small {
        position: relative;

        .logo_small_back {
        }

        .logo_small_img {
          position: absolute;
          width: 37px;
          height: 26px;
          top: 10px;
          right: 6px;
        }
      }
    }
  }
}

// 미디어쿼리 480px
@media screen and (max-width: 480px) {
  .header {
    min-width: calc(100% - 280px);
    padding: 10px;
    left: 270px;
  }
  .navbar {
    width: 260px;

    .right_content {

      .icon_wrap {
        margin: 35px 20px 20px 20px;

        .icon_btn {

          .icon {
            font-size: 20px;
          }
        }
      }
    }

    .sidebar {
      width: 260px;

      ul {
        width: 240px;
        margin: 0 auto;

        .toggle_menu {

          &.active {

            ul {

              .toggle_submenu {

                &.active {
                }

                a {
                  height: 40px;
                }
              }
            }
          }

          .menu_icon {
            top: 10px;
            font-size: 16px;
          }

          a {
            height: 40px;
            font-size: 14px;

            &.active {
            }
          }
        }
      }
    }
  }

}

</style>
