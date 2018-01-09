(async () => {
  const Hapi = require('hapi');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  const options = {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: ['error'], response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };

  await server.register({
    plugin: require('good'),
    options
  });

  function handler(request, h) {
    // server.log('error', 'Oh no!');
    // server.log('info', 'Replying');
    // return 'hello hapi';
    return request.params;
  }

  await server.route({
    method: 'GET',
    path: '/{stuff*}',
    handler
  });

  await server.route({
    method: 'GET',
    path: '/files/{file}.jpg',
    handler
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
