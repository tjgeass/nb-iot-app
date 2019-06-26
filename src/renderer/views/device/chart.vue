
<template>
  <div class="main-container">
    <el-row type="flex" class="top">
      <el-col :span="9" class="title">
        <el-page-header @back="handleDevice">
          <span slot="content">
            <i class="el-icon-date"></i>
            设备名称:{{device.name}}
          </span>
        </el-page-header>
      </el-col>
      <el-col :span="6">
        <el-switch
          v-model="autoRefresh"
          v-show="dataQuery.dateCate==3"
          active-color="#13ce66"
          active-text="自动刷新"
        ></el-switch>
      </el-col>
      <el-col :span="10">
        <el-radio-group v-model="dataQuery.dateCate" @change="handleRadio">
          <el-radio :label="3">一天</el-radio>
          <el-radio :label="2">一月</el-radio>
          <el-radio :label="1">一年</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="main-chart">
      <v-chart :options="option"/>
    </div>
  </div>
</template>

<script>
import { getDeviceData } from "@/api/device";
import { fips } from "crypto";
import options from "@/utils/echart/options";

export default {
  name: "deviceChart",
  data() {
    return {
      options,
      autoRefresh: false,
      timer: null, // 定时器
      dataQuery: {
        dev_id: this.$route.query.dev_id,
        dateCate: 3
      }
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.dataQuery.dev_id);
    },
    option: function() {
      if (this.device.type.isDire) {
        return this.options.optionType1;
      }
      if (this.device.type.isPerc) {
        return this.options.optionType2;
      }
    }
  },
  watch: {
    // 监控自动刷新状态
    autoRefresh(val) {
      if (this.autoRefresh) {
        console.log("开始自动刷新");
        this.timer = setInterval(this.fetchData, 8000);
      } else {
        console.log("关闭自动刷新");
        if (this.timer) {
          //如果定时器在运行则关闭
          clearInterval(this.timer);
        }
      }
    }
  },
  methods: {
    /**
     * 跳转设备详情页
     */
    handleDevice() {
      this.$router.push({
        path: "/device/view",
        query: {
          dev_id: this.$route.query.dev_id
        }
      });
    },
    /**
     * 获取数据
     */
    fetchData() {
      this.$store
        .dispatch("GetDeviceDataChart", this.dataQuery)
        .then(response => {
          this.option.dataset.source = response.items;
        });
    },
    /**
     * 切换自动刷新
     */
    handleRadio() {
      this.autoRefresh = false;
      this.fetchData();
    }
  },
  destroyed() {
    if (this.timer) {
      //如果定时器在运行则关闭
      clearInterval(this.timer);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-header {
  background: #fff;
}
.main-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  .top {
    height: 50px;
    line-height: 50px;
    .title {
      padding-left: 100px;
      align-self: center;
    }
  }
  .main-chart {
    display: block;
    flex: 1;
    overflow: hidden;
    .echarts {
      width: 100vw;
      height: 100%;
    }
  }
}
</style>
