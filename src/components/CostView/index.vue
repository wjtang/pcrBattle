<template>
  <el-dialog
    title="明细"
    :close-on-click-modal="false"
    width="840px"
    :visible.sync="visible">

    <el-table
      :key="tableKey"
      :data="tableData"
      v-loading="loading"
      element-loading-text="正在加载..."
      style="width: 100%;">

      <el-table-column label="报关单号" property="declNo" width="160" fixed="left"/>
      <el-table-column label="查验来源" property="checkSource">
        <template slot-scope="scope">
          {{scope.row.checkSource | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="提运单号" property="blNo" width="150"/>
      <el-table-column label="集装箱号" property="contNo" width="150"/>
      <el-table-column label="集装箱尺寸" property="contSize"/>
      <el-table-column label="进/出口标记" property="ieFlag" width="120">11
        <template slot-scope="scope">
          {{scope.row.ieFlag | ieFlagFilter}}
        </template>
      </el-table-column>
      <el-table-column label="申报口岸" property="declPort" width="120">
        <template slot-scope="scope">
          {{scope.row.declPort | portCodeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="查验方式" property="checkType">
        <template slot-scope="scope">
          {{(scope.row.checkType && scope.row.checkType.charAt(0)) | checkTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="码头作业类型" property="actType" width="200"/>
      <el-table-column label="码头作业时间" property="readyTime" width="90"/>
      <el-table-column label="集装箱位置" property="location"/>
      <el-table-column label="操作联系人" property="contact"/>
      <el-table-column label="操作联系人电话" property="contactTel" width="120"/>
      <!--<el-table-column label="审核状态" fixed="right" property="auditStatus">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag v-if="scope.row.auditStatus === '1'" type="success">-->
      <!--{{scope.row.auditStatus | auditStatusFilter}}-->
      <!--</el-tag>-->
      <!--<el-tag v-else-if="scope.row.auditStatus === '2'" type="danger">-->
      <!--{{scope.row.auditStatus | auditStatusFilter}}-->
      <!--</el-tag>-->
      <!--<el-tag v-else type="warning">-->
      <!--{{scope.row.auditStatus | auditStatusFilter}}-->
      <!--</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" fixed="right" width="130" v-if="isEdit">
        <template slot-scope="scope">
          <a @click="authHandle({portId:scope.row.portId,ids:scope.row.readyId, status:1})">确认</a>
          <divider type="vertical"></divider>
          <a @click="authHandle({portId:scope.row.portId,ids:scope.row.readyId, status:2})">审核不通过</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container align-center" v-show="tableData.length > 0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="dataForm.pageNum"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      width="400px"
      title="审核"
      :visible.sync="innerVisible"
      append-to-body>

      <el-form
        ref="dataForm"
        :model="auditForm"
        label-position="top"
        label-width="100px">
        <el-form-item label="审核备注" prop="auditRemark">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="审核备注"
            maxlength="60"
            v-model="auditForm.auditRemark"></el-input>
          <div style="text-align: right;">{{count}} / 60</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script>
  // api
  import { updateStatisticsDetail, getReadiesByStatistic } from '@/api/statistics'
  import { getAll } from '@/api/costSubsidies'
  // utils
  import { hasPermission } from '@/utils/permission'
  // vuex
  import { mapGetters } from 'vuex'
  // components
  import Divider from '@/components/Divider'

  export default {
    name: 'cost-view',
    data() {
      return {
        tableKey: 0,
        tableData: [],
        loading: false,
        dataForm: {
          statisticsId: '',
          month: '',
          portId: '',
          ids: '',
          pageNum: 1
        },
        total: 0,
        auditForm: {
          ids: '',
          auditRemark: '',
          auditStatus: -1,
          status: -1,
        },
        visible: false,
        innerVisible: false,
        isEdit: true,
        actTypeMap: {}
      }
    },
    computed: {
      count() {
        return this.auditForm.auditRemark.length
      },
      ...mapGetters([
        'currentId'
      ])
    },
    created() {
      this.syncActTypeFilter()
    },
    methods: {
      hasPermission,
      init({ identity, status, statisticsId, portId, month, isEdit }) {
        this.isEdit = isEdit
        if (this.hasPermission([269])) {
          this.dataForm = Object.assign({}, { identity, status, statisticsId, portId, month, }, { pageNum: 1 })
        } else {
          this.dataForm = Object.assign({}, { statisticsId, portId, month }, { isValidity: 3, pageNum: 1 })
        }
        this._getReadiesByStatistic()
        console.log('mt', this.hasPermission([269]))
      },
      _getReadiesByStatistic() {
        this.loading = true
        getReadiesByStatistic(this.dataForm).then((res) => {
          this.tableData = res.data.data.dataList
          this.total = res.data.data.total
          this.visible = true
          this.loading = false
          this.tableData.forEach((item, index) => {
            item.actType = this.actTypeMap[item.actType]
          })
        })
      },
      handleCurrentChange(val) {
        this.dataForm.pageNum = val
        this._getReadiesByStatistic()
      },
      authHandle({ portId, ids, status }) {
        this.dataForm = { portId, ids, status }
        this.innerVisible = true
      },
      submitForm() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateStatisticsDetail(this.dataForm).then((res) => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.innerVisible = false
              this.$emit('refresh')
              this._getReadiesByStatistic()
            })
          } else {
            return false
          }
        })
      },
      close() {
        this.innerVisible = false
        this.$refs['dataForm'].resetFields()
      },
      syncActTypeFilter() {
        getAll().then((res) => {
          res.data.data.forEach((item) => {
            this.actTypeMap[item.actType] = `${item.actType}-${item.name}`
          })
        })
      }
    },
    components: {
      Divider
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
