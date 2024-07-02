/** @typedef {import('../api/types.js').API} API */

import { fastify } from 'fastify';
import { config } from '../config.js';

export const server = fastify();

/** @param {Record<string, API>} api */
export const init = (api) => {
  for (const [domain, handlersMap] of Object.entries(api)) {
    for (const [route, handler] of Object.entries(handlersMap)) {
      server[handler.method](`/${domain}/${route}`, handler);
    }
  }

  server.listen({ port: config.server.port, host: '0.0.0.0' }, () => {
    console.log(`Listening on ${config.server.port}...`);
  });
};
