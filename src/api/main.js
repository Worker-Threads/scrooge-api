import { init as authApiInit } from './auth/auth.js';
import { init as userApiInit } from './user/user.js';

/** @type {import('./types.d.ts').init} */
export const init = (services) => {
  const authApi = authApiInit({ authService: services.auth });
  const userApi = userApiInit({ userService: services.user });

  return { auth: authApi, user: userApi };
};
