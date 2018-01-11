(async () => {
  const Hapi = require('hapi');
  const Path = require('path');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.register({
    plugin: require('inert')
  });

  await server.route({
    method: 'GET',
    // path: '/hapi.png',
    path: '/{param*}',
    // handler: function (request, h) {
    //   var path = Path.join(__dirname, 'public/hapi.png');
    //   return h.file(path);
    // }
    // handler: {
    //   file: Path.join(__dirname, 'public/hapi.png')
    // }
    handler: {
      directory: {
        path: Path.join(__dirname, 'public')
      }
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
