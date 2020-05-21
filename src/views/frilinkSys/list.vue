<template>
  <div>
    <div class="app-container">
      <div class="header">{{$route.meta.title}}</div>
    </div>

    <div class="app-container margin-content padding-content">
      <div style="padding:10px;padding-top:0;">
        <el-form ref="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="链接状态：">
                  <el-select v-model="searchType.status" placeholder="请选择类型" @change="search">
                    <el-option value="" label="全部">全部</el-option>
                    <el-option
                      v-for="item in typesList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <!--<el-col :span="11">-->
              <!--<div class="grid-content bg-purple">-->
                <!--<el-form-item label="发布时间：">-->
                  <!--<el-date-picker-->
                    <!--type="daterange"-->
                    <!--v-model="timeData"-->
                    <!--align="right"-->
                    <!--unlink-panels-->
                    <!--range-separator="至"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期"-->
                    <!--:picker-options="pickerOptions">-->
                  <!--</el-date-picker>-->
                <!--</el-form-item>-->
              <!--</div>-->
            <!--</el-col>-->
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="友情连接标题:">
                  <el-input v-model="searchType.linkDesc"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <el-button @click="search" style="margin-left: 20px">搜索</el-button>
              <el-button style="width:100px;" type="primary" @click="add">新增</el-button>
            </el-col>
          </el-row>
          <!--<el-row>-->
            <!--<el-col :span="6">-->
              <!--<div class="grid-content bg-purple">-->
                <!--<el-form-item label="连接标题:">-->
                  <!--<el-input v-model="searchType.linkDesc"></el-input>-->
                <!--</el-form-item>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="10">-->
              <!--<el-button @click="search" style="margin-left: 20px">搜索</el-button>-->
              <!--<el-button style="width:100px;" type="primary" @click="add">新增</el-button>-->
            <!--</el-col>-->
          <!--</el-row>-->
        </el-form>

      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="正在加载..."
        style="width: 100%">

        <el-table-column
          width="55"
          :selectable="selectable">
        </el-table-column>
        <el-table-column label="友情连接标题">
          <template slot-scope="scope">
            <span>{{scope.row.linkDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template slot-scope="scope" width="350">
            <span>{{scope.row.linkUrl}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="操作" width="120px"
                         class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="detail(scope.row)">编辑</a>
            <divider type="vertical"></divider>
            <a href="javascript:void(0)" @click="_audit(scope.row.id,2)" v-if="scope.row.status == 1">隐藏</a>
            <a href="javascript:void(0)" @click="_audit(scope.row.id,1)" v-else>公开</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-dialog ref="addDialog" @submit="search()"></add-dialog>

  </div>
</template>

<script>
  import Article from '@/mock/article' //引用mock先模拟数据
  import Divider from '@/components/Divider'
  import {getList,update} from '@/api/friLink.js'
  import {parseTime} from '@/utils/index.js'
  import addDialog from './components/dialogAdd'

  export default {
    name: 'frilinkSys-list',
    data() {
      return {
        loading: false,
        tableData: [],
        timeData: [],
        searchType:{
          pageNum:1,
          pageSize:10,
          linkDesc:'',
          status:''
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        typesList: [
          {value:1,label:'公开'},
          {value:2,label:'隐藏'}
        ],
        value: ''
      }
    },
    created() {
      this._getQuestions();
    },
    methods: {
      selectable(row) {

      },
      search(){
        this.searchType.beaginDate = this.timeData[0] ? parseTime(this.timeData[0],'{y}-{m}-{d}') : '';
        this.searchType.endDate = this.timeData[1] ? parseTime(this.timeData[1],'{y}-{m}-{d}') : '' ;
        this._getQuestions();
      },
      detail(data){
        this.$refs.addDialog.questionData = Object.assign({},data);
        this.$refs.addDialog.visible = true
      },
      _audit(id,status){
        update({id:id,status:status}).then(data => {
          if(data.data.code == 200){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.search();
          }
        })
      },
      add(){
        let data={linkDesc:'',linkUrl:'',remark:''};
        this.$refs.addDialog.questionData = Object.assign({},data);
        this.$refs.addDialog.visible = true
      },
      _getQuestions(){
        getList(this.searchType).then(data => {
          // console.log(data);
          this.tableData = data.data.data.list;
        })
      }
    },
    components: {Divider,addDialog}
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .cell{
    height: 30px;
    overflow: visible !important;
  }
</style>
