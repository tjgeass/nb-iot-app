<template>
  <div class="main-container">
    <el-card class="box-card-basic" :body-style="padding" shadow="hover">
      <div slot="header" class="clearfix">
        <span>设备属性</span>
      </div>
      <el-form
        label-position="left"
        :model="device"
        size="mini"
        label-width="80px"
        class="demo-table-expand"
      >
        <el-form-item label="设备名称:">
          <span>{{ device.name }}</span>
        </el-form-item>
        <el-form-item label="设备简介:">
          <span>{{ device.desc }}</span>
        </el-form-item>
        <el-form-item label="设备状态:">
          <span>{{ device.status|formatNameStatus }}</span>
        </el-form-item>
        <el-form-item label="设备类型:">
          <span>{{ device.type_id }}</span>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card-status">
      <div slot="header" class="clearfix">
        <span>运行状态</span>
      </div>
      <div class="status">
        <div
          v-if="device.newData.temp"
          class="dev-data"
          :class="device.newData.abnormal.temp|formatNameStatus"
        >
          <i class="icon iconfont icon-wendu"></i>
          <p class="data">温度:{{device.newData.temp}}</p>
          <p class="cali" v-if="device.initial_data.temp">标定值:{{device.initial_data.temp }}</p>
        </div>
        <div v-if="device.newData.humi" class="dev-data">
          <i class="icon iconfont icon-shidu"></i>
          <p class="data">湿度:{{device.newData.humi}}</p>
          <p class="cali" v-if="device.initial_data.humi">{{device.initial_data.humi}}</p>
        </div>
        <div v-if="device.newData.perc" class="dev-data">
          <i class="icon iconfont icon-liefengji"></i>
          <p class="data">裂隙:{{device.newData.perc}}</p>
          <p class="cali" v-if="device.initial_data.perc">标定值:{{device.initial_data.perc }}</p>
        </div>
        <div
          v-if="device.newData.dire_0"
          class="dev-data"
          :class="device.newData.abnormal.dire_0|formatTypeStatus"
        >
          <i class="icon iconfont icon-qingjiaoyi"></i>
          <p class="data">前后倾角:{{device.newData.dire_0}}</p>
          <p class="cali" v-if="device.initial_data.dire_0">标定值:{{device.initial_data.dire_0 }}</p>
        </div>
        <div
          v-if="device.newData.dire_1"
          class="dev-data"
          :class="device.newData.abnormal.dire_1|formatTypeStatus"
        >
          <i class="icon iconfont icon-qingjiaoyi"></i>
          <p class="data">左右倾角:{{device.newData.dire_1}}</p>
          <p class="cali" v-if="device.initial_data.dire_1">标定值:{{device.initial_data.dire_1}}</p>
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

export default {
  name: "deviceView",
  data() {
    return {
      padding: {
        padding: "10px"
      },
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
    this.$store.commit("SET_TOPBAR_BG", true);
    this.fetchData();
  },
  mounted() {},
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.dev_id);
    }
  },
  methods: {
    fetchData() {},
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
      .dev-data {
        float: left;
        width: 200px;
        height: 200px;
        i {
          display: block;
          font-size: 100px;
          text-align: center;
        }
        p {
          text-align: center;
          line-height: 150%;
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
