<template>
  <div class="score">
    <el-progress
      type="circle"
      class="progress"
      :percentage="animatedScore"
      :width="width"
      :stroke-width="8"
      :color="color"
      :show-text="false"
    ></el-progress>
    <div class="score-text">
      <p :style="{ color: color}">
        <b>{{animatedScore}}</b>分
      </p>
    </div>
  </div>
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
      //console.log(newValue);
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
  },
  methods: {
    format(percentage) {
      return percentage;
    }
  },
  render: function(createElement) {
    return createElement("h1", this.animatedScore);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.score {
  position: relative;
  .progress {
    background: rgba(255, 255, 255, 0.6);
    background-size: 100%;
    margin: 0px auto;
    border-radius: 50%;
  }
  .score-text {
    position: absolute;
    display: flex;
    /* flex: 1; */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    p {
      color: #35b172;
      text-align: center;
      b {
        font-size: 50px;
      }
    }
  }
}
</style>
<style>
.el-progress__text {
  font-size: 36px !important;
}
</style>

