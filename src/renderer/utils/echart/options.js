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
  }

}
export default options
