/** @typedef {import('./types').init} init */

import { fastify } from 'fastify';
import { config } from '../config.js';

export const server = fastify();

/** @type {init} */
export const init = (api) => {
  for (const [domain, handlersMap] of Object.entries(api)) {
    for (const [route, handler] of Object.entries(handlersMap)) {
      const path = `/${domain}/${route}`;
      const session =
        handler.access !== 'none'
          ? {
              /* Here some session handling  */
            }
          : null;
      server[handler.method](
        path,
        { schema: handler.schema },
        (request, reply) => handler.handler(session, request),
      );
    }
  }

  server.listen({ port: config.server.port, host: '0.0.0.0' }, () => {
    console.log(`Listening on ${config.server.port}...`);
  });
};
