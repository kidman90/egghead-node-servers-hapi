'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'hello hapi';
  }
});

server
  .start()
  .then(() => console.log(`Started at: ${server.info.uri}`))
  .catch(err => console.log(err));
