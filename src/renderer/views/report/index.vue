<template>
  <div class="main-container">
    <div class="main-left">
      <div class="score-box">
        <progress-view :score="score" :width="120"></progress-view>
      </div>
      <el-scrollbar
        wrap-class
        wrap-style="color: red;overflow-x: hidden;max-height: 420px;"
        view-style="font-weight: bold;"
        view-class="view-box"
        :native="false"
        class="block"
      >
        <el-timeline>
          <transition-group name="list" tag="div">
            <el-timeline-item
              class="list-item"
              size="large"
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.status|formatIconStatus"
              :type="activity.status|formatTypeStatus"
              :color="activity.status|formatColorStatus"
              :timestamp="activity.updated_at"
              :hide-timestamp="true"
              placement="top"
            >
              <div class="card">
                <h3>
                  <b>{{activity.name}}</b>
                  <el-tag
                    v-show="activity.show"
                    class="score"
                    size="small"
                    effect="dark"
                    :type="activity.status|formatTypeStatus"
                  >{{activity.score}}分</el-tag>
                </h3>
                <transition name="fade">
                  <p>{{explain[index]}}</p>
                </transition>
              </div>
            </el-timeline-item>
          </transition-group>
        </el-timeline>
      </el-scrollbar>
    </div>
    <div class="main-right">
      <div class="err-info">
        <el-scrollbar
          ref="myScrollbar"
          wrap-class
          wrap-style="color: red;overflow-x: hidden;max-height: 500px;"
          view-style="font-weight: bold;"
          view-class="view-box"
          :native="false"
        >
          <transition-group name="fade" tag="div">
            <el-card
              class="box-card"
              v-for="(errInfo, err_index) in errInfos"
              :key="errInfo.id"
              :data-index="err_index"
            >
              <div slot="header" class="clearfix">
                <el-tag
                  :type="errInfo.status|formatTypeStatus"
                  size="mini"
                >{{errInfo.status|formatNameStatus}}</el-tag>
                <span>{{errInfo.name}}</span>
                <el-divider direction="vertical"></el-divider>
                <span>上传时间: {{errInfo.newData.uplink_at}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
              </div>
              <div v-if="errInfo.newData.abnormal" class="text item">
                <p
                  v-for="(abnormal, abn_index) in errInfo.newData.abnormal"
                  :key="abn_index"
                  class="line"
                >
                  <i :class="abnormal|formatIconStatus"></i>
                  <b>{{abn_index|formatNameType}}传感器当前采集数值:{{errInfo.newData[abn_index]}}对比标定值:{{errInfo.initial_data[abn_index]}}。变化异常请注意观察!</b>
                </p>
              </div>
            </el-card>
          </transition-group>
        </el-scrollbar>
      </div>
      <el-row type="flex" class="report-row" justify="center">
        <el-button
          type="warning"
          class="btn-report"
          @click="handleStart"
          round
          :loading="reporting"
        >{{restart?"重新检测":"检测中"}}</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOrgConstInfo } from "@/api/device";
import ProgressView from "@/components/progress";
import Vue from "vue";

