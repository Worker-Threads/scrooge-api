import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = () => ({
  greet: {
    method: 'post',
    access: 'none',
    schema: schemas.hello,
    handler: (_session, request) => {
      const { name } = request.body;
      return `Hello ${name}!`;
    },
  },
});
