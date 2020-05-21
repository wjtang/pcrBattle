<template>
  <div>
    <div class="app-container margin-content padding-content">
      <div class="clearfix">
        <div class="fl">
          <slot name="header">{{header}}</slot>
        </div>
        <div class="fr">
          <el-form
            :model="dataForm"
            ref="dataForm"
            inline>
            <el-form-item label="时间区间" prop="beginMonth">
              <el-date-picker
                type="month"
                value-format="yyyy-MM"
                v-model="dataForm.beginMonth"
                :editable="false"
                clearable
                :picker-options="pickerOptions"
                placeholder="开始月份"
                style="width: 100%;height: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <span class="line">-</span>
            </el-form-item>
            <el-form-item prop="endMonth">
              <el-date-picker
                type="month"
                value-format="yyyy-MM"
                v-model="dataForm.endMonth"
                :editable="false"
                clearable
                :picker-options="pickerOptions"
                placeholder="结束月份"
                style="width: 100%;height: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleMonthChange">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <el-table
        :key="tableKey"
        :data="tableData"
        v-loading="loading"
        element-loading-text="给我一点时间"
        style="width: 100%;">

        <el-table-column label="统计月份" property="statisticsMonth" fixed="left"></el-table-column>
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
        <el-table-column label="状态" property="status" width="140" fixed="right">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title="审核记录"
              width="500"
              trigger="click"
              @show="popShow(scope.row.id)">

              <el-table :data="gridData" max-height="150">
                <el-table-column property="status" label="审核状态" width="130">
                  <template slot-scope="scope">
                    <el-tag>{{scope.row.status | statusFilter}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column property="operatorName" label="审核人" show-overflow-tooltip></el-table-column>
                <el-table-column property="createdtimeDesc" label="审核时间" width="90"></el-table-column>
                <el-table-column property="remark" label="审核备注" show-overflow-tooltip></el-table-column>
              </el-table>
              <el-tag slot="reference" v-if="scope.row.status === 4" type="success">{{scope.row.status |
                statusFilter}}
              </el-tag>
              <el-tag slot="reference" v-else-if="scope.row.status > 4" type="warning">{{scope.row.status |
                statusFilter}}
              </el-tag>
              <el-tag slot="reference" v-else>{{scope.row.status | statusFilter}}</el-tag>
            </el-popover>

          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <a @click.stop="handleSubmit(scope.row)" v-if="_opShowFlag(scope.row.status)">{{btnText}}</a>
            <a @click.stop="handleView(scope.row)" v-else>明细</a>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container align-right" v-show="tableData.length > 0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="dataForm.pageNum"
          :page-sizes="pageSizes"
          :page-size="dataForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 审核 -->
    <cost-audit v-if="auditVisible" ref="auditing" :type="identityType" @refresh="_getStatisticsList"></cost-audit>
    <!-- 明细记录 -->
    <cost-view v-if="viewVisible" ref="costView" @refresh="_getStatisticsList"></cost-view>
  </div>
</template>

<script>
  // api
  import { getStatisticsList, getStatisticsAuditRecords } from '@/api/statistics'
  // utils
  import { getPreMonth } from '@/utils'
  import { page } from '@/utils/page'
  // vuex
  import { mapMutations } from 'vuex'
  // components
  import CostAudit from '@/components/CostAudit'
  import CostView from '@/components/CostView'
  import Divider from '@/components/Divider'

  export default {
    name: 'cost-template',
    props: {
      header: {},
      btnText: {
        type: String,
        default() {
          return '审核'
        }
      },
      // 身份
      identity: Number,
      // 下一级
      next: Number,
      // 上一级
      prev: Number,
      // 可操作状态
      operation: {
        type: Array,
        default() {
          return []
        }
      },
      reSend: Boolean
    },
    computed: {
      identityType() {
        const map = {
          0: 'send',
          1: 'auditing',
          2: 'review',
          3: 'verify',
          4: 'examine',
          5: 'collision'
        }
        return map[this.identity]
      }
    },
    data() {
      const _identity = this.identity

      return {
        tableKey: 0,
        tableData: [],
        loading: false,
        gridData: [],
        dataForm: {
          identity: _identity,
          auditStatus: 0,
          beginMonth: '',
          endMonth: '',
          pageNum: 1,
          pageSize: page.pageSize
        },
        pageSizes: page.pageSizes,
        total: 0,
        auditVisible: false,
        viewVisible: false,
        pickerOptions: {
          disabledDate(time) {
            const d = new Date()
            const pre = d.setMonth(d.getMonth() - 1)
            return time.getTime() > pre
          }
        },
        scrollHeight: null,
      }
    },
    created() {
      this._getStatisticsList()
      this.tableResize()
    },
    methods: {
      tableResize(h = 280) {
        this.scrollHeight = document.body.scrollHeight - h
        window.onresize = () => {
          this.scrollHeight = document.body.scrollHeight - h
        }
      },
      _getStatisticsList() {
        this.loading = true
        getStatisticsList(this.dataForm).then((res) => {
          this.tableData = res.data.data.dataList
          this.total = res.data.data.total
          this.loading = false
        }).catch((err) => {
          this.tableData = []
          this.total = 0
          this.loading = false
        })
      },
      handleView(e) {
        this.viewVisible = true
        this.$nextTick(() => {
          this.$refs['costView'].init({
            identity: this.identity,
            status: e.status,
            statisticsId: e.id,
            portId: e.portId,
            month: e.statisticsMonth,
            isEdit: false
          })
        })
      },
      handleSubmit(e) {
        this.auditVisible = true
        this.$nextTick(() => {
          this.$refs['auditing'].init(this.reSend, {
            updateParams: { statisticsId: e.id, portId: e.portId, month: e.statisticsMonth },
            opParams: { statisticsIds: e.id, identity: this.identity, next: this.next, prev: this.prev }
          })
        })
      },
      handleMonthChange() {
        this.dataForm.pageNum = 1
        this._getStatisticsList()
      },
      handleSizeChange(val) {
        this.dataForm.pageSize = val
        this._getStatisticsList()
      },
      handleCurrentChange(val) {
        this.dataForm.pageNum = val
        this._getStatisticsList()
      },
      _opShowFlag(status) {
        status = parseInt(status)
        if (status === this.operation[0] || status === this.operation[1]) {
          return true
        } else {
          return false
        }
      },
      popShow(statisticsId) {
        this._getStatisticsAuditRecords(statisticsId)
      },
      _getStatisticsAuditRecords(statisticsId) {
        getStatisticsAuditRecords({ statisticsId: statisticsId }).then((res) => {
          this.gridData = res.data.data
        })
      },
      ...mapMutations({
        setCurrentId: 'SET_CURRENTID'
      })
    },
    components: {
      CostAudit,
      CostView,
      Divider
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.el-tag {
  cursor: pointer;
}
</style>
