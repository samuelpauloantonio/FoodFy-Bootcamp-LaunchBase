"use strict";

var express = require('express');

var routes = express.Router();

var HomeControllers = require('../app/controllers/HomeControllers');

var searchController = require('../app/controllers/searchController');

var products = require('./products');

var users = require('./users');

routes.get('/', HomeControllers.index);
routes.get('/admin/recipe/search', searchController.index);
routes.use('/admin', users);
routes.use('/admin', products);
module.exports = routes;