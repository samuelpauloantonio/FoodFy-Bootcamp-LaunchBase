const express = require("express")
const nunjucks = require("nunjucks")
const menu = require("./data_server")

const server = express()

server.get("/", function(req , res){
  return  res.render("home_page", {menu_single2 : menu})
})

server.get("/sobre", function(req, res){
  return res.render("sobre")
})


server.get("/receitas", function(req, res){
  return res.render("receitas",{menu_single2 : menu })
})


server.set("view engine", "njk")

nunjucks.configure("views", {
  express : server
})


server.listen(3000, function(){
  console.log("server is runnig")
})


server.use(express.static("public/css"))
server.use(express.static("public/img"))
server.use(express.static("public/js"))





