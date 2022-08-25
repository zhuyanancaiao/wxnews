require('dotenv').config()
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
   appid: process.env.id, // 你的appid  1s        
   secret: process.env.secret, // 你的secret 2
  };
  try {
	  var res = await axiosGet('https://api.weixin.qq.com/cgi-bin/token', params);
  } catch(err) {
	  console.log(err)
  }
  return res.data.access_token;
}


async function templateMessageSend() {
	
  
  try{
	// ================
	var date = await info.nowDate()
	var loveday = await info.date(date)
	var weather = await info.weather('南京市')
			var love_mesg = weather.data.data.ganmao
			var weather_type = weather.data.data.forecast[0].type
			var min_temperature = weather.data.data.forecast[0].low
			var max_temperature = weather.data.data.forecast[0].high  
	var saying = await info.saying()
	console.log(saying.data.data.text)
	var icon = await info.weatherIcon(weather_type)
	var num = await info.randomColor(0,2) 
	
	// ===============d=
	var token = await getToken();  
  } catch (err) {
	 console.log(err) 
  }
  
    const colorarry = static.color[num]
  
  
  const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
  const params = {
   touser: process.env.touser, // 用户openid 我的
   template_id: process.env.templateid, // 模板id 4  sssssssssssssssss 
   
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
	    value: 'ღ'+ saying.data.data.text + 'ღ',
	    color: colorarry.cl6,
	  },
    },
  };
  let res = await axiosPost(url, params);
  console.log('发送了信息',res.status)
}
templateMessageSend();
process.on('unhandledRejection', error => {
 console.log('我帮你处理了s', error.message);
});

// console.log('环境变量==',process)
// console.log('环境变量==',process.env)
console.log('环境变量APP_ID==s',process.env.id)
console.log('环境变量APP_SECRET==',process.env.secret)
console.log('环境变量APP_TOUSER==',process.env.touser)
console.log('环境变量TEMPLATE_ID==',process.env.templateid)