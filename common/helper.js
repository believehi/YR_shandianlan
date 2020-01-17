const websiteUrl = 'http://wx.yuanqimiao.com/yiru/sdl/';
const imgUrl = "https://wx.yuanqimiao.com/";
const now = Date.now || function() {
	return new Date().getTime();
};
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
//判断手机号码是否正确
const checkmobile = function(mobile) {
	mobile = mobile || '';
	var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
	return (reg.test(mobile));
}

//小程序端自动生成设备识别码
const customuuid = function() {
	var len = 29;
	var radix = 16; //基数
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return 'MP_' + uuid.join('');
}

//会员退出
const logout = function() {
	uni.removeStorageSync('sdlstate');
	uni.reLaunch({
		url: '/pages/Login/login'
	});
}
const logout_Mer = function() {
	uni.removeStorageSync('sdlstate');
	uni.removeStorageSync('token');
	uni.reLaunch({
		url: '/pages/Login/MerLogin'
	});
}

//判断是否登陆，如果obj位false，则值判断，返回true或false，如果obj为true，则直接转跳到登陆页面
const islogin = function(obj) {
	var isok = false;
	var userState = getstate();
	if (userState.userid && userState.userid != '') {
		isok = true;
	} else {
		isok = false;
	}
	if (obj && !isok) {
		uni.reLaunch({
			url: '/pages/Login/login'
		});
	} else {
		return isok;
	}
}
const islogin_Mer = function(obj) {
	var isok = false;
	var userState = getstate();
	if (userState.userid && userState.userid != '') {
		isok = true;
	} else {
		isok = false;
	}
	if (obj && !isok) {
		uni.reLaunch({
			url: '/pages/Login/MerLogin'
		});
	} else {
		return isok;
	}
}

// 生成四位数的随机数
const MathRand = function(len) {
	var Num = "";
	for (var i = 0; i < len; i++) {
		Num += Math.floor(Math.random() * 10);
	}
	return Num;
}

//获取会员缓存的信息
const getstate = function() {
	var state = uni.getStorageSync('sdlstate') || "{}";
	return JSON.parse(state);
}
//设置会员缓存信息
const setstate = function(userid, attribute, mobile, nickname) {
	var state = this.getstate();
	state.userid = userid;
	state.mobile = mobile;
	state.attribute = attribute;
	state.nickname = nickname;
	//state.type = type ? type : 1;
	uni.setStorageSync('sdlstate', JSON.stringify(state));
}


//统一封装的请求数据
const postdata = function(data) {
	var pos = {};
	pos.loginMark = getloginMark();
	pos.token = gettoken();
	pos.data = JSON.stringify(data);
	console.log(data)
	console.log(JSON.stringify(data))
	return pos;
};
//如果接口返回未找到登录信息则清空缓存并转跳到登陆页面
const goout = function(obj) {
	if (obj == '未找到登录信息' || obj == '登录信息已过期' || obj == '用户不存在') {
		//console.log("-"+obj+"-");
		uni.removeStorageSync('sdlstate');
		uni.reLaunch({
			url: '/pages/Login/login'
		});
	}
}

//获取设备识别码
const getloginMark = function() {
	// #ifdef MP
	//uni.removeStorageSync('loginMark');
	var mark = uni.getStorageSync('loginMark');
	if (!mark) {
		mark = this.customuuid();
		uni.setStorageSync('loginMark', mark);
	}
	return mark;
	// #endif
	// #ifdef APP-PLUS
	return plus.device.uuid;
	// #endif

}
//获取令牌
const gettoken = function() {
	var token = uni.getStorageSync('token');
	if (token == null) {
		uni.showToast({
			icon: 'none',
			title: '请先登录'
		});
		uni.redirectTo({
			url: 'login'
		});
		return;
	}
	return token;
}


export default {
	websiteUrl,
	imgUrl,
	now,
	isArray,
	postdata,
	getloginMark,
	gettoken,
	customuuid,
	getstate,
	setstate,
	islogin,
	islogin_Mer,
	logout,
	logout_Mer,
	checkmobile,
	goout,
	MathRand,
}
