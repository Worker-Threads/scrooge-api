import type { Repos } from '../data/types.js';
import type { AuthService } from './auth/types.d.ts';
import type { UserService } from './user/types.d.ts';

export interface Services {
  auth: AuthService;
  user: UserService;
}

export function init(repos: Repos): Services;
