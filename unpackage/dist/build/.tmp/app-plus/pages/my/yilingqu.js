(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/yilingqu"],{1514:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("2705")),n=s(a("8085"));function s(t){return t&&t.__esModule?t:{default:t}}var o={components:{uniSegmentedControl:i.default},data:function(){return{State:"1",lqArray:"",num:"6",Tishi:""}},onLoad:function(){this.fllist()},onShow:function(){this.fllist()},onPullDownRefresh:function(){this.fllist(!0),t.showLoading({title:"刷新中....",mask:!0})},onReachBottom:function(){var t=new String("5");this.num=Number(this.num)+Number(t),this.fllist()},methods:{openlq:function(e){t.navigateTo({url:"../task/YilinquTask?lqid="+e.currentTarget.dataset.lqid})},fllist:function(e){var a=this;n.default.islogin(!0),t.request({url:n.default.websiteUrl+"task/getmytasklist",method:"GET",data:n.default.postdata({page:"1",num:this.num,State:this.State,userid:n.default.getstate().userid}),success:function(e){200==e.data.code?(e.data.data.baseinfo.forEach(function(t){t.Createdate=t.Createdate.substr(5,5)}),a.lqArray=e.data.data.baseinfo):(n.default.goout(e.data.info),t.showToast({icon:"none",title:e.data.info})),e.data.data.baseinfo.length>=a.num?a.bottomtisi="正在加载...":a.bottomtisi="没有更多数据了",0===e.data.data.baseinfo.length?(a.Tishi="暂无任务",a.bottomtisi=""):a.Tishi="",t.hideLoading()},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请下拉刷新重试！"})},complete:function(){e&&t.stopPullDownRefresh()}})}}};e.default=o}).call(this,a("649d")["default"])},2497:function(t,e,a){},"4e1b":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"uni-swiper-box"},[a("view",{staticClass:"content"},t._l(t.lqArray,function(e,i){return a("view",{key:i,staticClass:"uni-rw-list"},[a("view",{staticClass:"uni-rw-cont",attrs:{"data-lqid":e.ID,eventid:"889e7ad2-0-"+i},on:{tap:t.openlq}},[a("image",{attrs:{src:e.thumbnail,mode:""}}),a("view",{staticClass:"uni-rw-text"},[a("text",{staticClass:"Text_Nowrap"},[t._v(t._s(e.TaskName))]),a("view",{staticClass:"uni-rw-sl"},[a("view",[t._v(t._s(e.PeopleMin)+"-"+t._s(e.PeopleMax-1)+"人")]),a("view",[t._v(t._s(e.Days)+"天内")]),a("view",[t._v("还剩"),a("text",[t._v(t._s(e.Surplus))]),t._v("份")])])]),a("view",{staticClass:"uni-rw-time"},[a("view",[t._v("日期")]),a("text",[t._v(t._s(e.Createdate))])])])])})),a("text",{staticClass:"tisi"},[t._v(t._s(t.Tishi))])])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"88f0":function(t,e,a){"use strict";a.r(e);var i=a("1514"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"95b1":function(t,e,a){"use strict";a.r(e);var i=a("4e1b"),n=a("88f0");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("f2e3");var o=a("2877"),u=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,null,null);u.options.__file="yilingqu.vue",e["default"]=u.exports},d6aa:function(t,e,a){"use strict";a("047b");var i=s(a("b0ce")),n=s(a("95b1"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},f2e3:function(t,e,a){"use strict";var i=a("2497"),n=a.n(i);n.a}},[["d6aa","common/runtime","common/vendor"]]]);