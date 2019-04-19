
<template>
  <div class="main-container">
    <el-row class="top">
      <el-col :span="3">
        <el-button @click="handleIndex">设备列表</el-button>
      </el-col>
      <el-col :span="6">
        <span class="name">设备名称:{{device.name}}</span>
      </el-col>
      <el-col :span="3">
        <el-switch v-show="dataQuery.dateCate==3" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-col>
      <el-col :span="12">
        <el-radio-group v-model="dataQuery.dateCate" :change="fetchData()">
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

export default {
  name: "deviceView",
  data() {
    return {
      dataQuery: {
        dev_id: this.$route.query.dev_id,
        dateCate: 3
      },
      option: {
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
            height: "20%"
          },
          {
            left: "10%",
            right: "8%",
            top: "36%",
            height: "16%"
          },
          {
            left: "10%",
            right: "8%",
            top: "62%",
            height: "16%"
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
          },
          {
            gridIndex: 2,
            scale: true,
            type: "category"
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
          },
          {
            name: "裂隙",
            scale: true,
            gridIndex: 2,
            splitNumber: 2,
            axisLabel: {
              formatter: "{value} mm"
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1, 2],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1, 2],
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
            yAxisIndex: 1
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
          },
          {
            name: "裂隙",
            type: "line",
            encode: {
              y: ["perc"]
            },
            xAxisIndex: 2,
            yAxisIndex: 3,
            label: {
              show: true
            },
            showAllSymbol: false
          }
        ]
      }
    };
  },
  props: {
    megs: String
  },
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.dataQuery.dev_id);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleIndex() {
      this.$router.push({ path: "/device/index" });
    },
    fetchData() {
      this.$store.dispatch("GetDeviceData", this.dataQuery).then(response => {
        this.consItems = response.items;
        this.option.dataset.source = this.consItems;
      });
    },
    handleChange() {
      this.$router.push({ path: "/device/index" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  .top {
    height: 50px;
    line-height: 50px;
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
