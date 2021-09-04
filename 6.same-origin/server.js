const { request, response } = require('express')
const express = require('express')

const app = express()

app.all('/home', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.all('/data', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const data = {
    data: 'hello same origin'
  }
  response.send(JSON.stringify(data))
})

app.listen(9000, () => {
  console.log('http://localhost:90000/server')
})