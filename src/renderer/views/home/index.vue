<template>
  <div class="home-container">
    <el-row type="flex" class="status" justify="center">
      <div class="score">
        <el-progress
          type="circle"
          :percentage="animatedScore"
          :width="160"
          :stroke-width="10"
          :show-text="true"
          status="text"
          :color="color"
        >
          <p :style="{ color: color}">
            <b>{{animatedScore}}</b>分
          </p>
        </el-progress>
      </div>
    </el-row>
    <el-row class="status-text">
      <p class="p1">您管理的文物遗址很健康，继续保持</p>
      <p class="p2">良好的定期体检习惯，会让文物遗址的健康状态持续时间更久</p>
    </el-row>
    <el-row type="flex" class="report" justify="center">
      <el-button type="warning" class="btn-report" round @click.native.prevent="handleReport">智能检测</el-button>
    </el-row>
    <el-row class="home-btns" type="flex" justify="center">
      <el-col :span="2">
        <div class="btn-1" @click="handleDevice">
          <i class="el-icon-s-platform"></i>
          <span>设备分布</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-2" @click="handleStatus">
          <i class="el-icon-s-help"></i>
          <span>运行状态</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-3">
          <i class="el-icon-s-custom"></i>
          <span>专家服务</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-4">
          <i class="el-icon-s-data"></i>
          <span>监控报告</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getOrgInfo } from "@/api/device";
import { TweenLite } from "gsap";

export default {
  name: "home",
  data() {
    return {
      score: 100,
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
      TweenLite.to(this.$data, 5, { tweenedScore: newValue });
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
  created() {
    this.fetchData();
  },
  methods: {
    handleReport() {
      this.$router.push({ path: "/report" });
    },
    handleDevice() {
      this.$router.push({ path: "/device" });
    },
    handleStatus() {
      this.$router.push({ path: "/status" });
    },
    fetchData() {
      this.$store.dispatch("GetOrgInfo").then(response => {
        this.score = response.item.score;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  flex: 1;
  margin: 10px;
  .status {
    height: 160px;
    .score {
      background: #fff;
      background-size: 100%;
      width: 160px;
      height: 160px;
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
  }
  .status-text {
    height: 100px;
    text-align: center;
    p {
      color: #fff;
      line-height: 150%;
    }
    .p1 {
      font-size: 32px;
    }
    .p2 {
      font-size: 18px;
    }
  }
  .report {
    .btn-report {
      font-size: 28px;
      padding: 15px 44px;
      border-radius: 30px;
      box-shadow: 1px 1px 5px #acacac;
    }
  }
  .home-btns {
    margin-top: 50px;
    .el-col {
      text-align: center;
      cursor: pointer;
      i {
        display: block;
        color: #31c878;
        font-size: 67px;
      }
    }
  }
}
</style>
