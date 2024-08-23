<template>
  <div v-if="dataCheck" class="modal_background">

    <div class="modal_wrap">
      <div>
        <div class="img_banner">
          <img :src="logo.file_path" alt="">

        </div>

        <div class="store_profile">
          <div class="store_img_banner">
            <div>
              <img :src="shop.file_path" alt="">
            </div>

          </div>
          <p>{{ shop_data.shop_name }}</p>
          <span>{{ shop_data.shop_address }} {{ shop_data.shop_address_detail }}</span>
          <em>{{ shop_data.shop_description }}
          </em>
        </div>
        <div class="tel_map_container">
          <ul class="tel_map_box">
            <li><i class="fa-solid fa-phone"></i>전화하기</li>
            <li><i class="fa-solid fa-location-dot"></i>지도보기</li>
          </ul>
        </div>
        <div class="account">
          <h4>스탬프 적립 내역</h4>
          <ul>
            <li v-for="stamp in test()">
              <img :src="stamp.src"></li>
            <!--              <img src=""></li>-->
          </ul>
        </div>
        <div class="stamp_info">
          <h4>스탬프 적립 조건</h4>
          {{ card_data.stamp_accrual_conditions }}
          <h4>쿠폰 적립 조건</h4>
          <span v-for="card in card_data.coupon_condition"> {{ card.coupon_tp }}회: {{ card.coupon_name }}</span>
        </div>
        <div class="info_box">
          <div>
            <span>스탬프 유효기간은 첫 적립 일로부터 1년입니다. <br>스탬프는 양도할 수 없습니다</span>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
    <div class="modal_background_empty" v-else>
      <div class="modal_wrap_empty">
        <div class="empty">조회된 스탬프 카드가 없습니다.</div>
        <slot></slot>
      </div>
    </div>


</template>

<script>
import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import outImg from "@/assets/images/coupon_out.png"
import onImg from "@/assets/images/coupon_on.png"

export default {
  props: {
    shop_id: {
      type: String
    },
    admin_id: {
      type: String
    }
  },
  setup() {
    const card_data = ref({});
    const store = useStore()
    const id = ref()
    const shop_data = ref({})
    const route = useRoute()
    const logo = ref({})
    const shop = ref({})
    const dataCheck = ref(false)
    console.log(route)

    const test = () => {
      const data = [];
      const number = card_data.value.stamp_number;
      for (let i = 0; i < number; i++) {
        const stampValue = card_data.value.coupon_condition.find((coupon) => coupon.coupon_tp === i + 1);
        if (stampValue) {
          data.push({src: onImg});
        } else {
          data.push({src: outImg});
        }
      }
      return data
    }
    const fetcShophData = async () => {
      id.value = route.params.id
      shop_data.value = await store.dispatch('serviceStore/SERVICE_SHOP_DETAIL', id.value)
    }
    const fetchStampCard = async () => {
      const payload = {
        shop_id: shop_data.value.shop_id,
        admin_user_id: id.value

      }
      try {
        card_data.value = await store.dispatch('serviceStore/SERVICE_STAMP_DETAIL', payload)
        console.log(card_data.value)
        logo.value = card_data.value.logo_img_info
        shop.value = card_data.value.shop_img_info
        dataCheck.value = true
      } catch (e) {
        dataCheck.value = false
      }
    }
    onMounted(async () => {
      await fetcShophData()
      await fetchStampCard()
    })
    return {card_data, shop_data, test, logo, shop, dataCheck}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

div {
  box-sizing: border-box;
}
.modal_background_empty{
  width: 100%;
  height: 100%;
  //padding: 3rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: 10000;
  overflow-y: scroll;
  .modal_wrap_empty{
    box-sizing: border-box;
    display: flex;
    margin: 0 auto;
    align-items: center;
    //justify-content: flex-start;
    flex-direction: column;
    max-width: 30rem;
    background-color: #f7f7f7;
    border-radius: 1rem;
    padding: 2rem;
  }
  .empty {
    padding: 1rem;
  }
  box-sizing: border-box;
}
.modal_background {
  width: 100%;
  height: 100%;
  //padding: 3rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  overflow-y: scroll;
  box-sizing: border-box;

  .modal_wrap {
    box-sizing: border-box;
    display: flex;
    margin: 0 auto;
    align-items: center;
    //justify-content: flex-start;
    flex-direction: column;
    max-width: 30rem;
    background-color: #f7f7f7;
    border-radius: 1rem;
    padding: 1rem;


  }

  .img_banner {
    width: 100%;
    height: 240px;
    border-radius: 1rem;
    overflow: hidden;

    position: relative;

    img {
      width: 100%;

height: 100%;
      max-width: 100%;
      object-fit: cover;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .stamp_info {
    padding: 0 1rem;

    h4 {
      padding: 0.5rem 0;
      font-weight: $regular;

    }

    p {
      line-height: 1.5rem;
    }

    span {
      font-size: $font-size-0_75;
      display: block;
      color: $middle_gray;
      line-height: 1rem;
    }
  }

  .info_box {
    width: 100%;
    padding: 1rem;

    div {
      padding: 1rem;
      background-color: $light_gray;
      border-radius: 0.5rem;
      text-align: center;

      span {
        color: $middle_gray;
        font-size: $font-size-0_75;
      }
    }
  }

  .store_profile {
    padding-top: 3rem;
    position: relative;
    margin-bottom: 1.2rem;
    text-align: center;

    p {
      font-weight: $medium;
      color: $black;
      font-size: $font-size-1_5;
    }

    span {
      display: block;
      line-height: 1.5rem;
      color: $middle_gray;
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }

    em {
      color: $dark_gray;
      font-style: normal;
      line-height: 1.5rem;
    }
  }

  .store_img_banner {
    width: 100%;
    display: flex;
    align-items: center;

    justify-content: center;
    position: absolute;
    top: -3rem;

    > div {
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  }

  .tel_map_container {
    padding: 0 1.2rem;
  }

  .tel_map_box {
    margin-bottom: 1rem;

    li:first-child {
      border-right: 1px solid $middle_gray;
    }

    li {
      width: 100%;
      text-align: center;
      padding: 1rem;
      color: $white;

      i {
        margin-right: 8px;
      }
    }

    background-color: $navy;
    display: flex;
    border-radius: 1.8rem;
  }

}

.account {
  width: 100%;
  padding: 1rem;

  h4 {
    padding: 0.5rem 0;
    font-weight: $regular;
  }

  ul {
    box-sizing: border-box;
    width: 100%;
    padding: 1.6rem;
    border-radius: 0.5rem;
    border: 1px solid $light_gray;
    background-color: $white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

}


</style>
