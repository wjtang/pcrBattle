<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('/chkSys/index')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-view card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">查验下达（<span v-if="$store.getters.identity !== '1'">已处理 / </span>全部）</div>
          <span v-if="$store.getters.identity !== '1'">
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.chkOrderStatistics && parseInt(data.chkOrderStatistics.dealCount)"
                    :duration="2600"></count-to>
          <span class="divider">/</span>
          </span>
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.chkOrderStatistics && (parseInt(data.chkOrderStatistics.dealCount) + parseInt(data.chkOrderStatistics.unDealCount))"
                    :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/chkSys/chkRelease')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="fangxing" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">放行下达（今天 / 全部）</div>
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.releaseStatistics && parseInt(data.releaseStatistics.todayCount)"
                    :duration="3000"></count-to>
          <span class="divider">/</span>
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.releaseStatistics && parseInt(data.releaseStatistics.totalCount)"
                    :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('/portCont/index')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="huowu" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">在港货物（今天 / 全部）</div>
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.inPortCargoStatistics && parseInt(data.inPortCargoStatistics.todayInportCount)"
                    :duration="3200"></count-to>
          <span class="divider">/</span>
          <count-to class="card-panel-num" :startVal="0"
                    :endVal="data.inPortCargoStatistics && parseInt(data.inPortCargoStatistics.totalInportCount)"
                    :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--<div class="card-panel" @click="handleSetLineChartData('shoppings')">-->
    <!--<div class="card-panel-icon-wrapper icon-shoppingCard">-->
    <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon"/>-->
    <!--</div>-->
    <!--<div class="card-panel-description">-->
    <!--<div class="card-panel-text">散货总数</div>-->
    <!--<count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-col>-->
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    props: {
      data: {}
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    },
    created(){
      console.log(this.data)
    },
    components: {
      CountTo
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
