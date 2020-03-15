const express = require('express');

const Post = require('../posts/posts-router');

const server = express();

server.use(express.json());

// Set up end point
server.use('/api/posts', Post);

server.get('/', (req, res) => {
  res.send('Server Running');
});

module.exports = server;