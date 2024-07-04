import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ userService }) => ({
  me: {
    method: 'get',
    access: 'common',
    schema: schemas.me,
    handler: (session, request) => {
      const { user } = session;

      return user;
    },
  },

  user: {
    method: 'get',
    access: 'none',
    params: ['id'],
    schema: schemas.user,
    handler: (_session, request) => {
      const { id } = request.params;

      return userService.findById(id);
    },
  },
});
