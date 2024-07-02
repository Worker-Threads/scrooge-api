/** @typedef {import('./types').init} init */

import { fastify } from 'fastify';
import { config } from '../config.js';

export const server = fastify();

/** @type {init} */
export const init = (api) => {
  for (const [service, handlers] of Object.entries(api)) {
    for (const [subPath, endpoint] of Object.entries(handlers)) {
      const { access, method, params, schema, handler } = endpoint;
      const urlParams = params?.length ? `/:${params.join(':/')}` : '';
      const path = `/${service}/${subPath}${urlParams}`;
      const session =
        access !== 'none'
          ? {
              /* Here some session handling  */
            }
          : null;
      server[method](path, { schema: schema.properties }, (request, reply) =>
        handler(session, request),
      );
    }
  }

  server.listen({ port: config.server.port, host: '0.0.0.0' }, () => {
    console.log(`Listening on ${config.server.port}...`);
  });
};
