const express  = require('express')

const routes = express.Router()

const HomeControllers = require('../app/controllers/HomeControllers')
const searchController = require('../app/controllers/searchController')

const products = require('./products') 
const users = require('./users')


routes.get('/', HomeControllers.index)
routes.get('/admin/recipe/search', searchController.index)

routes.use('/admin', users)
routes.use('/admin',products)







module.exports = routes