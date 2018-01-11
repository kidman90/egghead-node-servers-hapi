(async () => {
  const Hapi = require('hapi');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.state('hello', {
    ttl: 60 * 60 * 1000,
    isHttpOnly: true,
    encoding: 'iron',
    password: 'a5LewP10pXNbWUdYQakUfVlk1jUVuLuUU6W1WEE302k',
    isSecure: false
  })

  await server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, h) {
        let hello = request.state.hello.name;
        return h.response(`Cookies! ${hello}`)
          .state('hello', { name: 'Maciek' });
      }
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
