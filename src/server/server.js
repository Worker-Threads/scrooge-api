/** @typedef {import('./types').init} init */

import { fastify } from 'fastify';
import { plugins } from './plugins.js';
import { config } from '../config.js';

export const server = fastify();

for (const plugin of plugins)
  await server.register(plugin.plugin, plugin.options);

/** @type {init} */
export const init = ({ services, apis }) => {
  for (const [service, api] of Object.entries(apis)) {
    for (const [route, endpoint] of Object.entries(api)) {
      const { access, method, params, schema, handler } = endpoint;
      const urlParams = params?.length ? `/:${params.join(':/')}` : '';
      const path = `/${service}/${route}${urlParams}`;
      const opts = { schema: { tags: [service], ...schema.properties } };

      server[method](path, opts, async (request, reply) => {
        const session =
          access !== 'none'
            ? await services.auth.verify(request.headers.authorization, access)
            : null;

        return handler(session, request);
      });
    }
  }

  server.listen(config.server, () => {
    console.log(`Listening on ${config.server.port}...`);
  });
};
