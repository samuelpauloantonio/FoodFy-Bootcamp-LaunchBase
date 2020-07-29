const express = require("express")
const nunjucks = require("nunjucks")
const data_receitas = require("./data_server")
const data_home = require("./data_Home_server")

const server = express()

server.get("/", function(req , res){
  return  res.render("home_page", {menu_single : data_home})
})

server.get("/sobre", function(req, res){
  return res.render("sobre")
})


server.get("/receitas", function(req, res){
  return res.render("receitas",{menu_single2 : data_receitas })
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





