import { init as authApiInit } from './auth/auth.js';
import { init as userApiInit } from './user/user.js';
import { init as portfolioApiInit } from './portfolio/portfolio.js';
import { init as transactionApiInit } from './transaction/transaction.js';

/** @type {import('./types.d.ts').init} */
export const init = (services) => {
  const authApi = authApiInit({ authService: services.auth });
  const userApi = userApiInit({ userService: services.user });
  const portfolioApi = portfolioApiInit({
    portfolioService: services.portfolio,
  });
  const transactionApi = transactionApiInit({
    transactionService: services.transaction,
  });

  return {
    auth: authApi,
    user: userApi,
    portfolio: portfolioApi,
    transaction: transactionApi,
  };
};
