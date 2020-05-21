<template>
  <el-dialog
    :title="title"
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

      <el-table-column label="集装箱号/提单号" property="recordNo" width="150">
        <template slot-scope="scope">
          <a @click="view(scope.row.recordNo,scope.row.blNo)">{{scope.row.recordNo}}</a>
        </template>
      </el-table-column>
      <el-table-column label="到港时间" property="actTime" width="90">
        <template slot-scope="scope">
          {{scope.row.actTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column label="箱主代码" property="owner" width="70"></el-table-column>
      <el-table-column label="进出口" property="ieFlag" width="100">
        <template slot-scope="scope">
          {{scope.row.ieFlag | ieFlagFilter}}
        </template>
      </el-table-column>
      <el-table-column label="重吉" property="leFlag" width="50">
        <template slot-scope="scope">
          {{scope.row.leFlag | leFlagFilter}}
        </template>
      </el-table-column>
      <el-table-column label="扣留标记" property="holdFlag" width="70">
        <template slot-scope="scope">
          {{scope.row.holdFlag | holdFlagFilter}}
        </template>
      </el-table-column>
      <el-table-column label="堆场代码" property="yardCode" width="110"></el-table-column>
      <el-table-column label="作业类型" property="actType" width="110">
        <template slot-scope="scope">
          {{scope.row.actType | activityTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="作业时间" property="actTime" width="90">
        <template slot-scope="scope">
          {{scope.row.actTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column label="集装箱尺寸" property="sizeId"></el-table-column>
      <el-table-column label="集装箱类型" property="contType"></el-table-column>
      <el-table-column label="港口" property="portCode" width="120">
        <template slot-scope="scope">
          {{scope.row.portCode | portCodeFilter}}
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix">
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
      title="综合查询"
      :visible.sync="innerVisible"
      append-to-body>
      <el-scrollbar :native="false" wrap-class="scroll-list">
        <div class="app-container" style="overflow-y: hidden">
          <el-tabs v-model="activeName">
            <el-tab-pane label="集装箱最新动态" name="first">
              <table class="multi-table el-table el-table--mini">
                <tr>
                  <td class="tit">集装箱号</td>
                  <td>{{containerList.containerId?containerList.containerId:'--'}}</td>
                  <td class="tit">集装箱尺寸</td>
                  <td>{{containerList.sizeId?containerList.sizeId:'--'}}</td>
                  <td class="tit">集装箱类型</td>
                  <td>{{containerList.type?containerList.type:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">箱主代码</td>
                  <td>{{containerList.owner?containerList.owner:'--'}}</td>
                  <td class="tit">船公司编号</td>
                  <td>{{containerList.lineCode?containerList.lineCode:'--'}}</td>
                  <td class="tit">船舶编号</td>
                  <td>{{containerList.vesselCode?containerList.vesselCode:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">航次编号</td>
                  <td>{{containerList.voyageCode?containerList.voyageCode:'--'}}</td>
                  <td class="tit">进/出口标记</td>
                  <td>{{containerList.ieFlag?containerList.ieFlag:'--'}}</td>
                  <td class="tit">提单号</td>
                  <td>{{containerList.blNo?containerList.blNo:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">重吉标记</td>
                  <td>{{containerList.leFlag?containerList.leFlag:'--'}}</td>
                  <td class="tit">扣留标记</td>
                  <td>{{containerList.holdFlag?containerList.holdFlag:'--'}}</td>
                  <td class="tit">集装箱位置</td>
                  <td>{{containerList.location?containerList.location:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">卸货港</td>
                  <td>{{containerList.pod?containerList.pod:'--'}}</td>
                  <td class="tit">装货港</td>
                  <td>{{containerList.pol?containerList.pol:'--'}}</td>
                  <td class="tit">集装箱作业类型</td>
                  <td>{{containerList.activityType?containerList.activityType:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">集装箱作业时间</td>
                  <td>{{containerList.activityDateDesc?containerList.activityDateDesc:'--'}}</td>
                  <td class="tit">拖车号</td>
                  <td>{{containerList.tractorId?containerList.tractorId:'--'}}</td>
                  <td class="tit">备注</td>
                  <td>{{containerList.remark?containerList.remark:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">大船公司</td>
                  <td>{{containerList.oceanLiner?containerList.oceanLiner:'--'}}</td>
                  <td class="tit">大船公司名称</td>
                  <td>{{containerList.oceanLinerName?containerList.oceanLinerName:'--'}}</td>
                  <td class="tit">集装箱堆场位置/仓位</td>
                  <td>{{containerList.yardCode?containerList.yardCode:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">损毁代码</td>
                  <td>{{containerList.damageCode?containerList.damageCode:'--'}}</td>
                  <td class="tit">集装箱状态</td>
                  <td>{{containerList.containerStatus?containerList.containerStatus:'--'}}</td>
                  <td class="tit">封条号</td>
                  <td>{{containerList.sealNo?containerList.sealNo:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">船舶中文名称</td>
                  <td>{{containerList.vesselNameCn?containerList.vesselNameCn:'--'}}</td>
                  <td class="tit">船舶英文名称</td>
                  <td>{{containerList.vesselNameEn?containerList.vesselNameEn:'--'}}</td>
                  <td class="tit">毛重</td>
                  <td>{{containerList.grossWet?containerList.grossWet:'--'}}</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="舱单信息" name="second">
              <table class="multi-table el-table el-table--mini">
                <tr>
                  <td class="tit">运输工具编号</td>
                  <td>{{mainfestList.transportId?mainfestList.transportId:'--'}}</td>
                  <td class="tit">航次号</td>
                  <td>{{mainfestList.voyageNo?mainfestList.voyageNo:'--'}}</td>
                  <td class="tit">运输方式</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">中文船名</td>
                  <td>{{mainfestList.transportName?mainfestList.transportName:'--'}}</td>
                  <td class="tit">船公司编号</td>
                  <td>--</td>
                  <td class="tit">英文船名</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">出港日期</td>
                  <td>{{mainfestList.ieDate?mainfestList.ieDate:'--'}}</td>
                  <td class="tit">申报日期</td>
                  <td>--</td>
                  <td class="tit">提单总数</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">空箱总数</td>
                  <td>--</td>
                  <td class="tit">集装箱总数</td>
                  <td>--</td>
                  <td class="tit">总重量</td>
                  <td>{{mainfestList.grossWt?mainfestList.grossWt:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">总件数</td>
                  <td>{{mainfestList.packNo?mainfestList.packNo:'--'}}</td>
                  <td class="tit">关区</td>
                  <td>{{mainfestList.customsCode?mainfestList.customsCode:'--'}}</td>
                  <td class="tit">第一起运港</td>
                  <td>{{mainfestList.firstPortId?mainfestList.firstPortId:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">第二起运港</td>
                  <td>--</td>
                  <td class="tit">第三起运港</td>
                  <td>--</td>
                  <td class="tit">第四起运港</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">船长姓名</td>
                  <td>--</td>
                  <td class="tit">船员姓名</td>
                  <td>--</td>
                  <td class="tit"></td>
                  <td>--</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="提单信息" name="third">
              <table class="multi-table el-table el-table--mini">
                <tr>
                  <td class="tit">提单号</td>
                  <td>{{billList.billNo?billList.billNo:'--'}}</td>
                  <td class="tit">发货单位</td>
                  <td>--</td>
                  <td class="tit">收货单位</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">起运港</td>
                  <td>--</td>
                  <td class="tit">抵运地</td>
                  <td>{{billList.destinationPort?billList.destinationPort:'--'}}</td>
                  <td class="tit">卸货地</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">货物名称</td>
                  <td>--</td>
                  <td class="tit">件数</td>
                  <td>--</td>
                  <td class="tit">包装种类</td>
                  <td>{{billList.wrapType?billList.wrapType:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">麦头/合同号</td>
                  <td>--</td>
                  <td class="tit">体积(立方米)</td>
                  <td>{{billList.volume?billList.volume:'--'}}</td>
                  <td class="tit">毛重</td>
                  <td>{{billList.grossWt?billList.grossWt:'--'}}</td>
                </tr>
                <tr>
                  <td class="tit">集装箱数</td>
                  <td>{{billList.containerNo?billList.containerNo:'--'}}</td>
                  <td class="tit"></td>
                  <td>--</td>
                  <td class="tit"></td>
                  <td>--</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="报关单信息" name="fourth">
              <table class="multi-table el-table el-table--mini">
                <tr>
                  <td class="tit">申报单位名称</td>
                  <td>{{customerList.agentName?customerList.agentName:'--'}}</td>
                  <td class="tit">货主名称</td>
                  <td>{{customerList.ownerName?customerList.ownerName:'--'}}</td>
                  <td class="tit">装货港</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">境内目的地</td>
                  <td>{{customerList.destinationPort?customerList.destinationPort:'--'}}</td>
                  <td class="tit">进出口日期</td>
                  <td>{{customerList.ieDate?customerList.ieDate:'--'}}</td>
                  <td class="tit">运输工具代码</td>
                  <td>--</td>
                </tr>
                <tr>
                  <td class="tit">航次号</td>
                  <td>--</td>
                  <td class="tit">提单号</td>
                  <td>{{customerList.billNo?customerList.billNo:'--'}}</td>
                  <td class="tit">商品名称</td>
                  <td>--</td>
                </tr>
              </table>
            </el-tab-pane>
          </el-tabs>

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
  import { detailByArea , getLatest ,getCustomDetail , getBillDetail ,getManifestDetail} from '@/api/storageYard'
  // vuex
  import { mapGetters } from 'vuex'

  export default {
    name: 'cont-dialog',
    data() {
      return {
        tableKey: 0,
        tableData: [],
        loading: false,
        dataForm: {
          portId: '',
          areaCode: '',
          pageNum: 1,
          pageSize: 5,
          ieFlag:'',
          storeType:''
        },
        total: 0,
        result: {},
        visible: false,
        innerVisible: false,
        activeName: 'first',
        containerList:{},
        customerList:{},
        billList:{},
        mainfestList:{}
      }
    },
    computed: {
      title() {
        return `${this.dataForm.areaCode}区域集装箱查询`
      },
      ...mapGetters([
        'currentId',
        'isAdmin'
      ])
    },
    methods: {
      init({ portId, areaCode ,storeType,ieFlag }) {
        console.log(ieFlag,storeType)
        this.dataForm.portId = portId
        this.dataForm.areaCode = areaCode
        this.dataForm.ieFlag = ieFlag
        this.dataForm.storeType = storeType
        this.visible = true
      },
      view(recordNo,blNo) {
        this.activeName = 'first'
        console.log(blNo);
        getLatest({recordNo:recordNo,type:1,portId:this.dataForm.portId}).then(res => {
          // console.log(res);
          if(res.data.code == 200) {
            this.containerList = res.data.data;
            this.innerVisible = true
          }
        })
        if(blNo) {
          getCustomDetail({ blNo: blNo, portId: this.dataForm.portId }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.customerList = res.data.data;
            }
          })
          getBillDetail({ blNo: blNo, portId: this.dataForm.portId }).then(res => {
            if (res.data.code == 200) {
              this.billList = res.data.data;
            }
          })
          getManifestDetail({ blNo: blNo, portId: this.dataForm.portId }).then(res => {
            if (res.data.code == 200) {
              this.mainfestList = res.data.data;
            }
          })
        }
      },
      handleOpen() {
        this._detailByArea()
      },
      handleClose() {
        this.dataForm.pageNum = 1
      },
      _detailByArea() {
        this.tableData = []
        this.loading = true
        detailByArea(this.dataForm).then((res) => {
          this.tableData = res.data.data.dataList
          this.total = res.data.data.total
          this.loading = false
        })
      },
      handleSizeChange(val) {
        this.dataForm.pageSize = val
        this._detailByArea()
      },
      handleCurrentChange(val) {
        this.dataForm.pageNum = val
        this._detailByArea()
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .multi-table {
    &:before {
      height: 0;
    }

    td {
      padding: 6px 8px;
    }

    .tit {
      white-space: nowrap;
      background-color: rgb(239, 247, 255);
    }
  }
</style>
