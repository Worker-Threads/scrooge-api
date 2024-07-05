import type { Pool } from 'pg';
import type { Portfolio } from '../../entities/portfolio.d.ts';

export class PortfolioRepo {
  create: (portfolio: Omit<Portfolio, 'id'>) => Promise<Portfolio>;
  update: (
    id: number,
    portfolio: Partial<Pick<Portfolio, 'type' | 'title'>>,
  ) => Promise<Portfolio>;
  findOne: (definition: Partial<Portfolio>) => Promise<Portfolio | null>;
  delete: (id: number) => Promise<{ removed: boolean }>;
}

export function init(pg: Pool): PortfolioRepo;
