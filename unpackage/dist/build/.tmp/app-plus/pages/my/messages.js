(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/messages"],{"5ce5":function(t,e,n){"use strict";n("047b");var a=r(n("b0ce")),i=r(n("d152"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"640a":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},[n("view",{staticClass:"uni-product-list"},t._l(t.listData,function(e,a){return n("view",{key:a,staticClass:"uni-product",attrs:{"data-xxid":e.ID,eventid:"1602a839-0-"+a},on:{click:t.openmascontent}},[n("text",{staticClass:"uni-title Text_Nowrap"},[t._v(t._s(e.Title))]),n("text",{staticClass:"uni-time"},[t._v(t._s(e.CreateDate))]),n("uni-icon",{staticClass:"iconfont-2 icon-you",attrs:{mpcomid:"1602a839-0-"+a}})],1)}))])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"8edd":function(t,e,n){},9677:function(t,e,n){"use strict";var a=n("8edd"),i=n.n(a);i.a},9806:function(t,e,n){"use strict";n.r(e);var a=n("dc8d"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},b116:function(t,e,n){"use strict";function a(t){if("number"!==typeof t||t<0)return t;var e=parseInt(t/3600);t%=3600;var n=parseInt(t/60);t%=60;var a=t;return[e,n,a].map(function(t){return t=t.toString(),t[1]?t:"0"+t}).join(":")}function i(t,e){return"string"===typeof t&&"string"===typeof e&&(t=parseFloat(t),e=parseFloat(e)),t=t.toFixed(2),e=e.toFixed(2),{longitude:t.toString().split("."),latitude:e.toString().split(".")}}var r={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(t){var e="";for(var n in this.UNITS)if(t>=this.UNITS[n]){e=Math.floor(t/this.UNITS[n])+n+"前";break}return e||"刚刚"},format:function(t){var e=this.parse(t),n=Date.now()-e.getTime();if(n<this.UNITS["天"])return this.humanize(n);var a=function(t){return t<10?"0"+t:t};return e.getFullYear()+"/"+a(e.getMonth()+1)+"/"+a(e.getDay())},parse:function(t){var e=t.split(/[^0-9]/);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])}};t.exports={formatTime:a,formatLocation:i,dateUtils:r}},d152:function(t,e,n){"use strict";n.r(e);var a=n("640a"),i=n("9806");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("9677");var o=n("2877"),s=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);s.options.__file="messages.vue",e["default"]=s.exports},dc8d:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("8085"));function i(t){return t&&t.__esModule?t:{default:t}}var r=n("b116").dateUtils,o={data:function(){return{infoArray:"",listData:[],datatime:""}},onLoad:function(){this.getList()},methods:{openmascontent:function(e){t.navigateTo({url:"messages-content?xxid="+e.currentTarget.dataset.xxid})},getList:function(){var e=this;t.request({url:a.default.websiteUrl+"message/getmessagelist",method:"GET",data:a.default.postdata({num:10,page:1}),success:function(t){if(200==t.data.code){var n=e.setTime(t.data.data.baseinfo);e.listData=e.reload?n:e.listData.concat(n)}},fail:function(){t.showToast({icon:"none",title:"网络异常,请稍后重试"})}})},setTime:function(t){var e=[];return t.forEach(function(t){e.push({Content:t.Content,ID:t.ID,CreateDate:r.format(t.CreateDate),Title:t.Title})}),e}}};e.default=o}).call(this,n("649d")["default"])}},[["5ce5","common/runtime","common/vendor"]]]);