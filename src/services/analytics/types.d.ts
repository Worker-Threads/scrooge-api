import type { User } from '../../entities/user.d.ts';
import type { Portfolio } from '../../entities/portfolio.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type {
  TransactionRepo,
  GeneralAnalytics,
  AnalyzedTransaction,
} from '../../data/transaction/types.d.ts';

interface Deps {
  portfolioRepo: PortfolioRepo;
  transactionRepo: TransactionRepo;
}

export type GroupCriteria = 'all' | 'portfolio' | 'asset' | 'type' | 'date';
export type GroupFields = 'portfolioId' | 'type' | 'ticker' | 'timestamp';

interface AnalyticsService {
  _getTransactionsList: (
    user: User,
    portfolioId?: number,
  ) => Promise<{
    portfolios: Portfolio[];
    transactions: AnalyzedTransaction[];
  }>;
  getHoldingsTable: (
    user: User,
    opts: { portfolioId?: number; grouping?: GroupCriteria },
  ) => Promise<Partial<AnalyzedTransaction>[]>;
  getHoldingsDistribution: (
    user: User,
    opts: { portfolioId?: number; grouping: GroupCriteria },
  ) => Promise<Record<string, number>>;
}

export function init(deps: Deps): AnalyticsService;

export function groupByCriteria(
  transactions: AnalyzedTransaction[],
  opts: { portfolios: Portfolio[] },
): Record<string, GeneralAnalytics>;
