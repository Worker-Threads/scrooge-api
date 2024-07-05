import { init as authServiceInit } from './auth/auth.js';
import { init as userServiceInit } from './user/user.js';
import { init as portfolioServiceInit } from './portfolio/portfolio.js';
import { init as transactionServiceInit } from './transaction/transaction.js';

/** @type {import('./types.d.ts').init} */
export const init = (repos) => {
  const authService = authServiceInit({ userRepo: repos.user });
  const userService = userServiceInit({ userRepo: repos.user });
  const portfolioService = portfolioServiceInit({
    portfolioRepo: repos.portfolio,
  });
  const transactionService = transactionServiceInit({
    portfolioRepo: repos.portfolio,
    transactionRepo: repos.transaction,
    tickerRepo: repos.ticker,
  });

  return {
    user: userService,
    auth: authService,
    portfolio: portfolioService,
    transaction: transactionService,
  };
};
