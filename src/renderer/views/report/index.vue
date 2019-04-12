<template>
  <div class="report-container">
    <el-container class="container" id="main" style="position: relative;">
      <el-aside>
        <div class="block">
          <el-timeline>
            <transition-group name="list" tag="div">
              <el-timeline-item
                class="list-item"
                v-for="(activity, index) in activities"
                :key="index"
                size="large"
                :icon="activity.status|formatIconStatus"
                :type="activity.status|formatTypeStatus"
                :color="activity.status|formatColorStatus"
                :timestamp="activity.updated_at"
              >{{activity.name}}</el-timeline-item>
            </transition-group>
          </el-timeline>
        </div>
      </el-aside>
      <el-main class="main">
        <el-row type="flex" class="report" justify="center">
          <el-button
            type="warning"
            class="btn-report"
            @click="handleStart"
            round
            :loading="reporting"
          >开始分析</el-button>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getOrgConsInfo } from "@/api/report";

export default {
  name: "home",
  data() {
    return {
      activities: [],
      reporting: false,
      list: []
    };
  },

  mounted() {},
  methods: {
    handleStart() {
      this.reporting = true;
      this.activities = [];
      getOrgConsInfo()
        .then(response => {
          this.list = response.items;
          console.log(this.list);
        })
        .then(() => {
          let items = this.list;
          console.log(this.list);
          var interval = setInterval(() => {
            if (items.length > 0) {
              let addItem = items.shift();
              console.log(addItem);
              this.activities.splice(1, 0, addItem);
            } else {
              console.log("检测完成");
              this.reporting = false;
              clearInterval(interval);
            }
          }, 2000);
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
    transition: all 1s;
  }
  .list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
