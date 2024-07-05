import { init as authServiceInit } from './auth/auth.js';
import { init as userServiceInit } from './user/user.js';
import { init as portfolioServiceInit } from './portfolio/portfolio.js';

/** @type {import('./types.d.ts').init} */
export const init = (repos) => {
  const authService = authServiceInit({ userRepo: repos.user });
  const userService = userServiceInit({ userRepo: repos.user });
  const portfolioService = portfolioServiceInit({
    portfolioRepo: repos.portfolio,
  });

  return {
    user: userService,
    auth: authService,
    portfolio: portfolioService,
  };
};
