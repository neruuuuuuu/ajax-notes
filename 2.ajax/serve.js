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

app.all('/axios-serve', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const data = {
    data: 'hello axios ajax'
  }
  response.send(JSON.stringify(data))
})

app.all('/fetch-serve', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const data = {
    data: 'hello fetch ajax'
  }
  response.send(JSON.stringify(data))
})

app.all('/check-username', (request, response) => {
  const data = {
    exist: 1,
    msg: '用户名已存在'
  }
  const str = JSON.stringify(data.msg)
  response.end(`handel(${str})`)
})

// 4.监听端口启动服务
app.listen(8000, () => {
  console.log('http://localhost:80000/serve')
})