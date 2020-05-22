<template>
  <el-dialog
    title="集装箱最新动态"
    :close-on-click-modal="false"
    width="840px"
    @open="handleOpen"
    @close="handleClose"
    :visible.sync="visible">

    <el-table
      :key="tableKey"
      :data="tableData"
      v-loading="loading"
      element-loading-text="正在加载..."
      style="width: 100%;">

      <el-table-column label="港口" property="portCode" width="120">
        <template slot-scope="scope">
          {{scope.row.portCode | portCodeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="集装箱号" property="containerId" width="150"/>
      <el-table-column label="进/出口标记" property="ieFlag" width="100">
        <template slot-scope="scope">
          {{scope.row.ieFlag | ieFlagFilter}}
        </template>
      </el-table-column>
      <el-table-column label="集装箱位置" property="location">
        <template slot-scope="scope">
          {{scope.row.location | locationFilter}}
        </template>
      </el-table-column>
      <el-table-column label="集装箱作业类型" property="activityType" width="120">
        <template slot-scope="scope">
          {{scope.row.activityType | activityTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="放行时间" property="releaseTimeDesc" width="90"/>
      <el-table-column label="作业时间" property="activityDateDesc" width="90"/>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <a
            @click="view({id:scope.row.id, beginTime:scope.row.activityDateDesc, endTime:scope.row.activityDateDesc})">明细</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix">
      <div class="pagination-container fl">
        <el-radio-group v-model="dataForm.dataType" @change="handleChange">
          <el-radio-button label="1">一年</el-radio-button>
          <el-radio-button label="0">全部</el-radio-button>
        </el-radio-group>
      </div>
      <div class="pagination-container align-right fr" v-show="tableData.length > 0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="dataForm.pageNum"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      width="740px"
      title="明细"
      :visible.sync="innerVisible"
      append-to-body>
      <el-scrollbar :native="false" wrap-class="scroll-list">
        <div class="app-container" style="overflow-y: hidden">
          <div class="block">
            <el-row :gutter="32">
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱号</div>
                <div class="detail">{{result.containerId}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱尺寸</div>
                <div class="detail">{{result.sizeId}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱类型</div>
                <div class="detail">{{result.type}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">箱主代码</div>
                <div class="detail">{{result.owner}}</div>
              </el-col>
            </el-row>
            <divider></divider>
          </div>
          <div class="block">
            <el-row :gutter="32">
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">船公司编号</div>
                <div class="detail">{{result.lineCode}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">船舶编号</div>
                <div class="detail">{{result.vesselCode}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">航次编号</div>
                <div class="detail">{{result.voyageCode}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">进/出口标记</div>
                <div class="detail">{{result.ieFlag | ieFlagFilter}}</div>
              </el-col>
            </el-row>
            <divider></divider>
          </div>
          <div class="block">
            <el-row :gutter="32">
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">提单号</div>
                <div class="detail">{{result.blNo}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">重吉标记</div>
                <div class="detail">{{result.leFlag | leFlagFilter}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">扣留标记</div>
                <div class="detail">{{result.holdFlag | holdFlagFilter}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱位置</div>
                <div class="detail">{{result.location | locationFilter}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">卸货港</div>
                <div class="detail">{{result.pod}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">装货港</div>
                <div class="detail">{{result.pol}}</div>
              </el-col>
            </el-row>
            <divider></divider>
          </div>
          <div class="block">
            <el-row :gutter="32">
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱作业类型</div>
                <div class="detail">{{result.activityType | activityTypeFilter}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱作业时间</div>
                <div class="detail">{{result.activityDateDesc}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">拖车号</div>
                <div class="detail">{{result.tractorId}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">备注</div>
                <div class="detail">{{result.remark}}</div>
              </el-col>
              <!--<el-col :sm="12" :md="12" class="base-detail">-->
              <!--<div class="term">voyContStatus</div>-->
              <!--<div class="detail">{{result.voyContStatus}}</div>-->
              <!--</el-col>-->
            </el-row>
            <divider></divider>
          </div>
          <div class="block">
            <el-row :gutter="32">
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">大船公司</div>
                <div class="detail">{{result.oceanLiner}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">大船公司名称</div>
                <div class="detail">{{result.oceanLinerName}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱堆场位置/仓位</div>
                <div class="detail">{{result.yardCode}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">损毁代码</div>
                <div class="detail">{{result.damageCode}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">集装箱状态</div>
                <div class="detail">{{result.containerStatus | containerStatusFilter}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">封条号</div>
                <div class="detail">{{result.sealNo}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">船舶中文名称</div>
                <div class="detail">{{result.vesselNameCn}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">船舶英文名称</div>
                <div class="detail">{{result.vesselNameEn}}</div>
              </el-col>
              <el-col :sm="12" :md="12" class="base-detail">
                <div class="term">毛重</div>
                <div class="detail">{{result.grossWet}}</div>
              </el-col>
            </el-row>
            <divider style="margin-bottom: 0;"></divider>
          </div>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script>
  // api
  import { fetchList, fetchDetail } from '@/api/portCont'
  // utils
  import { getLately } from '@/utils'
  // vuex
  import { mapGetters } from 'vuex'
  // components
  import Divider from '@/components/Divider'

  // 一年
  const time = getLately(365)

  export default {
    name: 'cont-detail-dialog',
    data() {
      return {
        tableKey: 0,
        tableData: [],
        loading: false,
        dataForm: {
          dataType: '1',
          id: '',
          contNo: '',
          beginTime: time[0],
          endTime: time[1],
          pageNum: 1,
          pageSize: 5
        },
        total: 0,
        result: {},
        visible: false,
        innerVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'currentId'
      ])
    },
    methods: {
      init() {
        this.visible = true
        this.dataForm.containerId = this.currentId
      },
      handleOpen() {
        this._fetchList()
      },
      handleClose() {
        this.dataForm.dataType = '1'
      },
      _fetchList() {
        this.loading = true
        this.tableData = []
        fetchList(this.dataForm).then((res) => {
          this.tableData = res.data.data.dataList
          this.total = res.data.data.total
          this.loading = false
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.dataForm.pageSize = val
        this._fetchList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.dataForm.pageNum = val
        this._fetchList()
      },
      view({ id, beginTime, endTime }) {
        fetchDetail({ id, beginTime, endTime }).then((res) => {
          this.result = res.data.data
          this.innerVisible = true
        })
      },
      handleChange(val) {
        this.dataForm.pageNum = 1
        if (val === '1') {
          this.dataForm.beginTime = time[0]
          this.dataForm.endTime = time[1]
          this._fetchList()
        } else {
          this.dataForm.beginTime = ''
          this.dataForm.endTime = ''
          this._fetchList()
        }
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
