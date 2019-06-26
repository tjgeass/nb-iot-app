<template>
  <div class="main-container" v-loading="loading" element-loading-text="拼命加载中....">
    <el-card class="box-card-basic" :body-style="padding" shadow="hover">
      <div slot="header" class="clearfix">
        <span>设备属性</span>
      </div>
      <el-form label-position="left" size="mini" label-width="80px" class="demo-table-expand">
        <el-form-item label="设备名称:">
          <span>{{ device.name }}</span>
        </el-form-item>
        <el-form-item label="设备简介:">
          <span>{{ device.desc }}</span>
        </el-form-item>
        <el-form-item label="设备状态:">
          <span>{{ device.status|formatNameStatus }}</span>
        </el-form-item>
        <template v-if="device.type">
          <el-form-item label="设备型号:">
            <span>{{ device.type.name }}</span>
          </el-form-item>
          <el-form-item label="型号简介:">
            <span>{{ device.type.explain }}</span>
          </el-form-item>
        </template>
      </el-form>
    </el-card>

    <el-card class="box-card-status">
      <div slot="header" class="clearfix">
        <span>运行状态</span>
      </div>
      <div class="status" v-if="device.type">
        <div class="box-chart">
          <v-chart :options="gaugeTemp" class="chart"/>
        </div>
        <div class="box-chart">
          <v-chart :options="gaugeHumi" class="chart"/>
        </div>
        <div class="box-chart" v-if="device.type.isDire">
          <v-chart :options="gaugeDire" class="chart chart-dire"/>
        </div>
        <div class="box-chart" v-if="device.type.isPerc">
          <v-chart :options="gaugePerc" class="chart"/>
        </div>
      </div>
      <el-divider content-position="left">设备历史数据</el-divider>
      <div class="action">
        <el-button type="primary" plain @click="handleChart">曲线图</el-button>
        <el-button type="primary" plain @click="handleTable">表格图</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import options from "@/utils/echart/options";
export default {
  name: "deviceView",
  data() {
    //let device = this.$store.getters.getDeviceById(this.$route.query.dev_id);
    return {
      device: {},
      options,
      padding: {
        padding: "10px"
      },
      loading: true,
      classObject: {
        active: true,
        "text-danger": false
      },
      dev_id: this.$route.query.dev_id
    };
  },
  watch: {},
  created() {
    var item = {
      title: "主界面",
      path: "/home"
    };
    this.$store.commit("SET_TOPBAR", item);
    this.fetchData();
  },
  mounted() {},
  computed: {
    gaugeTemp: function() {
      return this.options.gaugeTemp;
    },
    gaugeHumi: function() {
      return this.options.gaugeHumi;
    },
    gaugeDire: function() {
      return this.options.gaugeDire;
    },
    gaugePerc: function() {
      return this.options.gaugePerc;
    }
  },
  methods: {
    fetchData() {
      var query = {
        dev_id: this.$route.query.dev_id
      };
      this.$store.dispatch("GetDeviceInfo", query).then(response => {
        this.device = response.item;
        this.gaugeTemp.series[0].data[0].value = this.device.newData.temp;
        this.gaugeHumi.series[0].data[0].value = this.device.newData.humi;
        this.gaugeDire.series[0].data[0].value = this.device.newData.dire_0;
        this.gaugeDire.series[1].data[0].value = this.device.newData.dire_1;
        this.loading = false;
      });
    },
    /**
     * 跳转到图表页面
     */
    handleChart() {
      this.$router.push({
        path: "/device/chart",
        query: {
          dev_id: this.dev_id
        }
      });
    },
    /**
     * 跳转表格页面
     */
    handleTable() {
      this.$router.push({
        path: "/device/table",
        query: {
          dev_id: this.dev_id
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  margin: 10px;
  display: flex;
  flex: 1;
  flex-direction: row;
  .box-card-basic {
    width: 250px;
    margin-right: 10px;
  }
  .box-card-status {
    flex: 1;
    margin-right: 10px;
    .status {
      height: 400px;
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
      .box-chart {
        display: flex;
        justify-content: center;
        flex: 1;
        .chart {
          width: 100%;
          height: 200px;
        }
      }
    }
  }
}
@keyframes breath-danger {
  0% {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.2);
  }
  70% {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.9);
  }
  to {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.2);
  }
}
@keyframes breath-warning {
  0% {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.2);
  }
  70% {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.9);
  }
  to {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.2);
  }
}
</style>
