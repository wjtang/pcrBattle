webpackJsonp([17],{"8Gyd":function(n,t,i){var c=i("gh5B");"string"==typeof c&&(c=[[n.i,c,""]]),c.locals&&(n.exports=c.locals);i("8bSs")("62e9d403",c,!0)},dZXH:function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=i("V5Rg"),e={name:"social-signin",methods:{wechatHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);var t="https://open.weixin.qq.com/connect/qrconnect?appid=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect")+"&response_type=code&scope=snsapi_login#wechat_redirect";Object(c.a)(t,n,540,540)},tencentHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);var t="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect");Object(c.a)(t,n,540,540)}}},a={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"social-signup-container"},[i("div",{staticClass:"sign-btn",on:{click:function(t){return n.wechatHandleClick("wechat")}}},[i("span",{staticClass:"wx-svg-container"},[i("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),n._v(" 微信\n  ")]),n._v(" "),i("div",{staticClass:"sign-btn",on:{click:function(t){return n.tencentHandleClick("tencent")}}},[i("span",{staticClass:"qq-svg-container"},[i("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),n._v(" QQ\n  ")])])},staticRenderFns:[]};var o=i("C7Lr")(e,a,!1,function(n){i("8Gyd")},"data-v-233b71c8",null);t.default=o.exports},gh5B:function(n,t,i){(n.exports=i("BkJT")(!1)).push([n.i,"\n.social-signup-container[data-v-233b71c8] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-233b71c8] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-233b71c8] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-233b71c8],\n  .social-signup-container .qq-svg-container[data-v-233b71c8] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-233b71c8] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-233b71c8] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n",""])}});