(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/Tiephone"],{1010:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"content"},[n("view",{staticClass:"uni-password-but"},[n("form",{attrs:{eventid:"a6d93c2a-3"},on:{submit:e.formSubmit}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"uni-phone",attrs:{type:"number",name:"phone",placeholder:"请输入手机号",eventid:"a6d93c2a-0"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),n("view",{staticClass:"uni-yzm-but"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",name:"code",placeholder:"请输入验证码",eventid:"a6d93c2a-1"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),n("view",{attrs:{eventid:"a6d93c2a-2"},on:{click:e.openCodeDialog}},[e._v(e._s(e.tipsCode))])]),n("button",{attrs:{type:"primary",formType:"submit"}},[e._v("保存")])],1)],1)])},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})},"2bdc":function(e,t,n){"use strict";var o=n("e8a0"),i=n.n(o);i.a},"3ff2":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("8085"));function i(e){return e&&e.__esModule?e:{default:e}}var a={data:function(){return{phone:"",tipsCode:"获取验证码",code:"",codestr:"",timeNum:60,clikType:!1,timeOut:60}},methods:{openCodeDialog:function(){var t=this;""!=t.phone?o.default.checkmobile(t.phone)?t.clikType||(t.codestr=o.default.MathRand(4),t.clikType=!0,e.request({url:"http://utf8.api.smschinese.cn/",method:"GET",data:{Uid:"xingjiushenqi",Key:"d41d8cd98f00b204e980",smsMob:t.phone,smsText:"您的验证码为："+t.codestr+"，有效期5分钟"},success:function(n){"1"==n.data?t.getTime():e.showToast({icon:"none",title:"获取验证码失败,请重试"})},fail:function(){e.hideLoading(),e.showToast({icon:"none",title:"网络异常,请稍后重试"})}})):e.showToast({icon:"none",title:"请输入正确的手机号码"}):e.showToast({icon:"none",title:"请输入你的手机号码"})},getTime:function(){var e=this,t=setInterval(function(){e.timeNum--,e.timeNum<=0?(e.tipsCode="重新获取验证码",e.timeNum=e.timeOut,e.clikType=!1,clearInterval(t)):e.tipsCode="重新发送"+e.timeNum+"秒"},1e3)},formSubmit:function(t){o.default.checkmobile(this.phone)?""!=this.code&&this.code==this.codestr&&this.codestr==this.code?(this.userdata=t.detail.value,e.request({url:o.default.websiteUrl+"usercenter/BindPhone",method:"GET",data:o.default.postdata({userid:o.default.getstate().userid,phone:this.userdata.phone,code:this.userdata.code}),success:function(t){t.data.code,e.showToast({icon:"none",title:t.data.info})},fail:function(){e.showToast({icon:"none",title:"网络异常,请稍后重试"})}})):e.showToast({icon:"none",title:"验证码错误"}):e.showToast({icon:"none",title:"请输入正确的手机号码"})}}};t.default=a}).call(this,n("649d")["default"])},5089:function(e,t,n){"use strict";n.r(t);var o=n("1010"),i=n("d8ca");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("2bdc");var s=n("2877"),u=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);u.options.__file="Tiephone.vue",t["default"]=u.exports},"89b0":function(e,t,n){"use strict";n("047b");var o=a(n("b0ce")),i=a(n("5089"));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,o.default)(i.default))},d8ca:function(e,t,n){"use strict";n.r(t);var o=n("3ff2"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a},e8a0:function(e,t,n){}},[["89b0","common/runtime","common/vendor"]]]);