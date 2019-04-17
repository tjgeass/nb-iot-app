
<template>
  <div class="main">
    <div class="main-left"></div>
    <div class="main-right">
      <el-tabs value="first" type="card">
        <el-tab-pane label="用户管理" name="first" style="height:100%;width:100%">
          <div style="height:100%;width:100%">
            <v-chart :options="option"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// import { getOrgConsInfo } from "@/api/device";

export default {
  name: "deviceView",

  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return {
      option: {
        title: {
          text: "动态数据",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["最新成交价", "预购队列"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "价格",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "预购量",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "预购队列",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
          {
            name: "最新成交价",
            type: "line",
            data: (function() {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })()
          }
        ]
      }
    };
  },
  props: {
    megs: String
  },
  methods: {},
  created() {
    console.log(this.$parent);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.echarts {
  width: 100%;
  height: 500px;
}
.report-container {
  flex: 1;
  margin: 10px;
  .list-item {
    display: block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 2s;
  }
  .list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
