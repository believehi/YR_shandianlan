(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Tixian/aliplaytixian"],{"10ad":function(t,a,e){"use strict";e("047b");var n=u(e("b0ce")),i=u(e("eb83"));function u(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},"2e9d":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{},[e("view",{staticClass:"uni-tx-sum"},[e("text",[t._v("可提现金额：")]),e("text",{staticClass:"tx-sum"},[t._v(t._s(t.userfoArray.suncoin)+"太阳币")]),e("text",{staticClass:"uni-tx-gz"},[t._v("1太阳币=1元")])]),e("view",{staticClass:"uni-user-content"},[e("text",[t._v("姓名:"+t._s(t.userfoArray.truename))]),e("text",[t._v("支付宝账户:"+t._s(t.userfoArray.alipay))])]),e("view",{},[e("view",{staticClass:"uni-tx-but"},t._l(t.AmountArray,function(a,n){return e("text",{key:n,class:{active:t.AmountArray[n].ID==t.Id},attrs:{id:t.AmountArray[n].ID,eventid:"fe084342-0-"+n},on:{click:t.open}},[t._v(t._s(t.AmountArray[n].Amount))])})),e("button",{staticClass:"uni-but",attrs:{eventid:"fe084342-1"},on:{click:t.tixian}},[t._v("提交")])],1)])},i=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return i})},"5e46":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("8085"));function i(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{userfoArray:"",AmountArray:"",Id:"",paymentid:""}},onLoad:function(){this.userinfo()},methods:{open:function(t){this.Id=t.currentTarget.id},userinfo:function(){var a=this;t.request({url:n.default.websiteUrl+"withdrawals/getpaymentlist",method:"GET",data:n.default.postdata({userid:n.default.getstate().userid,type:"1"}),success:function(e){200==e.data.code?(a.userfoArray=e.data.data.Member,a.AmountArray=e.data.data.baseinfo,a.paymentid=e.data.data.baseinfo.ID,null==a.userfoArray.alipay&&(a.userfoArray.alipay="请填写账号"),""==a.userfoArray.truename&&(a.userfoArray.truename="请填写姓名")):t.showToast({icon:"none",title:"网络异常,请稍后重试"})},fail:function(){t.showToast({icon:"none",title:"网络异常,请稍后重试"})}})},tixian:function(){var a=this;"请填写账号"==this.userfoArray.alipay?t.showToast({icon:"none",title:"请填写账号！"}):""==this.Id?t.showToast({icon:"none",title:"请选择提现金额！"}):t.request({url:n.default.websiteUrl+"/withdrawals/savewithdrawals",method:"GET",data:n.default.postdata({userid:n.default.getstate().userid,type:"1",paymentid:this.Id}),success:function(e){200==e.data.code?(n.default.goout(e.data.info),t.showToast({icon:"none",title:e.data.info}),a.userinfo()):(n.default.goout(e.data.info),t.showToast({icon:"none",title:e.data.info}))},fail:function(){t.showToast({icon:"none",title:"网络异常,请稍后重试"})}})}}};a.default=u}).call(this,e("649d")["default"])},9798:function(t,a,e){},a6e5:function(t,a,e){"use strict";e.r(a);var n=e("5e46"),i=e.n(n);for(var u in n)"default"!==u&&function(t){e.d(a,t,function(){return n[t]})}(u);a["default"]=i.a},b00b:function(t,a,e){"use strict";var n=e("9798"),i=e.n(n);i.a},eb83:function(t,a,e){"use strict";e.r(a);var n=e("2e9d"),i=e("a6e5");for(var u in i)"default"!==u&&function(t){e.d(a,t,function(){return i[t]})}(u);e("b00b");var o=e("2877"),r=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,null,null);r.options.__file="aliplaytixian.vue",a["default"]=r.exports}},[["10ad","common/runtime","common/vendor"]]]);