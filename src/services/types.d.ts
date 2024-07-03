import type { Repos } from '../data/types.js';
import type { UserService } from './user/types.d.ts';

export interface Services {
  user: UserService;
}

export function init(repos: Repos): Services;
