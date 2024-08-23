<template>
  <div class="admin_inner">
    <div class="history_title">FAQ 관리 > FAQ 목록</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommSelect :select_label="'카테고리'" :options="options.category_options" :limit="config.email" v-model="search_input.category" />
          <CommInput :input_label="'질문'" :limit="config.email" v-model="search_input.question" />
          <CommInput :input_label="'답변'"  :limit="config.name" v-model="search_input.answer" />
          <CommInput :input_label="'검색 시작일'" type="date" :limit="config.phone" v-model="search_input.start_at" />
          <CommInput :input_label="'종료일'" type="date" :limit="config.shop_name" v-model="search_input.end_at" />
          <div class="button_box">
            <CommButton type="submit" @click="searchHandler" size="search">검색</CommButton>
          </div>
        </div>
      </div>
    </form>
    <CommTable
        :total="true"
        :checkbox="true"
        :url="'admin-faq-list'"
        :data_name="'faqs_data'"
        :columns="columns"
        :button="true"
        :router_link="'/faq/detail/'"
        @changeInput="checkedItem"
        :header-labels="tableHeaderLabels"
    ><span>관리</span></CommTable>
    <div class="add_button_box">
      <CommButton @click="this.$router.push('/faq/registration')" size="search">등록</CommButton>
      <CommButton :color="'danger'" @click="deleteHandler" size="search">선택 삭제</CommButton>
    </div>
  </div>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommSelect from "@/components/common/CommSelect.vue";
import CommInput from "@/components/common/CommInput.vue"
import {inject, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {removeFieldIfEmpty} from "@/utils/filters";
export default {
  components:{
    CommButton,
    CommTable,
    CommInput,
    CommSelect
  },
  setup() {
    const config = inject('config')
    const options = inject('options')
    const search_input = reactive({})
    const tableHeaderLabels = [
        "카테고리",
      "질문",
      "답변",
      "등록일시",
    ]
    const columns = [
        "category",
      "question",
      "answer",
      "created_at",
    ]
    const store = useStore()
    const item = ref([])
    const checkedItem = (e) =>{
      item.value.push(e.id)
      console.log(e)
    }
    const searchHandler = (event) => {
      event.preventDefault()
      const payload =
          {
            data: removeFieldIfEmpty(search_input),
            path: 'search-faq',
            data_name:'search_faq_info'
          }
      console.log(payload)
      store.dispatch('TABLE_SEARCH', payload)
    }
    const deleteHandler = () =>{
      if (confirm("선택하신 [FAQ]를 삭제 하시겠습니까?")) {
      const payload = {
        faq_id:item.value
      }
      store.dispatch('faqStore/FAQS_DEL',payload)
    }else {
        return null
      }
    }


    return {searchHandler,search_input,options,config,columns,tableHeaderLabels,checkedItem,deleteHandler}
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
