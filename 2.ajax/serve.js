// 1.引入express
const { request, response } = require('express')
const express = require('express')

// 2.创建语言对象
const app = express()

// 3.创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/serve', (request, response) => {
  // 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应
  response.send('hello ajax get')
})

app.post('/serve', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.send('hello ajax post')
})

app.all('/json-serve', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  const data = {
    name: 'xiaohong'
  }
  let str = JSON.stringify(data)
  response.send(str)
})

app.get('/delay', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  setTimeout(() => {
    response.send('请求超时')
  }, 3000);
})

app.all('/jquery-serve', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  const data = {
    data: 'hello jquery ajax'
  }
  response.send(JSON.stringify(data))
})

// 4.监听端口启动服务
app.listen(8000, () => {
  console.log('http://localhost:80000/serve')
})