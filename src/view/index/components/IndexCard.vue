<template>
    <div class="card-wrap"
         @mousemove="handleMouseMove"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave"
         ref="card">
      <div class="card"
           :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform]"></div>
        <div class="card-info">
          <h1 >{{ card_data.title }}
            <span>
              {{ card_data.sub_title }}
            </span>
            <i v-if="card_data.name === 'standard'" class="fa-solid fa-thumbs-up "></i>
            <i v-if="card_data.name === 'basic'" class="fa-solid fa-seedling"></i>
            <i v-if="card_data.name === 'premium'" class="fa-solid fa-crown"></i>
          </h1>
          <p class="sub_dec" > {{ card_data.content}}</p>
          <div class="pay_box" >
            <span>{{ card_data.standard }}</span>
            <strong><span class="sales">{{ card_data.sales }}</span>{{ card_data.pay }} <span>(Vat 별도)</span></strong>
            <div>
              <ul>
                <li>
                  <p>대시보드 제공</p>
                  <span><i class="fa-solid fa-circle-check" style="color: #6D6E70"></i></span>
                </li>
                <li>
                  <p>위치찾기 서비스 제공</p>
                  <span><i class="fa-solid fa-circle-check" style="color: #6D6E70"></i></span>
                </li>
                <li>
                  <p>근처가게 노출 제공</p>
                  <span><i class="fa-solid fa-circle-check" style="color: #6D6E70"></i></span>
                </li>
                <li>
                  <p>카드디자인 템플릿</p>
                  <span>4개</span>
                </li>
                <li>
                  <p>받침대&스탬프</p>
                  <span>30,000개</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="text" :class="cardClass" >{{ card_data.product }}</div>
      </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  props: {
    card_data:{
      type:Object,
      default: () => ({}) // 기본값 설정
    }
  },
  setup(props) {
    const width = ref(0);
    const height = ref(0);
    const mouseX = ref(0);
    const mouseY = ref(0);
    let card = ref()
    let mouseLeaveDelay = null;
    const cardClass = `text_${props.card_data.name}`;
    const mousePX = computed(() => mouseX.value / width.value);
    const mousePY = computed(() => mouseY.value / height.value);

    const cardStyle = computed(() => {
      // console.log(width.value)
      // console.log(mousePX)
      const rX = mousePX.value * 30;
      const rY = mousePY.value * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    });

    const cardBgTransform = computed(() => {
      const tX = mousePX.value * -30;
      // console.log(tX)
      const tY = mousePY.value * -30;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      };
    });

    // const cardBgImage = computed(() => {
    //   return {
    //     backgroundImage: `url(@/assets/images/Hangs_banner_1.png)`
    //   };
    // });

    const handleMouseMove = (e) => {
      // console.log(card.value.offsetLeft)
      // console.log(width.value /3)
      mouseX.value = e.pageX - card.value.offsetLeft - width.value / 3;
      mouseY.value = e.pageY - card.value.offsetTop - height.value / 3;
    };

    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveDelay);
    };

    const handleMouseLeave = () => {
      mouseLeaveDelay = setTimeout(() => {
        mouseX.value = 0;
        mouseY.value = 0;
      }, 1000);
    };

    onMounted(() => {
      width.value = card.value.offsetWidth;
      height.value = card.value.offsetHeight;
    });

    return {
      width,
      height,
      mouseX,
      mouseY,
      mouseLeaveDelay,
      mousePX,
      mousePY,
      cardClass,
      card,
      cardStyle,
      cardBgTransform,
      // cardBgImage,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave
    };
  }

};

</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);


