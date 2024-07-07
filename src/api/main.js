import { init as authApiInit } from './auth/api.js';
import { init as userApiInit } from './user/api.js';
import { init as portfolioApiInit } from './portfolio/api.js';
import { init as transactionApiInit } from './transaction/api.js';

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
