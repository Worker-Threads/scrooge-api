import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ authService }) => ({
  signIn: {
    method: 'post',
    access: 'none',
    schema: schemas.signIn,
    handler: (_session, request) => {
      const { email, password } = request.body;

      return authService.signIn(email, password);
    },
  },

  signUp: {
    method: 'post',
    access: 'none',
    schema: schemas.signUp,
    handler: (_session, request) => {
      const { email, username, password } = request.body;

      return authService.signUp(email, username, password);
    },
  },

  verify: {
    method: 'get',
    access: 'common',
    schema: schemas.verify,
    handler: (session, request) => {
      const { user } = session;

      return user;
    },
  },
});