export default {
  name: "Report",
  components: { ProgressView },
  data() {
    return {
      time: 1000, //间隔时间
      timer: null, // 定时器
      score: 100, //初始分数
      activities: [], //循环集合
      errInfos: [], //错误信息
      explain: [], //检测过渡说明
      reporting: false,
      list: [],
      contsItem: null,
      contsKey: 0,
      restart: 0
    };
  },
  computed: {
    ...mapGetters(["topbar", "organization"])
  },
  created() {},
  mounted() {
    this.handleStart();
  },
  methods: {
    /**
     * 循环定时添加数据
     */
    addContsItem() {
      let contsItems = this.list;
      if (contsItems.length > 0) {
        this.contsItem = contsItems.shift(); // 获取数值第一元素,并移除数组
        this.contsItem.show = false;
        this.contsItem.score = 100;
        this.activities.push(this.contsItem);
        this.explain.splice(
          this.contsKey,
          1,
          "开始检测" + this.contsItem.name + "部署设备的运行状态!"
        );
        this.timer = setInterval(this.addDevItem, this.time); //嵌套循环
      } else {
        console.log("检测完成");
        this.organization.score = Number(this.score.toFixed(0));
        this.updateOrgScore(); //更新机构评分
        this.reporting = false;
        this.restart = 1;
      }
    },
    /**
     * 定时器间隔添加检测设备
     */
    addDevItem() {
      let items = this.contsItem.devices;
      if (items.length > 0) {
        let item = items.shift(); //获取数值第一元素,并移除数组
        var title = "正在检测设备" + item.name + "各项设备参数";
        this.explain.splice(this.contsKey, 1, title);
        if (item.status == 2) {
          this.contsItem.score = this.contsItem.score - 15;
        }
        if (item.status == 3) {
          this.contsItem.score = this.contsItem.score - 30;
        }
        this.addErrInfo(item);
      } else {
        clearInterval(this.timer);
        if (this.contsItem.score <= 90) {
          this.contsItem.status = 2;
        }
        if (this.contsItem.score < 70) {
          this.contsItem.status = 3;
        }
        this.updateContsScore();
        var format = Vue.filter("formatNameStatus");
        this.explain.splice(
          this.contsKey,
          1,
          "检测结束  " +
            this.contsItem.name +
            "  状态" +
            format(this.contsItem.status)
        );
        this.score = Number(
          this.score - (100 - this.contsItem.score) / this.organization.c_num
        ); //更新分数
        console.log(this.score);
        this.activities[this.contsKey].show = true; //显示建筑评分
        this.contsKey++;
        this.addContsItem();
      }
    },
    /**
     * 添加错误信息
     */
    addErrInfo(item) {
      if (item.status != 1) {
        this.errInfos.push(item);
        this.scrollDown();
      }
    },
    /**
     * 开始按钮
     */
    handleStart() {
      if (this.restart) {
        this.activities = [];
        this.explain = [];
        this.contsKey = 0;
        this.score = 100;
        this.errInfos = [];
      }
      this.reporting = true;
      this.$store
        .dispatch("GetOrgConstInfo")
        .then(response => {
          this.list = response.items;
        })
        .then(() => {
          //定时器
          this.addContsItem();
        });
    },
    /**
     * 更新机构分数
     */
    updateOrgScore() {
      this.$store.dispatch("UpdateOrgInfo").then(response => {
        console.log("更新机构信息成功");
      });
    },
    /**
     * 更新建筑
     */
    updateContsScore() {
      let query = {
        id: this.contsItem.id
      };
      let data = {
        status: this.contsItem.status,
        score: this.contsItem.score
      };
      this.$store
        .dispatch("UpdateContsInfo", { query, data })
        .then(response => {
          console.log("更新建筑信息成功");
        });
    },
    /**
     * 滚动事件,自动滚动到底部
     */
    scrollDown() {
      this.$nextTick(() => {
        this.$refs["myScrollbar"].wrap.scrollTop = this.$refs[
          "myScrollbar"
        ].wrap.scrollHeight;
      });
    }
  },
  /**
   * 页面销毁事件
   */
  destroyed() {
    if (this.timer) {
      //如果定时器在运行则关闭
      clearInterval(this.timer);
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
  .main-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    .score-box {
      justify-content: center;
      display: flex;
    }
    .block {
      padding-top: 50px;
      .list-item {
        padding-bottom: 10px;
        .el-timeline {
          padding-left: 10px;
          color: #fff;
        }
        .card {
          color: #fff;
          padding-top: 3px;
          h3 {
            margin: 0;
            padding-bottom: 10px;
            b {
              padding-right: 10px;
            }
            span {
              color: #fff;
            }
          }
          p {
            padding-bottom: 10px;
          }
        }
      }
    }
  }
  .main-right {
    .err-info {
      height: 500px;
      color: #31c27c;
      .el-card {
        margin-bottom: 10px;
        font-size: 13px;
        .text {
          .line {
            line-height: 150%;
          }
        }
      }
    }
    .report-row {
      margin-top: 20px;
    }
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}

.el-icon-success {
  color: #67c23a;
}
.el-icon-warning {
  color: #e6a23c;
}
.el-icon-error {
  color: #f56c6c;
}
</style>