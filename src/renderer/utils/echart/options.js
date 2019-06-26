const options = {
  gaugeTemp: {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    dataset: {},
    series: [
      {
        name: "温度",
        type: "gauge",
        min: -20,
        max: 60,
        radius: '100%',
        pointer: {
          width: 3,
        },
        detail: {
          formatter: "{value}℃",
          offsetCenter: [0, '70%'],
          fontSize: "13px"
        },
        data: [{ value: 50, name: "温度" }]
      }
    ]
  },
  gaugeHumi: {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: "湿度",
        type: "gauge",
        radius: '100%',
        pointer: {
          width: 3,
        },
        detail: {
          formatter: "{value}%RH",
          offsetCenter: [0, '70%'],
          fontSize: "13px"
        },
        data: [{ value: 50, name: "湿度" }]
      }
    ]
  },
  gaugeDire: {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        type: "gauge",
        name: "前后倾角",
        center: ['40%', '55%'],    // 默认全局居中
        splitNumber: 5,
        radius: '100%',
        min: -30,
        max: 30,
        endAngle: 80,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            width: 4
          }
        },
        axisTick: {            // 坐标轴小标记
          length: 8,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          length: 10,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        axisLabel: {
          backgroundColor: 'auto',
          distance: 10,
          borderRadius: 2,
          color: '#eee',
          padding: 3,
          textShadowBlur: 2,
          textShadowOffsetX: 1,
          textShadowOffsetY: 1,
          textShadowColor: '#222'
        },
        title: {
          offsetCenter: ["-10%", '30%'],       // x, y，单位px
        },
        pointer: {
          width: 3,
        },
        detail: {
          formatter: "{value}%RH",
          offsetCenter: ["-10%", '70%'],
          fontSize: "12px"
        },
        data: [{ value: 0, name: "前后倾角" }]
      },
      {
        type: "gauge",
        name: "左右倾角",
        center: ['60%', '55%'],    // 默认全局居中
        splitNumber: 5,
        radius: '100%',
        min: -30,
        max: 30,
        startAngle: 100,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            width: 4
          }
        },
        axisTick: {            // 坐标轴小标记
          length: 8,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          length: 10,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        axisLabel: {
          backgroundColor: 'auto',
          distance: 10,
          borderRadius: 2,
          color: '#eee',
          padding: 3,
          textShadowBlur: 2,
          textShadowOffsetX: 1,
          textShadowOffsetY: 1,
          textShadowColor: '#222'
        },
        title: {
          offsetCenter: ["10%", '30%'],       // x, y，单位px
        },
        pointer: {
          width: 3,
        },
        detail: {
          formatter: "{value}%RH",
          offsetCenter: ["10%", '70%'],
          fontSize: "12px"
        },
        data: [{ value: 0, name: "左右倾角" }]
      }
    ]
  },
  gaugePerc: {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    dataset: {},
    series: [
      {
        name: "裂隙",
        type: "gauge",
        min: 0,
        max: 50,
        radius: '100%',
        pointer: {
          width: 3,
        },
        detail: {
          formatter: "{value}cm",
          offsetCenter: [0, '70%'],
          fontSize: "13px"
        },
        data: [{ value: 25, name: "裂隙" }]
      }
    ]
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
}
export default options
