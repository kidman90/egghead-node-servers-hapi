(async () => {
  const Hapi = require('hapi');

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
    layout: true,
    path: 'views'
  });

  await server.route({
    method: 'GET',
    path: '/{name?}',
    handler: function (request, h) {
      return h.view('home', { name: request.params.name || 'World' });
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
