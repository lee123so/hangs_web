<template>
  <VueApexCharts class="chart_apex" type="bar" height="250" :options="chart_options" :series="series"></VueApexCharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
export default {
  components:{
    VueApexCharts
  },
  setup() {
    // 회원차트
    const series = ref([])
    // 회원차트
    const store = useStore()
    const admin = computed(() => store.state.dashboardStore.admin);
  watch(admin,(newValue)=>{
    series.value = newValue
    console.log(newValue)
  })
    const chart_options = {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors:['#FFCD83','#0a3d77'],
      plotOptions: {
        bar: {
          columnWidth: '25%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['총 관리자 회원수'],
          ['총 서비스 이용 회원수'],

        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    }

    return {series,chart_options}
  }
}
</script>

<style lang="scss" scoped>

</style>
