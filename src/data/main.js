import { init as userRepoInit } from './user/main.js';
import { init as portfolioRepoInit } from './portfolio/main.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => {
  const userRepo = userRepoInit(pool);
  const portfolioRepo = portfolioRepoInit(pool);

  return { user: userRepo, portfolio: portfolioRepo };
};