body {
  margin: 40px 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: $regular;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
}
div,ul{
  box-sizing: border-box;
}
.title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: $medium;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1+p, p+p {
  margin-top: 10px;
}
.pay_box{

  padding-top: 1.375rem;
  >span{
    font-size: 0.875rem;
    display: block;
    transition: 0.1s 0.4s $returnEasing !important;
  }
  >strong{
    font-size: 1.875rem ;
    transition: 0.1s 0.4s $returnEasing !important;
    font-weight: $medium;
    display: block;
    margin-bottom: 1rem;
    span{
      transition: 0.1s 0.4s $returnEasing !important;
      color: #666666;
      font-weight: $thin;
    }
  }
  ul{
    width: 100%;
    padding: 1.5rem 1.375rem;
    background-color: #f5f5f5;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
    li{
      display: flex;
      width: 100%;
      justify-content: space-between;
      p{
        text-shadow: none;
        color: #191919 ;
      }
      span{
        color: #191919;
        width: 100px;
        text-align: end;
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }
}
.sales{
  font-size: 1.5rem;
  text-decoration: line-through;
  margin-right: 10px;
}
.text{
  width: 100%;
  height:2.5rem ;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
}
.text_basic{
  background-color:#ddd ;
}
.text_standard{
  background-color:#526188;
  color: #fff;
}
.text_premium{
  background-color:#555E75;
  color: #fff;
}
.sub_dec{
  //width: 18rem !important;
  white-space: pre-line;
  padding-bottom: 1.75rem;
  //word-wrap: break-word;
  border-bottom: 1px solid #eee;
  transition: 0.1s 0.4s $returnEasing !important;
}
.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .card-info {
      transform: translateY(0);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info, .card-info p {
      transition: 0.6s $hoverEasing;
    }
    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition:
          0.1s $hoverEasing,
          opacity 1s $hoverEasing;
      opacity: 0.8;
      //background: url("@/assets/images/logo.png");
    }
    .card {
      transition:
          0.6s $hoverEasing,
          box-shadow 2s $hoverEasing;
      //box-shadow:
      //    rgba(white, 0.2) 0 0 40px 5px,
      //    rgba(white, 1) 0 0 0 1px,
      //    rgba(black, 0.66) 0 30px 60px 0,
      //    inset #333 0 0 0 5px,
      //    inset white 0 0 0 6px;
    }
    .card-info h1{
      text-shadow: rgba(black, 0.2) 0 10px 10px;
      color: #fff;
    }
    .card-info .sub_dec{
      text-shadow: rgba(black, 0.2) 0 10px 10px;
      color: #fff;
    }
    .pay_box > strong{
      text-shadow: rgba(black, 0.2) 0 10px 10px;
      color: #fff;
    }
    .pay_box > span{
      text-shadow: rgba(black, 0.2) 0 10px 10px;
      color: #fff;
    }
    .pay_box > strong span{
      text-shadow: rgba(black, 0.2) 0 10px 10px;
      color: #fff;
    }
  }
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 27.5rem;
  height: 34rem;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
      rgba(black, 0.66) 0 30px 60px 0,
      inset #333 0 0 0 5px,
      inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 1;
  position: absolute;
  //top: -20px; left: -20px;
  width: 100%;
  height: 100%;
  //background: url("@/assets/images/Hangs_banner_1.png");
  background-color: #fff;
  padding: 20px;
  //background-repeat: no-repeat;
  background-position: center;
  //background-size: cover;
  transition:
      1s $returnEasing,
      opacity 1s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 0 2.5rem 2.18rem 2.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #191919;
  transform: translateY(75%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    width: 100%;
    opacity: 1;
    //text-shadow: rgba(black, 1) 0 2px 3px;
    color: #999999;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.card-info h1 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 36px;
  font-weight: $medium;
  transition: 0.1s 0.4s $returnEasing;
  color:#191919 ;
  span{
    margin-right: 10px;
  }
  //text-shadow: rgba(black, 0.5) 0 10px 10px;
}
@media screen and (max-width:480px) {
.card{
  width: 20rem;
.sub_dec{
  font-size: 0.8rem;
}
  .card-info{
    padding: 0 1.5rem 2.18rem 1.5rem;
  }
  .card-info h1 span{
    font-size: 0.8rem;
  }
  h1{
    font-size: 1.5rem;
  }
}
  .pay_box{
    strong{
      font-size: 1.2rem;
    }
    .sales{
      font-size: 0.8rem;
    }
    ul{
      li{
        p{
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
