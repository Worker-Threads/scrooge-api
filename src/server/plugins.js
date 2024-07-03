/** @typedef {import('./types').Plugin} Plugin */

import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from '../config.js';

/** @type {Plugin} */
const corsPlugin = { plugin: cors };

/** @type {Plugin} */
const swaggerPlugin = {
  plugin: swagger,
  options: {
    swagger: {
      info: {
        title: 'Scrooge API',
        version: '1',
      },
      host: `localhost:${config.server.port}`,
      schemes: ['http'],
      securityDefinitions: {
        ApiToken: {
          description: 'Authorization header token, sample: "SOME_TOKEN',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  },
};

/** @type {Plugin} */
const swaggerUiPlugin = {
  plugin: swaggerUi,
  options: { routePrefix: '/documentation' },
};

export const plugins = [corsPlugin, swaggerPlugin, swaggerUiPlugin];
