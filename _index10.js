(async () => {
  const Hapi = require('hapi');
  const Boom = require('boom');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.register({
    plugin: require('vision')
  });

  await server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  });

  await server.ext({
    type: 'onPreResponse',
    method: function (request, h) {
      let resp = request.response;
      if (!resp.isBoom) return h.continue;

      return h.view('error', resp.output.payload)
        .code(resp.output.statusCode);
    }
  });

  await server.route({
    method: 'GET',
    path: '/{name?}',
    handler: function (request, h) {
      // return Boom.badRequest();
      return Boom.notFound();
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
