<template>
  <el-popover
    placement="left"
    title="审核记录"
    width="500"
    trigger="click"
    @show="popShow(records)">

    <el-table :data="gridData" max-height="150">
      <el-table-column property="status" label="审核状态" width="130">
        <template slot="scope" slot-scope="scope">
          <el-tag>{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="operatorName" label="审核人" show-overflow-tooltip></el-table-column>
      <el-table-column property="createdtimeDesc" label="审核时间" width="90"></el-table-column>
      <el-table-column property="remark" label="审核备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-tag slot="reference">{{scope.row.status | statusFilter}}</el-tag>
  </el-popover>
</template>

<script>
  // api
  import { getStatisticsAuditRecords } from '@/api/statistics'

  export default {
    name: 'audit-record',
    props: {
      records: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        gridData: []
      }
    },
    methods: {
      popShow(statisticsId) {
        this._getStatisticsAuditRecords(statisticsId)
      },
      _getStatisticsAuditRecords(statisticsId) {
        getStatisticsAuditRecords({statisticsId: statisticsId}).then((res) => {
          this.gridData = res.data.data
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
