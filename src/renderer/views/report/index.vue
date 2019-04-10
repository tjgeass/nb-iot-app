<template>
  <div class="report-container">
    <el-container class="container" id="main" style="position: relative;">
      <el-aside>
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities2"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </div>
      </el-aside>
      <el-main class="main">
        
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      activities2: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.report-container {
  flex: 1;
  margin: 10px;
  .status {
    height: 160px;
    .score {
      background: url(../../assets/images/green/circle-w.png);
      background-size: 100%;
      width: 155px;
      height: 155px;
      margin: 0px auto;
      padding: 11px 0px;
    }
    .circle {
      font-size: 50px;
      color: #35b172;
      background: url(../../assets/images/green/circle.png);
      background-size: 100%;
      width: 135px;
      height: 135px;
      line-height: 135px;
      text-align: center;
      margin: 0px auto;
      span {
        font-size: 14px;
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
    }
  }
  .home-btns {
    margin-top: 50px;
    .el-col {
      text-align: center;
      i {
        display: block;
        color: #31c878;
        font-size: 67px;
      }
    }
  }
}
</style>
