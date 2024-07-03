/** @typedef {import('./api/types.js').API} API */

import { config } from './config.js';
import { init as pgPoolInit } from './infra/pg.js';
import { init as reposInit } from './data/main.js';
import { init as servicesInit } from './services/main.js';
import { init as apisInit } from './api/main.js';
import { init as serverInit } from './server/server.js';

const pool = pgPoolInit(config.pg);
const repos = reposInit(pool);
const services = servicesInit(repos);
const api = apisInit(services);
serverInit(api);
