<template>
  <div class="admin_inner">
    <div class="history_title">서비스관리 > 이용자내역</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :input_label="'이메일'" :limit="config.email" v-model="search_input.admin_email"/>
          <CommInput :input_label="'이름'" :limit="config.name" v-model="search_input.admin_name"/>
          <CommInput :input_label="'연락처'" :limit="config.phone" v-model="search_input.admin_phone" />
          <CommInput :input_label="'매장명'"  :limit="config.shop_name" v-model="search_input.shop_name"/>
        </div>
        <div class="form_wrap">
          <CommInput :input_label="'매장연락처'" :limit="config.phone"  type="number" v-model="search_input.shop_phone" />
          <CommInput :input_label="'매장주소'" :limit="config.address" v-model="search_input.shop_address" />
          <CommSelect :select_label="'서비스종류'" :limit="config.name" :options="service_config.service_options" v-model="search_input.service_plan_id" />
          <div class="button_box">
            <CommButton type="submit" @click="searchHandler" size="search">검색</CommButton>
          </div>
        </div>
      </div>
    </form>

    <CommTable
        :total="true"
        :url="'service-in-list'"
        :data_name="'admin_users_service_in_info'"
        :columns="columns"
        :router_link="'/service/user/detail/'"
        :button="true"
        :header-labels="tableHeaderLabels"
    ><span>상세정보</span></CommTable>
  </div>

</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import CommSelect from "@/components/common/CommSelect.vue";
import {inject, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {removeFieldIfEmpty} from "@/utils/filters";
export default {
  components:{
    CommButton,
    CommTable,
    CommSelect,
    CommInput
  },
  setup() {
    const config = inject('config')
    const service_config = inject('options')
    const search_input = reactive({})
    const store = useStore()
    const tableHeaderLabels = [
      "이메일",
      "이름",
      "연락처",
      "매장명",
      "매장연락처",
      "매장주소",
      "서비스종류",
      "결제방법",
      "승인일",
      "종료일",
    ]
    const columns = [
      "admin_email",
      "admin_name",
      "admin_phone",
      "shop_name",
      "shop_phone",
      "shop_address",
      "service_plan_id",
      "pay_method",
      "service_start_at",
      "service_expiry_at",
    ]
    const searchHandler = (event) => {
      event.preventDefault()
      const payload =
          {
            data: removeFieldIfEmpty(search_input),
            path: 'search-service-in',
            data_name:'search_service_info'
          }
      console.log(payload)
      store.dispatch('TABLE_SEARCH', payload)
    }
    return {searchHandler,search_input,service_config,config,columns,tableHeaderLabels}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";
.form_container{
  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}

.history_title{
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
.form_wrap{
  @include form_wrap
}
.add_button_box{
  margin-top: 20px;
  width: 200px;
}
.button_box{
  margin-top: 20px;
  width: 50%
}
@media screen and (max-width:1200px) {

}

@media screen and (max-width:768px) {
  .form_wrap{
    flex-wrap: wrap;

  }
  .button_box{
    width: 100%;
  }
  .add_button_box{
    width: 100%;
  }
  .form_container{
    display: flex;
    gap: 1.3rem;
  }
}
@media screen and (max-width:480px) {
  .form_wrap {
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .form_container{
    display: block;

  }
}

</style>
