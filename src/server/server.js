/** @typedef {import('./types').init} init */

import { fastify } from 'fastify';
import { config } from '../config.js';

export const server = fastify();

/** @type {init} */
export const init = (apis) => {
  for (const [service, api] of Object.entries(apis)) {
    for (const [route, endpoint] of Object.entries(api)) {
      const { access, method, params, schema, handler } = endpoint;
      const urlParams = params?.length ? `/:${params.join(':/')}` : '';
      const path = `/${service}/${route}${urlParams}`;
      const opts = { schema: schema.properties };
      const session =
        access !== 'none'
          ? {
              /* Here some session handling  */
            }
          : null;

      server[method](path, opts, (request, reply) => handler(session, request));
    }
  }

  server.listen({ port: config.server.port, host: '0.0.0.0' }, () => {
    console.log(`Listening on ${config.server.port}...`);
  });
};
