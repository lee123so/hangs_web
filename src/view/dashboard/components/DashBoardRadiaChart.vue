<template>
  <div>
    <VueApexCharts class="chart_radia" type="radialBar" height="250" :options="coupon_options" :series="coupon_series"></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import {useStore} from "vuex";
import {computed, onMounted,ref,reactive,watch} from "vue";
export default {
  components:{
    VueApexCharts
  },
  props:{
    coupons:{
      type: Object,
      default:{}
    }
  },
  setup(props) {
    console.log(props.coupons)
    const store = useStore()
    const coupon = computed(() => store.state.dashboardStore.coupon);
    const coupon_series = ref([])
    watch(coupon, (newVal) => {
      coupon_series.value = newVal
    });
    const coupon_options = {
      chart: {
        height: 2,
        type: 'radialBar',
      },
      colors: ['#3D516F','#FFCD83'],
      plotOptions: {
        radialBar: {
          hollow: {

            size: '70%',
          },
          startAngle: 0,
          endAngle: 1000,

          track: {
            show: false,
          },
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: '총',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return coupon_series.value[0]
              }
            }
          }
        }
      },
      labels: ['올해','오늘'],
    }
    return {coupon_series,coupon_options}
  }
}
</script>

<style lang="scss" scoped>

</style>
