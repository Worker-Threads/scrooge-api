import { init as userRepoInit } from './user/main.js';
import { init as portfolioRepoInit } from './portfolio/main.js';
import { init as tickerRepoInit } from './ticker/main.js';
import { init as transactionRepoInit } from './transaction/main.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => {
  const userRepo = userRepoInit(pool);
  const portfolioRepo = portfolioRepoInit(pool);
  const tickerRepo = tickerRepoInit(pool);
  const transactionRepo = transactionRepoInit(pool);

  return {
    user: userRepo,
    portfolio: portfolioRepo,
    ticker: tickerRepo,
    transaction: transactionRepo,
  };
};
