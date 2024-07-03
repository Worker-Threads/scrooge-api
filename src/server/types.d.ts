import {
  FastifyPluginCallback,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify';
import type { APIs } from '../api/types.d.ts';

export type Plugin = {
  plugin: FastifyPluginCallback | FastifyPluginAsync;
  options?: FastifyPluginOptions;
};

export function init(apis: APIs): void;
