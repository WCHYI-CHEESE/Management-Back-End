require('dotenv').config();
const http = require('http');
const apps = require('./index');
const server = http.createServer(apps);
server.listen(process.env.PORT);