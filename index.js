const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const apiCollectionRoute = require('./routes/apiCollection');
const apps = express();

apps.use(cors());
apps.use(express.urlencoded({ extended: true }));
apps.use(express.json());
apps.use('/user', userRoute);
apps.use('/category', categoryRoute);
apps.use('/apiCollection', apiCollectionRoute);

module.exports = apps;