const info = require('./modules/wxinfo.js')
const static = require('./modules/icon.js')
// 需要填写的地方已经标出
// 一共4个地方 appID、appsecret、模板ID、微信用户的openid
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



const axiosPost = function (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const axiosGet = function (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

async function getToken() {
  const params = {
    grant_type: 'client_credential',
   appid: 'wxfa719149d39f9f76', // 你的appid  1
   secret: 'a43325f1391f463c8750e17c094773a2', // 你的secret 2
  };
  let res = await axiosGet('https://api.weixin.qq.com/cgi-bin/token', params);
  return res.data.access_token;
}

// 今天的日期
function getNowDate(){
	return info.nowDate()
}
// 时间差
function getDate(date){
	return info.date(date)
}
// 天气预报
function getweather(){
	return new Promise((resolve,reject)=>{
		info.weather('南京市')
			.then(res=>{
				resolve(res.data)
			})
	})
	
}
// 每日金句
function getSaying(){
	return new Promise((resolve,reject)=>{
		info.saying()
			.then(res=>{
				resolve(res.data)
			})
	})
	
}
// 天气图标
function getIcon(weather_type){
	return new Promise((resolve,reject)=>{
		resolve(info.weatherIcon(weather_type))
	})
}
// 0-2的随机数
function getNum(){
	return new Promise((resolve,reject)=>{
		resolve(info.randomColor(0,2))
	})
}

async function templateMessageSend() {
  const date = await getNowDate()
  const loveday = await getDate(date)
  const weather = await getweather()
		const love_mesg = weather.data.ganmao
		const weather_type = weather.data.forecast[0].type
		const min_temperature = weather.data.forecast[0].low
		const max_temperature = weather.data.forecast[0].high  
  const saying = await getSaying()
  const icon = await getIcon(weather_type)
  const num = await getNum()
  // console.log('num===',num)
  
  const colorarry = static.color[num]
  // console.log('colorarry===',colorarry)
  
  const token = await getToken();
  const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
  const params = {
   touser: 'o5Qb46a7Vim04_vkfFVprHzIYL7w', // 用户openid 3dds
   template_id: 'nsPkSagQKgAVBgw6k03pKGjK-OfF330cVUQfiT0Lhyk', // 模板id 4  sssssssssssssssss 
   
    url: 'http://www.baidu.com',
    data: {
	  date: {
	    value: date,
	    color: colorarry.cl1,
	  },
	  weather: {
	    value: weather_type + icon,
	    color: colorarry.cl2,
	  },
	  min_temperature: {
	    value: min_temperature,
	    color: colorarry.cl3,
	  },
	  max_temperature: {
	    value: max_temperature,
	    color: colorarry.cl4,
	  },
	  love_mesg: {
	    value: love_mesg,
	    color: colorarry.cl5,
	  },
	  love_day: {
	    value: loveday,
	    color: colorarry.cl1,
	  },
	  saying: {
	    value: 'ღ'+ saying + 'ღ',
	    color: colorarry.cl6,
	  },
    },
  };
  let res = await axiosPost(url, params);
 console.log('发送了信息===',res)
}

templateMessageSend();
