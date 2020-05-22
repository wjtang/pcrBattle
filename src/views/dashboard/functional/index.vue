<template>
  <div class="dashboard-editor-container">
    <!--<div class="panel">-->
      <!--<div class="title">您好，欢迎使用 仓库网</div>-->
      <!--<div class="phone">-->
        <!--单一窗口 客服热线电话 0757-86231086-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="panel news-panel">-->
      <!--<div class="title">业务资讯</div>-->
      <!--<ul class="news">-->
        <!--<li class="item" v-for="item in industry" :key="item.nid">-->
          <!--<div class="caption clearfix">-->
            <!--<div class="tit fl"><a :href="item.detailurl" target="_blank">{{item.ntitle}}</a></div>-->
            <!--<div class="time fr">{{item.ndate | parseTime('{y}-{m}-{d}')}}</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="font12" style="text-align: center;" v-show="industry.length === 0">暂无数据</div>-->
      <!--<div class="pagination-container align-center" v-show="industry.length > 0">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChangeA"-->
          <!--:current-page="industryForm.p"-->
          <!--layout="prev, pager, next"-->
          <!--:total="industryTotal">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="panel news-panel">-->
      <!--<div class="title">通知公告</div>-->
      <!--<ul class="news">-->
        <!--<li class="item" v-for="item in notice" :key="item.nid">-->
          <!--<div class="caption clearfix">-->
            <!--<div class="tit fl"><a :href="item.detailurl" target="_blank">{{item.ntitle}}</a></div>-->
            <!--<div class="time fr">{{item.ndate | parseTime('{y}-{m}-{d}')}}</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="font12" style="text-align: center;" v-show="notice.length === 0">暂无数据</div>-->
      <!--<div class="pagination-container align-center" v-show="notice.length > 0">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChangeB"-->
          <!--:current-page="noticeForm.p"-->
          <!--layout="prev, pager, next"-->
          <!--:total="noticeTotal">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  // api
//  import { industry } from '@/api/news'
  // vuex
//  import { mapGetters } from 'vuex'
  // utils
//  import openWindow from '@/utils/openWindow'

  export default {
    name: 'dashboard-functional',
    data() {
      return {
//        scrollHeight: 0,
//        industryForm: {
//          s: 5,
//          p: 1
//        },
//        noticeForm: {
//          s: 5,
//          p: 1
//        },
//        industry: [],
//        notice: [],
//        industryTotal: 0,
//        noticeTotal: 0,
//        dialogVisible: false,
//        productsDetail: {}
      }
    },
    computed: {
//      ...mapGetters([
//        'roles'
//      ])
    },
    created() {
//      this.scrollHeight = document.body.scrollHeight - 90
//      window.onresize = () => {
//        this.scrollHeight = document.body.scrollHeight - 90
//      }
//
//      this._industry()
//      this._notice()
    },
    methods: {
//      _industry(params) {
//        industry(params).then((res) => {
//          const data = res.data
//          this.industry = data.data.list
//          this.industryTotal = data.data.page.total
//        })
//      },
//      _notice(params) {
////        notice(params).then((res) => {
////          const data = res.data
////          this.notice = data.data.list
////          this.noticeTotal = data.data.page.total
////        })
//      },
//      handleCurrentChangeA(val) {
//        console.log(val)
////        this.industryForm.p = val
//        this._industry({page: val, size: 10})
//      },
//      handleCurrentChangeB(val) {
//        console.log(val)
////        this.noticeForm.p = val
//        this._notice({page: val, size: 10})
//      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    min-height: 100vh;
    padding: 32px;

    .panel {
      padding: 30px;
      background: #fff;
      position: relative;

      .title {
        padding: 16px;
      }

      .phone {
        position: absolute;
        right: 16px;
        bottom: 16px;
        color: #999;
        font-size: 12px;
        font-weight: 700;
      }

      & + .panel {
        margin-top: 16px;
      }
    }

    .news-panel {
      .title {
        border-top: 2px solid #990000;
        /*border-bottom: 1px solid #d6d6d6;*/
      }
    }

    .news {
      list-style: none;
      padding: 0;
      margin: 0;

      .item {
        border-bottom: 1px dashed #333;
        padding: 8px;
        margin-bottom: 8px;
        .caption {
          .tit {
            font-weight: 700;
            border-left: 3px solid #0a76a4;
            padding-left: 16px;
          }
          .time {
            color: #999;
          }
        }

        .desc {
          font-size: 12px;
          color: #8994af;
          padding: 8px;
        }
      }
    }
  }
</style>
