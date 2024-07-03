import { init as userApiInit } from './user/user.js';

/** @type {import('./types.d.ts').init} */
export const init = (services) => {
  const userApi = userApiInit({ userService: services.user });

  return { user: userApi };
};
