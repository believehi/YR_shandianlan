(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/mytixian"],{"66ac":function(t,e,n){"use strict";n.r(e);var a=n("7ad2"),i=n("a681");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("841e");var u=n("2877"),r=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,null,null);r.options.__file="mytixian.vue",e["default"]=r.exports},"6ae3":function(t,e,n){"use strict";n("047b");var a=s(n("b0ce")),i=s(n("66ac"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"7ad2":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},[t._m(0),n("view",{staticClass:"uni-tx-content"},t._l(t.userfoArray,function(e,a){return n("view",{key:a,staticClass:"uni-tx-item"},[n("text",{staticClass:"uni-tx-sum"},[t._v(t._s(e.Amount)+"元")]),n("text",{staticClass:"uni-tx-time"},[t._v(t._s(e.CreateDate))]),n("text",{staticClass:"uni-tx-lj"},[t._v(t._s(e.Remark))]),n("text",{staticClass:"uni-tx-zt"},[t._v("审核中")])])}))])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"uni-tx-title"},[n("text",[t._v("金额")]),n("text",[t._v("时间")]),n("text",[t._v("路径")]),n("text",[t._v("状态")])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"841e":function(t,e,n){"use strict";var a=n("a275"),i=n.n(a);i.a},a275:function(t,e,n){},a681:function(t,e,n){"use strict";n.r(e);var a=n("ffd6"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=i.a},ffd6:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("8085"));function i(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{userfoArray:"",num:"13"}},onLoad:function(){this.srlist()},onPullDownRefresh:function(){this.srlist(!0)},onReachBottom:function(){var t=new String("5");this.num=Number(this.num)+Number(t),this.srlist()},methods:{srlist:function(){var e=this;t.showLoading({title:"加载中.....",mask:!0}),t.request({url:a.default.websiteUrl+"/withdrawals/getlist",method:"GET",data:a.default.postdata({userid:a.default.getstate().userid,page:"1",num:this.num}),success:function(n){200==n.data.code&&(t.hideLoading(),t.stopPullDownRefresh(),e.userfoArray=n.data.data.baseinfo,console.log(n))},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请下拉刷新重试！"})}})}}};e.default=s}).call(this,n("649d")["default"])}},[["6ae3","common/runtime","common/vendor"]]]);