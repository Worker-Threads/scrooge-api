import type { Repos } from '../data/types.js';
import type { AuthService } from './auth/types.d.ts';
import type { UserService } from './user/types.d.ts';
import type { PortfolioService } from './portfolio/types.d.ts';
import type { TransactionService } from './transaction/types.d.ts';

export interface Services {
  auth: AuthService;
  user: UserService;
  portfolio: PortfolioService;
  transaction: TransactionService;
}

export function init(repos: Repos): Services;
