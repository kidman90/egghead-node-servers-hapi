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

    // return request.params;

    // return h.response({hello: 'hapi'});
    // return h.response(new Error('oops'));
    return h.response('Not Found')
      .code(418)
      .type('text/plain')
      .header('hello', 'world')
      .state('hello', 'world');
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
