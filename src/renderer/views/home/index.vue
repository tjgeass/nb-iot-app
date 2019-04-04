<template>
  <div class="home-container">
    <el-row type="flex" class="status" justify="center">
      <div class="score">
        <div class="circle">
          100
          <span>分</span>
        </div>
      </div>
    </el-row>
    <el-row class="status-text">
      <p class="p1">您管理的文物遗址很健康，继续保持</p>
      <p class="p2">良好的定期体检习惯，会让文物遗址的健康状态持续时间更久</p>
    </el-row>
    <el-row type="flex" class="report" justify="center">
      <el-button type="warning" class="btn-report" round>智能检测</el-button>
    </el-row>
    <div class="dashboard-text">name:{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["name"])
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
  .report{
    .btn-report{
      font-size: 28px;
      padding: 15px 44px;
      border-radius:30px
    }
  }
}
</style>
