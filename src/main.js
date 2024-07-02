/** @typedef {import('./api/types.js').API} API */

import { init as serverInit } from './server/server.js';
import { init as userApiInit } from './api/user/user.js';

const userApi = userApiInit();

/** @type {API} */
const api = { user: userApi };
serverInit(api);
