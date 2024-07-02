import 'dotenv/config';
import { requireEnv } from './utils/env.js';

export const config = {
  pg: {
    host: requireEnv('PG_HOST'),
    port: parseInt(requireEnv('PG_PORT')),
    user: requireEnv('PG_USER'),
    database: requireEnv('PG_DATABASE'),
    password: requireEnv('PG_PASSWORD'),
  },
};
