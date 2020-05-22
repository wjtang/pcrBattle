<template>
  <el-dialog
    title="审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="400px">
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
      <el-button @click="close">关 闭</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // api
  import { auditRes, submitStatistics } from '@/api/statistics'
  // vuex
  import { mapGetters } from 'vuex'

  // 监管科 confirm
  // 区 auditing
  // 市 review
  // 送审 send

  export default {
    name: 'cost-audit',
    props: {
      type: String
    },
    data() {
      return {
        visible: false,
        dataForm: {
          auditRemark: ''
        }
      }
    },
    computed: {
      count() {
        return this.dataForm.auditRemark.length
      },
      selected() {
        return this.currentId && this.currentId.readyIds
      },
      ...mapGetters([
        'currentId'
      ])
    },
    created() {
      console.log(this.type)
    },
    methods: {
      init() {
        console.log(this.currentId)
        if (!this.selected && this.type !== 'send') {
          this.$message('请先选择一条')
        } else {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }
      },
      submitForm() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.type !== 'send') {
              this._auditRes()
            } else {
              this._submitStatistics()
            }
          } else {
            return false
          }
        })
      },
      close() {
        this.visible = false
        this.$refs['dataForm'].resetFields()
      },
      _auditRes() {
        const params = Object.assign({}, this.currentId, { auditRemark: this.dataForm.auditRemark })
        console.log(params)
        auditRes(params).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('refresh')
        })
      },
      _submitStatistics() {
        const params = Object.assign({}, this.currentId, { auditRemark: this.dataForm.auditRemark })
        console.log(params)
        submitStatistics(params).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('refresh')
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
