import type { Pool } from 'pg';
import type { UserRepo } from './user/types.d.ts';
import type { PortfolioRepo } from './portfolio/types.d.ts';
import type { TransactionRepo } from './transaction/types.d.ts';
import type { TickerRepo } from './ticker/types.d.ts';

interface Repos {
  user: UserRepo;
  portfolio: PortfolioRepo;
  ticker: TickerRepo;
  transaction: TransactionRepo;
}

export function init(pool: Pool): Repos;
