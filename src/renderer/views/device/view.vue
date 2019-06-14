<template>
  <div class="main-container">
    <el-card class="box-card-basic" :body-style="{ padding: '10px' }" shadow="hover">
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
        <div v-if="device.newData.temp" class="dev-data">
          <i class="icon iconfont icon-wendu"></i>
          <p class="data">当前值:{{device.newData.temp}}</p>
          <p class="cali">标定值:{{device.initial_data.temp ? device.initial_data.temp:"无"}}</p>
        </div>
        <div v-if="device.newData.humi" class="dev-data">
          <i class="icon iconfont icon-shidu"></i>
          <span class="data">{{device.newData.humi}}</span>
          <span class="cali">{{device.initial_data.humi}}</span>
        </div>
        <div v-if="device.newData.illu" class="dev-data">
          <span class="name">光照:</span>
          <span class="data">{{device.newData.illu}}</span>
          <span class="cali">{{device.initial_data.illu}}</span>
        </div>
        <div v-if="device.newData.perc" class="dev-data">
          <span class="name">裂隙:</span>
          <span class="data">{{device.newData.perc}}</span>
          <span class="cali">{{device.initial_data.perc}}</span>
        </div>
        <div v-if="device.newData.dire_0" class="dev-data">
          <span class="name">前后倾角:</span>
          <span class="data">{{device.newData.dire_0}}</span>
          <span class="cali">{{device.initial_data.dire_0}}</span>
        </div>
        <div v-if="device.newData.dire_1" class="dev-data">
          <span class="name">左右倾角:</span>
          <span class="data">{{device.newData.dire_1}}</span>
          <span class="cali">{{device.initial_data.dire_1}}</span>
        </div>
      </div>
      <div class="action">
        <el-button type="primary" plain @click="handleDevice">曲线图</el-button>
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
      dev_id: this.$route.query.dev_id
    };
  },
  watch: {},
  created() {
    var item = {
      title: "首页",
      path: "/home"
    };
    this.$store.commit("SET_TOPBAR", item);
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
    handleDevice() {
      this.$router.push({
        path: "/device/chart",
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
        width: 150px;
        height: 150px;
        i {
          display: block;
          font-size: 80px;
          text-align: center;
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
