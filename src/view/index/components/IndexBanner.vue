<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    v-bind="option"
    :space-between="0"
    :modules="modules"
    @autoplayTimeLeft="onAutoplayTimeLeft"
    class="mySwiper"
  >

    <div class="banner_side"></div>
    <swiper-slide>
      <div class="banner">
        <div class="container">
          <div class="banner01_1920">
            <img src="/src/assets/images/banner01_1920.svg">
          </div>
          <div class="banner01_1200">
            <img src="/src/assets/images/banner01_1200.svg">
          </div>
          <div class="banner01_768">
            <img src="/src/assets/images/banner01_768.svg">
          </div>
          <div class="banner01_480">
            <img src="/src/assets/images/banner01_480.svg">
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="banner">
        <div class="container">
          <div class="banner01_1920">
            <img src="/src/assets/images/banner02_1920.svg">
          </div>
          <div class="banner01_1200">
            <img src="/src/assets/images/banner02_1200.svg">
          </div>
          <div class="banner01_768">
            <img src="/src/assets/images/banner02_768.svg">
          </div>
          <div class="banner01_480">
            <img src="/src/assets/images/banner02_480.svg">
          </div>
        </div>
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="banner">
        <div class="container">
          <div class="banner01_1920">
            <img src="/src/assets/images/banner03_1920.svg">
          </div>
          <div class="banner01_1200">
            <img src="/src/assets/images/banner03_1200.svg">
          </div>
          <div class="banner01_768">
            <img src="/src/assets/images/banner03_768.svg">
          </div>
          <div class="banner01_480">
            <img src="/src/assets/images/banner03_480.svg">
          </div>
        </div>
      </div>
    </swiper-slide>

    <template #container-end>
      <div class="autoplay-progress">
        <svg viewBox="0 0 48 48" ref="progressCircle">
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref="progressContent"></span>
      </div>
    </template>

  </swiper>
  <div class="pagination"></div>

</template>

<script>
import { ref, onMounted } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
// import Swiper core and required modules

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {

const option = {
  pagination: {
    el: ".pagination",
    clickable: true,

    // renderBullet: function (index, className) {
    //   return '<div class="' + className + '"><span>' + (index + 1) + "</span><div class=progress><span class=time></span><span class=bg></span></div></div>";
    // },
  },
}
    const progressCircle = ref(null);
    const progressContent = ref(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.value.style.setProperty('--progress', 1 - progress);
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return {
      onAutoplayTimeLeft,
      option,
      progressCircle,
      progressContent,
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>

<style  lang="scss">
@import "@/assets/globalStyle.scss";
.pagination {
  display: flex;
  width: 100%;
  margin: 10px;
  justify-content: center;
  .swiper-pagination-bullet-active{
    width: 40px !important;
    border-radius: 10px !important;
  }
  .swiper-pagination-bullet{
    transition: all 0.3s;
    background-color: #555E75;
    width: 10px;
    height: 10px;

  }
}
.mySwiper {
position: relative;
  margin-top: 10px;
  .banner {
    .container {
      .banner01_1920 {
        img {
          width: 100%;
        }
      }

      .banner01_1200 {
        display: none;
      }

      .banner01_768 {
        display: none;
      }

      .banner01_480 {
        display: none;
      }
    }
  }
}
.banner_side{
  width: 200px;
  height: 200px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: radial-gradient(circle at top left,transparent 71%,#fff 20px);
}
.autoplay-progress {
  position: absolute;
  left: 30px;
  bottom: 20px;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: $white;
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: $white;
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

@media screen and (max-width: 1200px) {
  .banner_side{
    width: 150px;
    height: 150px;
    background: radial-gradient(circle at top left,transparent 71%,#fff 0px);
  }
  .mySwiper {
    .banner {
      .container {
        .banner01_1920 {
          display: none;
          img {
          }
        }

        .banner01_1200 {
          display: block;
          img {
            width: 100%;

          }
        }

        .banner01_768 {
          display: none;
        }

        .banner01_480 {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .banner_side{
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at top left,transparent 71%,#fff 0px);
  }
  .mySwiper {
    .banner {
      .container {
        .banner01_1920 {
          display: none;
          img {
          }
        }

        .banner01_1200 {
          display: block;
          img {
            display: none;

          }
        }

        .banner01_768 {
          display: block;

          img {
            width: 100%;
          }
        }

        .banner01_480 {
          display: none;
        }
      }
    }
  }
}


@media screen and (max-width: 480px) {
  .banner_side{
    width: 50px;
    height: 50px;
    background: radial-gradient(circle at top left,transparent 71%,#fff 0px);
  }

  .mySwiper {
    .banner {
      .container {
        .banner01_1920 {
          display: none;
          img {
          }
        }

        .banner01_1200 {
          display: none;
          img {
          }
        }

        .banner01_768 {
          display: none;
          img {
          }
        }

        .banner01_480 {
          display: block;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
