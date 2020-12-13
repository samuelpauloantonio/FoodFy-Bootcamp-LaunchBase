const express  = require('express')

const routes = express.Router()

const HomeControllers = require('../app/controllers/HomeControllers')
const products = require('./products') 


routes.get('/', HomeControllers.index)

routes.use('/admin',products)







module.exports = routes