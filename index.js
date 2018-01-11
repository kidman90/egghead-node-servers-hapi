(async () => {
  const Hapi = require('hapi');
  const Joi = require('joi');

  const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
  });

  await server.route({
    method: ['POST', 'PUT'],
    path: '/user/{id?}',
    config: {
      validate: {
        params: Joi.object({
          id: Joi.number()
        }),
        payload: Joi.object({
          id: Joi.number()
        }).unknown(),
        query: Joi.object({
          id: Joi.number()
        })
      },
      handler: function (request, h) {
        return {
          params: request.params,
          query: request.query,
          payload: request.payload
        };
      }
    }
  });

  await server.start();

  console.log(`Started at: ${server.info.uri}`);
})();
