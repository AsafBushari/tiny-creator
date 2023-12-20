const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const tinyUrlRoutes = require('./src/routes/tinyUrl');

function createServer(){

    app.use(cors());
    app.use(bodyParser.json());

    tinyUrlRoutes(app);

    return app;

}

module.exports = createServer;
