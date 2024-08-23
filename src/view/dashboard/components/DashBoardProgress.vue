<template>
  <div class="container">
    <div :style="fillerStyles">
      <div class="">
      </div>
    </div>
    <div class="label_container">
    <span class="label">{{ `미완료${completed}건` }} </span>
    <p class="label2">{{`총${total}건`}}<i class="fa-solid fa-sort-up"></i></p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "ProgressBar",
  props: {
    bgcolor: String,
    completed: Number,
    total: Number,
  },
  setup(props) {
    const fillerStyles = computed(() => {
      const total = Math.floor((props.completed/props.total) * 100)
      return {
        height: "100%",
        width: `${total}%`,
        backgroundColor: props.bgcolor,
        transition: "width 1s ease-in-out",
        borderRadius: "inherit",
        position: "relative",
        textAlign: "right",
      };
    });

    return { fillerStyles };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/globalStyle.scss";

.container {
  height: 0.75rem;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
}

.label {
  width: 100px;
  position: relative;
  padding: 5px;
  color: #3D516F;
  font-size: 1rem;
  font-weight: $thin;
  i{
  position: absolute;
    right: 0rem;
    top: 0.6rem;
  }
}
.label2{
  @extend .label;
  text-align: center;
}
.label_container{
  display: flex;
  justify-content: space-between;
}
</style>
