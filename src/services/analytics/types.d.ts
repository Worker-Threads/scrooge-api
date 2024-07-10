import type { User } from '../../entities/user.d.ts';
import type { Portfolio } from '../../entities/portfolio.d.ts';
import type { PortfolioRepo } from '../../data/portfolio/types.d.ts';
import type {
  AggTransaction,
  TransactionRepo,
} from '../../data/transaction/types.d.ts';

interface Deps {
  portfolioRepo: PortfolioRepo;
  transactionRepo: TransactionRepo;
}

interface AnalyticsService {
  _getTransactionsList: (
    user: User,
    portfolioId?: number,
  ) => Promise<{ portfolios: Portfolio[]; transactions: AggTransaction[] }>;
  getHoldingsTable: (
    user: User,
    opts: { portfolioId?: number; grouping?: GroupCriteria },
  ) => Promise<Partial<AggTransaction>[]>;
  getHoldingsDistribution: (
    user: User,
    opts: { portfolioId?: number; grouping: GroupCriteria },
  ) => Promise<Record<string, number>>;
}

export function init(deps: Deps): AnalyticsService;

export type GroupCriteria = '*' | 'portfolio' | 'asset' | 'type' | 'date';
export type GroupFields = 'portfolioId' | 'type' | 'ticker' | 'timestamp';

export type HoldingsAnalytics = {
  entryVolume: number;
  currentVolume: number;
  profit: number;
  growth: number;
};

export type TransactionWithAnalytics = Partial<AggTransaction> &
  HoldingsAnalytics;

export type GroupedAndAggregatedTransactions = Record<
  string,
  TransactionWithAnalytics
>;

export function aggregate(transactions: AggTransaction[]): {
  entryVolume: number;
  currentVolume: number;
  profit: number;
  growth: number;
};

export function group(
  transactions: AggTransaction[],
  identifierField: GroupFields,
): Record<string, AggTransaction[]>;

export type GroupByCriteriaFn = (
  transactions: AggTransaction[],
  opts: { portfolios: Portfolio[] },
) => GroupedAndAggregatedTransactions;

export type GroupBy = (criteria: GroupCriteria) => GroupByCriteriaFn;
