const express = require('express')
const  routes = express.Router()

const product = require('./app/controllers/productControllers')

/* Method GET */
routes.get('/', product.home)

routes.get('/admin/recipe/create', product.create)

routes.get('/admin/recipe/:id/edit', product.edit)
routes.get('/admin/recipe/:id', product.show)





routes.post('/admin/recipe', product.post )

routes.put('/admin/recipe', product.put)

routes.delete('/admin/recipe', product.delete)











module.exports = routes
  
