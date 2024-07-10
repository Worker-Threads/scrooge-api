import type { User } from '../../entities/user.d.ts';
import type { Portfolio } from '../../entities/portfolio.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type {
  AggTransaction,
  TransactionRepo,
} from '../../data/transaction/types.d.ts';

export type GroupCriteria = '*' | 'portfolio' | 'asset' | 'type' | 'date';
export type GroupFields = 'portfolioId' | 'type' | 'ticker' | 'timestamp';

interface Deps {
  portfolioRepo: PortfolioRepo;
  transactionRepo: TransactionRepo;
}

interface AnalyticsService {
  getHoldingsTable: (
    user: User,
    opts: { portfolioId?: number; grouping?: GroupCriteria },
  ) => Promise<Partial<AggTransaction>[]>;
}

export function init(deps: Deps): AnalyticsService;

export function aggregate(transactions: AggTransaction[]): Partial<{
  entryVolume: number;
  currentVolume: number;
  profit: number;
  growth: number;
}>;

export function group(
  transactions: AggTransaction[],
  identifierField: GroupFields,
): Record<string, AggTransaction[]>;

export type GroupByCriteriaFn = (
  transactions: AggTransaction[],
  opts: { portfolios: Portfolio[] },
) => Partial<AggTransaction>[];

export type GroupBy = (criteria: GroupCriteria) => GroupByCriteriaFn;
