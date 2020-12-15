const express = require('express')
const  routes = express.Router()


const multer = require('../app/middleware/multer')

const product = require('../app/controllers/productControllers')


routes.get('/recipe/create', product.create)

routes.get('/recipe/:id/edit', product.edit)
routes.get('/recipe/:id', product.show)

// routes.get('/recipe/search', search.index)





routes.post('/recipe', multer.array('photos', 4), product.post )

routes.put('/recipe', multer.array('photos', 4), product.put)

routes.delete('/recipe', product.delete)











module.exports = routes
  
