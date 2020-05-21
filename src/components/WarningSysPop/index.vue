<template>
  <el-popover
    placement="bottom"
    title="预警参数审核跟踪"
    width="350"
    trigger="click"
    @show="popShow">

    <el-table :data="gridData" max-height="150">
      <el-table-column prop="portName" label="口岸监管科"/>
      <el-table-column prop="auditStatus" label="审核状态" width="130">
        <template slot-scope="scope">
          <el-tag>{{scope.row.auditStatus | auditStatusFilter2}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-tag slot="reference">预警参数审核跟踪</el-tag>
  </el-popover>
</template>

<script>
  // api
  import { myWarningSources } from '@/api/warningSettings'

  export default {
    name: 'warning-sys-pop',
    data() {
      return {
        gridData: []
      }
    },
    methods: {
      popShow() {
        this._myWarningSources()
      },
      _myWarningSources() {
        myWarningSources().then((res) => {
          this.gridData = res.data.data
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
