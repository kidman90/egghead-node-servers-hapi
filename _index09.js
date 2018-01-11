(async () => {
  const Hapi = require('hapi');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  server.ext({
    type: 'onRequest',
    method: function (request, h) {
      console.log('onRequest');
      request.setUrl('/');
      request.setMethod('GET');
      return h.continue;
    }
  });

  server.ext({
    type: 'onPreAuth',
    method: function (request, h) {
      console.log('onPreAuth');
      return h.continue;
    }
  });

  server.ext({
    type: 'onPostAuth',
    method: function (request, h) {
      console.log('onPostAuth');
      return h.continue;
    }
  });

  server.ext({
    type: 'onPreHandler',
    method: function (request, h) {
      console.log('onPreHandler');
      return h.continue;
    }
  });

  server.ext({
    type: 'onPostHandler',
    method: function (request, h) {
      console.log('onPostHandler');
      return h.continue;
    }
  });

  server.ext({
    type: 'onPreResponse',
    method: function (request, h) {
      console.log('onPreResponse');
      return h.continue;
    }
  });

  await server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      console.log('handler');
      return 'hello world';
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
