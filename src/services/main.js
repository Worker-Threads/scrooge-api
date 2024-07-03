import { init as userServiceInit } from './user/user.js';

/** @type {import('./types.d.ts').init} */
export const init = (repos) => {
  const userService = userServiceInit({ userRepo: repos.user });

  return { user: userService };
};
