const express = require('express')
const  routes = express.Router()


const multer = require('./app/middleware/multer')

const product = require('./app/controllers/productControllers')
const HomeControllers = require('./app/controllers/HomeControllers')

/* Method GET */
routes.get('/', HomeControllers.index)

routes.get('/admin/recipe/create', product.create)

routes.get('/admin/recipe/:id/edit', product.edit)
routes.get('/admin/recipe/:id', product.show)





routes.post('/admin/recipe', multer.array('photos', 4), product.post )

routes.put('/admin/recipe', multer.array('photos', 4), product.put)

routes.delete('/admin/recipe', product.delete)











module.exports = routes
  
