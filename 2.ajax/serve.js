// 1.引入express
const { request, response } = require('express');
const express = require('express');

// 2.创建语言对象
const app = express();

// 3.创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/serve', (request, response) => {
  // 设置允许跨域
  response.setHeader('Access-Control-allow-Origin', '*')
  // 设置响应
  response.send('hello ajax')
});

// 4.监听端口启动服务
app.listen(8000, () => {
  console.log("服务器已启动，8000端口监听中");
})