<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole"></component>-->
    <!--<iframe :height="scrollHeight" width="100%" style="padding:0;margin:0;"-->
    <!--src="https://119.145.168.112:56080/extensions/FSElectronicPort/FSElectronicPort.html"-->
    <!--frameborder="0" scrolling="auto"></iframe>-->
    <div class="app-container clearfix pageHeader" style="height: 60px;line-height: 60px">
    <div>使用规则:可以输入框上输入防守方阵容,用空格隔开,或者在下面多选选择角色</div>
    </div>
    <div class="app-container margin-content padding-content">
      <div class="block" style="width:90%">
        <el-form ref="form" :model="form" label-width="170px"  style="padding-top: 20px">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="防守阵容：" prop="searchData">
                <el-input type="text" placeholder="请输入防守阵容空格隔开" v-model="form.searchData"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" style="text-align: right">
              <el-button type="primary" @click="searchInput">搜索</el-button>
              <el-button @click="resetInput">重置</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="form.checkboxData" style="padding-left: 100px;padding-top: 50px">
              <el-checkbox :label="item" :name="item" v-for="(item,key) in member">{{item}}</el-checkbox>
            </el-checkbox-group>
            <div style="text-align: right">
            <el-button type="primary" @click="searchCheckbox" style="margin-left: 100px">搜索</el-button>
            <el-button @click="resetCheckbox">重置</el-button>
            </div>
          </el-row>
        </el-form>

        <div class="data-box" style="width: 80%;margin-top: 50px">
          <el-card class="box-card" v-for="item in showData" style="margin-bottom: 20px">
             <el-row>
               <el-col :sm="24" :md="12" style="text-align: left">
                 进攻:
                 <el-tag type="success" v-for = "item1 in item.attack" style="margin-left: 10px">
                   {{item1}}
                 </el-tag>
               </el-col>
               <el-col :sm="24" :md="12" style="text-align: right">
                 防守:
                 <el-tag type="success" v-for = "item1 in item.defense" style="margin-left: 10px">
                   {{item1}}
                 </el-tag>
               </el-col>
             </el-row>
            <p style="padding: 7px 0">
              备注:{{item.note}}
            </p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'
  import axios from 'axios'

  // 经促局、商务局、码头
  import functionalDashboard from './functional'
  import nopermissionDashboard from './nopermission'

  export default {
    name: 'dashboard',
    components: {
      adminDashboard,
      editorDashboard,
      functionalDashboard,
      nopermissionDashboard
    },
    mounted(){
       // console.log('../../static/data.json');
      axios.get('https://wjtang.github.io/pcrBattle/dist/static/data.json').then(data => {
        var jsonObj = eval(data.data);
        this.jjcData = jsonObj;
        this.getMember();
      })
    },
    data() {
      return {
        currentRole: 'adminDashboard',
        scrollHeight: 0,
        jjcData:[],
        member:[],
        form:{
          searchData:'',
          checkboxData:[]
        },
        showData:[]
      }
    },
    methods:{
        getMember(){
          let member = [];
          console.log(this.jjcData);
          this.jjcData.forEach(item => {
             if(member.length > 0){
                  item.defense.forEach(item1 => {
                     console.log(member.indexOf(item1) > -1);
                     if(member.indexOf(item1) < 0){
                       member.push(item1);
                     }
                  })
             }else{
              member  = [...member,...item.defense];
             }
          })
          // console.log(member);
          this.member = member;
        },
      searchInput(){
        console.log(this.form.searchData.split(" "));
        let a = this.form.searchData.split(" ");
        let c = [];
        this.jjcData.forEach(item => {
          let flag = true;
          let b = '';
          a.forEach(item1 => {
             b = item.defense.indexOf(item1) > -1 ? true :false;
             flag = flag && b;
          })
          if(flag){
            c.push(item);
          }
        })
        console.log(c);
        this.showData = c;
      },
      resetInput(){
          this.form.searchData = '';
      },
      searchCheckbox(){
        let a = this.form.checkboxData;
        console.log(a);
        let c = [];
        this.jjcData.forEach(item => {
          let flag = true;
          let b = '';
          a.forEach(item1 => {
             b = item.defense.indexOf(item1) > -1 ? true :false;
             flag = flag && b;
          })
          if(flag){
            c.push(item);
          }
        })
        console.log(c);
        this.showData = c;
      },
      resetCheckbox(){
          this.form.checkboxData = [];
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    created() {
      console.log('roles', this.roles)
//
//      // 码头
//      if (this.roles.indexOf(269) > -1) {
//        this.currentRole = 'functionalDashboard'
//        return false
//      }
//      // 经促局
//      if (this.roles.indexOf(272) > -1) {
//        this.currentRole = 'functionalDashboard'
//        return false
//      }
//      // 商务局
//      if (this.roles.indexOf(271) > -1) {
//        this.currentRole = 'functionalDashboard'
//        return false
//      }
//      // nopermission
//      if (this.roles.indexOf('') > -1) {
//        this.currentRole = 'nopermissionDashboard'
//        return false
//      }
//
//      if (!this.roles.includes('admin')) {
//        this.currentRole = 'editorDashboard'
//      }

      this.scrollHeight = document.body.scrollHeight - 90
      window.onresize = () => {
        this.scrollHeight = document.body.scrollHeight - 90
      }
    }
  }
</script>
