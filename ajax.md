# Ajax

## 简介

异步js和xml（Asynchronous JavaScript And XML）。

通过Ajax可以在浏览器向服务器发送请求。

优势：无刷新获取数据。

缺点：SEO不友好（爬虫爬不到数据）、存在跨域问题

懒加载：按需加载，提高加载速度

## XML

XML：可扩展标记语言，用于传输和存储数据，自定义标签

```xml
<student>
	<name>小明</name>
	<age>18</age>
<student>
```

已被JSON取代

## JSON

JS对象简谱（JavaScript Object Notation），一种轻量级的数据交换格式。

```json
{"naem":"小明","age":"18"}
```

## HTTP

超文本传输协议（Hyper Text Transfer Protocol，HTTP）是一个简单的请求-响应协议

### 请求报文

```
行		POST	/s?ie=utf-8		HTTP/1.1
头		Host: local.com
		 Cookie: name=local
空行
体		name=xiaoming&age=18
```

### 响应报文

```
行		HTTP/1.1	200 	OK
头		Content-Type:text/html;charset+utf-8
		Content-Length: 2048
空行
体		<html>
			<head>
			</head>
			<body>
				<h1>小明</h1>
			</body>
		</html>
```

## [Node.js](https://nodejs.org/zh-cn/)

基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时环境。

## [Express](https://www.expressjs.com.cn/)

web开发框架

学习Ajax需要先服务端发送请求，所以需要服务端框架

### 安装

```
npm i express
```

### 使用

```js
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
```

## XMLHttpRequest

### 基本步骤

```js
//1.创建对象 
const xhr = new XMLHttpRequest()
// 2.初始化，设置请求方法和url,get参数写这
xhr.open('GET','http://localhost:8000/serve/s?name=xiaoming&age=18')
// 3.发送请求，post参数写这
//xhr.send('name=xiaoming&age=18')
xhr.send()
// 4.处理服务返回结果
// readystate 是xhr对象的属性，表示状态0：未初始化 1：open完毕 2：send完毕 3：返回部分 4：返回全部
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.status) //状态码
            console.log(xhr.statusText) //状态字符串
            console.log(xhr.getAllResponseHeaders())//所有响应头
            console.log(xhr.response)//响应体
        }
    }
}
```

### 设置请求头

```js
xhr.open('POST','http://localhost:8000/serve')
// 设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
xhr.send()
```

### 响应JSON

```js
 const data = {
    name: 'xiaohong'
  }
  let str = JSON.stringify(data)
  response.send(str)
```

### JSON转str

```js
// 自动数据转换
xhr.responseType = 'json'
```

```js
// 手动转换
let data = JSON.parse(xhr.response)
```

## [Nodemon](https://www.npmjs.com/package/nodemon)

检查文件更改，自动重启服务

### 安装

```
//
npm i  -g nodemon

//
npm i  --save-dev nodemon
```

### 使用

```
nodemon [your node app]

nodemon -h

nodemon ./server.js localhost 8080
```

## IE缓存问题

url参数加上时间戳

```js
xhr.open('GET','http://localhost:8000/serve/ie?t='+Date.now())
```

## 超时与网络延迟

```js
setTimeout(() => {
    response.send('请求超时')
}, 3000);
```

```js
xhr.timeout = 2000
xhr.ontimeout = function(){
	alert('网络延迟')
}
```

## 取消请求

```js
 xhr.abort()
```

#### 重复发送取消上一个请求

```js
let isSending = false
    btns[0].onclick =function(){
      if (isSending) {
        xhr.abort()
      }
      xhr = new XMLHttpRequest()
      isSending = true 
      xhr.open('GET','http://localhost:8000/delay')
      xhr.send()
      xhr.onreadystatechange = function(){
        if (xhr.readystatus === 4) {
          isSending = false
        }
      }
    }
```

## jQuery

```js
 $('button').eq(0).click(function(){
     $.get('http://localhost:8000/jquery-serve',{a:100,b:200},function(data){
         console.log(data)
     },'json')
 })
$('button').eq(1).click(function(){
    $.post('http://localhost:8000/jquery-serve',{a:100,b:200},function(data){
        console.log(data)
    })
})
$('button').eq(2).click(function(){
    $.ajax({
        url: 'http://localhost:8000/jquery-serve',
        data: {a:100,b:200},
        type: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data)
        },
        error: function(){
            console.log('未知错误')
        },
        timeout: 2000
    })
})
```

