/**
* 파일명 : CommTable.vue
* 설명 : table 의 대한 재사용 컴포넌트
* 작성자 : 이희수
* 작성일 : 2023.06.15
* 버전 :
* 기타사항 :
* Copyrights 2023 by 프렌즈 소프트웨어. All right reserved.
*/
<template>
  <!-- 테이블 -->
  <table class="table table--block">
    <thead>
    <template v-if=" table_data.total !== 0 ">
      <tr>
        <th style="width: 5%" class="select" v-show="checkbox">선택</th>
        <th style="width: 5%" class="select" v-show="total">번호</th>
        <th v-for="(headerLabel, index) in headerLabels" :key="index">
          {{ headerLabel }}
        </th>

        <th class="management" v-show="button">관리</th>
      </tr>
    </template>
    <template v-else>
      <tr>
        <th></th>
      </tr>
    </template>
    </thead>
    <tbody>
    <template v-if=" table_data.total !== 0 ">
      <tr v-for="(rowData, rowIndex) in table_data.data" :key="rowIndex">
        <td v-show="checkbox">
          <input @change="inputChange(rowData)" :checked="checked" type="checkbox"/>
        </td>
        <td v-if="total">{{ table_data.total - table_data.from - rowIndex + 1 }}</td>
        <td :data-title="headerLabels[columnIndex]" v-for="(column, columnIndex) in columns" :key="columnIndex">
          {{ getColumnfilter(rowData[column], column) }}
          <!--          <span v-html="userTypeText(rowData[column], column)"></span>-->
        </td>
        <td v-show="button">
          <button
              @click="router.push(router_link + (rowData.id || rowData.service_histories_id || rowData.admin_user_id))"
              class="btn_sm"
          >
            <slot></slot>
          </button
          >
        </td>
      </tr>
    </template>
    <template v-else>
      <tr class="empty">
        <td>조회된 데이터가 없습니다.</td>
      </tr>
    </template>
    </tbody>
  </table>
  <div v-if="total">
    <ul class="v-pagination__list">
      <CommButton size="pagination" v-if="firstPage" class="v-pagination__prev" @click="goToPage(1)"><i
          class="fa-solid fa-angles-right fa-rotate-180"></i></CommButton>
      <CommButton size="pagination" v-if="firstPage" class="v-pagination__prev"
                  @click="goToPage(table_data.current_page - 1)"><i class="fa-solid fa-angle-right fa-rotate-180"></i>
      </CommButton>
      <li class="v-pagination__item v-pagination__item--is-active" @click="goToPage(currentPage)"
          v-for="currentPage in visiblePages" :key="currentPage.link">
        <button class="v-btn v-btn--icon v-theme--light v-btn--density-compact v-btn--size-default v-btn--variant-text"
                :class="{ active :currentPage === this.active}">{{ currentPage }}
        </button>
      </li>
      <CommButton size="pagination" v-if="lastPage" class="v-pagination__prev"
                  @click="goToPage(table_data.current_page +1)"><i class="fa-solid fa-angle-right "></i></CommButton>
      <CommButton size="pagination" v-if="lastPage" @click="goToPage(table_data.last_page)"><i
          class="fa-solid fa-angles-right"></i></CommButton>
    </ul>
  </div>
</template>

