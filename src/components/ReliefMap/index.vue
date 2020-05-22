<template>
    <el-dialog
      title="3D堆场电子图"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="800px">
      <div class="relief_map">
        <div class="measure_x" :style="{'width':nowx * 50 + 'px'}"><span v-for="(item,index) in nowx">{{item % 2 == 0 ? '':item}}</span></div>
        <div class="measure_y" :style="{'height':nowy * 50 + 'px'}"><span v-for="(item,index) in nowy">{{nowy - item + 1}}</span></div>
        <div class="all_box_left"><div v-for="(item,index) in nowy"><span v-for="(item1,index1) in 4">{{4 - index1}}</span></div></div>
         <table :style="{'width':nowx * 50 + 'px'}">
           <tr v-for="(item,index) in nowy">
             <td v-for="(item1,index1) in Math.round(nowx/2)"><span>{{item1 * 2 - 1}}</span></td>
           </tr>
         </table>
        <div v-for="(item,index) in mapList"
             :class="{'container_box':true,'big_container_box':item.xValue % 2 == 0}"
             :style="{top:(nowy - parseInt(item.yValue)) * 100 +25 +'px',left:item.xValue % 2 ==0 ? parseInt(item.xValue - 2) * 50 + 15+ 'px':(parseInt(item.xValue) + 1)* 50 - 85 + 'px'}">
            <div class="box_right">
                <div v-for="(item2,index2) in item.groupData" :class="{'box_right_no1':parseInt(item2.zValue) === 1,
                'box_right_no2':parseInt(item2.zValue) === 2,
                'box_right_no3':parseInt(item2.zValue) === 3,
                'box_right_no4':parseInt(item2.zValue) === 4}" @click="view(item2.recordNo,item2.blNo)">{{item2.recordNo}}</div>
            </div>
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
              <el-tab-pane label="集装箱最新动态" name="frist">
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
  import { cargoDetailByArea , getLatest , getCustomDetail , getBillDetail ,getManifestDetail} from '@/api/storageYard'
  export default {
    name: 'relief-map',
    data(){
      return{
        visible:false,
        beginx:'',
        beginy:'',
        beginz:'',
        endx:'',
        endy:'',
        endz:'',
        mapList:[],
        innerVisible:false,
        containerList:[],
        activeName:'frist',
        portId:'',
        customerList:{},
        billList:{},
        mainfestList:{}
      }
    },
    computed:{
      nowx(){
        return (this.endx - this.beginx) % 2 == 0? (this.endx - this.beginx + 2): (this.endx - this.beginx + 1);;
      },
      nowy(){
        return (this.endy - this.beginy) % 2 == 0? (this.endy - this.beginy): (this.endy - this.beginy + 1);
      }
    },
    methods:{
      init(mapdata,portid){
        this.visible = true;
        console.log(mapdata);
        this.beginx = parseInt(mapdata.beginX);
        this.beginy = parseInt(mapdata.beginY);
        this.beginz = parseInt(mapdata.beiginZ);
        this.endx = parseInt(mapdata.endX);
        this.endy = parseInt(mapdata.endY);
        this.endz = parseInt(mapdata.endZ);
        this.getmapList(mapdata.areaCode,portid)
      },
      getmapList(code,portid){
        this.portId = portid;
        cargoDetailByArea({areaCode:code,portId:portid}).then(res => {
          console.log(res);
          if(res.data.code == 200){
            // this.mapList = res.data.data;
            let a = res.data.data;
            let baseList = []
            let mapData = []
            a.forEach((item,index) => {
              let basexy = item.xValue + item.yValue
              if(baseList.indexOf(basexy) > -1){

              }else{
                baseList.push(basexy);
                mapData.push({xValue:item.xValue,yValue:item.yValue,groupData:[]})
              }
            })
            // console.log(mapData);
            mapData.forEach((item,index) => {
              a.forEach((item1,index1) => {
                if(item.xValue == item1.xValue && item.yValue == item1.yValue){
                  mapData[index].groupData.push({zValue:item1.zValue,recordNo:item1.recordNo})
                }
              })
            })
            console.log(mapData);
            this.mapList = mapData;
          }
        })
      },
      view(recordNo,blNo) {
        console.log(blNo);
        this.activeName = 'frist'
        this.innerVisible = true
        getLatest({recordNo:recordNo,type:1,portId:this.portId}).then(res => {
          // console.log(res);
          if(res.data.code == 200) {
            this.containerList = res.data.data;
            this.innerVisible = true
          }
        })
        if(blNo) {
          getCustomDetail({ blNo: blNo, portId: this.portId }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.customerList = res.data.data;
            }
          })
          getBillDetail({ blNo: blNo, portId: this.portId }).then(res => {
            if (res.data.code == 200) {
              this.billList = res.data.data;
            }
          })
          getManifestDetail({ blNo: blNo, portId: this.portId }).then(res => {
            if (res.data.code == 200) {
              this.mainfestList = res.data.data;
            }
          })
        }
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">
      .relief_map{
        height: 600px;
        overflow: auto;
        position: relative;
        table{
          border-collapse: collapse;
          background-color: black;
          margin-left: 15px;
        }
        table tr td{
          width: 100px;
          height: 100px;
          border: 1px solid white;
          span{
            position: relative;
            width: 100%;
            text-align: center;
            color: white;
            top: 40px;
            display: block;
            font-size: 10px;
          }
        }
        .measure_x{
          position: relative;
          margin-left: 18px;
          z-index: 15;
            span{
              width: 50px;
              text-align: right;
              display: inline-block;
            }
        }
        .measure_y{
          position: absolute;
          left: 0px;
          top: 20px;
          span{
            width: 20px;
            height: 100px;
            display: block;
            line-height: 100px;
          }
        }
        .all_box_left{
          width: 10px;
          position: absolute;
          top: 23px;
          left: 16px;
          div {
            height: 80px;
            margin-bottom: 20px;
            span {
              display: block;
              width: 100%;
              height: 20px;
              line-height: 20px;
              color: white;
            }
          }
        }
        .container_box{
          position: absolute;
          width: 100px;
          height: 100px;
          display: flex;
          .box_right{
            padding: 0 10px;
            width: 100%;
            height: 80px;
            text-align: center;
            z-index: 11;
            position: relative;
            div{
                height: 20px;
                line-height: 20px;
                border-bottom: 0.5px solid white;
                border-top: 0.5px solid white;
                background-color: green;
                color: white;
                font-size: 10px;
                position: absolute;
                width: calc(100% - 20px);
                cursor: pointer;
            }
            .box_right_no1{
              top: 0px;
            }
            .box_right_no2{
              top: 20px;
            }
            .box_right_no3{
              top: 40px;
            }
            .box_right_no4{
              top: 60px;
            }
          }
        }
        .big_container_box{
          width: 200px;
          z-index: 10 !important;
        }
      }
</style>
