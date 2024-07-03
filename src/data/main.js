import { init as userRepoInit } from './user/main.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => {
  const userRepo = userRepoInit(pool);

  return { user: userRepo };
};
