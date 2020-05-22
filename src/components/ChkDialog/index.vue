<template>
  <el-dialog
    title="查验准备录入"
    :close-on-click-modal="false"
    width="900px"
    :visible.sync="visible">
    <div class="btn-wrapper">
      <el-button icon="el-icon-edit" type="primary" @click="handleAdd">新建</el-button>
    </div>

    <el-table
      :key="0"
      :data="tableData"
      v-loading="loading"
      element-loading-text="给我一点时间"
      style="width: 100%;">

      <el-table-column label="货主单位代码" property="ownerName" width="150"/>
      <el-table-column label="码头作业类型" property="actType" width="120">
        <template slot-scope="scope">
          {{scope.row.actType | chkReadyFilter}}
        </template>
      </el-table-column>
      <el-table-column label="补贴金额" property="costFee" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.costFee">￥</span>{{scope.row.costFee}}
        </template>
      </el-table-column>
      <el-table-column label="码头作业时间" property="actTimeDesc" width="90"/>
      <el-table-column label="集装箱位置" property="actLocation" width="130">
        <template slot-scope="scope">
          {{scope.row.actLocation | locationFilter}}
        </template>
      </el-table-column>
      <el-table-column label="报关单号" property="declNo" width="150"/>
      <el-table-column label="提运单号" property="blNo" width="130"/>
      <el-table-column label="集装箱号" property="contNo" width="100"/>
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
      <el-table-column label="查验来源" property="checkSource">
        <template slot-scope="scope">
          {{scope.row.checkSource | typeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="查验方式" property="checkType">
        <template slot-scope="scope">
          {{(scope.row.checkType && scope.row.checkType.charAt(0)) | checkTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="查验时间" property="checkTimeDesc" width="90"/>
      <el-table-column label="操作联系人" property="actContact"/>
      <el-table-column label="操作联系人电话" property="actContactTel" width="120"/>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <a @click="handleUpdate(scope.row.id)">编辑</a>
          <divider type="vertical"></divider>
          <a @click="handleDel(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="innerVisible"
      append-to-body
      width="500px">

      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="rules"
        label-position="left"
        label-width="130px">

        <input type="hidden" v-model="dataForm.id">

        <el-form-item label="报关单号">{{declNo}}</el-form-item>
        <el-form-item label="集装箱号">{{contNo}}</el-form-item>
        <el-form-item label="查验时间">{{checkTime}}</el-form-item>
        <el-form-item label="货主单位名称" prop="ownerName">
          <el-input placeholder="货主单位名称" v-model="dataForm.ownerName" clearable></el-input>
        </el-form-item>
        <el-form-item label="集装箱尺寸" prop="contSize">
          <el-select filterable clearable placeholder="请选择集装箱尺寸" v-model="dataForm.contSize" style="width: 100%;">
            <el-option
              v-for="item in sizeIds"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="码头作业类型" prop="actType" v-if="dataForm.contSize === '20'">
          <el-select
            clearable
            placeholder="码头作业类型"
            value-key="actType"
            v-model="dataForm.actType"
            style="width: 100%;">

            <el-option
              v-for="item in twentyCostOptions"
              :key="item.id"
              :label="`${item.actType}-${item.name}`"
              :value="item.actType">
              <span class="fl">{{item.actType}}-{{item.name}}</span>
              <span class="fr" style="color: #8492a6; font-size: 13px">￥{{item.twentyCost}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="码头作业类型" prop="actType" v-else>
          <el-select
            clearable
            placeholder="码头作业类型"
            value-key="actType"
            v-model="dataForm.actType"
            style="width: 100%;">

            <el-option
              v-for="item in fortyCostOptions"
              :key="item.id"
              :label="`${item.actType}-${item.name}`"
              :value="item.actType">
              <span class="fl">{{item.actType}}-{{item.name}}</span>
              <span class="fr" style="color: #8492a6; font-size: 13px">￥{{item.fortyCost}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="码头作业时间" prop="actTime">
          <el-date-picker
            v-model="actTime"
            type="datetime"
            placeholder="选择码头作业时间"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            style="width: 100%;height: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="集装箱位置" prop="actLocation">
          <el-select clearable placeholder="请选择集装箱位置" v-model="dataForm.actLocation" style="width: 100%;">
            <el-option
              v-for="item in locations"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作联系人" prop="actContact">
          <el-input placeholder="操作联系人" v-model="dataForm.actContact" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作联系人电话" prop="actContactTel">
          <el-input placeholder="操作联系人电话" v-model="dataForm.actContactTel" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
        <el-button type="primary" @click.stop.prevent="submitForm">确定</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script>
  // api
  import { getReadies, getReadieDetail, addOrderReady, delOrderReady, updateOrderReady, getOwner } from '@/api/chkOrder'
  import { getAll } from '@/api/costSubsidies'
  // utils
  import { locations, sizeIds } from '@/utils/selecterOptions'
  import { validatePhone } from '@/utils/validate'
  // vuex
  import { mapGetters } from 'vuex'
  // components
  import Divider from '@/components/Divider'

  const defaultForm = {
    id: '',
    ownerName: '',
    contSize: '',
    actType: '',
    actTime: '',
    actLocation: '',
    actContact: '',
    actContactTel: ''
  }

  export default {
    name: 'chk-dialog',
    props: {
      isFee: Number
    },
    data() {
      const checkPhone = (rule, value, callback) => {
        if (value) {
          setTimeout(() => {
            if (!validatePhone(value)) {
              callback(new Error('请输入正确的手机号码'))
            } else {
              callback()
            }
          }, 250);
          // return callback(new Error('必填'))
        } else {
          callback()
        }
      }

      return {
        tableData: [],
        loading: false,
        dataForm: {
          id: '',
          ownerName: '',
          contSize: '',
          actType: '',
          actLocation: '',
          actContact: '',
          actContactTel: ''
        },
        actTime: '',
        rules: {
          contSize: [
            { required: true, message: '必填', trigger: 'change' }
          ],
          actType: [
            { required: true, message: '必填', trigger: 'change' }
          ],
          actContactTel: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        },

        blNo: '',
        ieFlag: '',
        declPort: '',
        checkSource: '',
        checkType: '',
        declNo: '',
        contNo: '',
        checkTime: '',

        locations: locations,
        sizeIds: sizeIds,
        costOptions: [],
        twentyCostOptions: [],
        fortyCostOptions: [],
        visible: false,
        innerVisible: false
      }
    },
    computed: {
      title() {
        return this.dataForm.id ? '编辑' : '新增'
      }
    },
    methods: {
      init(data) {
        console.log(data)
        console.log(data.checkType)
        this.blNo = data.blNo
        this.ieFlag = data.ieFlag
        this.declPort = data.declPort
        this.checkSource = data.checkSource
        this.checkType = data.checkType

        this.declNo = data.declNo
        this.contNo = data.contNo
        this.checkTime = data.checkTime
        // if (data.contSize === '' && data.ownerName === '') {
        //   this._getOwner()
        // }
        this._getReadies()
        this._getAll()
      },
      _getReadies() {
        this.loading = true
        getReadies({
          declNo: this.declNo,
          contNo: this.contNo,
          checkTime: this.checkTime
        }).then((res) => {
          this.tableData = res.data.data
          this.visible = true
          this.loading = false
        })
      },
      _getOwner() {
        getOwner({ declNo: this.declNo, contNo: this.contNo }).then((res) => {
          this.dataForm.ownerName = res.data.data.ownerName
        })
      },
      _getAll() {
        getAll({ isFee: this.isFee }).then((res) => {
          this.costOptions = this.twentyCostOptions = this.fortyCostOptions = res.data.data
        })
      },
      handleAdd() {
        this.innerVisible = true
        this.actTime = ''
        getReadies({
          declNo: this.declNo,
          contNo: this.contNo,
          checkTime: this.checkTime
        }).then((res) => {
          this.dataForm.ownerName = res.data.data[0].ownerName
          this.dataForm.contSize = res.data.data[0].contSize
          this.dataForm.actLocation = res.data.data[0].actLocation
          this.dataForm.actContact = res.data.data[0].actContact
          this.dataForm.actContactTel = res.data.data[0].actContactTel
        })
      },
      handleDel(id) {
        this.$confirm(`确定删除所选项?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOrderReady({ ids: id }).then((res) => {
            this._innerPopup()
          })
        }).catch(() => {
        })
      },
      handleUpdate(id) {
        getReadieDetail({ id }).then((res) => {
          const { id, contSize, actType, actLocation, actContact, actContactTel, ownerName, actTimeDesc } = res.data.data
          this.dataForm = { id, contSize, actType, actLocation, actContact, actContactTel, ownerName }
          this.actTime = actTimeDesc
          this.innerVisible = true
        })
      },
      close() {
        // 重置id
        this.dataForm.id = ''
        this.dataForm.contSize = ''
        this.$refs['dataForm'].resetFields()
        this.innerVisible = false
      },
      submitForm() {
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            if (!this.dataForm.id) {
              // add...
              const data = Object.assign({}, this.dataForm, {
                blNo: this.blNo,
                ieFlag: this.ieFlag,
                declPort: this.declPort,
                checkSource: this.checkSource,
                checkType: this.checkType,
                declNo: this.declNo,
                contNo: this.contNo,
                checkTime: this.checkTime,
                actTime: this.actTime
              })
              addOrderReady(data).then((res) => {
                this._innerPopup()
              })
            } else {
              // update...
              const data = Object.assign({}, this.dataForm, {
                actTime: this.actTime
              })
              updateOrderReady(data).then((res) => {
                this._innerPopup()
              })
            }
          } else {
            return false
          }
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
      _innerPopup() {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.innerVisible = false
        this._getReadies()
      },
    },
    components: {
      Divider
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
