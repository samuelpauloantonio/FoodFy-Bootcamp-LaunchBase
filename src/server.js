const express = require("express")
const nunjucks = require("nunjucks")
const server = express()
const routes = require('./Routes')
const { urlencoded } = require("express")
const methodOverride = require('method-override')




server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
  express : server,
  autoescape:false,
  noCache:true
})



server.use(urlencoded({extended : true }))

server.use(express.static("src/lib"))
server.use(express.static("public/css"))
server.use(express.static("public/img"))

server.use(methodOverride('_method'))


server.use(routes)


server.listen(3004, function(){
  console.log("server is runnig")
})
