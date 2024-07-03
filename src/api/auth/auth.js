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
    access: 'none',
    schema: schemas.verify,
    handler: (_session, request) => {
      const { headers } = request;

      return authService.verify(headers.authorization);
    },
  },
});
