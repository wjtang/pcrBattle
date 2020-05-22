<template>
  <el-dialog
    title="货物跟踪"
    :close-on-click-modal="false"
    width="900px"
    @open="handleOpen"
    @close="handleClose"
    :visible.sync="visible">

    <div class="track-wrapper">
      <el-radio-group v-model="radio" @change="handleChange" class="track-tab">
        <el-radio-button label="0">
          <svg-icon icon-class="steps"/>
        </el-radio-button>
        <el-radio-button label="1">
          <svg-icon icon-class="timeline"/>
        </el-radio-button>
      </el-radio-group>


      <el-scrollbar wrap-class="scroll-list" v-if="showFlag">
        <el-steps align-center class="track-steps" style="overflow-x: hidden">
          <el-step title="码头作业跟踪" status="process" icon=" ">
            <svg-icon slot="icon" icon-class="zuoye"/>
            <div slot="description">
              <ul v-if="contsMsg.length > 0">
                <li class="steps-item"
                    v-for="item in contsMsg">
                  <div class="font12">{{item.actTime}}</div>
                  <!--1-集装箱-->
                  <template v-if="item.type === 1">
                    <div>{{item.actType | activityTypeFilter}}</div>
                  </template>
                  <!--2-散货-->
                  <template v-if="item.type === 2">
                    <div>{{item.actType | bulkTypeFilter}}</div>
                  </template>
                </li>
              </ul>
              <div v-else>暂无数据</div>
            </div>
          </el-step>
          <el-step title="报关跟踪" status="process" icon=" ">
            <svg-icon slot="icon" icon-class="baoguan"/>
            <div slot="description">
              <ul v-if="declareMsg.declareTime">
                <li class="steps-item">
                  <div class="font12">{{declareMsg.declareTime}}</div>
                  <div>【货物申报】</div>
                </li>
                <li class="steps-item">
                  <div class="font12">{{declareMsg.declareSuccessTime}}</div>
                  <div>【货物申报成功】</div>
                </li>
              </ul>
              <div v-else>暂无数据</div>
            </div>
          </el-step>
          <el-step title="查验跟踪" status="process" icon=" ">
            <svg-icon slot="icon" icon-class="chayan"/>
            <div slot="description">
              <ul v-if="chkOrderMsg.length > 0">
                <li class="steps-item"
                    v-for="(item, index) in chkOrderMsg">
                  <div class="font12">{{item.checkTime}}</div>
                  <!--1-查验-->
                  <template v-if="item.type === 1">
                    <div style="margin-left: -10px;">
                      【{{item.checkSource | typeFilter}}】 {{item.checkType.charAt('0') | checkTypeFilter}}
                      <a v-if="index === chkOrderMsg.length -1" @click="checkView(trackType, recordNo, item.checkTime)">
                        | 查看</a>
                    </div>
                  </template>
                  <!--2-准备-->
                  <template v-if="item.type === 2">
                    <div style="margin-left: -10px;">
                      【码头准备】 {{item.checkType | chkReadyFilter}}
                      <a v-if="index === chkOrderMsg.length -1" @click="checkView(trackType, recordNo, item.checkTime)">
                        | 查看</a>
                    </div>
                  </template>
                </li>
              </ul>
              <div v-else>暂无数据</div>
            </div>
          </el-step>
          <!--<el-step title="码头准备跟踪" status="process" icon=" ">-->
          <!--<svg-icon slot="icon" icon-class="zhunbei"/>-->
          <!--<div slot="description">-->
          <!--<ul v-if="readyMsg.length > 0">-->
          <!--<li class="steps-item"-->
          <!--v-for="item in readyMsg">-->
          <!--<div class="font12">{{item.actTime}}</div>-->
          <!--<div>{{item.actType | activityTypeFilter}}</div>-->
          <!--</li>-->
          <!--</ul>-->
          <!--<div v-else>暂无数据</div>-->
          <!--</div>-->
          <!--</el-step>-->
          <el-step title="放行跟踪" status="process" icon=" ">
            <svg-icon slot="icon" icon-class="fangxing"/>
            <div slot="description">
              <ul v-if="releaseMsg.length > 0">
                <li class="steps-item"
                    v-for="item in releaseMsg">
                  <div class="font12">{{item.releaseTime}}</div>
                  <div>【{{item.releaseSource | typeFilter}}】 放行</div>
                </li>
              </ul>
              <div v-else>暂无数据</div>
            </div>
          </el-step>
        </el-steps>
      </el-scrollbar>

      <el-scrollbar wrap-class="scroll-list" v-if="!showFlag">
        <el-steps class="track-timeline" direction="vertical" style="overflow-y: hidden;" v-if="timeLine.length > 0">
          <el-step
            :status="index === timeLine.length -1 ? 'finish' :''"
            icon=" "
            v-for="(item, index) in timeLine" :key="item.title">

            <i slot="icon" class="circle" v-if="index === timeLine.length -1"></i>
            <div slot="description">
              <span class="title">{{item.actTime}}</span>
              <span class="time font12">【{{item.title}}】</span>
            </div>
          </el-step>
        </el-steps>

        <div style="text-align: center;padding: 16px;" v-else>暂无数据</div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
  // api
  import { cargoTrack } from '@/api/portCont'
  // vuex
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'cont-track-dialog',
    props: {
      trackType: String
    },
    data() {
      return {
        dataForm: {
          containerId: '',
          blNo: '',
          type: ''
        },
        radio: 0,
        visible: false,
        showFlag: true,
        recordNo: '',
        chkOrderMsg: [],
        contsMsg: [],
        declareMsg: {},
        // readyMsg: [],
        releaseMsg: [],
        timeLine: []
      }
    },
    computed: {
      ...mapGetters([
        'currentId',
        'isAdmin'
      ])
    },
    methods: {
      init() {
        this.dataForm.contNo = this.currentId.containerId
        this.dataForm.blNo = this.currentId.blNo
        this.dataForm.type = this.currentId.type
        this.visible = true
      },
      handleOpen() {
        this.radio = 0
        this.showFlag = true
        this._cargoTrack()
      },
      handleClose() {
        this.chkOrderMsg = []
        this.contsMsg = []
        this.declareMsg = {}
        // this.readyMsg = []
        this.releaseMsg = []
        this.timeLine = []
      },
      _cargoTrack() {
        this.loading = true
        cargoTrack(this.dataForm).then((res) => {
          this.recordNo = res.data.data.moduleLine.recordNo
          this.chkOrderMsg = res.data.data.moduleLine.chkOrderMsg
          this.contsMsg = res.data.data.moduleLine.contsMsg
          this.declareMsg = res.data.data.moduleLine.declareMsg
          // this.readyMsg = res.data.data.moduleLine.readyMsg
          this.releaseMsg = res.data.data.moduleLine.releaseMsg
          this.timeLine = res.data.data.timeLine
        })
      },
      handleChange(val) {
        this.showFlag = val === '0' ? true : false
      },
      checkView(trackType, recordNo, checkTime) {
        this.visible = false
        this.$router.push({
          name: 'chkManage',
          params: {
            trackType,
            recordNo,
            checkTime: checkTime.split(' ')[0]
          }
        })
      },
      ...mapMutations({
        setCurrentId: 'SET_CURRENT_ID'
      })
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
