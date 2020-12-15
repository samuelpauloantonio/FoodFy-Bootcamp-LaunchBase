"use strict";

var express = require('express');

var routes = express.Router();

var usersControllers = require('../app/controllers/usersController');

routes.get('/chefs', usersControllers.index);
module.exports = routes;