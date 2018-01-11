(async () => {
  const Hapi = require('hapi');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.route({
    method: ['POST', 'PUT'],
    path: '/',
    config: {
      payload: {
        output: 'data',
        parse: false,
        allow: 'application/json'
      }
    },
    handler: function (request, h) {
      return h.response(request.payload);
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
