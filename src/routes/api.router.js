const express = require('express')
const {
  httpPing,
  httpGetPosts
} = require('./api.controller');


const apiRouter = express.Router();

apiRouter.get('/api/ping', httpPing)
apiRouter.get('/api/posts', httpGetPosts)

module.exports = apiRouter;