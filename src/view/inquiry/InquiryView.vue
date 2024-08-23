<template>
  <div class="admin_inner">
    <div class="history_title">문의사항관리 </div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :input_label="'이메일'" :limit="config.email" v-model="search_input.admin_email" />
          <CommInput :input_label="'매장명'" :limit="config.email"  v-model="search_input.shop_name" />
          <CommInput :input_label="'문의내용'"  :limit="config.title" v-model="search_input.question"/>
          <CommInput :input_label="'검색 시작일'" type="date" :limit="config.phone" v-model="search_input.start_at"/>
          <CommInput :input_label="'종료일'" type="date" :limit="config.shop_name" v-model="search_input.end_at"/>
          <CommSelect  :select_label="'문의처리'" :limit="config.shop_name" :options="options.result_options" v-model="search_input.status_yn"/>
          <div class="button_box">
            <CommButton type="submit" @click="searchHandler" size="search">검색</CommButton>
          </div>
        </div>
      </div>
    </form>
    <CommTable
        :total="true"
        :url="'admin-inquiry-list'"
        :data_name="'inquiries_data'"
        :columns="columns"
        :router_link="`/inquiry/detail/`"
        :button="true"
        :header-labels="tableHeaderLabels"
    ><span>관리</span></CommTable>

  </div>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import {inject, reactive, ref} from "vue";
import CommSelect from "@/components/common/CommSelect.vue";
import CommButton from "@/components/common/CommButton.vue";
import {removeFieldIfEmpty} from "@/utils/filters";
import {useStore} from "vuex";
export default {
  components:{
    CommButton,
    CommTable,
    CommInput,
    CommSelect
  },
  setup() {
    const search_input = reactive({})
    const config = inject('config')
    const options = inject('options')
    const store = useStore()
    const tableHeaderLabels = [
      "이메일",
      "매장명",
      "문의내용",
      "답변내용",
      "문의일시",
      "문의처리",

    ]
    const columns = [
      "admin_email",
      "shop_name",
      "question",
      "answer",
      "created_at",
      "status_yn",
    ]
    const searchHandler = (event) => {
      event.preventDefault()
      const payload =
          {
            data: removeFieldIfEmpty(search_input),
            path: 'search-inquiry',
            data_name:'search_inquiry_info'
          }
      console.log(payload)
      store.dispatch('TABLE_SEARCH', payload)
    }
    return {searchHandler,search_input,options,config,columns,tableHeaderLabels}
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";
.form_container{
  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f3f3;
}

.add_button_box{
  margin-top: 20px;
  width: 200px;
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
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
