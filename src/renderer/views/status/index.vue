<template>
  <div class="main-container">
    <el-scrollbar
      wrap-class
      wrap-style="color: red;overflow-x: hidden;max-height: 600px;"
      view-style="font-weight: bold;"
      view-class="view-box"
      :native="false"
      class="my"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(cons, c_index) in consItems" :key="c_index" :name="c_index">
          <template slot="title">
            <i class="header-icon el-icon-house"></i>
            {{cons.name}}
            <el-divider direction="vertical"></el-divider>
            设备数量:{{cons.num}}
          </template>
          <el-row :gutter="10" class="row-bg">
            <el-col :span="8" v-for="(device, d_index) in cons.devices" :key="d_index">
              <el-card class="box-card" :class="statusClass[device.status]">
                <div slot="header" class="clearfix">
                  <el-tag
                    :type="device.status|formatTypeStatus"
                    size="mini"
                  >{{device.status|formatNameStatus}}</el-tag>
                  <span>{{device.name}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>{{device.newData.uplink_at}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    class="el-button el-button--primary"
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="handleDevice(device.dev_id)"
                  >查看详情</el-button>
                </div>
                <div class="dev-data">
                  <span class="name">类型</span>
                  <span class="data">数值</span>
                  <el-tooltip class="item" content="设备初始标定值" placement="left">
                    <span class="cali">标定值</span>
                  </el-tooltip>
                </div>
                <div v-if="device.newData.temp" class="dev-data">
                  <span class="name">温度:</span>
                  <span class="data">{{device.newData.temp}}</span>
                  <span class="cali">{{device.initial_data.temp ? device.initial_data.temp:"无"}}</span>
                </div>
                <div v-if="device.newData.humi" class="dev-data">
                  <span class="name">温度:</span>
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
              </el-card>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "status",
  data() {
    return {
      activeNames: [0],
      consItems: [],
      statusClass: {
        2: "warning",
        3: "danger"
      }
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
  computed: {},
  methods: {
    fetchData() {
      this.$store.dispatch("GetOrgConstInfo").then(response => {
        this.consItems = response.items;
      });
    },
    handleDevice(dev_id) {
      this.$router.push({
        path: "/device/view",
        query: {
          dev_id: dev_id
        }
      });
    },
    styleObject(index) {
      var radioIndex = this.tabArray[index].radioId;
      if (this.consItems[index].layout.length > 0) {
        this.tabArray[index].image = this.consItems[index].layout[
          radioIndex
        ].image;
        return {
          height: this.consItems[index].layout[radioIndex].height + "px",
          width: this.consItems[index].layout[radioIndex].width + "px",
          backgroundImage: "url('" + this.tabArray[index].image + "')"
        };
      } else {
        return null;
      }
    },
    markerStyle(marker) {
      if (marker) {
        var device = this.$store.getters.getDeviceById(marker.dev_id);
        var format = Vue.filter("formatColorStatus");
        return {
          left: marker.x + "px",
          top: marker.y + "px",
          color: format(device.status)
        };
      } else {
        return null;
      }
    },
    getMarkerName(val) {
      var device = this.$store.getters.getDeviceById(val);
      if (device) {
        return device.name;
      } else {
        return null;
      }
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 10px;
  .el-scrollbar {
    width: 100%;
    .el-collapse-item {
      .row-bg {
        .box-card {
          margin: 5px;
          .dev-data {
            line-height: 24px;
            height: 24px;
            span {
              float: left;
            }
            .name {
              width: 30%;
            }
            .data {
              width: 30%;
            }
            .cali {
              width: 30%;
            }
          }
        }
        .warning {
          animation: breath-warning 3s infinite ease-in-out alternate;
        }
        .danger {
          animation: breath-danger 2s infinite ease-in-out alternate;
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
