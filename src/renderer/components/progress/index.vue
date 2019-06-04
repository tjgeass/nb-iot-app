<template>
  <el-progress
    class="score"
    type="circle"
    :percentage="animatedScore"
    :width="width"
    :stroke-width="8"
    :show-text="true"
    status="text"
    :color="color"
  >
    <p :style="{ color: color}">
      <b>{{animatedScore}}</b>分
    </p>
  </el-progress>
</template>

<script>
import { TweenLite } from "gsap";

export default {
  name: "progress-view",
  props: {
    score: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      tweenedScore: 100,
      color: ""
    };
  },
  computed: {
    animatedScore: function() {
      return Number(this.tweenedScore.toFixed(0));
    }
  },
  watch: {
    // 定义缓动动画
    score: function(newValue) {
      console.log(newValue);
      TweenLite.to(this.$data, 3, { tweenedScore: newValue });
    },
    animatedScore: function(newValue) {
      if (newValue < 90 && newValue >= 80) {
        this.color = "#E6A23C";
      }
      if (newValue < 80) {
        this.color = "#F56C6C";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.score {
  background: rgba(255, 255, 255, 0.6);
  background-size: 100%;
  margin: 0px auto;
  border-radius: 50%;
  position: relative;
  .dot {
    position: absolute;
  }
}
p {
  color: #35b172;
  text-align: center;
  b {
    font-size: 50px;
  }
}
</style>
