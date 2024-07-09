import { init as userRepoInit } from './user/repo.js';
import { init as portfolioRepoInit } from './portfolio/repo.js';
import { init as tickerRepoInit } from './ticker/repo.js';
import { init as transactionRepoInit } from './transaction/repo.js';
import { init as batRepoInit } from './bar/repo.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => {
  const userRepo = userRepoInit(pool);
  const portfolioRepo = portfolioRepoInit(pool);
  const tickerRepo = tickerRepoInit(pool);
  const transactionRepo = transactionRepoInit(pool);
  const barRepo = batRepoInit(pool);

  return {
    user: userRepo,
    portfolio: portfolioRepo,
    ticker: tickerRepo,
    transaction: transactionRepo,
    bar: barRepo,
  };
};
