const cors = require('cors');
const express = require('express');
const apiRouter = require('./routes/api.router');

// initialize express application
const app = express();

// middlewares

app.use(express.json());
app.use(cors())

// define route
app.use('/', apiRouter);


module.exports = {
  app
}




