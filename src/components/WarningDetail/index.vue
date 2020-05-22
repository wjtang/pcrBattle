<template>
  <el-dialog
    title="查看预警"
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="visible">

    <el-form
      label-position="right"
      :model="dataForm"
      label-width="150px">

      <el-form-item label="序列号：">
        {{dataForm.recordNum}}
      </el-form-item>
      <el-form-item label="集装箱号：">
        {{dataForm.dealRecordNo}}
      </el-form-item>
      <el-form-item label="类型：">
        {{dataForm.recordType}}
      </el-form-item>
      <el-form-item label="营运人：">
        {{dataForm.manager}}
      </el-form-item>
      <el-form-item label="承运人：">
        {{dataForm.carrier}}
      </el-form-item>
      <el-form-item label="异常情况：">
        {{dataForm.abnormaldes}}
      </el-form-item>
      <el-form-item label="处理状态：">
        {{dataForm.confirmStatus | confirmStatusFilter}}
      </el-form-item>
      <el-form-item label="处理结果：">
        {{dataForm.dealDetail}}
      </el-form-item>
      <el-form-item label="处理人：">
        {{dataForm.auditorName}}
      </el-form-item>
      <el-form-item label="处理时间：">
        {{dataForm.auditTimeDesc}}
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: 'warning-detail',
    data() {
      return {
        visible: false,
        dataForm: {
          recordNum: '',
          dealRecordNo: '',
          recordType: '',
          manager: '',
          carrier: '',
          abnormaldes: '',
          confirmStatus: '',
          dealDetail: '',
          auditorName: '',
          auditTimeDesc: '',
        },
        name:'123'
      }
    },
    methods: {
      init(row) {
        console.log(row)
        this.dataForm.recordNum = row.recordNum
        this.dataForm.dealRecordNo = row.dealRecordNo
        this.dataForm.recordType = row.recordType
        this.dataForm.manager = row.manager
        this.dataForm.carrier = row.carrier
        this.dataForm.abnormaldes = row.abnormaldes
        this.dataForm.confirmStatus = row.confirmStatus
        this.dataForm.dealDetail = row.dealDetail
        this.dataForm.auditorName = row.auditorName
        this.dataForm.auditTimeDesc = row.auditTimeDesc
        this.visible = true
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
