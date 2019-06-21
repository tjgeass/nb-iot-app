
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
    <div class="main-chart" style="d">
      <v-chart :options="option"/>
    </div>
  </div>
</template>

<script>
import { getDeviceData } from "@/api/device";
import { fips } from "crypto";

export default {
  name: "deviceChart",
  data() {
    return {
      autoRefresh: false,
      timer: null, // 定时器
      dataQuery: {
        dev_id: this.$route.query.dev_id,
        dateCate: 3
      },
      /**
       * 倾角配置
       */
      optionType1: {
        legend: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777"
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            brush: {
              type: ["lineX", "clear"]
            }
          }
        },
        dataset: {
          // 提供一份数据。
          dimensions: [
            "uplink_at",
            "temp",
            "humi",
            "illu",
            "alti",
            "perc",
            "dire_0",
            "dire_1"
          ],
          source: []
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "30%"
          },
          {
            left: "10%",
            right: "8%",
            top: "48%",
            height: "30%"
          }
        ],
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: [
          {
            gridIndex: 0,
            show: false,
            type: "category",
            axisPointer: {
              label: {
                show: false
              }
            }
          },
          {
            gridIndex: 1,
            scale: true,
            type: "category",
            axisPointer: {
              label: {
                show: false
              }
            }
          }
        ],
        // 声明一个 Y 轴，数值轴。
        yAxis: [
          {
            name: "温度°C",
            scale: true,
            position: "left",
            gridIndex: 0,
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          {
            name: "湿度%Rh",
            position: "right",
            scale: true,
            gridIndex: 0,
            axisLabel: {
              formatter: "{value} %Rh"
            }
          },
          {
            name: "倾角",
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {
              formatter: "{value} °"
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: "slider",
            top: "85%",
            start: 50,
            end: 100
          }
        ],
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [
          {
            name: "温度",
            type: "line",
            smooth: true,
            encode: {
              y: ["temp"]
            },
            smooth: true,
            label: {
              show: true
            },
            showAllSymbol: false
          },
          {
            name: "湿度",
            type: "bar",
            large: true,
            barMaxWidth: 10,
            encode: {
              y: ["humi"]
            },
            yAxisIndex: 1,
            itemStyle: {
              color: "#91c7ae"
            }
          },
          {
            name: "前后倾角",
            type: "line",
            encode: {
              y: ["dire_0"]
            },
            xAxisIndex: 1,
            yAxisIndex: 2,
            label: {
              show: true
            },
            showAllSymbol: false
          },
          {
            name: "左右倾角",
            type: "line",
            encode: {
              y: ["dire_1"]
            },
            xAxisIndex: 1,
            yAxisIndex: 2,
            label: {
              show: true
            },
            showAllSymbol: false
          }
        ]
      },
      /**
       * 裂隙配置
       */
      optionType2: {
        legend: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777"
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            brush: {
              type: ["lineX", "clear"]
            }
          }
        },
        dataset: {
          // 提供一份数据。
          dimensions: [
            "uplink_at",
            "temp",
            "humi",
            "illu",
            "alti",
            "perc",
            "dire_0",
            "dire_1"
          ],
          source: []
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "30%"
          },
          {
            left: "10%",
            right: "8%",
            top: "48%",
            height: "30%"
          }
        ],
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: [
          {
            gridIndex: 0,
            show: false,
            type: "category",
            axisPointer: {
              label: {
                show: false
              }
            }
          },
          {
            gridIndex: 1,
            scale: true,
            type: "category",
            axisPointer: {
              label: {
                show: false
              }
            }
          }
        ],
        // 声明一个 Y 轴，数值轴。
        yAxis: [
          {
            name: "温度°C",
            scale: true,
            position: "left",
            gridIndex: 0,
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          {
            name: "湿度%Rh",
            position: "right",
            scale: true,
            gridIndex: 0,
            axisLabel: {
              formatter: "{value} %Rh"
            }
          },
          {
            name: "裂隙",
            scale: true,
            gridIndex: 1,
            splitNumber: 1,
            axisLabel: {
              formatter: "{value} mm"
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: "slider",
            top: "85%",
            start: 50,
            end: 100
          }
        ],
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [
          {
            name: "温度",
            type: "line",
            smooth: true,
            encode: {
              y: ["temp"]
            },
            smooth: true,
            label: {
              show: true
            },
            showAllSymbol: false
          },
          {
            name: "湿度",
            type: "bar",
            large: true,
            barMaxWidth: 10,
            encode: {
              y: ["humi"]
            },
            yAxisIndex: 1,
            itemStyle: {
              color: "#91c7ae"
            }
          },
          {
            name: "裂隙",
            type: "line",
            encode: {
              y: ["perc"]
            },
            xAxisIndex: 1,
            yAxisIndex: 2,
            label: {
              show: true
            },
            showAllSymbol: false
          }
        ]
      }
    };
  },
  created() {
    this.$store.commit("SET_TOPBAR_BG", true);
    this.fetchData();
  },
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.dataQuery.dev_id);
    },
    option: function() {
      if (this.device.type_id == 3) {
        return this.optionType1;
      }
      if (this.device.type_id == 4) {
        return this.optionType2;
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
