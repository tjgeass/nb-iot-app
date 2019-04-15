<template>
  <div class="main">
    <div class="main-left"></div>
    <div class="main-right">
      <template>
        <el-tabs tab-position="left" style="height: 100%;">
          <el-tab-pane :label="item.name" v-for="(item, index) in consItems" :key="index">
            <el-row class="title">{{item.name}}</el-row>
            <el-row style="height:400px">sdfsdf</el-row>
            <el-row style="height:200px">
              <el-button v-for="(device, index) in item.devices" :key="index">{{device.name}}</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import { getOrgConsInfo } from "@/api/device";

export default {
  name: "home",
  data() {
    return {
      tabPosition: "left",
      activities: [],
      reporting: false,
      consItems: []
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      this.$store.dispatch("GetOrgConstInfo").then(response => {
        this.consItems = response.items;
        console.log(response.item);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
