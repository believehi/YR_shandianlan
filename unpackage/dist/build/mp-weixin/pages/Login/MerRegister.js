(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Login/MerRegister"],{"007f":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("436c"));function i(e){return e&&e.__esModule?e:{default:e}}var a={data:function(){return self=this,{merchantname:"",artiperson:"",mobile:"",password:"",businesslicense:"",conpassword:"",nikename:"",code:"",codes:"",codestr:"",tipsCode:"获取验证码",timeNum:60,clikType:!1,timeOut:60,img:"",imgs:"",MerName:"",MerPer:""}},onLoad:function(){this},methods:{setData:function(e){var t=this;Object.keys(e).forEach(function(n){t.$set(t.$data,n,e[n])})},getImage:function(){var t=this;e.chooseImage({success:function(n){t.imgs=n.tempFilePaths[0],e.showLoading({title:"识别中"}),e.uploadFile({url:o.default.websiteUrl+"annexes/businesslicense",filePath:n.tempFilePaths[0],fileType:"uploadFile",name:"upload",formData:{loginMark:o.default.getloginMark(),token:"",data:"{}"},success:function(n){var o=JSON.parse(n.data);if(200==o.code){var i="https://cszx.yiruit.net",a=i+o.data.path;t.img=a,t.MerName=o.data.name,t.MerPer=o.data.person,e.showToast({icon:"none",title:"识别成功！"})}else e.hideLoading(),e.showToast({icon:"none",title:o.info});e.hideLoading()},fail:function(){e.hideLoading(),e.showToast({icon:"none",title:"识别失败"})}}),t.setData({img:n.tempFilePaths[0]})}})},openCodeDialog:function(){var t=this,n=this;""!=n.mobile?o.default.checkmobile(n.mobile)?n.clikType||(n.getTime(),n.codestr=o.default.MathRand(4),n.clikType=!0,e.request({url:o.default.websiteUrl+"send/sendcode",method:"GET",data:{loginMark:o.default.getloginMark(),token:"",data:'{"phone": "'+self.mobile+'"}'},success:function(n){200==n.data.code?t.codes=n.data.info:e.showToast({icon:"none",title:"获取验证码失败,请重试"})},fail:function(){e.hideLoading(),e.showToast({icon:"none",title:"网络异常,请稍后重试"})}})):e.showToast({icon:"none",title:"请输入正确的手机号码"}):e.showToast({icon:"none",title:"请输入你的手机号码"})},getTime:function(){var e=this,t=setInterval(function(){e.timeNum--,e.timeNum<=0?(e.tipsCode="重新获取验证码",e.timeNum=e.timeOut,e.clikType=!1,clearInterval(t)):e.tipsCode="重新发送"+e.timeNum+"秒"},1e3)},formSubmit:function(t){t.detail.value.plans;""!=this.merchantname?""!=this.artiperson?""!=this.imgs?""!=this.mobile?o.default.checkmobile(this.mobile)?""!=this.code&&this.code==this.codes&&this.codes==this.code?this.password.length<6||this.password.length>12?e.showToast({icon:"none",title:"请输入6-12个字符的密码"}):this.password==this.conpassword?""!=this.account?(e.showLoading({mask:!0,title:"注册中，请稍候"}),e.request({url:o.default.websiteUrl+"remerchant/registration",data:{loginMark:o.default.getloginMark(),token:"",data:'{"phone": "'+self.mobile+'","artiperson": "'+self.artiperson+'","password": "'+self.password+'","merchantname":"'+self.merchantname+'","businesslicense":"'+self.img+'"}'},method:"GET",dataType:"json",success:function(t){e.hideLoading(),200==t.data.code?(e.showToast({icon:"none",title:"注册成功，请登录",duration:2500}),e.removeStorageSync("sdlstate1"),setTimeout(function(){e.redirectTo({url:"MerLogin"})},2800)):e.showToast({icon:"none",title:t.data.info,duration:2e3})},fail:function(){e.hideLoading(),e.showToast({icon:"none",title:"网络异常,请稍后重试",duration:2e3})}})):e.showToast({icon:"none",title:"请输入平台账号"}):e.showToast({icon:"none",title:"密码确认错误"}):e.showToast({icon:"none",title:"验证码错误"}):e.showToast({icon:"none",title:"请输入正确的手机号码"}):e.showToast({icon:"none",title:"请输入你的手机号码"}):e.showToast({icon:"none",title:"请上传营业执照"}):e.showToast({icon:"none",title:"请输入法人代表"}):e.showToast({icon:"none",title:"请输入企业名"})},openlogin:function(){e.navigateTo({url:"MerLogin"})}}};t.default=a}).call(this,n("543d")["default"])},2094:function(e,t,n){"use strict";var o=n("e7ae"),i=n.n(o);i.a},3889:function(e,t,n){"use strict";n.r(t);var o=n("44e0"),i=n("8780");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("2094");var s,c=n("f0c5"),l=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=l.exports},"44e0":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return o})},"74cb":function(e,t,n){"use strict";(function(e){n("557f"),n("921b");o(n("66fd"));var t=o(n("3889"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},8780:function(e,t,n){"use strict";n.r(t);var o=n("007f"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a},e7ae:function(e,t,n){}},[["74cb","common/runtime","common/vendor"]]]);