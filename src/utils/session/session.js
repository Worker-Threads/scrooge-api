import * as fs from 'node:fs';
import { jwt } from './jwt.js';
import { env } from '../env/env.js';
import { exception } from '../exception/exception.js';
import { config } from '../../config.js';

/** @type {import('./types.d.ts').Sessions} */
export const sessions = {
  generate: (user) => {
    const { id } = user;
    let privateKey = fs.readFileSync(
      env.requireEnv('PRIVATE_KEY_FILENAME'),
      'utf8',
    );
    const token = jwt.issue(privateKey, { id }, config.jwt.tokenTtl);
    return { token, user };
  },

  validate: (token) => {
    if (!token) throw exception.unauthorized('No token provided.');
    let publicKey = fs.readFileSync(
      env.requireEnv('PUBLIC_KEY_FILENAME'),
      'utf8',
    );
    return jwt.verify(publicKey, token);
  },
};
