<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  const generateSeries = ((name, data) => {
    return {
      name,
      smooth: true,
      itemStyle: {
        normal: {
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          }
        }
      },
      type: 'line',
      data,
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    }
  })

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    methods: {
      setOptions({ xAxis, series } = {}) {
        this.chart.setOption({
          dataZoom: [
            {
              startValue: xAxis[0],
              endValue: xAxis[9]
            },
            {
              type: 'inside'
            }
          ],
          xAxis: {
            data: xAxis,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: 65
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['集装箱号异常预警', '超时未申报预警', '集装箱口岸漂移预警', '集装箱异常离场预警', '长期堆存集装箱预警', '超时未提离预警']
          },
          series: [
            generateSeries('集装箱号异常预警', series.contNoCount),
            generateSeries('超时未申报预警', series.declareCount),
            generateSeries('集装箱口岸漂移预警', series.flowCount),
            generateSeries('集装箱异常离场预警', series.leaveCount),
            generateSeries('长期堆存集装箱预警', series.storageCount),
            generateSeries('超时未提离预警', series.untakeCount),
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>
