const axios = require('axios');
const icon = require('./icon.js')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
module.exports = {
	//获取当前日期函数
	nowDate:function() {
	  let date = new Date(),
	    seperator1 = '-', //格式分隔符
	    year = date.getFullYear(), //获取完整的年份(4位)
	    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
	    strDate = date.getDate() // 获取当前日(1-31)
	  if (month >= 1 && month <= 9) month = '0' + month // 如果月份是个位数，在前面补0
	  if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate // 如果日是个位数，在前面补0
	 
	  let currentdate = year + seperator1 + month + seperator1 + strDate 
	  return currentdate
	},
	// 时间差
	date:function(nowdate){
		var date1 = nowdate;
		var stime = new Date(date1).getTime();
		var date2 = "2021-01-06";
		var etime = new Date(date2).getTime();
		// console.log(stime);//大的时间
		// console.log(etime);//小的时间
		let usedTime = stime - etime; // 两个时间戳相隔的毫秒数
		let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算相差的天数
		// console.log(days)//相差的时间
		return days
	},
	weather:function(city){
		const BASE_url = 'http://wthrcdn.etouch.cn/weather_mini?city='
		var city = encodeURI(city)
		return new Promise((resolve, reject) => {
			axios.get(BASE_url + city)
				.then(res => {	
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	saying:function(){
		return new Promise((resolve, reject) => {
			axios.get('https://v1.hitokoto.cn/')
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
			});
	},
	// 天气图标
	weatherIcon:function(type){
		let typeicon;
		switch(type)
		{
			case '晴' : typeicon = icon.wether[1]
			break
			case '阴' : typeicon = icon.wether[0]
			break
			case '多云' : typeicon = icon.wether[2]
			break
			case '小雨' : typeicon = icon.wether[3]
			break
			case '中雨' : typeicon = icon.wether[3]
			break
			case '大雨' : typeicon = icon.wether[3]
			break
			case '小雪' : typeicon = icon.wether[7]
			break
			case '中雪' : typeicon = icon.wether[8]
			break
			case '大雪' : typeicon = icon.wether[8]
			break
		}
		return typeicon
	},
	// 随机颜色  Min <= num <= Max
	randomColor:function(Min,Max){
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.round(Rand * Range); //四舍五入
		return num;
	}
}