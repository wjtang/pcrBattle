<template>
  <el-table
    :key="tableKey"
    :data="data"
    v-loading="loading"
    element-loading-text="给我一点时间"
    style="width: 100%;">

    <el-table-column label="口岸查验监管场所名称" width="90" property="portName" fixed="left"></el-table-column>
    <el-table-column label="配合提供查验服务的企业名称" width="250" property="chkCompanyName"></el-table-column>
    <el-table-column label="申报进出口集装箱数量（自然箱）" width="120" property="declareContNum "></el-table-column>
    <el-table-column label="实施查验集装箱数量（自然箱）" width="120" property="chkContNum"></el-table-column>
    <el-table-column label="申报进出口的箱式货柜车数量（辆）" width="120" property="declareBoxNum "></el-table-column>
    <el-table-column label="实施查验的箱式货柜车数量（辆）" width="120" property="chkBoxNum"></el-table-column>

    <el-table-column label="吊装费（包括吊运、托运费用）" header-align="center">
      <el-table-column label="20尺集装箱" width="90" property="twentyLfNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="twentyLfAmount"></el-table-column>
      <el-table-column label="40尺集装箱" width="90" property="fortyLfNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="fortyLfAmount"></el-table-column>
    </el-table-column>

    <el-table-column label="移位费（包括短距离运输、拆箱、装箱费用）" header-align="center">
      <el-table-column label="20尺集装箱" width="90" property="twentyMvNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="twentyMvAmount"></el-table-column>
      <el-table-column label="40尺集装箱" width="90" property="fortyMvNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="fortyMvAmount"></el-table-column>
      <el-table-column label="箱式货柜车" width="90" property="boxMvNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="boxMvAmount"></el-table-column>
    </el-table-column>

    <el-table-column label="仓储费" header-align="center">
      <el-table-column label="20尺集装箱" width="90" property="twentyStoreNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="twentyStoreAmount"></el-table-column>
      <el-table-column label="40尺集装箱" width="90" property="fortyStoreNum"></el-table-column>
      <el-table-column label="费用金额（元）" width="110" property="fortyStoreAmount"></el-table-column>
    </el-table-column>

    <el-table-column label="费用合计(元）" width="80" property="totalAmount"></el-table-column>
    <el-table-column label="免除费用的进出口企业数量" width="100" property="freeEntNum"></el-table-column>

    <!--<el-table-column label="审核记录" property="status" width="100">-->
    <!--<template slot-scope="scope">-->
    <!--<audit-record :records="scope.row.id"></audit-record>-->
    <!--</template>-->
    <!--</el-table-column>-->

    <el-table-column label="状态" property="status" width="140" fixed="right">
      <template slot-scope="scope">
        <el-tag>{{scope.row.status | statusFilter}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" fixed="right" width="120">
      <template slot-scope="scope">
        <audit-record :records="scope.row.id"></audit-record>
        <divider type="vertical"></divider>
        <div v-if="_opShowFlag(scope.row.status)">
          <a @click.stop="handleAudit(scope.row)">审核</a>
        </div>
        <a @click.stop="handleView(scope.row)" v-else>明细</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Divider from '@/components/Divider'
  import AuditRecord from '@/components/CostAuditRecord'

  export default {
    name: 'cost-table',
    props: {
      data: {
        type: Array,
        default: []
      },
      loading: Boolean,
      status: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        tableKey: 0
      }
    },
    created() {
      console.log(this.status.length)
    },
    methods: {
      handleAudit(obj) {
        this.$emit('audit', obj)
      },
      handleReturn(obj) {
        this.$emit('return', obj)
      },
      handleReject(obj) {
        this.$emit('reject', obj)
      },
      handleView(obj) {
        this.$emit('view', obj)
      },
      _opShowFlag(status) {
        status = parseInt(status)
        if (status === this.status[0] || status === this.status[1]) {
          return true
        } else {
          return false
        }
      },
    },
    components: {
      Divider,
      AuditRecord
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
