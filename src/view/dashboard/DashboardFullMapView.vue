<template>
  <div class="map_container">
  <DashBoardMap></DashBoardMap>
  </div>
</template>

<script>
import DashBoardMap from "@/view/dashboard/components/DashBoardMap.vue";
export default {
  components:{
    DashBoardMap
  },
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
.map_container{
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 7rem);
}
@media screen and (max-width: 1200px) {
  .map_container{
    height: calc(80vh - 7rem);
  }
}
@media screen and (max-width: 768px) {
  .map_container{
    height: calc(80vh - 7rem);
  }
}
</style>
