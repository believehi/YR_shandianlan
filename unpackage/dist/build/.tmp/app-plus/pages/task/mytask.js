(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/task/mytask"],{"22b1":function(t,e,s){"use strict";s.r(e);var a=s("96b2"),i=s("c6a0");for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);s("2608");var r=s("2877"),u=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,null,null);u.options.__file="mytask.vue",e["default"]=u.exports},2608:function(t,e,s){"use strict";var a=s("993b"),i=s.n(a);i.a},"2bc8":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(s("2705")),i=n(s("8085"));function n(t){return t&&t.__esModule?t:{default:t}}var r={components:{uniSegmentedControl:a.default},data:function(){return{items:["已领取","待审核","已完成","已失败"],current:0,State:"1",lqArray:"",shArray:"",wcArray:"",sbArray:"",num:"6",Tishi:""}},onLoad:function(){this.fllist()},onShow:function(){this.fllist()},onPullDownRefresh:function(){this.fllist(!0),t.showLoading({title:"刷新中....",mask:!0})},onReachBottom:function(){var t=new String("5");this.num=Number(this.num)+Number(t),this.fllist()},methods:{openlq:function(e){t.navigateTo({url:"../task/YilinquTask?lqid="+e.currentTarget.dataset.lqid})},opensh:function(e){t.navigateTo({url:"../task/shenheTask?shid="+e.currentTarget.dataset.shid})},onClickItem:function(t){this.current!==t&&(this.current=t),0===this.current?(this.State="1",this.fllist()):1===this.current?(this.State="3",this.fllist()):2===this.current?(this.State="4",this.fllist()):3===this.current&&(this.State="5",this.fllist())},fllist:function(e){var s=this;i.default.islogin(!0),t.request({url:i.default.websiteUrl+"task/getmytasklist",method:"GET",data:i.default.postdata({page:"1",num:this.num,State:this.State,userid:i.default.getstate().userid}),success:function(e){200==e.data.code?"1"==s.State?(e.data.data.baseinfo.forEach(function(t){t.Createdate=t.Createdate.substr(5,5)}),s.lqArray=e.data.data.baseinfo):"3"==s.State?s.shArray=e.data.data.baseinfo:"4"==s.State?s.wcArray=e.data.data.baseinfo:"5"==s.State&&(s.sbArray=e.data.data.baseinfo):(i.default.goout(e.data.info),t.showToast({icon:"none",title:e.data.info})),e.data.data.baseinfo.length>=s.num?s.bottomtisi="正在加载...":s.bottomtisi="没有更多数据了",0===e.data.data.baseinfo.length?(s.Tishi="暂无任务",s.bottomtisi=""):s.Tishi="",t.hideLoading()},fail:function(){t.hideLoading(),t.showToast({icon:"none",title:"网络异常,请下拉刷新重试！"})},complete:function(){e&&t.stopPullDownRefresh()}})}}};e.default=r}).call(this,s("649d")["default"])},"554e":function(t,e,s){"use strict";s("047b");var a=n(s("b0ce")),i=n(s("22b1"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"96b2":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"uni-swiper-box"},[s("uni-segmented-control",{attrs:{current:t.current,values:t.items,"style-type":"text","active-color":"#f1a727",eventid:"bd48ca36-0",mpcomid:"bd48ca36-0"},on:{clickItem:t.onClickItem}}),s("view",{staticClass:"content"},[s("view",{directives:[{name:"show",rawName:"v-show",value:0===t.current,expression:"current === 0"}]},t._l(t.lqArray,function(e,a){return s("view",{key:a,staticClass:"uni-rw-list"},[s("view",{staticClass:"uni-rw-cont",attrs:{"data-lqid":e.ID,eventid:"bd48ca36-1-"+a},on:{tap:t.openlq}},[s("image",{attrs:{src:e.thumbnail,mode:""}}),s("view",{staticClass:"uni-rw-text"},[s("text",{staticClass:"Text_Nowrap"},[t._v(t._s(e.TaskName))]),s("view",{staticClass:"uni-rw-sl"},[s("view",[t._v(t._s(e.PeopleMin)+"-"+t._s(e.PeopleMax-1)+"人")]),s("view",[t._v(t._s(e.Days)+"天内")]),s("view",[t._v("还剩"),s("text",[t._v(t._s(e.Surplus))]),t._v("份")])])]),s("view",{staticClass:"uni-rw-time"},[s("view",[t._v("日期")]),s("text",[t._v(t._s(e.Createdate))])])])])})),s("view",{directives:[{name:"show",rawName:"v-show",value:1===t.current,expression:"current === 1"}]},t._l(t.shArray,function(e,a){return s("view",{key:a,staticClass:"uni-rw-list"},[s("view",{staticClass:"uni-rw-cont",attrs:{"data-shid":e.ID,eventid:"bd48ca36-2-"+a},on:{tap:t.opensh}},[s("image",{attrs:{src:e.thumbnail,mode:""}}),s("view",{staticClass:"uni-rw-text"},[s("text",{staticClass:"Text_Nowrap"},[t._v(t._s(e.TaskName))]),s("view",{staticClass:"uni-rw-sl"},[s("view",[t._v(t._s(e.PeopleMin)+"-"+t._s(e.PeopleMax)+"人")]),s("view",[t._v(t._s(e.Days)+"天内")]),s("view",[t._v("还剩"),s("text",[t._v(t._s(e.Surplus))]),t._v("份")])])]),t._m(0,!0)])])})),s("view",{directives:[{name:"show",rawName:"v-show",value:2===t.current,expression:"current === 2"}]},t._l(t.wcArray,function(e,a){return s("view",{key:a,staticClass:"uni-rw-list"},[s("view",{staticClass:"uni-rw-cont"},[s("image",{attrs:{src:e.thumbnail,mode:""}}),s("view",{staticClass:"uni-rw-text"},[s("text",{staticClass:"Text_Nowrap"},[t._v(t._s(e.TaskName))]),s("view",{staticClass:"uni-rw-sl"},[s("view",[t._v(t._s(e.PeopleMin)+"-"+t._s(e.PeopleMax)+"人")]),s("view",[t._v(t._s(e.Days)+"天内")]),s("view",[t._v("还剩"),s("text",[t._v(t._s(e.Surplus))]),t._v("份")])])]),t._m(1,!0)])])})),s("view",{directives:[{name:"show",rawName:"v-show",value:3===t.current,expression:"current === 3"}]},t._l(t.sbArray,function(e,a){return s("view",{key:a,staticClass:"uni-rw-list"},[s("view",{staticClass:"uni-rw-cont"},[s("image",{attrs:{src:e.thumbnail,mode:""}}),s("view",{staticClass:"uni-rw-text"},[s("text",{staticClass:"Text_Nowrap"},[t._v(t._s(e.TaskName))]),s("view",{staticClass:"uni-rw-sl"},[s("view",[t._v(t._s(e.PeopleMin)+"-"+t._s(e.PeopleMax)+"人")]),s("view",[t._v(t._s(e.Days)+"天内")]),s("view",[t._v("还剩"),s("text",[t._v(t._s(e.Surplus))]),t._v("份")])])]),s("view",{staticClass:"uni-rw-time"},[s("text",[t._v(t._s(e.Reply))])])])])}))]),s("text",{staticClass:"tisi"},[t._v(t._s(t.Tishi))])],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"uni-rw-time uni-rw-time2"},[s("text",[t._v("审核中...")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"uni-rw-time uni-rw-time3"},[s("view",[t._v("已完成")])])}];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},"993b":function(t,e,s){},c6a0:function(t,e,s){"use strict";s.r(e);var a=s("2bc8"),i=s.n(a);for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);e["default"]=i.a}},[["554e","common/runtime","common/vendor"]]]);