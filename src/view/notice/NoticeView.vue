<template>
  <div class="admin_inner">
    <div class="history_title">공지사항관리 > 공지사항목록</div>
    <form>
      <div class="form_container">
        <div class="form_wrap">
          <CommInput :input_label="'제목'" :limit="config.email" v-model="search_input.title"/>
          <CommInput :input_label="'내용'" :limit="config.name" v-model="search_input.contents"/>
          <CommInput :input_label="'검색 시작일'" type="date" v-model="search_input.start_at"/>
          <CommInput :input_label="'종료일'" :limit="config.phone" type="date" v-model="search_input.end_at"/>
          <div class="button_box">
            <CommButton type="submit" @click="searchHandler" size="search">검색</CommButton>
          </div>
        </div>
        <div class="form_wrap">

        </div>
      </div>
    </form>
    <CommTable
        :total="true"
        :checkbox="true"
        :url="'admin-notices-list'"
        :data_name="'notices_data'"
        :columns="columns"
        :button="true"
        @changeInput="checkedItem"
        :router_link="'/notice/detail/'"
        :header-labels="tableHeaderLabels"
    ><span>관리</span></CommTable>
    <div class="add_button_box">
      <CommButton @click="this.$router.push('/notice/registration')" size="search">등록</CommButton>
      <CommButton :color="'danger'" @click="deleteHandler" size="search">선택 삭제</CommButton>
    </div>
  </div>
</template>

<script>
import CommTable from "@/components/common/CommTable.vue";
import CommInput from "@/components/common/CommInput.vue"
import {inject, reactive, ref} from "vue";
import CommButton from "@/components/common/CommButton.vue";
import {useStore} from "vuex";
import {removeFieldIfEmpty} from "@/utils/filters";

export default {
  components: {
    CommButton,
    CommTable,
    CommInput
  },
  setup() {
    const search_input = reactive({})
    const store = useStore()
    const config = inject('config')
    const tableHeaderLabels = [
      "제목",
      "내용",
      "등록일시",

    ]
    const columns = [
      "title",
      "contents",
      "created_at",
    ]
    const item = ref([])
    const checkedItem = (e) => {
      item.value.push(e.id)
      console.log(item.value)
    }
    const searchHandler = (event) => {
      event.preventDefault()
      const payload =
          {
            data: removeFieldIfEmpty(search_input),
            path: 'search-notice',
            data_name: 'search_notice_info'
          }
      console.log(payload)
      store.dispatch('TABLE_SEARCH', payload)
    }
    const deleteHandler = () => {
      if (confirm("선택하신 [공지사항]을 삭제 하시겠습니까?")) {
        const payload = {
          notice_id: item.value
        }
        store.dispatch('noticeStore/NOTICES_DEL', payload)
      } else {
        return null
      }
    }
    return {searchHandler, search_input, config, checkedItem, columns, tableHeaderLabels, deleteHandler}
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
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
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
