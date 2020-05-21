<template>
  <el-dialog
    :title="`送审 - ${dataForm.month}`"
    :close-on-click-modal="false"
    width="1000px"
    class="collisionDialog"
    :visible.sync="visible">

    <div class="steps-wrapper">
      <el-steps :active="active" finish-status="success">
        <el-step title="码头操作确认"></el-step>
        <!--<el-step title="送审记录确认"></el-step>-->
        <el-step title="送审"></el-step>
      </el-steps>
    </div>

    <!--送审记录确认-->
    <div v-if="active === 0">
      <el-form
        ref="searchForm"
        inline
        size="mini"
        :model="searchForm"
        label-width="110px">
        <el-form-item label="" prop="declNo">
          <el-input
            placeholder="输入报关单号"
            clearable=""
            v-model="searchForm.declNo"
            style="width: 150px;"/>
        </el-form-item>

        <el-form-item label="" prop="contSize">
          <el-select
            clearable
            placeholder="选择集装箱尺寸"
            v-model="searchForm.contSize"
            style="width: 150px;">
            <el-option
              v-for="item in sizeIds"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="actType">
          <!--20尺寸-->
          <el-select
            clearable
            placeholder="选择码头作业类型"
            v-model="searchForm.actType"
            v-if="searchForm.contSize === '20'"
            style="width: 150px;">

            <el-option
              v-for="item in twentyCostOptions"
              :key="item.id"
              :label="`${item.actType}-${item.name}`"
              :value="item.actType">
              <span class="fl">{{item.actType}}-{{item.name}}</span>
              <span class="fr" style="color: #8492a6; font-size: 13px">￥{{item.twentyCost}}</span>
            </el-option>
          </el-select>
          <!--40尺寸-->
          <el-select
            clearable
            placeholder="码头作业类型"
            v-model="searchForm.actType"
            v-else
            style="width: 150px;">

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
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="_batchConfirm">一键确认</el-button>
        </el-form-item>
      </el-form>

      <el-tag style="margin-bottom: 8px;">
        待确认 <a class="a-link" @click="screen(1)">{{validityCount.unValidityCount}}</a> 条，
        确认失效 <a class="a-link" @click="screen(2)">{{validityCount.isNotValidityCount}}</a> 条，
        已确认 <a class="a-link" @click="screen(3)">{{validityCount.isValidityCount}}</a> 条，
        已删除 <a class="a-link" @click="screen(4)">{{validityCount.isDelCount}}</a> 条
      </el-tag>

      <el-table
        :key="0"
        :data="readiesTableData"
        v-loading="readiesLoading"
        element-loading-text="给我一点时间"
        :row-class-name="tableRowClassName"
        @sort-change="sortChange"
        style="width: 100%;">
        <el-table-column label="报关单号" prop="declNo" width="150"/>
        <el-table-column label="查验来源" prop="checkSource">
          <template slot-scope="scope">
            {{scope.row.checkSource | typeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="提运单号" prop="blNo" width="130"/>
        <el-table-column label="集装箱号" prop="contNo" sortable="custom" width="120"/>
        <el-table-column label="查验时间" prop="checkTime" sortable="custom" width="90"/>
        <el-table-column label="码头作业时间" prop="readyTime" width="90"/>
        <el-table-column label="进/出口标记" prop="ieFlag" width="90">
          <template slot-scope="scope">
            {{scope.row.ieFlag | ieFlagFilter}}
          </template>
        </el-table-column>
        <el-table-column label="申报口岸" prop="declPort" width="120">
          <template slot-scope="scope">
            {{scope.row.declPort | portCodeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="查验方式" prop="checkType">
          <template slot-scope="scope">
            {{scope.row.checkType | checkTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="集装箱位置" prop="location"/>
        <el-table-column label="操作联系人" prop="contact"/>
        <el-table-column label="操作联系人电话" prop="contactTel" width="120"/>
        <el-table-column label="状态" prop="isValidity" fixed="right" width="90">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row.isValidity)">{{scope.row.isValidity | isValidityFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="集装箱尺寸" prop="contSize" fixed="right" width="90">
          <template slot-scope="scope">

            <el-select
              clearable
              placeholder="集装箱尺寸"
              :disabled="(scope.row.isValidity === 2 || scope.row.isValidity === 4) ? true :(scope.row.trigger ?  false : triggerSelect)"
              @change="scope.row.trigger = true;scope.row.trigger === true ? false : true;rowIndex=scope.$index;triggerSelect = true"
              v-model="scope.row.contSize"
              style="width: 100%;">

              <el-option label="20" value="20"></el-option>
              <el-option label="40" value="40"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="码头作业类型" prop="actType" width="200" fixed="right">
          <template slot-scope="scope">
            <!--20寸费用-->
            <el-select
              clearable
              placeholder="码头作业类型"
              :disabled="(scope.row.isValidity === 2 || scope.row.isValidity === 4) ? true :(scope.row.trigger ?  false : triggerSelect)"
              @change="scope.row.trigger = true;scope.row.trigger === true ? false : true;rowIndex=scope.$index;triggerSelect = true"
              v-model="scope.row.actType"
              v-if="scope.row.contSize === '20GP'"
              style="width: 100%;">

              <el-option
                v-for="(item, index) in twentyCostOptions"
                :key="item.id"
                :label="`${item.actType}-${item.name}`"
                :value="item.actType">
                <span class="fl">{{item.actType}}-{{item.name}}</span>
                <span class="fr" style="color: #8492a6; font-size: 13px">￥{{item.twentyCost}}</span>
              </el-option>
            </el-select>

            <!--40寸费用-->
            <el-select
              clearable
              placeholder="码头作业类型"
              :disabled="(scope.row.isValidity === 2 || scope.row.isValidity === 4) ? true :(scope.row.trigger ?  false : triggerSelect)"
              @change="scope.row.trigger = true;scope.row.trigger === true ? false : true;rowIndex=scope.$index;triggerSelect = true"
              v-model="scope.row.actType"
              v-else
              style="width: 100%;">

              <el-option
                v-for="(item, index) in fortyCostOptions"
                :key="item.id"
                :label="`${item.actType}-${item.name}`"
                :value="item.actType">
                <span class="fl">{{item.actType}}-{{item.name}}</span>
                <span class="fr" style="color: #8492a6; font-size: 13px">￥{{item.fortyCost}}</span>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <template>

              <el-button
                size="mini"
                type="primary"
                :disabled="triggerSelect"
                v-if="!scope.row.trigger && scope.row.isValidity === 1"
                @click="effective({id:scope.row.id,actType:scope.row.actType,contSize:scope.row.contSize},scope.row.trigger);">
                确认
              </el-button>

              <el-button
                :ref="`item${scope.row.id}`"
                size="mini"
                type="primary"
                :disabled=!scope.row.trigger
                v-if="scope.row.isValidity !== 1 && scope.row.isValidity !== 4"
                @click="effective({id:scope.row.id,actType:scope.row.actType,contSize:scope.row.contSize},scope.row.trigger);scope.row.trigger=false">
                {{btnText(scope.row.isValidity)}}
              </el-button>

              <el-button
                :ref="`item${scope.row.id}`"
                size="mini"
                type="primary"
                :disabled="!scope.row.trigger"
                v-if="scope.row.isValidity === 1 && scope.row.trigger"
                @click="effective({id:scope.row.id,actType:scope.row.actType,contSize:scope.row.contSize},scope.row.trigger);scope.row.trigger=false">
                {{btnText(scope.row.isValidity)}}
              </el-button>

              <el-button
                :ref="`item${scope.row.id}`"
                size="mini"
                plain
                :disabled=!scope.row.trigger
                v-if="scope.row.trigger"
                @click="cancelEdit()">
                取消
              </el-button>

              <el-button
                :ref="`item${scope.row.id}`"
                size="mini"
                plain
                v-if="!scope.row.trigger"
                @click="reject({id:scope.row.id, isValidity:scope.row.isValidity === 4 ? 3 : 4})"
                :type="scope.row.isValidity === 4 ? 'success' : 'danger'">
                {{scope.row.isValidity === 4 ? '恢复' : '删除'}}
              </el-button>

            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container align-right" v-show="readiesTableData.length > 0">
        <el-pagination
          background
          @current-change="handleCurrentChangeReadies"
          :current-page="pageNumReadies"
          :page-size="pageSizeReadies"
          layout="total, prev, pager, next"
          :total="totalReadies">
        </el-pagination>
      </div>
    </div>

    <!--送审-->
    <div v-if="active === 3">
      <div class="result">
        <i class="el-icon-circle-check"></i>
        <p>送审成功</p>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <template v-if="active === 0">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">送审</el-button>
      </template>
      <template v-if="active === 3">
        <el-button type="primary" @click="visible = false">完成</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
  // api
  import {
    updateStatisticsDetail,
    getReadiesByStatistic,
    submitStatistics,
    batchConfirm,
    getValidityCount
  } from '@/api/statistics'
  import { getAll } from '@/api/costSubsidies'
  import { updateOrderReady } from '@/api/chkOrder'
  // utils
  import { sizeIds } from '@/utils/selecterOptions'
  // components
  import Divider from '@/components/Divider'

  export default {
    name: 'report-dialog',
    props: {
      isFee: Number
    },
    data() {
      return {
        rowIndex: -1,
        triggerSelect: false,
        visible: false,
        readiesTableData: [],
        readiesLoading: false,
        dataForm: {
          month: '',
          portId: '',
          statisticsId: ''
        },
        searchForm: {
          month: '',
          portId: '',
          statisticsId: '',
          declNo: '',
          checkTime: '',
          isValidity: null,
          contSize: null,
          actType: null
        },
        pageNumReadies: 1,
        pageSizeReadies: 5,
        totalReadies: 0,
        addIds: [],
        delIds: [],
        active: 0,
        sizeIds,
        twentyCostOptions: [],
        fortyCostOptions: [],
        validityCount: {}
      }
    },
    computed: {
      isOk() {
        return this.readiesTableData.some(item => item.isValidity === 1)
      }
    },
    created() {
      this._getAll()
    },
    methods: {
      sortChange({ column, prop, order }) {
        console.log(column, prop, order)
        if (prop === 'contNo') {
          order === 'descending' ? this.searchForm.contNo = 'desc' : this.searchForm.contNo = 'asc'
        }
        if (prop === 'checkTime') {
          order === 'descending' ? this.searchForm.checkTime = 'desc' : this.searchForm.checkTime = 'asc'
        }
        this._readiesList()
      },
      cancelEdit() {
        this.$nextTick(() => {
          this._readiesList()
          this.rowIndex = -1
          this.triggerSelect = false
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === this.rowIndex) {
          return 'success-row';
        }
        return '';
      },
      btnText(val) {
        const map = {
          1: '保存修改',
          2: '暂无操作',
          3: '保存并确认'
        }
        return map[val]
      },
      init({ month, portId, statisticsId }) {
        this.rowIndex = -1
        this.triggerSelect = false
        this.dataForm = { month, portId, statisticsId }
        console.log(this.dataForm)
        this.searchForm = Object.assign({}, this.searchForm, { month, portId, statisticsId })
        this.active = 0
        this.visible = true
        this._readiesList()
        this._getValidityCount()
      },
      prev() {
        this.active = 0
      },
      next() {
        if (this.isOk) {
          this.$message({
            message: '您有未确认的操作，请先确认后然后进入下一步',
            type: 'warning'
          })
        } else {
          this.active = 1
        }
      },
      submit() {
        console.log(this.isOk)
        if (this.isOk) {
          this.$message({
            message: '您有未确认的操作，请先确认后然后进入下一步',
            type: 'warning'
          })
          return false
        }
        submitStatistics({ statisticsId: this.dataForm.statisticsId }).then((res) => {
          if (res.data.data) {
            this.active = 3
            this._readiesList()
            this.$emit('refresh')
          } else {
            this.$message({
              message: '暂无统计操作',
              type: 'warning'
            })
          }
        })
      },
      effective({ id, actType, contSize }, trigger) {
        if ((actType === '')) {
          this.$message({
            message: '至少选择一个码头操作',
            type: 'warning',
            duration: 1500
          })
          return false
        }
        this.triggerSelect = false
        updateOrderReady({ id, actType, contSize, isValidity: 3 }).then((res) => {
          this.rowIndex = -1
          this.triggerSelect = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this._readiesList()
            }
          })
        }).catch((e) => {
          this.rowIndex = -1
          this.triggerSelect = false
        })
      },
      reject({ id, isValidity }) {
        updateOrderReady({ id, isValidity }).then((res) => {
          this.rowIndex = -1
          this.triggerSelect = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this._readiesList()
            }
          })
        }).catch((e) => {
          this.rowIndex = -1
          this.triggerSelect = false
        })
      },
      handleSearch() {
        this.pageNumReadies = 1
        this._readiesList()
      },
      _batchConfirm() {
        batchConfirm({ statisticsId: this.dataForm.statisticsId }).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this._readiesList()
            }
          })
        })
      },
      tagType(val) {
        const map = {
          1: 'info',
          2: 'warning',
          3: 'success',
          4: 'danger'
        }
        return map[val]
      },
      _getAll() {
        getAll({ isFee: this.isFee }).then((res) => {
          this.twentyCostOptions = this.fortyCostOptions = res.data.data
        })
      },
      _getValidityCount() {
        getValidityCount({ statisticsId: this.dataForm.statisticsId }).then((res) => {
          this.validityCount = res.data.data
        })
      },
      _getList(params) {
        return getReadiesByStatistic(params)
      },
      _readiesList() {
        this.readiesLoading = true
        const params = Object.assign({}, this.searchForm, { pageNum: this.pageNumReadies, pageSize: this.pageSizeReadies })
        this._getList(params).then((res) => {
          this.readiesTableData = res.data.data.dataList
          this.totalReadies = res.data.data.total
          this.readiesLoading = false
        })
      },
      handleCurrentChangeReadies(val) {
        this.pageNumReadies = val
        this._readiesList()
      },
      changeSwitch(val) {
        switch (parseInt(val.isValidity)) {
          case 3:
            this.addIds.push(val.id)
            this.addIds = [...new Set(this.addIds)]
            break
          case 4:
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
        console.log('新增：' + this.addIds)
        console.log('删除：' + this.delIds)
        const params = Object.assign({}, this.dataForm, {
          delIds: this.delIds.join(','),
          addIds: this.addIds.join(',')
        })
        updateStatisticsDetail(params).then((res) => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      },
      screen(status) {
        this.pageNumReadies = 1
        this.searchForm.isValidity = status
        this._readiesList()
      },
      _popup() {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.visible = false
        this.$emit('refresh')
      },
    },
    components: {
      Divider
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .a-link {
    text-decoration: underline;
    font-weight: 700;
    font-size: 14px;
  }

  .steps-wrapper {
    padding: 0 32px 8px;
  }

  .result {
    padding: 32px 0 0;
    text-align: center;
    color: #333;
    font-size: 28px;
    .el-icon-circle-check {
      font-size: 100px;
      color: #67C23A;
    }
  }

  .collisionDialog /deep/ {
    .el-table {
      .el-button + .el-button {
        margin-left: 3px;
      }
      button {
        padding: 6px 6px;
      }
      .success-row {
        background-color: #67C23A !important;
        color: #fff !important;
        .el-tag {
          background: #fff !important;
        }
        button {
          /*color: #fff !important;*/
        }
        &.hover-row, &.hover-row td {
          background: #67C23A !important;
        }
        .el-tag--success {
          background: #fff !important;
        }
      }

    }
  }
</style>

