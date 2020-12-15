const express  = require('express')

const routes = express.Router()


const usersControllers = require('../app/controllers/usersController')

routes.get('/chefs', usersControllers.index)



module.exports = routes

