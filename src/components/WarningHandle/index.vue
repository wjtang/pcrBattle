<template>
  <el-dialog
    title="预警处理"
    :close-on-click-modal="false"
    width="540px"
    :visible.sync="visible">

    <el-form
      label-position="right"
      :model="dataForm"
      :rules="rules"
      ref="dataForm"
      label-width="80px">

      <el-form-item label="序列号" prop="recordNum">
        <el-input placeholder="序列号" v-model="dataForm.recordNum" clearable></el-input>
      </el-form-item>
      <el-form-item label="集装箱号" prop="dealRecordNo">
        <span>{{dataForm.dealRecordNo}}</span>
      </el-form-item>
      <el-form-item label="类型" prop="recordType">
        <el-select placeholder="类型" v-model="dataForm.recordType" clearable style="width: 100%;">
          <el-option label="租用" value="1"></el-option>
          <el-option label="自用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营运人" prop="manager">
        <el-input placeholder="营运人" v-model="dataForm.manager" clearable></el-input>
      </el-form-item>
      <el-form-item label="承运人" prop="carrier">
        <el-input placeholder="承运人" v-model="dataForm.carrier" clearable></el-input>
      </el-form-item>
      <el-form-item label="异常情况" prop="abnormaldes">
        <el-input placeholder="异常情况" v-model="dataForm.abnormaldes" clearable></el-input>
      </el-form-item>

      <el-form-item label="处理结果" prop="confirmStatus" style="margin-bottom:0;">
        <el-select
          placeholder="请选择处理状态"
          v-model="dataForm.confirmStatus"
          clearable
          @change="confirmStatusChange"
          style="width: 100%; padding-bottom: 10px;">
          <el-option label="查验有问题" value="1" checked="true"></el-option>
          <el-option label="查验无问题" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="dealType" v-if="isShow" style="margin-bottom:0;">
        <el-select
          placeholder="请选择处理结果"
          v-model="dataForm.dealType"
          clearable
          @change="selectChange"
          style="width: 100%; padding-bottom: 10px;float:left">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="处理意见"
          v-show="showFlag"
          maxlength="60"
          v-model="dataForm.dealDetail">
        </el-input>
        <div v-show="showFlag" style="text-align: right;">{{count}} / 60</div>
      </el-form-item>
      <div style="height:15px"></div>
      <el-form-item label="处理人">
        {{name}}
      </el-form-item>
      <el-form-item label="处理时间">
        {{new Date() | parseTime('{y}-{m}-{d}')}}
      </el-form-item>
    </el-form>


    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // api
  import { update } from '@/api/storageWarning'
  // utils
  import { parseTime } from '@/utils'
  // vuex
  import { mapGetters } from 'vuex'

  export default {
    name: 'warning-handle',
    data() {
      return {
        isShow: false,
        detailTypeOptions: [],
        dataForm: {
          recordNum: '',
          dealRecordNo: '',
          recordType: '',
          manager: '',
          carrier: '',
          abnormaldes: '',
          dealType: '',
          dealDetail: '',
          id: '',
          confirmStatus: ''
        },
        rules: {
//          abnormaldes: [
//            {required: true, message: '请输入处理情况', trigger: 'blur'}
//          ],
          dealType: [
            {required: true, message: '请选择处理结果', trigger: 'change'}
          ],
          confirmStatus: [
            {required: true, message: '请选择处理状态', trigger: 'change'}
          ],
          dealDetail: [
            {required: true, message: '请输入处理意见', trigger: 'blur'}
          ]
        },
        showFlag: false,
        visible: false
      }
    },
    computed: {
      options(){
        return this.detailTypeOptions
      },
      count() {
        return this.dataForm.dealDetail.length
      },
      ...mapGetters([
        'currentId',
        'name'
      ])
    },
    methods: {
      init() {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.dealRecordNo = this.currentId.dealRecordNo
          this.dataForm.id = this.currentId.id
          this.dataForm.ids = this.currentId.id
          this.dataForm.recordSource = this.currentId.recordSource
        })
      },
      confirmStatusChange(val){
        this.isShow = true
        this.$nextTick(() => {
          this.dataForm.dealType = ''
        })
        if (val === '1') {
          this.detailTypeOptions = [
            {label: '补税放行', value: '1'},
            {label: '补证放行', value: '2'},
            {label: '退运', value: '3'},
            {label: '移送缉私', value: '4'},
            {label: '补证补税放行', value: '5'},
            {label: '处罚后放行', value: '6'},
            {label: '没收', value: '7'},
            {label: '移交法规', value: '8'},
            {label: '改单放行', value: '9'},
            {label: '删单', value: '10'}
          ]
        } else {
          this.detailTypeOptions = [
            {label: '正常放行', value: '11'},
            {label: '其他', value: '12'}
          ]
        }
      },
      selectChange(val) {
        if (val === '9') {
          this.showFlag = true
        } else {
          this.showFlag = false
        }
      },
      submitForm() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            update(this.dataForm).then((res) => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.visible = false
              this.$emit('refresh')
            })
          } else {
            return false
          }
        })
      },
      close() {
        this.visible = false
        this.$refs['dataForm'].resetFields()
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
