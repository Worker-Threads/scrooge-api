/** @typedef {import('./api/types.js').API} API */

import { config } from './config.js';
import { init as pgPoolInit } from './infra/pg.js';
import { init as userRepoInit } from './data/user/main.js';
import { init as userServiceInit } from './services/user.js';
import { init as userApiInit } from './api/user/user.js';
import { init as serverInit } from './server/server.js';

const pool = pgPoolInit(config.pg);
const userRepo = userRepoInit(pool);
const userService = userServiceInit({ userRepo });
const userApi = userApiInit({ userService });

serverInit({ user: userApi });