<script>
import CommButton from "@/components/common/CommButton.vue";
import {ref, computed, onMounted, reactive, watch, toRefs} from "vue";
import {tablePagination} from "@/api";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {
    CommButton
  },
  props: {
    // 라우터 링크
    router_link: {
      type: String,
    },
    data_name: {
      type: String,
    },
    filter: {
      type: Boolean,
    },
    url: {
      type: String
    },
    total: {
      type: Boolean,
      default: true
    },
    filters: {
      type: Array,
      default: () => []
    },
    // 회원 정보 들어오는 데이터
    checkbox: {
      type: Boolean,
      default: false
    },
    // 버튼 유무
    button: {
      type: Boolean,
      default: false
    },
    // api 키값
    columns: {
      type: Array,
    },
    // 테이블 제목
    headerLabels: {
      type: Array,
      default: () => []
    },
  },
  emits: ["changeInput"],
  setup(props, context) {
    const {emit} = context;
    const checkedItems = ref([])
    const checked = ref(false)
    const select_option = ref('')
    const active = ref('')
    const store = useStore()
    const router = useRouter()
    const table_data = computed(() => store.state.table)
    const fetchData = async () => {
      const payload = {
        url: props.url,
        data_name: props.data_name
      }
      await store.dispatch('TABLE_LISTS', payload);
      // table_data.value = store.state.table
      // console.log(table_data.value);

      // 데이터를 사용하는 로직을 호출하거나 다른 컴포넌트에 전달할 수 있습니다.
    };
    // const table_data = computed(()=> props.table_data.data)
    // console.log(props)
    onMounted(fetchData)
    const lastPage = computed(() => {

      return table_data.value.current_page !== table_data.value.last_page;
    });
    const firstPage = computed(() => {
      return table_data.value.current_page !== 1;
    });
    const visiblePages = computed(() => {
      const range = 1;
      // import.meta.env.VITE_PAGINATION_COUNT
      console.log(range)
      const start = Math.max(table_data.value.current_page - range, 1);
      const end = Math.min(table_data.value.current_page + range, table_data.value.last_page);
      return Array.from({length: end - start + 1}, (_, i) => start + i);
    });

    const inputChange = (e) => {
      emit("changeInput", e);
    }
    const getColumnfilter = (usertype, column) => {
      if (column === 'service_use_yn') {
        switch (usertype) {
          case 0:
            return 'x';
          case 1:
            return 'o';
          default:
            return null;
        }
      }
      if (column === 'status_yn') {
        switch (usertype) {
          case 0:
            return '미처리';
          case 1:
            return '처리';
          default:
            return null;
        }
      }
      if (column === 'category') {
        switch (usertype) {
          case 1:
            return '회원관련';
          case 2:
            return '스탬프';
          case 3:
            return '쿠폰';
          case 4:
            return 'QR코드';
          default:
            return null;
        }
      } if (column === 'service_plan_id') {
        switch (usertype) {
          case 1:
            return '베이직 (3개월)';
          case 2:
            return '스탠다드 (6개월)';
          case 3:
            return '프리미엄 (12개월)';
          default:
            return null;
        }
      }  else {
        return usertype
      }
    }
    const goToPage = async (page) => {
      if (page < 1 || page > table_data.value.last_page) {
        return;
      }
      const payload = {
        path: table_data.value.path,
        page: page,
        data_name: props.data_name
      }
      console.log(payload)
      await store.dispatch('TABLE_PAGINATION', payload)

      active.value = page;

    };
    return {
      checkedItems,
      checked,
      select_option,
      active,
      router,
      lastPage,
      firstPage,
      visiblePages,
      inputChange,
      goToPage,
      table_data,
      getColumnfilter
    }
  },
};
</script>


<style scoped lang="scss">
@import "@/assets/globalStyle.scss";

.table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

th {
  padding: 0.8rem;
  font-size: 14px;
  text-align: center;
  letter-spacing: -1.3px;
  background-color: #3D516F;
  font-weight: $thin;
  border: none;
  color: #fff;
}

td {
  padding: 0.5rem;
  font-size: 14px;
  text-align: center;
  letter-spacing: -1.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

tr:nth-child(even) {
  background-color: #f4f5f7;
}

.empty {
  width: 100%;
}

.v-pagination__item .active {
  color: #fdfdfd;
  background-color: #3D516F;
  border: solid 1px #3D516F;
}

.v-pagination__item button {
  border: solid 1px #d7d7d7;
  border-radius: 0.2rem;
  color: #7d7d7d;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  background-color: white;
  padding: 0.5rem 0.9rem;
}

.v-pagination__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
}

.btn_sm {
  border: solid 1px #eee;
  border-radius: 0.2rem;
  color: #7d7d7d;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  background-color: white;
  padding: 0.5rem 0.9rem;

  span {
    font-size: 0.8rem;
  }
}

.page-navi {
  //display: flex;
  gap: 10px;

  :first-child button {

  }

  :last-child button {

  }
}

.management {
  width: 8%;
}

.select {
  width: 3%;
}

@media screen and (max-width: 768px) {
  .table {

  }
  .btn_sm {
    height: 1.4rem;
    font-size: 0.4rem !important;
    padding: 0 1rem;
    span{
      font-size: 0.4rem !important;
    }
  }
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    height: 2rem;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 5rem; /*컬럼위치조정*/
    white-space: normal;
    text-align: left;
    line-height: 1.3rem;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 9px;
    left: 6px;
    width: 3rem;
    border-right: 1px solid #eee;
    padding-right: 10px;
    white-space: nowrap;
    text-align: center;
    font-weight: $bold;
  }

  /*
  Label the data
  */
  td:before {
    content: attr(data-title);
  }
}
@media screen and (max-width: 480px) {
  .v-pagination__item button{
    padding: 0.3rem 0.7rem;
  }
  .button-pagination{
    padding: 0.3rem 0.7rem;
  }
}
</style>
