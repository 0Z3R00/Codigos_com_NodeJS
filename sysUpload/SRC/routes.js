const express = require('express');
const routes = express.Router();
const UploadController = require('./controller/UploadController');


routes.post('/uploads', UploadController.index);
module.exports = routes;