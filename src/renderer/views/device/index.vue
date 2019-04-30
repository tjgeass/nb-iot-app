<template>
  <div class="main-container">
    <div class="main-left"></div>
    <div class="main-right">
      <template>
        <el-tabs tab-position="left" v-model="tab" style="height: 100%;">
          <el-tab-pane v-for="(item, c_index) in consItems" :key="c_index">
            <span slot="label">{{item.name}}</span>
            <el-row class="title-top">
              <el-col class="title" :span="12">设备分布示意图</el-col>
              <el-col class="radio" :span="12">
                <el-radio-group
                  v-model="tabArray[c_index].radioId"
                  size="mini"
                  text-color="#FFF"
                  fill="#31c27c"
                >
                  <el-radio-button
                    v-for="(layout, l_index) in item.layout"
                    :label="l_index"
                    :key="l_index"
                    :name="layout.name"
                  >{{layout.name}}</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row style="height:400px" type="flex" justify="center" align="center">
              <div
                class="maker-bg"
                :style="styleObject(c_index)"
                v-if="item.layout[tabArray[c_index].radioId]"
              >
                <div
                  class="marker"
                  :key="index"
                  v-for="(marker, index) in item.layout[tabArray[c_index].radioId].marker"
                  :style="markerStyle(marker)"
                  @click="handleDevice(marker.dev_id)"
                >
                  <span>{{getMarkerName(marker.dev_id)}}</span>
                  <i class="el-icon-location-outline"></i>
                </div>
              </div>
              <div v-else>无设备布局示意图</div>
            </el-row>
            <el-row style="height:200px">
              <el-button
                v-for="(device, index) in item.devices"
                :key="index"
                :dev_id="device.dev_id"
                @click="handleDevice(device.dev_id)"
              >{{device.name}}</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "device",
  data() {
    let tabArray = []; //这个是必须的，你选中的每一题的数据都会存在这个数组里去，没有这个会有问题
    for (let i = 0; i < this.$store.getters.organization.c_num; i++) {
      var arrStr = { radioId: 0, image: "" };
      tabArray.push(arrStr);
    }
    return {
      marker: null,
      tab: 0,
      tabArray,
      layoutId: 0,
      markerName: [],
      consItems: []
    };
  },
  watch: {},
  created() {
    var item = {
      title: "首页",
      path: "/home"
    };
    console.log(this.$router);
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
  .main-right {
    .title-top {
      height: 40px;
      line-height: 40px;
      .title {
        color: #31c27c;
        font-size: 22px;
        font-weight: 300;
      }
      .radio {
        text-align: right;
      }
    }
  }
  .maker-bg {
    position: relative;
    background-repeat: no-repeat;
    height: 100%;
    .marker {
      cursor: pointer;
      position: absolute;
      text-align: center;
      i {
        font-size: 34px;
      }
      span {
        display: block;
        font-weight: 600;
      }
    }
  }
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
