import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ userService }) => ({
  me: {
    method: 'get',
    access: 'common',
    schema: schemas.me,
    handler: (session, request) => {
      const { user } = session;

      return userService.findById(user.id);
    },
  },
});
