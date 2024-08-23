<template>
  <div class="admin_inner">
    <div class="history_title">회원관리 > 회원목록</div>
    <form @submit="handleSubmit">
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :input_label="'이메일'" :limit="config.email" v-model="search_input.admin_email"/>
          <CommInput :input_label="'이름'" :limit="config.name" v-model="search_input.admin_name"/>
          <CommInput :input_label="'연락처'" type="number" v-model="search_input.admin_phone" :limit="config.phone"/>
          <CommInput :input_label="'매장명'" :limit="config.shop_name" v-model="search_input.shop_name"/>
          <!--        <input type="text" maxlength="">-->
        </div>
        <div class="form_wrap">
          <CommInput :input_label="'매장연락처'" :limit="config.phone" type="number" v-model="search_input.shop_phone"/>
          <CommInput :input_label="'매장주소'" :limit="config.address" v-model="search_input.shop_address"/>
          <CommSelect :select_label="'서비스이용'" v-model="search_input.service_use_yn"
                      :options="service_config.search_service_options" :limit="config.name"/>
          <div class="button_box">
            <CommButton type="submit" @click="searchHandler" size="search">검색</CommButton>
          </div>
        </div>
      </div>
    </form>
    <CommTable
        :total="true"
        :columns="columns"
        :button="true"
        :router_link="'/member/detail/'"
        :url="'admin-user-list'"
        :data_name="'user_info'"
        :header-labels="tableHeaderLabels"
    ><span>상세보기</span></CommTable>
    <CommButton @click="this.$router.push('/member/registration')" size="lg">등록</CommButton>
  </div>

  <!--  <CommModal>-->
  <!--    <template #title>-->
  <!--      정말로 삭제 하시겠습니까?-->
  <!--    </template>-->
  <!--    <template #button>-->
  <!--      <CommButton  size="sm">네</CommButton>-->
<!--        <CommButton :color="'danger'" @click=" async ()=>{await Storage().put('test.txt', 'Hello')}" size="sm">아니오</CommButton>-->
  <!--    </template>-->

  <!--  </CommModal>-->
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import CommModal from "@/components/common/CommModal.vue";
import CommSelect from "@/components/common/CommSelect.vue";
import {computed, inject, onMounted, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import "@/utils/validation"
import {useStore} from "vuex";
import {removeFieldIfEmpty} from "@/utils/filters";
import {Storage} from "aws-amplify";

export default {
  components: {
    CommButton,
    CommSelect,
    CommTable,
    CommInput,
    CommModal
  },
  setup() {
    const config = inject('config')
    const service_config = inject('options')
    const store = useStore()
    const table_data = ref([])
    const search_input = reactive({})


    onMounted(async () => {

    })
    const tableHeaderLabels = [
      "이메일",
      "이름",
      "연락처",
      "매장명",
      "매장연락처",
      "매장주소",
      "서비스이용",
    ]
    const columns = [
      "admin_email",
      "admin_name",
      "admin_phone",
      "shop_name",
      "shop_phone",
      "shop_address",
      "service_use_yn",

    ]

    // table 안 정보 검색 핸들러
    const searchHandler = (event) => {
      event.preventDefault()
      const payload =
          {
            data: removeFieldIfEmpty(search_input),
            path: 'search-admin',
            data_name: 'search_admin_user_info'
          }
      console.log(payload)
      store.dispatch('TABLE_SEARCH', payload)
    }
    return {
      service_config,
      searchHandler,
      search_input,
      config,
      table_data,
      columns,
      tableHeaderLabels,

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

.form_container {
  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}


.history_title {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.form_wrap {
  @include form_wrap
}

.add_button_box {
  margin-top: 20px;
  width: 200px;
}

.button_box {
  margin-top: 20px;
  width: 50%
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 768px) {
  .form_wrap {
    flex-wrap: wrap;

  }
  .button_box {
    width: 100%;
  }
  .add_button_box {
    width: 100%;
  }
  .form_container {
    display: flex;
    gap: 1.3rem;
  }
}

@media screen and (max-width: 480px) {
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .form_container {
    display: block;

  }
}

</style>
