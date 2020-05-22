<template>
  <el-dialog
    title="明细"
    :close-on-click-modal="false"
    width="840px"
    :visible.sync="visible">

    <el-table
      :key="0"
      :data="tableData"
      v-loading="loading"
      element-loading-text="给我一点时间"
      style="width: 100%;">

      <el-table-column label="报关单号" property="declNo" width="150"/>
      <el-table-column label="查验来源" property="checkSource">
        <template slot-scope="scope">
          {{scope.row.checkSource | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="提运单号" property="blNo" width="130"/>
      <el-table-column label="集装箱号" property="contNo" width="150"/>
      <el-table-column label="码头作业时间" property="readyTime" width="90"/>
      <el-table-column label="集装箱尺寸" property="contSize"/>
      <el-table-column label="进/出口标记" property="ieFlag" width="90">
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
      <el-table-column label="集装箱位置" property="location" width="150"/>
      <el-table-column label="操作联系人" property="contact"/>
      <el-table-column label="操作联系人电话" property="contactTel" width="120"/>
      <el-table-column label="是否剔除" fixed="right">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.auditStatus"
            :active-value="2"
            :inactive-value="1"
            @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix">
      <div class="pagination-container align-right fl" v-show="tableData.length > 0">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer fr" style="margin-top: 10px;">
        <el-button @click="visible=false">关闭</el-button>
        <el-button type="primary" @click="preview('next')">审核</el-button>
      </div>
    </div>

    <el-dialog
      :close-on-click-modal="false"
      width="840px"
      :visible.sync="innerVisible"
      append-to-body>
      <div slot="title">
        送审预览
        <divider type="vertical"></divider>
        <span class="font12" style="color: #999;">tips：送审后需要上级退回后才可以修改，敬请留意</span>
      </div>

      <el-table
        :key="1"
        :data="innerTableData"
        v-loading="innerLoading"
        element-loading-text="给我一点时间"
        style="width: 100%;margin-bottom: 16px;">

        <el-table-column label="口岸查验监管场所名称" width="90" property="portName" fixed="left"></el-table-column>
        <el-table-column label="配合提供查验服务的企业名称" width="250" property="chkCompanyName"></el-table-column>

        <el-table-column label="吊装费（包括吊运、托运费用）" header-align="center">
          <el-table-column label="20尺集装箱数" width="100" property="twentyLfNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="twentyLfAmount"></el-table-column>
          <el-table-column label="40尺集装箱数" width="100" property="fortyLfNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="fortyLfAmount"></el-table-column>
        </el-table-column>
        <el-table-column label="移位费（包括短距离运输、拆箱、装箱费用）" header-align="center">
          <el-table-column label="20尺集装箱数" width="100" property="twentyMvNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="twentyMvAmount"></el-table-column>
          <el-table-column label="40尺集装箱数" width="100" property="fortyMvNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="fortyMvAmount"></el-table-column>
          <el-table-column label="箱式货柜车数" width="100" property="boxMvNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="boxMvAmount"></el-table-column>
        </el-table-column>
        <el-table-column label="仓储费" header-align="center">
          <el-table-column label="20尺集装箱数" width="100" property="twentyStoreNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="twentyStoreAmount"></el-table-column>
          <el-table-column label="40尺集装箱" width="100" property="fortyStoreNum"></el-table-column>
          <el-table-column label="费用金额（元）" width="110" property="fortyStoreAmount"></el-table-column>
        </el-table-column>

        <el-table-column label="申报进出口集装箱数量（自然箱）" width="120" property="declareContNum "></el-table-column>
        <el-table-column label="实施查验集装箱数量（自然箱）" width="120" property="chkContNum "></el-table-column>
        <el-table-column label="申报进出口的箱式货柜车数量（辆）" width="120" property="declareBoxNum "></el-table-column>
        <el-table-column label="实施查验的箱式货柜车数量（辆）" width="120" property="chkBoxNum "></el-table-column>
        <el-table-column label="费用合计(元）" width="80" property="totalAmount"></el-table-column>
        <el-table-column label="免除费用的进出口企业数量" width="100" property="freeEntNum"></el-table-column>
      </el-table>

      <el-form
        ref="dataForm"
        :model="dataForm"
        label-position="top"
        label-width="100px">
        <el-form-item label="审核备注" prop="auditRemark">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="审核备注"
            maxlength="60"
            v-model="dataForm.auditRemark"></el-input>
          <div style="text-align: right;">{{count}} / 60</div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="warning" v-if="type !== 'collision'" @click="submitForm('prev')">审核不过</el-button>
        <el-button type="primary" @click="submitForm('next')">审核通过</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script>
  // api
  import {
    submitStatistics,
    opStatistics,
    getReadiesByStatistic,
    previewStatistics,
    updateStatisticsDetail
  } from '@/api/statistics'
  import { getAll } from '@/api/costSubsidies'
  // utils
  import { hasPermission } from '@/utils/permission'
  // vuex
  import { mapGetters } from 'vuex'
  // components
  import Divider from '@/components/Divider'

  export default {
    name: 'cost-audit',
    props: {
      btnText: {
        type: String,
        default() {
          return '审核'
        }
      },
      type: String
    },
    data() {
      return {
        tableData: [],
        loading: false,
        innerTableData: [],
        innerLoading: false,
        dataForm: {
          auditRemark: ''
        },
        pageNum: 1,
        total: 0,
        visible: false,
        innerVisible: false,
        isEdit: true,

        multipleSelection: [],
        addIds: [],
        delIds: [],
        updateParams: null,
        opParams: null,
        reSend: null,
        nextOrPrev: null,
        actTypeMap: {}
      }
    },
    computed: {
      count() {
        return this.dataForm.auditRemark.length
      },
      selected() {
        return this.currentId.ids !== ''
      },
      ...mapGetters([
        'currentId'
      ])
    },
    created() {
      console.log(this.type)
      this.syncActTypeFilter()
    },
    methods: {
      hasPermission,
      init(reSend, { updateParams, opParams }) {
        console.log(this.type)
        this.reSend = reSend
        this.updateParams = updateParams
        this.opParams = opParams
        let params = null
        if (this.hasPermission([269])) {
          params = Object.assign({}, this.updateParams, { pageNum: 1 })
        } else {
          params = Object.assign({}, this.updateParams, { isValidity: 3, pageNum: 1 })
        }
        this.addIds = []
        this.delIds = []
        this._getReadiesByStatistic(params)
        console.log('mt', this.hasPermission([269]))
      },
      _getReadiesByStatistic(params) {
        this.loading = true
        getReadiesByStatistic(params).then((res) => {
          this.tableData = res.data.data.dataList
          this.total = res.data.data.total
          // 记录原来选中的
          this.tableData.forEach((item, index) => {

            item.actType = this.actTypeMap[item.actType]

            if (this.addIds.indexOf(item.id) > -1) {
              item.auditStatus = 1
            }
            if (this.delIds.indexOf(item.id) > -1) {
              item.auditStatus = 2
            }
            this.multipleSelection.push(item.id)
          })
          // 去重
          this.multipleSelection = [...new Set(this.multipleSelection)]
          this.visible = true
          this.loading = false
          console.log('原来选中：' + this.multipleSelection)
          console.log('新增：' + this.addIds)
          console.log('删除：' + this.delIds)
        })
      },
      handleCurrentChange(val) {
        let params = null
        if (this.hasPermission([269])) {
          params = Object.assign({}, this.updateParams, { pageNum: val })
        } else {
          params = Object.assign({}, this.updateParams, { isValidity: 3, pageNum: val })
        }
        this._getReadiesByStatistic(params)
      },
      changeSwitch(val) {
        switch (val.auditStatus) {
          case 1:
            this.addIds.push(val.id)
            this.addIds = [...new Set(this.addIds)]
            break
          case 2:
            this.delIds.push(val.id)
            this.delIds = [...new Set(this.delIds)]
            break
        }
        this.addIds.forEach((item, index) => {
          if (this.delIds.indexOf(item) > -1) {
            if (this.delIds.length > 1) {
              this.addIds.splice(index, 1)
              this.delIds.splice(index, 1)
            } else {
              this.addIds.splice(0, 1)
              this.delIds.splice(0, 1)
            }
          }
        })
        console.log('原来选中：' + this.multipleSelection)
        console.log('新增：' + this.addIds)
        console.log('删除：' + this.delIds)
      },
      preview() {
        console.log('原来选中：' + this.multipleSelection)
        console.log('新增：' + this.addIds)
        console.log('删除：' + this.delIds)
        this.innerVisible = true
        this.innerLoading = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          const params = Object.assign({}, this.updateParams, {
            delIds: this.delIds.join(','),
            addIds: this.addIds.join(',')
          })
          previewStatistics(params).then((res) => {
            this.innerTableData = [res.data.data]
            this.innerLoading = false
          })
        })
      },
      close() {
        this.innerVisible = false
        this.$refs['dataForm'].resetFields()
      },
      submitForm(nextOrPrev) {
        this.$confirm('一旦提交，需要上一级审核部门退回方能修改。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
                console.log(this.type)
                const _updateParams = Object.assign({}, this.updateParams, { auditRemark: this.dataForm.auditRemark })
                let _opParams = null

                switch (nextOrPrev) {
                  case  'next':
                    _opParams = Object.assign({}, this.opParams, {
                      status: this.opParams.next,
                      auditRemark: this.dataForm.auditRemark
                    })
                    break
                  case 'prev':
                    _opParams = Object.assign({}, this.opParams, {
                      status: this.opParams.prev,
                      auditRemark: this.dataForm.auditRemark
                    })
                    break
                }
                delete this.opParams.next
                delete this.opParams.prev
                console.log(_updateParams)
                console.log(_opParams)
                if (this.addIds.length > 0 || this.delIds.length > 0) {
                  Promise.all([updateStatisticsDetail(_updateParams), opStatistics(_opParams)]).then((res) => {
                    this._popup()
                  })
                } else {
                  opStatistics(_opParams).then((res) => {
                    this._popup()
                  })
                }
              } else {
                return false
              }
            })
          })
          .catch(() => {
          })
      },
      _popup() {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.visible = false
        this.innerVisible = false
        this.$emit('refresh')
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
