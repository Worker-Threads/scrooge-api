import type { Pool } from 'pg';
import type { UserRepo } from './user/types.d.ts';
import type { PortfolioRepo } from './portfolio/types.d.ts';

interface Repos {
  user: UserRepo;
  portfolio: PortfolioRepo;
}

export function init(pool: Pool): Repos;
