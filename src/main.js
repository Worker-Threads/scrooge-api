/** @typedef {import('./api/types.js').API} API */

import pg from 'pg';
import { config } from './config.js';
import { init as userRepoInit } from './data/user/main.js';
import { init as userApiInit } from './api/user/user.js';
import { init as serverInit } from './server/server.js';

const pool = new pg.Pool(config.pg);
const userRepo = userRepoInit(pool);
const userApi = userApiInit({ userRepo });

/** @type {API} */
const api = { user: userApi };
serverInit(api);
