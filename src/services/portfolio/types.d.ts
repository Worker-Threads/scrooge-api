import type { User } from '../../entities/user.d.ts';
import type { Portfolio } from './../../entities/portfolio.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';

interface Deps {
  portfolioRepo: PortfolioRepo;
}

export interface PortfolioService {
  create: (
    user: User,
    definition: Pick<Portfolio, 'title' | 'type'>,
  ) => Promise<Portfolio>;
  update: (
    user: User,
    definition: { id: number } & Partial<Pick<Portfolio, 'title' | 'type'>>,
  ) => Promise<Portfolio>;
  findOne: (user: User, definition: Partial<Portfolio>) => Promise<Portfolio>;
  remove: (user: User, id: number) => Promise<{ removed: boolean }>;
}

export function init(deps: Deps): PortfolioService;
