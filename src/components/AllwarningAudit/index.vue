<template>
  <el-dialog
    title="批量审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="480px">
    <el-form
      :model="dataForm"
      label-position="right"
      label-width="100px">

      <!--<el-form-item label="处理情况：">-->
        <!--<el-tag :type="tagType(dataForm.dealStatus)">{{dataForm.dealStatus | dealStatusFilter}}</el-tag>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="序列号：">-->
        <!--{{dataForm.recordNum}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="集装箱号：">-->
        <!--{{dataForm.dealRecordNo}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="类型：">-->
        <!--{{dataForm.recordType}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="营运人：">-->
        <!--{{dataForm.manager}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="承运人：">-->
        <!--{{dataForm.carrier}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="异常情况：">-->
        <!--{{dataForm.abnormaldes}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="处理状态：">-->
        <!--{{dataForm.dealStatus | dealStatusFilter}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="处理结果：">-->
        <!--{{dataForm.dealType | dealTypeFilter}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="处理人：">-->
        <!--{{dataForm.operatorName}}-->
      <!--</el-form-item>-->
      <!--<el-form-item label="处理时间：">-->
        <!--{{dataForm.dealTimeDesc}}-->
      <!--</el-form-item>-->
      <el-form-item label="审核备注：" prop="auditRemark">
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
      <el-button type="danger" @click="handleReject(4)">审核不过</el-button>
      <el-button type="primary" @click="handleResolve(3)">审核通过</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // api
  import { audit } from '@/api/storageWarning'

  export default {
    name: 'allwarning-audit',
    data() {
      return {
        visible: false,
        dataForm: {
          ids: '',
          recordSource: '',
          dealStatus: '',
          auditRemark: ''
        }
      }
    },
    computed: {
      count() {
        return this.dataForm.auditRemark.length
      }
    },
    methods: {
      init(ids, source) {
        this.dataForm.ids = ids.join(',')
        this.dataForm.recordSource = source
        this.visible = true
      },
      handleResolve(dealStatus) {
        const data = Object.assign({}, this.dataForm, { dealStatus })
        this._audit(data)
      },
      handleReject(dealStatus) {
        const data = Object.assign({}, this.dataForm, { dealStatus })
        this._audit(data)
      },
      _audit(params) {
        console.log(params);
        audit(params).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('refresh')
        })
      },
      tagType(val) {
        const map = {
          1: 'warning ',
          2: 'warning',
          3: 'success',
          4: 'danger',
        }

        return map[val]
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
