<template>
  <div class="home-container">
    <el-row type="flex" class="status" justify="center">
      <progress-view :score="localSocre" :width="160"></progress-view>
    </el-row>
    <el-row class="status-text">
      <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
        <p class="p1" :style="activeColor">{{info1}}</p>
      </transition>
      <p class="p2">{{info2}}</p>
    </el-row>
    <el-row type="flex" class="report" justify="center">
      <el-button type="warning" class="btn-report" round @click.native.prevent="handleReport">智能检测</el-button>
    </el-row>
    <el-row class="home-btns" type="flex" justify="center">
      <el-col :span="2">
        <div class="btn-1" @click="handleDevice">
          <i class="iconfont icon-shebei"></i>
          <span>设备分布</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-2" @click="handleStatus">
          <i class="iconfont icon-lingdang"></i>
          <span>运行状态</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-3">
          <i class="iconfont icon-zhuanjiaxuanpin"></i>
          <span>专家服务</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <div class="btn-4">
          <i class="iconfont icon-tubiao1"></i>
          <span>监控报告</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TweenLite } from "gsap";
import ProgressView from "@/components/progress";
import wave from "@/components/garish/wave";

export default {
  name: "homeIndex",
  components: { wave, ProgressView },
  data() {
    return {
      score: 100,
      activeColor: "#FFF",
      info1: "您管理的文物遗址很健康，继续保持",
      info2: "良好的定期体检习惯，会让文物遗址的健康状态持续时间更久"
    };
  },
  computed: {
    ...mapGetters(["topbar", "organization"]),
    localSocre() {
      if (this.$store.getters.organization) {
        return this.$store.getters.organization.score;
      } else {
        return 100;
      }
    },
    currentTime() {
      return new Date().getTime();
    }
  },
  watch: {
    localSocre: function(newValue) {
      if (this.localSocre <= 90) {
        this.info1 = "您管理的文物遗址部分设备数据异常!";
        this.activeColor = { color: "#6A23C" };
      }
      if (this.localSocre <= 70) {
        this.info1 = "您管理的文物遗址设备上传危险数据!";
        this.activeColor = { color: "#F56C6C" };
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
        if (this.currentTime - this.organization.updated_at > 1) {
          this.$message(
            "已经很长时间没有进行智能检测,请点击智能检测分析遗址状态!"
          );
        }
      });
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  flex: 1;
  margin: 10px;
  .status {
    height: 160px;
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
      font-weight:normal;
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
        font-size:67px;
        margin-bottom:25px;
      }
      span{
        background: #31c878;
        color: #fff;
        padding:7px 15px;
        border-radius:15px;
        margin-top: 20px;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all 8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
