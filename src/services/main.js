import { init as authServiceInit } from './auth/service.js';
import { init as userServiceInit } from './user/service.js';
import { init as portfolioServiceInit } from './portfolio/service.js';
import { init as tickerServiceInit } from './ticker/service.js';
import { init as transactionServiceInit } from './transaction/service.js';
import { init as analyticsServiceInit } from './analytics/service.js';
import { init as barServiceInit } from './bar/service.js';

/** @type {import('./types.d.ts').init} */
export const init = (repos) => {
  const authService = authServiceInit({ userRepo: repos.user });
  const userService = userServiceInit({ userRepo: repos.user });
  const portfolioService = portfolioServiceInit({
    portfolioRepo: repos.portfolio,
  });
  const tickerService = tickerServiceInit({
    tickerRepo: repos.ticker,
  });
  const transactionService = transactionServiceInit({
    portfolioRepo: repos.portfolio,
    transactionRepo: repos.transaction,
    tickerRepo: repos.ticker,
  });
  const analyticsService = analyticsServiceInit({
    portfolioRepo: repos.portfolio,
    transactionRepo: repos.transaction,
  });
  const barService = barServiceInit({
    tickerRepo: repos.ticker,
    barRepo: repos.bar,
  });

  return {
    user: userService,
    auth: authService,
    portfolio: portfolioService,
    ticker: tickerService,
    transaction: transactionService,
    analytics: analyticsService,
    bar: barService,
  };
};
