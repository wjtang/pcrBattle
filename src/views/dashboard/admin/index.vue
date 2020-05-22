<template>
  <div class="dashboard-editor-container">
    <div
      style="width:90%;margin:0 auto;background:#fff;text-align:center;font-size:16px;font-weight:bold;padding:50px;">
      欢迎使用，PCR内部管理系统
    </div>
    <!--<panel-group :data="panelData" @handleSetLineChartData="handleSetLineChartData"></panel-group>-->
    <!--<div v-if="$store.getters.identity !== '1'">-->
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--预警监控(最近15天)-->
    <!--<line-chart :chart-data="warningStatistics"></line-chart>-->
    <!--</el-row>-->
    <!--</div>-->
    <!--<el-row :gutter="32">-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<raddar-chart></raddar-chart>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart></pie-chart>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--<el-col :xs="24" :sm="24" :lg="8">-->
    <!--<div class="chart-wrapper">-->
    <!--<bar-chart></bar-chart>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  // api
  import {dashboard, dashboardWarning} from '@/api/dashboard'

  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import TransactionTable from './components/TransactionTable'
  import BoxCard from './components/BoxCard'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'dashboard-admin',
    data() {
      return {
        panelData: {},
        warningStatistics: {
          xAxis: [],
          series: {
            contNoCount: [],
            declareCount: [],
            flowCount: [],
            leaveCount: [],
            storageCount: [],
            untakeCount: []
          }
        },
        lineChartData: lineChartData.newVisitis
      }
    },
    created() {
//      this._dashboard()
    },
    methods: {
      handleSetLineChartData(type) {
        this.$router.push({path: type})
      },
      _dashboard() {
        dashboardWarning({dateNum: 15}).then(res => {
          res.data.data.warningStatistics.forEach((item, index) => {
            this.warningStatistics.xAxis.push(item.date)
            this.warningStatistics.series.contNoCount.push(item.contNoCount)
            this.warningStatistics.series.declareCount.push(item.declareCount)
            this.warningStatistics.series.flowCount.push(item.flowCount)
            this.warningStatistics.series.leaveCount.push(item.leaveCount)
            this.warningStatistics.series.storageCount.push(item.storageCount)
            this.warningStatistics.series.untakeCount.push(item.untakeCount)
          })
        })
        dashboard({dateNum: 15}).then((res) => {
          const {chkOrderStatistics, inPortCargoStatistics, releaseStatistics} = res.data.data
          this.panelData = {chkOrderStatistics, inPortCargoStatistics, releaseStatistics}
        })
      }
    },
    components: {
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      BoxCard
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
